# Persona Development Guide

This guide explains how to create, update, and maintain personas in the Maestro system.

## What are Personas?

Personas are specialized knowledge modules that modes load dynamically. They contain:
- Technology-specific patterns and best practices
- Common implementations and examples
- Integration guidelines
- Known issues and solutions

## Persona Structure

Every persona file MUST follow this template:

```markdown
# [Technology] Persona

## Core Concepts
[Essential knowledge and principles specific to this technology]

## Common Patterns
[Frequently used code patterns with examples]

## Best Practices
[Recommended approaches and conventions]

## Integration
[How this technology works with other tools/frameworks]

## Gotchas
[Common issues and how to avoid them]
```

## Adding a New Persona

### Step 1: Determine Location

Personas are organized by mode and category:

```
/personas/
├── /code-analyst/
│   ├── code-scanner.md
│   └── code-reviewer.md
└── /coder/
    ├── /frontend/
    │   ├── /frameworks/
    │   ├── /ui-libraries/
    │   └── /state-management/
    ├── /backend/
    │   ├── /languages/
    │   ├── /frameworks/
    │   └── /messaging/
    ├── /database/
    ├── /testing/
    └── /devops/
```

### Step 2: Create the Persona File

Example for adding Svelte:

1. Create file: `/personas/coder/frontend/frameworks/svelte.md`

2. Follow the template:

```markdown
# Svelte Persona

## Core Concepts
- Compiler-based approach (no virtual DOM)
- Reactive declarations with $:
- Component state with let declarations
- Stores for cross-component state
- Built-in transitions and animations

## Common Patterns
### Component Structure
```svelte
<script>
  export let prop;
  let localState = 0;
  
  $: doubled = localState * 2;
  
  function handleClick() {
    localState += 1;
  }
</script>

<button on:click={handleClick}>
  Count: {localState} (doubled: {doubled})
</button>

<style>
  button {
    /* Scoped styles */
  }
</style>
```

### Stores
```javascript
import { writable, derived } from 'svelte/store';

export const count = writable(0);
export const doubled = derived(count, $count => $count * 2);
```

## Best Practices
- Use reactive declarations for computed values
- Prefer stores for shared state
- Leverage Svelte's built-in features
- Keep components focused and small
- Use TypeScript for better type safety

## Integration
- Works well with Vite
- SvelteKit for full-stack apps
- Can integrate with existing JS libraries
- Adapter pattern for deployment

## Gotchas
- Reactivity only works with assignments
- Array methods like push() need reassignment
- Store subscriptions need cleanup
- Context API limitations
```

### Step 3: Update System Prompt

After adding a persona, update the relevant mode's system prompt to include it in the persona tree structure.

For Coder mode (`.roo/system-prompt-coder.md`), update the tree:

```markdown
## PERSONA STRUCTURE

```
/personas/coder/
├── /frontend/
│   ├── /frameworks/
│   │   ├── react.md
│   │   ├── vue.md
│   │   ├── angular.md
│   │   ├── nextjs.md
│   │   └── svelte.md      # ADD THIS LINE
```
```

### Step 4: Test Your Persona

1. Run `node generate-modes.js` to ensure no errors
2. Test with Roo Code by requesting a task using your technology
3. Verify the mode loads your persona correctly

## Updating Existing Personas

### When to Update

- New major version with breaking changes
- Better patterns discovered
- Common issues need documentation
- Integration with new tools

### How to Update

1. Keep existing content when possible
2. Mark deprecated patterns clearly
3. Add version-specific sections if needed
4. Update examples to modern standards
5. Test thoroughly

Example version handling:

```markdown
## Common Patterns

### Modern Approach (v3+)
```javascript
// New pattern
```

### Legacy Approach (v2)
```javascript
// Old pattern - still supported but not recommended
```
```

## Persona Best Practices

### DO:
- **Be Specific**: Focus on one technology per file
- **Include Examples**: Real, working code snippets
- **Stay Practical**: Focus on common use cases
- **Be Concise**: Get to the point quickly
- **Update Regularly**: Keep patterns current

### DON'T:
- **Mix Technologies**: Each persona = one technology
- **Include Basics**: Assume foundation knowledge
- **Copy Documentation**: Provide practical patterns
- **Make It Too Long**: Focus on essential knowledge
- **Forget Integration**: Show how it works with others

## Common Categories Explained

### Frontend Frameworks
Core UI frameworks (React, Vue, Angular, Svelte, etc.)

### UI Libraries  
Styling and component libraries (Tailwind, Material-UI, etc.)

### State Management
State handling solutions (Redux, Zustand, MobX, etc.)

### Backend Languages
Server-side languages (Node.js, Python, Java, etc.)

### Backend Frameworks
Web frameworks (Express, FastAPI, Django, etc.)

### Messaging
Queue and pub/sub systems (RabbitMQ, Kafka, etc.)

### Database
All database technologies:
- Relational (PostgreSQL, MySQL, SQLite)
- NoSQL (MongoDB, Redis)
- ORMs (Prisma, TypeORM)

### Testing
Testing frameworks:
- Unit (Jest, Vitest, Pytest)
- E2E (Playwright, Cypress)
- Performance (k6, JMeter)

### DevOps
CI/CD and deployment:
- GitHub Actions
- Docker
- Kubernetes
- Cloud platforms

## Quality Checklist

Before submitting a persona:

- [ ] Follows the exact template structure
- [ ] Includes practical code examples
- [ ] Covers common use cases
- [ ] Mentions integration points
- [ ] Documents known issues
- [ ] Updated system prompt tree
- [ ] Tested with actual tasks

## Getting Help

- Check existing personas for examples
- Open an issue for questions
- Join community discussions
- Review merged PRs for patterns