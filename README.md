# Maestro V2 - Advanced AI Workflow System for Roo Code

Maestro V2 is a streamlined 5-mode orchestration system for [Roo Code](https://github.com/RooCodeInc/Roo-Code) that enables efficient task delegation and specialized AI assistance through dynamic persona loading.

## Overview

Maestro V2 brings advanced workflow orchestration to Roo Code through a streamlined 5-mode architecture with dynamic persona loading. The system provides deep expertise without context pollution, making AI assistance more efficient and maintainable.

### Key Features

- **5 Primary Modes**: Each optimized for specific tasks
- **Dynamic Personas**: Load specialized knowledge only when needed
- **Zero Context Pollution**: Modes stay focused by loading only relevant information
- **Workflow Management**: Intelligent task routing and state management
- **Flexible Architecture**: Easy to extend with new personas

## The 5 Modes

### 1. **Maestro** - Central Coordinator
- Routes tasks to appropriate specialized modes
- Manages workflow state and context
- Handles user interaction and progress tracking
- No personas needed - pure orchestration

### 2. **Code Analyst** - Code Analysis Expert
- Analyzes existing codebases and reviews changes
- Two specialized personas:
  - `code-scanner`: Automated analysis and pattern detection
  - `code-reviewer`: Human-like code review with suggestions

### 3. **Planner** - System Architect
- High-level planning and architecture design
- Technology selection and roadmapping
- Creates comprehensive technical documentation
- No personas - uses broad architectural knowledge

### 4. **Prodigy** - Quick Implementation
- Simple, straightforward coding tasks
- Rapid prototyping and quick fixes
- No overthinking or complex architectures
- No personas - direct implementation

### 5. **Coder** - Complex Development
- Full-featured implementation with specialized knowledge
- Dynamic loading from extensive persona library:
  - Frontend (React, Vue, Angular, etc.)
  - Backend (Node.js, Python, Java, etc.)
  - Database (PostgreSQL, MongoDB, etc.)
  - Testing (Jest, Playwright, etc.)
  - DevOps (Docker, Kubernetes, etc.)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/SannidhyaSah/Maestro-V2.git
cd Maestro-V2
```

2. Generate the Roo configuration:
```bash
# For project-specific configuration
node generate-modes.js

# For global configuration
node generate-modes.js --global
```

3. The system is now ready to use with Roo Code.

## Usage

### Starting a New Project

When you begin a task with Maestro, it will ask three questions:

1. **Is this a new or existing project?**
2. **Complexity rating (1-5)?**
   - 1-2: Simple tasks routed directly to Prodigy
   - 3-5: Complex tasks with full planning workflow
3. **Agentic mode?** (for complexity 3+)
   - YOLO: Autonomous mode with minimal questions
   - GUIDED: Collaborative mode with user input

### Workflow Example

```
User: "Build a React dashboard with authentication"

Maestro: [Analyzes complexity: 4/5]
         [Routes to Planner for architecture]
         
Planner: [Creates technical roadmap]
         [Designs component structure]
         [Returns to Maestro]
         
Maestro: [Routes to Coder with React persona]

Coder:   [Loads React + Auth personas]
         [Implements dashboard]
         [Returns to Maestro]
         
Maestro: [Routes to Code Analyst for review]

Code Analyst: [Loads code-reviewer persona]
              [Reviews implementation]
              [Provides feedback]
```

## Directory Structure

```
/maestro/
├── /.roo/                     # System prompts (Roo reads these)
│   ├── system-prompt-maestro.md
│   ├── system-prompt-code-analyst.md
│   ├── system-prompt-planner.md
│   ├── system-prompt-prodigy.md
│   └── system-prompt-coder.md
├── /personas/                 # Specialized knowledge modules
│   ├── /code-analyst/        # Analysis personas
│   └── /coder/              # Development personas
│       ├── /frontend/       # Frontend frameworks & tools
│       ├── /backend/        # Backend languages & frameworks
│       ├── /database/       # Database technologies
│       ├── /testing/        # Testing frameworks
│       └── /devops/         # CI/CD & DevOps tools
├── /maestrodocs/             # Runtime workflow management
├── generate-modes.js         # Configuration generator
├── LICENSE                   # Apache 2.0 License
├── README.md                # This file
└── CLAUDE.md               # AI assistant guidelines
```

## How Persona Loading Works

1. **Mode receives task** → Analyzes requirements
2. **Identifies needed technology** → Maps to persona file
3. **Loads specific persona** → Reads only that file
4. **Applies knowledge** → Uses loaded patterns and best practices
5. **Maintains clean context** → No unrelated information loaded

### Example: Building a React Component

```
Task: "Create a React component with Material-UI"

1. Maestro → Routes to Coder mode
2. Coder → Identifies: React + Material-UI needed
3. Coder → Loads: /personas/coder/frontend/frameworks/react.md
4. Coder → Loads: /personas/coder/frontend/ui-libraries/material-ui.md
5. Coder → Implements using loaded knowledge
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Links
- [System Architecture](./contributing/ARCHITECTURE.md) - Understand how Maestro works
- [Adding Personas](./contributing/PERSONAS.md) - Most common contribution
- [Modifying Modes](./contributing/SYSTEM-PROMPTS.md) - Change mode behavior

### Most Common: Adding New Personas

1. Create a new file in the appropriate category
2. Follow the [persona template](./contributing/PERSONAS.md#persona-structure)
3. Update the mode's persona tree structure
4. Submit a pull request

Example: Adding a new frontend framework to Coder mode

## Design Principles

1. **Simplicity**: 5 modes is cleaner than 20+
2. **Modularity**: Personas can be added/updated independently
3. **Efficiency**: Load only what's needed
4. **Clarity**: Clear separation of concerns
5. **Scalability**: Easy to add new technologies

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for [Roo Code](https://github.com/RooCodeInc/Roo-Code)
- Based on the [Maestro V1](https://github.com/shariqriazz/maestro) workflow system
- Thanks to all contributors and the Roo community

## Support

- **Issues**: [GitHub Issues](https://github.com/SannidhyaSah/Maestro-V2/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SannidhyaSah/Maestro-V2/discussions)
- **Documentation**: See [CLAUDE.md](CLAUDE.md) for AI assistant guidelines

---

*Maestro - Orchestrating AI workflows with precision and clarity*