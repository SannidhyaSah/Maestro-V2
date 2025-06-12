#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

/**
 * Generates mode configuration based on predefined mode names
 * No longer reads from files - just uses the mode names directly
 */
function generateModesFromNames() {
  // Define all the mode names (extracted from the files we moved)
  const modeNames = [
    'code-analyst',
    'coder',
    'maestro',
    'planner',
    'prodigy'
  ];

  const modes = modeNames.map(name => {
    // Generate slug from name (convert PascalCase to lowercase)
    const slug = name.toLowerCase().replace(/([A-Z])/g, (match, letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toLowerCase();
    });

    // Just use the slug for all fields
    const role = slug;
    const whenToUse = slug;
    const customInstructions = slug;

    return {
      name,
      slug,
      role,
      whenToUse,
      customInstructions
    };
  });

  return modes;
}

/**
 * Converts mode data to YAML format
 */
function generateYAML(modes) {
  let yaml = 'customModes:\n';
  
  modes.forEach(mode => {
    yaml += `  - slug: "${mode.slug}"\n`;
    yaml += `    name: "${mode.name}"\n`;
    yaml += `    roleDefinition: "${mode.role.replace(/"/g, '\\"')}"\n`;
    yaml += `    whenToUse: "${mode.whenToUse.replace(/"/g, '\\"')}"\n`;
    yaml += `    customInstructions: "${mode.customInstructions.replace(/"/g, '\\"')}"\n`;
    yaml += `    groups:\n`;
    yaml += `      - read\n`;
    yaml += `      - edit\n`;
    yaml += `      - browser\n`;
    yaml += `      - command\n`;
    yaml += `      - mcp\n`;
    yaml += `    source: project\n`;
  });
  
  return yaml;
}

/**
 * Main function to generate the .roomodes configuration file
 */
async function generateModesConfig() {
  try {
    console.log('Generating modes configuration from predefined names...');
    
    // Generate modes from predefined names
    const modes = generateModesFromNames();
    
    // Sort modes alphabetically by name
    modes.sort((a, b) => a.name.localeCompare(b.name));
    
    // Generate YAML configuration
    const yamlConfig = generateYAML(modes);
    
    // Write the configuration to .roomodes file
    await writeFile('.roomodes', yamlConfig);
    
    console.log(`Successfully generated .roomodes configuration with ${modes.length} modes`);
    console.log('\nGenerated modes:');
    modes.forEach(mode => {
      console.log(`  - ${mode.name} (${mode.slug})`);
    });
    
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