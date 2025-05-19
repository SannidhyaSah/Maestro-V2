# Development Guide

This guide provides instructions for setting up and contributing to this project.

## Prerequisites

- Node.js (LTS version recommended)
- Git

## Setup

1. Clone the repository:

   ```bash
   git clone [repository URL]
   ```

2. Navigate to the project directory:

   ```bash
   cd maestro
   ```

3. Install dependencies (if any):

   ```bash
   # If you add a package.json later
   # npm install
   ```

## Generating the .roomodes file

This project includes a script to generate the `.roomodes` configuration file used by the Roo Code extension.

1. Ensure your mode markdown files (ending with `-mode.md`) are in the root directory.
2. Run the generation script:

   ```bash
   node generate-modes-config.js
   ```

This will create or update the `.roomodes` file.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Commit your changes with clear and descriptive commit messages.
6. Push your changes to your fork.
7. Create a pull request to the main repository.

## Project Structure

- `generate-modes-config.js`: The script to generate the `.roomodes` file.
- `*.md`: Markdown files defining the custom modes.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore.
- `.roomodes`: The generated configuration file for custom modes (ignored by Git).