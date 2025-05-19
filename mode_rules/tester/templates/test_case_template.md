# Test Case Template

## Test Case Information

| Field | Value |
|-------|-------|
| **Test Case ID** | [Unique identifier for the test case, e.g., TC-001] |
| **Test Case Title** | [Brief, descriptive title for the test case] |
| **Feature/Module** | [Feature or module being tested] |
| **Created By** | [Name of the person who created the test case] |
| **Creation Date** | [Date when the test case was created] |
| **Updated By** | [Name of the person who last updated the test case] |
| **Last Update Date** | [Date when the test case was last updated] |
| **Version** | [Version number of the test case] |

## Test Case Details

### Test Objective
[Clear statement of what the test case is intended to verify]

### Preconditions
[List of conditions that must be met before the test case can be executed]
- [Precondition 1]
- [Precondition 2]
- [Precondition 3]

### Test Data
[Data required for test execution]
- [Test Data Item 1]: [Value]
- [Test Data Item 2]: [Value]
- [Test Data Item 3]: [Value]

### Dependencies
[List of dependencies on other test cases, features, or components]
- [Dependency 1]
- [Dependency 2]

## Test Execution

### Test Steps
[Detailed, step-by-step instructions for executing the test]

| Step # | Action | Expected Result | Actual Result | Status | Comments |
|--------|--------|-----------------|---------------|--------|----------|
| 1 | [Action to be performed] | [Expected outcome] | [To be filled during execution] | [Pass/Fail/Blocked/Not Executed] | [Optional comments] |
| 2 | [Action to be performed] | [Expected outcome] | [To be filled during execution] | [Pass/Fail/Blocked/Not Executed] | [Optional comments] |
| 3 | [Action to be performed] | [Expected outcome] | [To be filled during execution] | [Pass/Fail/Blocked/Not Executed] | [Optional comments] |
| 4 | [Action to be performed] | [Expected outcome] | [To be filled during execution] | [Pass/Fail/Blocked/Not Executed] | [Optional comments] |
| 5 | [Action to be performed] | [Expected outcome] | [To be filled during execution] | [Pass/Fail/Blocked/Not Executed] | [Optional comments] |

### Postconditions
[State of the system after the test has been executed]
- [Postcondition 1]
- [Postcondition 2]
- [Postcondition 3]

## Test Metadata

### Test Type
[Type of test: Functional, Performance, Security, Usability, etc.]

### Test Level
[Level of testing: Unit, Integration, System, Acceptance]

### Test Priority
[Priority of the test case: Critical, High, Medium, Low]

### Test Execution Type
[Manual, Automated, or Both]

### Automation Status
[If applicable: Not Automated, In Progress, Automated]

### Automation Script Reference
[If applicable: Reference to the automation script]

### Requirements Traceability
[References to requirements or user stories covered by this test case]
- [Requirement ID 1]: [Requirement Description]
- [Requirement ID 2]: [Requirement Description]

## Test Execution History

| Execution Date | Executed By | Environment | Version Tested | Status | Defects Found | Comments |
|----------------|-------------|-------------|----------------|--------|---------------|----------|
| [Date] | [Name] | [Environment] | [Version] | [Status] | [Defect IDs] | [Comments] |

## Additional Information

### Attachments
[List of attachments, such as screenshots, data files, etc.]
- [Attachment 1]
- [Attachment 2]

### Notes and Assumptions
[Any additional notes, assumptions, or special considerations]

### Review Comments
[Comments from the review of the test case]

---

# Test Case Examples

## Example 1: User Login Functionality

### Test Case Information

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-LOGIN-001 |
| **Test Case Title** | Successful User Login with Valid Credentials |
| **Feature/Module** | User Authentication |
| **Created By** | Jane Smith |
| **Creation Date** | 2023-06-15 |
| **Updated By** | John Doe |
| **Last Update Date** | 2023-06-20 |
| **Version** | 1.1 |

### Test Case Details

#### Test Objective
Verify that a user can successfully log in to the application using valid credentials.

#### Preconditions
- The application is accessible and the login page is displayed
- A user account exists in the system with the following credentials:
  - Username: testuser@example.com
  - Password: Password123!

#### Test Data
- Username: testuser@example.com
- Password: Password123!

#### Dependencies
- User registration functionality is working correctly

### Test Execution

#### Test Steps

| Step # | Action | Expected Result | Actual Result | Status | Comments |
|--------|--------|-----------------|---------------|--------|----------|
| 1 | Navigate to the login page | The login page is displayed with username and password fields, and a login button | | | |
| 2 | Enter valid username "testuser@example.com" in the username field | Username is entered in the field | | | |
| 3 | Enter valid password "Password123!" in the password field | Password is entered in the field and masked | | | |
| 4 | Click the "Login" button | User is successfully authenticated and redirected to the dashboard | | | |
| 5 | Verify user information on the dashboard | Dashboard displays the correct user information and personalized content | | | |

#### Postconditions
- User is logged in to the application
- User session is created
- User's last login timestamp is updated in the database

### Test Metadata

#### Test Type
Functional

#### Test Level
System

#### Test Priority
Critical

#### Test Execution Type
Both (Manual and Automated)

#### Automation Status
Automated

#### Automation Script Reference
/tests/authentication/login_tests.js

#### Requirements Traceability
- REQ-AUTH-001: Users must be able to log in using their email and password
- REQ-AUTH-002: System must validate user credentials against the database

## Example 2: Product Search Functionality

### Test Case Information

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-SEARCH-001 |
| **Test Case Title** | Search Products by Keyword |
| **Feature/Module** | Product Search |
| **Created By** | Alex Johnson |
| **Creation Date** | 2023-06-18 |
| **Updated By** | Alex Johnson |
| **Last Update Date** | 2023-06-18 |
| **Version** | 1.0 |

### Test Case Details

#### Test Objective
Verify that users can search for products using keywords and receive relevant results.

#### Preconditions
- The application is accessible and the user is on the product search page
- The product database contains the following products:
  - "Wireless Bluetooth Headphones" (Category: Electronics)
  - "Bluetooth Speaker" (Category: Electronics)
  - "Wired Headphones" (Category: Electronics)
  - "Wireless Mouse" (Category: Computer Accessories)

#### Test Data
- Search keyword: "Bluetooth"

#### Dependencies
- Product catalog functionality is working correctly

### Test Execution

#### Test Steps

| Step # | Action | Expected Result | Actual Result | Status | Comments |
|--------|--------|-----------------|---------------|--------|----------|
| 1 | Navigate to the product search page | The search page is displayed with a search input field and search button | | | |
| 2 | Enter "Bluetooth" in the search field | "Bluetooth" is entered in the field | | | |
| 3 | Click the "Search" button | Search results are displayed | | | |
| 4 | Verify the search results | The search results include "Wireless Bluetooth Headphones" and "Bluetooth Speaker" | | | |
| 5 | Verify the result count | The result count shows 2 products found | | | |
| 6 | Verify that irrelevant products are not displayed | "Wired Headphones" and "Wireless Mouse" are not in the search results | | | |

#### Postconditions
- Search results are displayed to the user
- Search term is saved in the recent searches (if this feature exists)

### Test Metadata

#### Test Type
Functional

#### Test Level
System

#### Test Priority
High

#### Test Execution Type
Both (Manual and Automated)

#### Automation Status
Automated

#### Automation Script Reference
/tests/search/product_search_tests.js

#### Requirements Traceability
- REQ-SEARCH-001: Users must be able to search for products using keywords
- REQ-SEARCH-002: Search results must display relevant products based on the search term
