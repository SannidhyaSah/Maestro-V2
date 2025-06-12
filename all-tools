# COMPREHENSIVE TOOL REFERENCE

## File Analysis & Navigation

### `read_file` - Examine file contents (up to 20 files)
```xml
<read_file>
<args>
  <file>
    <path>relative/path/to/file</path>
  </file>
  <file>
    <path>another/file/path</path>
  </file>
</args>
</read_file>
```
<read_file>
<args>
  <file>
    <path>relative/path/to/file</path>
  </file>
  <file>
    <path>another/file/path</path>
  </file>
</args>
</read_file>
```
### `codebase_search` - Semantic code discovery
```xml
<codebase_search>
<query>natural language search query</query>
<path>optional/directory/path</path>
</codebase_search>
```

### `list_files` - Directory structure exploration
```xml
<list_files>
<path>directory/path</path>
<recursive>true/false</recursive>
</list_files>
```

### `search_files` - Pattern-based code discovery
```xml
<search_files>
<path>search/directory</path>
<regex>pattern</regex>
<file_pattern>*.ext</file_pattern>
</search_files>
```

### `list_code_definition_names` - Extract code architecture
```xml
<list_code_definition_names>
<path>file/or/directory</path>
</list_code_definition_names>
```

## Precision Editing Operations

### `apply_diff` - Surgical code modifications (PREFERRED)
```xml
<apply_diff>
<path>file/path</path>
<diff>
<<<<<<< SEARCH
exact existing content
=======
replacement content
>>>>>>> REPLACE
</diff>
</apply_diff>
```

**Note**: The SEARCH block must be an exact, character-for-character match of the content in the file, including all whitespace. Do NOT include line numbers or other metadata from `read_file` output.

### `search_and_replace` - Pattern replacements
```xml
<search_and_replace>
<path>file/path</path>
<search>find_text</search>
<replace>replace_text</replace>
<use_regex>true/false</use_regex>
<ignore_case>true/false</ignore_case>
<start_line>optional</start_line>
<end_line>optional</end_line>
</search_and_replace>
```

### `insert_content` - Add new lines
```xml
<insert_content>
<path>file/path</path>
<line>line_number</line>
<content>new content</content>
</insert_content>
```

### `write_to_file` - Create/overwrite files
```xml
<write_to_file>
<path>file/path</path>
<content>COMPLETE file content</content>
<line_count>total_lines</line_count>
</write_to_file>
```

## System Execution & Integration

### `execute_command` - CLI command execution
```xml
<execute_command>
<command>command_to_run</command>
<cwd>optional_directory</cwd>
</execute_command>
```

### `browser_action` - Web automation and testing
```xml
<browser_action>
<action>launch/click/hover/type/scroll_down/scroll_up/resize/close</action>
<url>http://target.url</url>
<coordinate>x,y</coordinate>
<text>text_to_type</text>
<size>width,height</size>
</browser_action>
```

## MCP Server Integration

### `use_mcp_tool` - Execute specialized MCP tools
```xml
<use_mcp_tool>
<server_name>mcp_server_name</server_name>
<tool_name>tool_to_execute</tool_name>
<arguments>
{
  "parameter1": "value1",
  "parameter2": "value2"
}
</arguments>
</use_mcp_tool>
```

### `access_mcp_resource` - Access MCP server resources
```xml
<access_mcp_resource>
<server_name>server_name</server_name>
<uri>resource_uri</uri>
</access_mcp_resource>
```

### `fetch_instructions` - Get specialized task guidance
```xml
<fetch_instructions>
<task>create_mcp_server/create_mode</task>
</fetch_instructions>
```

## Communication & Task Management

### `ask_followup_question` - Strategic requirement clarification
```xml
<ask_followup_question>
<question>specific_clarifying_question</question>
<follow_up>
<suggest>complete_option_1</suggest>
<suggest>complete_option_2</suggest>
<suggest>complete_option_3</suggest>
</follow_up>
</ask_followup_question>
```

### `attempt_completion` - Present final engineering results
```xml
<attempt_completion>
<result>comprehensive_solution_summary</result>
<command>optional_demo_command</command>
</attempt_completion>
```

### `switch_mode` - Switch to specialized modes
```xml
<switch_mode>
<mode_slug>target_mode</mode_slug>
<reason>justification_for_switch</reason>
</switch_mode>
```

### `new_task` - Create new specialized task instances
```xml
<new_task>
<mode>target_mode</mode>
<message>task_instructions</message>
</new_task>
```