# System Prompt Development Guide

This guide explains how to modify and maintain system prompts in the Maestro system.

## What are System Prompts?

System prompts are the core instructions that define each mode's behavior. They are located in the `.roo/` directory and are what Roo Code actually reads when loading modes.

## System Prompt Structure

Every system prompt MUST follow this exact structure:

```markdown
# SYSTEM INSTRUCTIONS

You are [ModeName], [comprehensive role description]...

## CORE RESPONSIBILITIES

### CRITICAL RULES
- [Rule 1]: [Explanation]
- [Rule 2]: [Explanation]
...

[Mode-specific sections]

## MARKDOWN RULES

ALL responses MUST show ANY `language construct` OR filename reference as clickable, exactly as [`filename OR language.declaration()`](relative/file/path.ext:line); line is required for `syntax` and optional for filename links.

TOOL USE

You have access to a set of tools that are executed upon the user's approval...

## Tool Use Formatting

Tool use is formatted using XML-style tags...

## Tools

[List of available tools with descriptions]
```

## Critical Requirements

### 1. Opening Role Definition
- MUST start with "You are [ModeName]"
- This is parsed by `generate-modes.js`
- Be comprehensive but concise

### 2. Section Order
1. `# SYSTEM INSTRUCTIONS`
2. Role definition paragraph
3. `## CORE RESPONSIBILITIES`
4. `### CRITICAL RULES`
5. Mode-specific sections
6. `## MARKDOWN RULES`
7. Tool use instructions
8. `## Tools`

### 3. Markdown Rules Section
This MUST be included exactly as shown:

```markdown
## MARKDOWN RULES

ALL responses MUST show ANY `language construct` OR filename reference as clickable, exactly as [`filename OR language.declaration()`](relative/file/path.ext:line); line is required for `syntax` and optional for filename links.
```

### 4. Tool Use Section
Standard format that must be included:

```markdown
TOOL USE

You have access to a set of tools that are executed upon the user's approval. You can use one tool per message, and will receive the result of that tool use in the user's response. You use tools step-by-step to accomplish a given task, with each tool use informed by the result of the previous tool use.

## Tool Use Formatting

Tool use is formatted using XML-style tags. Tool name and parameters are enclosed in their respective tags:

<actual_tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</actual_tool_name>

For example, to use the read_file tool:

<read_file>
<path>src/main.js</path>
</read_file>

Always use the actual tool name as the XML tag name for proper parsing and execution.

## Tools

[Mode-specific tools go here]
```

## Mode-Specific Guidelines

### Maestro Mode
- Focus on orchestration and delegation
- Include workflow management rules
- Define routing logic clearly
- Minimal tools (mainly file operations)

### Code Analyst Mode
- Lean structure - rely on personas
- Include persona loading protocol
- Analysis-focused tools only
- Clear documentation requirements

### Planner Mode
- Comprehensive planning methodology
- Include deliverable templates
- Research and documentation tools
- Workflow integration rules

### Prodigy Mode
- Simple and direct approach
- No persona loading needed
- Basic implementation tools
- Clear scope boundaries

### Coder Mode
- Lean structure - rely on personas
- Detailed persona tree structure
- Full implementation tools
- Loading protocol must be clear

## Adding Tools

### Available Tools Reference

See `contributing/all-tools.md` for a comprehensive list of all available tools that can be added to modes. This file contains:
- Complete tool definitions with XML syntax
- Tool descriptions and use cases
- Parameter specifications
- Example usage for each tool

When considering which tools to add to a mode, review the all-tools.md file and select only those that directly support the mode's core responsibilities.

### Tool Definition Format

```markdown
## tool_name
Description: What this tool does and when to use it
Parameters:
- param1: (required/optional) Description
- param2: (required/optional) Description

Usage:
<tool_name>
<param1>value</param1>
<param2>value</param2>
</tool_name>
```

### Common Tools by Mode Type

**Orchestration Modes** (Maestro):
- new_task
- read_file
- write_to_file
- list_files

**Analysis Modes** (Code Analyst):
- read_file
- search_files
- list_code_definition_names
- write_to_file

**Planning Modes** (Planner):
- read_file
- write_to_file
- list_files
- search_files
- use_mcp_tool (for research)

**Implementation Modes** (Coder, Prodigy):
- read_file
- write_to_file
- edit_file
- list_files
- run_command
- search_files
- create_directory
- execute_command

## Updating Persona References

When adding new personas, update the tree structure in relevant modes:

```markdown
## PERSONA STRUCTURE

```
/personas/coder/
├── /frontend/
│   ├── /frameworks/
│   │   ├── react.md
│   │   ├── vue.md
│   │   └── [NEW].md    # Add your new persona here
```
```

## Testing Your Changes

1. **Syntax Check**: Ensure markdown is valid
2. **Structure Check**: Verify all required sections
3. **Parse Test**: Run `node generate-modes.js`
4. **Integration Test**: Test with Roo Code
5. **Workflow Test**: Ensure mode interactions work

## Common Pitfalls

### DON'T:
- Change the required section structure
- Modify the markdown rules section
- Remove critical rules
- Mix responsibilities between modes
- Forget to update persona trees

### DO:
- Follow the exact structure
- Keep modes focused
- Update documentation
- Test thoroughly
- Maintain consistency

## Mode Interaction Patterns

### Delegation from Maestro
```markdown
When delegating to [Mode]:
1. Include task description
2. Specify deliverables
3. Provide context location
4. Request summary for workflow
```

### Returning to Maestro
```markdown
Task completed. [Brief summary]
Output saved to: maestrodocs/mode-outputs/[mode]/[file]
Summary: [2-3 line summary]
```

## Workflow Integration

All modes should integrate with Maestro's workflow system:

1. Read from `maestrodocs/workflow-state.md`
2. Save outputs to `maestrodocs/mode-outputs/[mode]/`
3. Update workflow state when appropriate
4. Return clear summaries to Maestro

## Version Control

When updating system prompts:

1. Preserve backward compatibility
2. Document breaking changes
3. Update related documentation
4. Test with existing workflows
5. Consider migration path

## Getting Help

- Review existing system prompts
- Check git history for patterns
- Open issues for clarification
- Test in development first