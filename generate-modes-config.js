#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Parses a mode markdown file to extract the mode name, role definition, and custom instructions
 * @param {string} content - The content of the markdown file
 * @returns {Object} An object containing the mode name, slug, role, and instructions
 */
function parseModeMd(content) {
  // Extract mode name from the first heading
  const nameMatch = content.match(/^# ([^\n]+) Mode/m);
  if (!nameMatch) {
    throw new Error('Could not find mode name in markdown file');
  }
  const name = nameMatch[1];

  // Generate slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  // Extract role definition
  const roleMatch = content.match(/## Role Definition\s+([^\n]+(?:\n(?!##)[^\n]+)*)/);
  if (!roleMatch) {
    throw new Error('Could not find role definition in markdown file');
  }
  const role = roleMatch[1].trim();

  // Extract custom instructions
  const instructionsMatch = content.match(/## Custom Instructions\s+([\s\S]+?)(?=\n## |$)/);
  if (!instructionsMatch) {
    throw new Error('Could not find custom instructions in markdown file');
  }
  const instructions = instructionsMatch[1].trim();

  return {
    name,
    slug,
    role,
    instructions
  };
}

/**
 * Parses a mode markdown file that may not have full role/instructions sections
 * Sets the entire content as roleDefinition and extracts customInstructions if present.
 * @param {string} content - The content of the markdown file
 * @returns {Object} An object containing the mode name, slug, roleDefinition (full content), and optional customInstructions
 */
function parseOtherModeMd(content) {
  // Extract mode name from the first heading
  const nameMatch = content.match(/^# ([^\n]+) Mode/m);
  if (!nameMatch) {
    throw new Error('Could not find mode name in markdown file');
  }
  const name = nameMatch[1];

  // Generate slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  // The entire content is the role definition
  const roleDefinition = content;

  // Extract custom instructions (optional)
  const instructionsMatch = content.match(/## Custom Instructions\s+([\s\S]+?)(?=\n## |$)/);
  const customInstructions = instructionsMatch ? instructionsMatch[1].trim() : undefined;

  return {
    name,
    slug,
    roleDefinition,
    customInstructions
  };
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

    // Process Maestro mode separately
    const maestroFile = 'Maestro-mode.md';
    if (files.includes(maestroFile)) {
      console.log(`Processing ${maestroFile}...`);
      const content = await readFile(maestroFile, 'utf-8');
      try {
        const mode = parseModeMd(content); // Use the original parser for Maestro
        modes.push({
          slug: mode.slug,
          name: mode.name,
          roleDefinition: mode.role, // Maestro uses specific sections for role
          customInstructions: mode.instructions,
          groups: [
            "read",
            "edit",
            "browser",
            "command",
            "mcp"
          ],
          source: "project"
        });
      } catch (error) {
        console.error(`Error parsing ${maestroFile}: ${error.message}`);
        // Continue without Maestro if parsing fails
      }
    } else {
        console.error(`Maestro-mode.md not found.`);
        // Continue without Maestro if file not found
    }


    // Process other mode files
    const otherModeFiles = modeFiles.filter(file => file !== maestroFile);

    for (const file of otherModeFiles) {
      console.log(`Processing ${file}...`);
      const content = await readFile(file, 'utf-8');
      try {
        const mode = parseOtherModeMd(content); // Use the new parser for others

        const modeObject = {
          slug: mode.slug,
          name: mode.name,
          roleDefinition: mode.roleDefinition, // Use the entire content as roleDefinition
          groups: [
            "read",
            "edit",
            "browser",
            "command",
            "mcp"
          ],
          source: "project"
        };

        // Add customInstructions only if it exists
        if (mode.customInstructions !== undefined) {
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