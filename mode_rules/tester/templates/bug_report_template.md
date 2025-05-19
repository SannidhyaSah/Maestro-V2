# Bug Report Template

## Bug Information

| Field | Value |
|-------|-------|
| **Bug ID** | [Unique identifier for the bug, e.g., BUG-001] |
| **Bug Title** | [Brief, descriptive title for the bug] |
| **Reported By** | [Name of the person who reported the bug] |
| **Reported Date** | [Date when the bug was reported] |
| **Assigned To** | [Name of the person assigned to fix the bug] |
| **Status** | [New, Assigned, In Progress, Fixed, Verified, Closed, Reopened] |
| **Environment** | [Environment where the bug was found, e.g., Dev, QA, Staging, Production] |
| **Version** | [Version of the application where the bug was found] |
| **Component/Module** | [Component or module where the bug was found] |
| **Related Test Case** | [Reference to the test case that found the bug, if applicable] |

## Bug Classification

| Field | Value |
|-------|-------|
| **Severity** | [Critical, Major, Minor, Cosmetic] |
| **Priority** | [High, Medium, Low] |
| **Type** | [Functional, UI/UX, Performance, Security, Compatibility, etc.] |
| **Reproducibility** | [Always, Sometimes, Rarely, Unable to Reproduce] |

## Bug Details

### Description
[Detailed description of the bug, including what is happening and what is expected to happen]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]
5. [Step 5]

### Expected Result
[What should happen when the steps are followed]

### Actual Result
[What actually happens when the steps are followed]

### Root Cause
[To be filled by the developer: What caused the bug]

### Fix Description
[To be filled by the developer: How the bug was fixed]

## Additional Information

### Screenshots/Videos
[Attach or link to screenshots or videos that demonstrate the bug]

### Logs/Error Messages
[Include any relevant logs or error messages]

### Additional Context
[Any additional information that might be helpful in understanding or fixing the bug]

### Workaround
[If available, describe any temporary workaround for the bug]

## Resolution

| Field | Value |
|-------|-------|
| **Fixed By** | [Name of the person who fixed the bug] |
| **Fixed Date** | [Date when the bug was fixed] |
| **Fixed in Version** | [Version where the fix will be/has been released] |
| **Verified By** | [Name of the person who verified the fix] |
| **Verification Date** | [Date when the fix was verified] |
| **Resolution** | [Fixed, Won't Fix, Duplicate, Not a Bug, Cannot Reproduce, Deferred] |
| **Resolution Comment** | [Additional comments about the resolution] |

## Related Items

### Related Bugs
[List of related bugs]
- [Bug ID 1]: [Bug Title]
- [Bug ID 2]: [Bug Title]

### Related Requirements
[List of requirements affected by this bug]
- [Requirement ID 1]: [Requirement Description]
- [Requirement ID 2]: [Requirement Description]

### Related Changes
[List of code changes, pull requests, or commits related to this bug]
- [Change ID 1]: [Change Description]
- [Change ID 2]: [Change Description]

---

# Bug Report Examples

## Example 1: Login Failure with Valid Credentials

### Bug Information

| Field | Value |
|-------|-------|
| **Bug ID** | BUG-AUTH-001 |
| **Bug Title** | Users unable to log in with valid credentials after password reset |
| **Reported By** | Jane Smith |
| **Reported Date** | 2023-06-22 |
| **Assigned To** | John Doe |
| **Status** | In Progress |
| **Environment** | QA |
| **Version** | v2.3.0 |
| **Component/Module** | Authentication |
| **Related Test Case** | TC-LOGIN-003 |

### Bug Classification

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Priority** | High |
| **Type** | Functional |
| **Reproducibility** | Always |

### Bug Details

#### Description
After a user resets their password, they are unable to log in to the application using their new password. The system shows an "Invalid credentials" error message even though the credentials are correct. This issue affects all users who have reset their passwords in the last 24 hours.

#### Steps to Reproduce
1. Navigate to the login page
2. Click on "Forgot Password" link
3. Enter a valid email address and submit the form
4. Receive password reset email and click the reset link
5. Set a new password following the password requirements
6. Navigate back to the login page
7. Enter the email address and the new password
8. Click the "Login" button

#### Expected Result
The user should be successfully authenticated and redirected to the dashboard.

#### Actual Result
The system displays an "Invalid credentials" error message and the user remains on the login page.

#### Root Cause
The password reset functionality is not properly updating the password hash in the database. Investigation revealed that the password is being stored in a temporary table but not being synchronized with the main user table.

#### Fix Description
Updated the password reset service to ensure the new password hash is properly stored in the main user table after validation. Added a transaction to ensure both tables are updated atomically.

### Additional Information

#### Screenshots/Videos
[Screenshot of error message: invalid_credentials_error.png]

#### Logs/Error Messages
```
2023-06-22 14:32:45 ERROR [AuthenticationService] User authentication failed for user@example.com: Password hash mismatch
2023-06-22 14:32:45 DEBUG [AuthenticationService] Stored hash: $2a$10$oldHash vs Provided hash: $2a$10$newHash
```

#### Additional Context
This issue was introduced in the v2.3.0 release when the password reset functionality was refactored to use a new security module.

#### Workaround
Users can contact support to manually update their password in the database until the fix is deployed.

### Resolution

| Field | Value |
|-------|-------|
| **Fixed By** | John Doe |
| **Fixed Date** | 2023-06-23 |
| **Fixed in Version** | v2.3.1 |
| **Verified By** | Jane Smith |
| **Verification Date** | 2023-06-24 |
| **Resolution** | Fixed |
| **Resolution Comment** | Fix was verified in QA environment. All affected users can now log in with their new passwords. |

### Related Items

#### Related Bugs
- BUG-AUTH-002: Password reset emails are delayed by up to 10 minutes

#### Related Requirements
- REQ-AUTH-005: Users must be able to reset their password via email

#### Related Changes
- PR-235: Fix password reset synchronization issue
- COMMIT-abc123: Update PasswordResetService to properly update main user table

## Example 2: Product Images Not Loading on Mobile Devices

### Bug Information

| Field | Value |
|-------|-------|
| **Bug ID** | BUG-UI-042 |
| **Bug Title** | Product images fail to load on mobile devices with iOS 15 |
| **Reported By** | Alex Johnson |
| **Reported Date** | 2023-06-20 |
| **Assigned To** | Sarah Williams |
| **Status** | Fixed |
| **Environment** | Production |
| **Version** | v3.1.2 |
| **Component/Module** | Product Catalog |
| **Related Test Case** | TC-MOBILE-015 |

### Bug Classification

| Field | Value |
|-------|-------|
| **Severity** | Major |
| **Priority** | High |
| **Type** | Compatibility |
| **Reproducibility** | Always |

### Bug Details

#### Description
Product images are not loading on mobile devices running iOS 15. Instead, a broken image icon is displayed. This issue affects all product listing and detail pages. The issue does not occur on Android devices or iOS 14 and earlier.

#### Steps to Reproduce
1. Open the application on an iPhone or iPad running iOS 15
2. Navigate to any product listing page
3. Observe the product images

#### Expected Result
Product images should load and display correctly.

#### Actual Result
Product images show a broken image icon. In the browser console, there are CORS (Cross-Origin Resource Sharing) errors.

#### Root Cause
The CDN configuration for image hosting was updated in the last deployment, but the CORS headers were not properly configured to allow requests from mobile browsers on iOS 15.

#### Fix Description
Updated the CDN configuration to include proper CORS headers for all origins. Added specific headers required by iOS 15 browsers.

### Additional Information

#### Screenshots/Videos
[Screenshot of broken images: ios15_broken_images.png]

#### Logs/Error Messages
```
Failed to load resource: Origin 'https://app.example.com' is not allowed by Access-Control-Allow-Origin.
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at 'https://cdn.example.com/images/product123.jpg'.
```

#### Additional Context
This issue coincided with the CDN provider migration that was completed on June 18, 2023.

#### Workaround
Users can view the website in desktop mode as a temporary workaround.

### Resolution

| Field | Value |
|-------|-------|
| **Fixed By** | Sarah Williams |
| **Fixed Date** | 2023-06-21 |
| **Fixed in Version** | v3.1.3 |
| **Verified By** | Alex Johnson |
| **Verification Date** | 2023-06-22 |
| **Resolution** | Fixed |
| **Resolution Comment** | CDN configuration was updated and verified across multiple iOS 15 devices. Images are now loading correctly. |

### Related Items

#### Related Bugs
- BUG-UI-043: Slow image loading on product detail pages

#### Related Requirements
- REQ-UI-012: Product images must be displayed on all supported devices and browsers

#### Related Changes
- PR-302: Update CDN configuration for iOS 15 compatibility
- COMMIT-def456: Add required CORS headers for image CDN
