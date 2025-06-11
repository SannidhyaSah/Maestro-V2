# Maestro V2 System Architecture

## Overview

Maestro V2 is a streamlined 5-mode system for Roo Code with dynamic persona loading. This document explains the technical architecture and design decisions.

## Core Philosophy

- **5 Primary Modes**: Each with a specific purpose
- **Dynamic Personas**: Specialized knowledge loaded only when needed
- **Zero Context Pollution**: Modes stay focused by loading only relevant information
- **Simple Structure**: Easy to understand, maintain, and extend

## The 5 Modes

### 1. Maestro - Central Coordinator
- **Purpose**: Routes tasks to appropriate modes
- **Personas**: None (pure orchestration)
- **Location**: `.roo/system-prompt-maestro.md`
- **Key Features**:
  - Three-question flow for task analysis
  - Complexity-based routing (1-5 scale)
  - Workflow state management
  - Resume capability

### 2. Code Analyst - Analysis Expert  
- **Purpose**: Analyze and review code
- **Personas**: 2 specialized personas
  - `code-scanner`: Automated analysis
  - `code-reviewer`: Human-like review
- **Location**: `.roo/system-prompt-code-analyst.md`
- **Persona Loading**: Based on analysis type needed

### 3. Planner - System Architect
- **Purpose**: High-level planning and design
- **Personas**: None (broad knowledge base)
- **Location**: `.roo/system-prompt-planner.md`
- **Key Features**:
  - PRD creation
  - Architecture design
  - Technology selection
  - Modular task breakdown

### 4. Prodigy - Quick Implementation
- **Purpose**: Simple, direct coding tasks
- **Personas**: None (straightforward tasks)
- **Location**: `.roo/system-prompt-prodigy.md`
- **Use Cases**:
  - Bug fixes
  - Simple features
  - Quick scripts
  - Prototypes

### 5. Coder - Complex Development
- **Purpose**: Full implementation with specialized knowledge
- **Personas**: Extensive library across categories
- **Location**: `.roo/system-prompt-coder.md`
- **Categories**:
  - Frontend (frameworks, UI libraries, state management)
  - Backend (languages, frameworks, messaging)
  - Database (relational, NoSQL, ORMs)
  - Testing (unit, E2E, performance)
  - DevOps (CI/CD, containerization)

## Directory Structure

```
/maestro/
├── /.roo/                          # System prompts (what Roo reads)
│   ├── system-prompt-maestro.md
│   ├── system-prompt-code-analyst.md
│   ├── system-prompt-planner.md
│   ├── system-prompt-prodigy.md
│   └── system-prompt-coder.md
├── /personas/                      # Specialized knowledge modules
│   ├── /code-analyst/
│   │   ├── code-scanner.md
│   │   └── code-reviewer.md
│   └── /coder/
│       ├── /frontend/
│       │   ├── /frameworks/
│       │   ├── /ui-libraries/
│       │   └── /state-management/
│       ├── /backend/
│       │   ├── /languages/
│       │   ├── /frameworks/
│       │   └── /messaging/
│       ├── /database/
│       │   ├── /relational/
│       │   ├── /nosql/
│       │   └── /orm/
│       ├── /testing/
│       │   ├── /unit/
│       │   ├── /e2e/
│       │   └── /performance/
│       └── /devops/
├── /maestrodocs/                   # Runtime workflow management
├── /contributing/                  # This documentation
├── generate-modes.js              # Configuration generator
├── LICENSE
├── README.md
└── CLAUDE.md
```

## Persona Loading System

### How It Works

1. **Mode receives task** from Maestro
2. **Analyzes requirements** to identify needed technologies
3. **Maps to persona files** based on technology
4. **Loads specific personas** by reading files
5. **Applies knowledge** using loaded patterns
6. **Maintains clean context** - no unrelated info

### Loading Protocol Example

```
Task: "Build a React component with Material-UI"

1. Maestro → Routes to Coder mode
2. Coder analyzes: Need React + Material-UI
3. Coder loads:
   - /personas/coder/frontend/frameworks/react.md
   - /personas/coder/frontend/ui-libraries/material-ui.md
4. Coder implements using loaded knowledge
```

## System Prompt Structure

All system prompts MUST follow this structure:

```markdown
# SYSTEM INSTRUCTIONS

You are [ModeName], [role description]...

## CORE RESPONSIBILITIES

### CRITICAL RULES
- Rule 1
- Rule 2
...

[Mode-specific sections]

## MARKDOWN RULES

ALL responses MUST show ANY `language construct` OR filename reference as clickable...

TOOL USE

[Tool use instructions]

## Tools

[Available tools]
```

## Workflow Management

### Maestro's Workflow State

Located at `maestrodocs/workflow-state.md`:
- Tracks current task progress
- Maintains context between modes
- Enables resume capability
- Records complexity and mode settings

### Mode Outputs

Each mode saves outputs to `maestrodocs/mode-outputs/[mode-name]/`:
- Planner: PRDs, architecture docs, research
- Code Analyst: Analysis reports, reviews
- Coder: Implementation logs
- Prodigy: Direct outputs

## Design Principles

1. **Simplicity**: 5 modes instead of 20+
2. **Modularity**: Personas independent from modes
3. **Efficiency**: Load only what's needed
4. **Clarity**: Clear separation of concerns
5. **Scalability**: Easy to add new technologies

## Communication Flow

```
User Request
    ↓
Maestro (analyzes & routes)
    ↓
Specialized Mode (with personas if needed)
    ↓
Mode Output (saved to maestrodocs)
    ↓
Maestro (consolidates response)
    ↓
User Response
```

## Adding New Capabilities

### New Persona
1. Create file in appropriate category
2. Update mode's persona tree structure
3. Follow persona template
4. Test loading mechanism

### New Mode (discouraged)
1. Create system prompt file
2. Follow required structure
3. Update generate-modes.js if needed
4. Consider if existing modes can handle it

### New Tool
1. Add to relevant mode's tool section
2. Follow existing tool format
3. Update documentation
4. Test thoroughly

## Future Considerations

- Persona format may evolve
- Additional categories can be added
- Mode count should stay minimal
- Focus on extending personas, not modes