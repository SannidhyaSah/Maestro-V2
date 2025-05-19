#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Normalize a slug: lowercase, replace any sequence of non-alphanumeric characters with a single dash
 * @param {string} name
 * @returns {string}
 */
function normalizeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Remove YAML frontmatter (--- ... ---) from the top of the file
 * @param {string} content
 * @returns {string}
 */
function removeYamlFrontmatter(content) {
  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end !== -1) {
      return content.slice(end + 3).trim();
    }
  }
  return content;
}

/**
 * Parses a mode markdown file to extract the mode name, roleDefinition, and optional customInstructions
 * - Removes YAML frontmatter
 * - Removes the first heading
 * - Normalizes slug
 * - Extracts clean roleDefinition and customInstructions
 * @param {string} content - The content of the markdown file
 * @param {string} filename - The filename of the markdown file
 * @returns {Object} An object containing the mode name, slug, roleDefinition, and optional customInstructions
 */
function parseModeFile(content, filename) {
  // Remove YAML frontmatter
  content = removeYamlFrontmatter(content);

  // Extract mode name from the first heading
  const nameMatch = content.match(/^# ([^\n]+) Mode/m);
  if (!nameMatch) {
    throw new Error('Could not find mode name in markdown file');
  }
  const name = nameMatch[1].trim();
  const slug = normalizeSlug(name);

  // Remove the first heading
  const headingRegex = /^# [^\n]+ Mode\s*/m;
  content = content.replace(headingRegex, '').trim();

  // Special handling for Maestro-mode.md
  if (filename.toLowerCase() === 'maestro-mode.md') {
    // Find the ## Role Definition section
    const roleDefMatch = content.match(/## Role Definition[\r\n]+([\s\S]*?)(?=\n## |$)/);
    let roleDefinition = '';
    if (roleDefMatch) {
      roleDefinition = roleDefMatch[1].trim();
    } else {
      // fallback: everything before ## Custom Instructions
      const customInstructionsIndex = content.indexOf('## Custom Instructions');
      if (customInstructionsIndex !== -1) {
        roleDefinition = content.substring(0, customInstructionsIndex).trim();
      } else {
        roleDefinition = content.trim();
      }
    }
    // Custom Instructions
    const customInstructionsMatch = content.match(/## Custom Instructions[\r\n]+([\s\S]*)/);
    let customInstructions;
    if (customInstructionsMatch) {
      customInstructions = customInstructionsMatch[1].trim();
    }
    const result = {
      name,
      slug,
      roleDefinition
    };
    if (customInstructions) {
      result.customInstructions = customInstructions;
    }
    return result;
  }

  // Default logic for all other modes
  const customInstructionsMatch = content.match(/## Custom Instructions[\r\n]+([\s\S]*)/);
  let roleDefinition, customInstructions;
  if (customInstructionsMatch) {
    // Everything before '## Custom Instructions' is roleDefinition
    const splitIndex = content.indexOf('## Custom Instructions');
    roleDefinition = content.substring(0, splitIndex).trim();
    customInstructions = customInstructionsMatch[1].trim();
  } else {
    // Use the whole content as roleDefinition
    roleDefinition = content.trim();
  }

  const result = {
    name,
    slug,
    roleDefinition
  };
  if (customInstructions) {
    result.customInstructions = customInstructions;
  }
  return result;
}

/**
 * Main function to generate the .roomodes configuration file
 */
async function generateModesConfig() {
  try {
    const files = await readdir('.');
    const modeFiles = files.filter(file => file.endsWith('-mode.md'));

    console.log(`Found ${modeFiles.length} mode files`);

    const modes = [];

    for (const file of modeFiles) {
      console.log(`Processing ${file}...`);
      const content = await readFile(file, 'utf-8');
      try {
        const mode = parseModeFile(content, file);
        const modeObject = {
          slug: mode.slug,
          name: mode.name,
          roleDefinition: mode.roleDefinition,
          groups: [
            "read",
            "edit",
            "browser",
            "command",
            "mcp"
          ],
          source: "project"
        };
        if (mode.customInstructions) {
          modeObject.customInstructions = mode.customInstructions;
        }
        modes.push(modeObject);
      } catch (error) {
        console.error(`Error parsing ${file}: ${error.message}`);
      }
    }

    // Sort modes alphabetically by name
    modes.sort((a, b) => a.name.localeCompare(b.name));

    // Format the modes into the .roomodes configuration
    const roomodesConfig = {
      customModes: modes
    };

    // Write the configuration to .roomodes file
    const configJson = JSON.stringify(roomodesConfig, null, 2);
    await writeFile('.roomodes', configJson);

    console.log(`Successfully generated .roomodes configuration with ${modes.length} modes`);
  } catch (error) {
    console.error('Error generating modes configuration:', error);
    process.exit(1);
  }
}

// Run the script
generateModesConfig().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});