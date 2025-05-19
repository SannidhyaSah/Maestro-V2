# Maestro Mode Config Generator

This project contains a script to generate the `.roomodes` configuration file based on the markdown files in the root directory.

## Usage

1. Ensure you have Node.js installed.
2. Place your mode markdown files (ending with `-mode.md`) in the root directory of this project.
3. Run the following command in your terminal:

```bash
node generate-modes-config.js
```

This will generate or update the `.roomodes` file in the root directory.

## Mode File Format

The script processes `.md` files in the root directory ending with `-mode.md`.

- **Maestro-mode.md**: This file is treated specially. The script extracts the `name`, `slug`, `roleDefinition` (from the "Role Definition" section), and `customInstructions` (from the "Custom Instructions" section) from this file.
- **Other *-mode.md files**: For all other markdown files ending in `-mode.md` in the root directory, the script extracts the `name` and `slug` from the main heading. The *entire content* of the file is used as the `roleDefinition`. The `customInstructions` are included only if a `## Custom Instructions` section is explicitly present in the file.

## .roomodes File

The generated `.roomodes` file is a JSON file that contains the configuration for custom modes, used by the Roo Code extension.