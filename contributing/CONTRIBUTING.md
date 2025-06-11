# Contributing to Maestro

Thank you for your interest in contributing to Maestro! This guide will help you understand how to contribute effectively to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing opinions and experiences

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/Maestro-V2.git`
3. Add upstream remote: `git remote add upstream https://github.com/SannidhyaSah/Maestro-V2.git`
4. Create a branch: `git checkout -b feature/your-feature-name`

## How to Contribute

### Adding or Updating Personas

Personas are the specialized knowledge modules that modes load dynamically. See [PERSONAS.md](./PERSONAS.md) for detailed instructions.

### Modifying System Prompts

System prompts define the core behavior of each mode. See [SYSTEM-PROMPTS.md](./SYSTEM-PROMPTS.md) for guidelines.

### Adding New Features

1. Discuss major changes in an issue first
2. Follow the existing architecture patterns
3. Update documentation as needed
4. Add tests if applicable

### Reporting Issues

- Use the issue tracker
- Provide clear descriptions
- Include reproduction steps
- Mention your environment details

## Development Setup

1. Ensure you have Node.js installed
2. Clone the repository
3. Run `node generate-modes.js` to test configuration generation
4. Make your changes
5. Test with Roo Code

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information about:
- The 5-mode system
- Directory organization
- Persona loading mechanism
- Design principles

## Submitting Changes

### Pull Request Process

1. Update documentation for any changed functionality
2. Ensure your code follows the style guidelines
3. Write clear commit messages
4. Reference any related issues
5. Request review from maintainers

### Commit Message Format

```
type: brief description

Longer explanation if needed. Wrap at 72 characters.

Fixes #123
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

## Style Guidelines

### Markdown Files

- Use clear, concise language
- Include examples where helpful
- Follow the existing format
- Use proper heading hierarchy

### Persona Files

- Follow the template structure exactly
- Include practical examples
- Focus on patterns and best practices
- Keep content technology-specific

### System Prompts

- Maintain the required section structure
- Be explicit about mode behavior
- Include all required sections
- Test changes thoroughly

## Questions?

- Open an issue for questions
- Join discussions in the community
- Check existing documentation first

Thank you for contributing to Maestro!