# Developer Handoff Protocol

## Overview
This document outlines the protocol for receiving bug reports from developers and providing debugging results back to developers. It ensures a smooth, efficient, and collaborative debugging process with clear communication and expectations.

## Receiving from Developer

### 1. Initial Information Gathering
When receiving a bug report from a Developer, you MUST gather the following information:

- **Bug Description**: Clear description of the issue
- **Reproduction Steps**: Steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment Details**: Where the issue occurs
- **Impact and Severity**: How serious the issue is
- **Context**: Any relevant background information
- **Constraints**: Deadlines or limitations
- **Attempted Solutions**: What has been tried already

**Required Questions**:
```
## Bug Information Request

To effectively debug this issue, I need some additional information:

1. **Can you provide step-by-step instructions to reproduce the issue?**
2. **What is the expected behavior?**
3. **What environment(s) does this issue occur in?**
4. **How severe is this issue? Does it block critical functionality?**
5. **When did this issue first appear? Was it working correctly before?**
6. **Have any recent changes been made that might relate to this issue?**
7. **Have you attempted any solutions or workarounds?**
8. **Are there any error messages, logs, or screenshots available?**
9. **Is there a deadline for resolving this issue?**
10. **Is there any additional context I should know about?**
```

### 2. Bug Reproduction
Once you have the necessary information, confirm that you can reproduce the issue:

- Verify reproduction steps
- Confirm environment setup
- Identify any additional factors
- Document any discrepancies

**Required Confirmation**:
```
## Bug Reproduction Confirmation

I've attempted to reproduce the issue with the following results:

**Reproduction Status**: [Reproduced/Partially Reproduced/Unable to Reproduce]

**Reproduction Environment**:
[Details of the environment used for reproduction]

**Observations**:
[What was observed during reproduction attempts]

**Additional Factors**:
[Any additional factors identified that influence the issue]

**Next Steps**:
[Planned approach for debugging]
```

### 3. Clarification Requests
If you need additional information, make specific and clear requests:

- Ask focused questions
- Explain why the information is needed
- Suggest specific tests or checks
- Provide examples of the information needed

**Required Format**:
```
## Clarification Request

To continue debugging effectively, I need the following additional information:

1. **[Specific Question]**
   - Why this is needed: [Explanation]
   - Example of what to look for: [Example]

2. **[Specific Test Request]**
   - Please try the following and share the results:
     ```
     [Test steps or code to run]
     ```
   - What to observe: [What to look for]
```

## Reporting to Developer

### 1. Progress Updates
For complex or lengthy debugging sessions, provide regular progress updates:

- Current status
- Findings so far
- Current hypothesis
- Next steps
- Estimated timeline

**Required Format**:
```
## Debugging Progress Update

**Current Status**: [In Progress/Blocked/Almost Complete]

**Time Spent**: [Hours spent debugging so far]

**Findings So Far**:
- [Key finding 1]
- [Key finding 2]
- ...

**Current Hypothesis**:
[Current theory about the root cause]

**Next Steps**:
1. [Planned action 1]
2. [Planned action 2]
- ...

**Estimated Completion**: [Timeframe or specific date/time]

**Blockers**:
- [Any blockers preventing progress]
```

### 2. Solution Report
When you've resolved the issue, provide a comprehensive solution report:

- Root cause explanation
- Solution details
- Code changes
- Testing performed
- Prevention recommendations

**Required Format**:
```
## Bug Resolution Report

**Bug Status**: [Fixed/Workaround/Partially Fixed]

### Root Cause
[Detailed explanation of what caused the issue]

### Solution
[Comprehensive description of the solution implemented]

### Code Changes
[Summary of code changes made, with snippets of key changes]

### Testing
[Description of how the fix was tested and verified]

### Prevention
[Recommendations to prevent similar issues in the future]

### Follow-up
[Any recommended follow-up actions or related issues to address]
```

### 3. Educational Insights
Provide educational value by explaining the debugging process and lessons learned:

- Debugging techniques used
- Relevant patterns or anti-patterns
- Learning resources
- Best practices

**Required Format**:
```
## Debugging Insights

### Effective Techniques
[Debugging techniques that were particularly useful for this issue]

### Related Patterns
[Design patterns or anti-patterns relevant to this issue]

### Learning Resources
[Helpful resources for understanding this type of issue]

### Best Practices
[Best practices to avoid similar issues in the future]
```

### 4. Unresolved Issues
If you cannot fully resolve the issue, provide a clear explanation and recommendations:

- Current understanding
- Attempted approaches
- Partial findings
- Recommended next steps
- Alternative approaches

**Required Format**:
```
## Unresolved Issue Report

**Current Status**: [Partially Debugged/Blocked/Needs Further Investigation]

### Current Understanding
[What is currently known about the issue]

### Attempted Approaches
1. [Approach 1 and results]
2. [Approach 2 and results]
- ...

### Partial Findings
[Any partial findings or clues discovered]

### Recommended Next Steps
1. [Recommended action 1]
2. [Recommended action 2]
- ...

### Alternative Approaches
[Suggestions for different approaches that might be more successful]
```

## Example Handoff Reports

### Example: Receiving Bug Report

```
## Bug Information Request

To effectively debug this issue, I need some additional information:

1. **Can you provide step-by-step instructions to reproduce the issue?**
   Based on your description, I understand that the user authentication fails intermittently, but I need specific steps to reliably reproduce it.

2. **What is the expected behavior?**
   I assume users should remain authenticated for the duration of their session, but please confirm.

3. **What environment(s) does this issue occur in?**
   Does this happen in development, staging, production, or all environments?

4. **How severe is this issue? Does it block critical functionality?**
   What is the impact on users and business operations?

5. **When did this issue first appear? Was it working correctly before?**
   Knowing when this started might help correlate with recent changes.

6. **Have any recent changes been made that might relate to this issue?**
   Any deployments, configuration changes, or third-party service updates?

7. **Have you attempted any solutions or workarounds?**
   What has been tried so far, and what were the results?

8. **Are there any error messages, logs, or screenshots available?**
   Server logs, client-side errors, or network request failures would be particularly helpful.

9. **Is there a deadline for resolving this issue?**
   Is this blocking a release or causing significant business impact?

10. **Is there any additional context I should know about?**
    Any patterns in when it occurs, affected user segments, or related functionality?
```

### Example: Solution Report

```
## Bug Resolution Report

**Bug Status**: Fixed

### Root Cause
The intermittent authentication failures were caused by a race condition in the token refresh mechanism. When multiple API requests occurred simultaneously as the auth token was expiring, some requests would attempt to refresh the token concurrently, leading to token invalidation.

Specifically, in `authService.js`, the token refresh function was not properly synchronized, allowing multiple refresh attempts to override each other's results. This was exacerbated by the fact that the token validation had a strict time check without any buffer period.

### Solution
I implemented the following changes to resolve the issue:

1. Added a mutex lock around the token refresh operation to prevent concurrent refresh attempts:
   ```javascript
   // Using a simple mutex implementation
   let refreshInProgress = false;
   let refreshPromise = null;

   async function refreshToken() {
     if (refreshInProgress) {
       return refreshPromise; // Return existing promise if refresh is in progress
     }
     
     refreshInProgress = true;
     refreshPromise = actualRefreshTokenImplementation()
       .finally(() => {
         refreshInProgress = false;
       });
     
     return refreshPromise;
   }
   ```

2. Added a 30-second buffer to token expiration checks to prevent edge cases:
   ```javascript
   // Before
   const isTokenExpired = token.expiresAt < Date.now();
   
   // After
   const EXPIRATION_BUFFER_MS = 30 * 1000; // 30 seconds
   const isTokenExpired = token.expiresAt < (Date.now() + EXPIRATION_BUFFER_MS);
   ```

3. Improved error handling for failed refresh attempts:
   ```javascript
   try {
     await refreshToken();
   } catch (error) {
     logger.error('Token refresh failed', error);
     // Clear invalid tokens and redirect to login
     authStore.clearTokens();
     router.push('/login');
   }
   ```

### Code Changes
Modified files:
- `src/services/authService.js`
- `src/store/authStore.js`
- `src/utils/apiClient.js`

Key changes were the addition of the mutex pattern for token refresh and the expiration buffer implementation.

### Testing
I verified the fix with the following tests:

1. **Concurrent API calls test**:
   Created a test that makes 10 simultaneous API calls as the token is about to expire, verifying that all calls complete successfully with a valid token.

2. **Edge case testing**:
   Tested with tokens very close to expiration (within seconds) to ensure the buffer works correctly.

3. **Error recovery test**:
   Simulated failed refresh attempts to verify proper error handling and recovery.

4. **Long-running session test**:
   Maintained an active session with periodic API calls for over 24 hours, crossing multiple token refresh cycles.

All tests passed successfully in both development and staging environments.

### Prevention
To prevent similar issues in the future, I recommend:

1. Implement a more robust state management pattern for authentication
2. Add comprehensive unit tests for token refresh scenarios
3. Add monitoring for authentication failures and token refresh attempts
4. Consider using a library specifically designed for token management
5. Add more detailed logging around authentication operations

### Follow-up
While this fix resolves the immediate issue, I recommend a follow-up task to refactor the authentication service for better maintainability. The current implementation has grown organically and would benefit from a more structured approach.
```

## Collaboration Guidelines

### 1. Maintaining Clear Communication
- Use precise technical language
- Avoid assumptions
- Confirm understanding
- Provide context for questions
- Use code snippets and examples

### 2. Setting Expectations
- Be clear about timelines
- Communicate blockers promptly
- Provide regular updates
- Be honest about limitations
- Explain technical constraints

### 3. Knowledge Transfer
- Explain root causes thoroughly
- Provide educational context
- Share debugging techniques
- Suggest best practices
- Recommend learning resources

### 4. Follow-up Support
- Offer to answer questions
- Provide additional context if needed
- Be available for implementation support
- Suggest verification approaches
- Offer to review related changes
