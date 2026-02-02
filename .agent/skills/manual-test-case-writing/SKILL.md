---
name: Manual Test Case Writing
description: Standards for writing clear, comprehensive manual test cases that serve as the foundation for automation testing
---

# Manual Test Case Writing

## Purpose

This skill provides guidelines for writing high-quality manual test cases that are clear, comprehensive, and serve as a solid foundation for automation. Well-written manual test cases make automation easier and ensure complete test coverage.

---

## Test Case Structure

Every test case should follow this standard format:

### **Required Fields:**

```markdown
**Test ID:** TC_[FEATURE]_[NUMBER]
**Title:** [Action] [Expected Outcome]
**Feature/Module:** [Feature Name]
**Priority:** Critical | High | Medium | Low
**Type:** Functional | Regression | Smoke | Integration | UAT

**Preconditions:**
- [State that must exist before test]
- [Required data or setup]

**Test Steps:**
1. [Action to perform]
2. [Action to perform]
3. [Action to perform]

**Expected Result:**
[What should happen after all steps]

**Test Data:**
- Input 1: [value]
- Input 2: [value]

**Postconditions:**
- [State after test execution]
- [Cleanup required]
```

### **Example:**

```markdown
**Test ID:** TC_LOGIN_001
**Title:** Verify successful login with valid credentials
**Feature/Module:** Authentication
**Priority:** Critical
**Type:** Smoke, Regression

**Preconditions:**
- User account exists in database
- User email: test@example.com
- User password: Test123!@#

**Test Steps:**
1. Navigate to login page (https://app.com/login)
2. Enter email address in "Email" field
3. Enter password in "Password" field
4. Click "Login" button

**Expected Result:**
- User is redirected to dashboard page
- Welcome message displays user's name
- Session token is created
- "Logout" button is visible

**Test Data:**
- Email: test@example.com
- Password: Test123!@#

**Postconditions:**
- User session is active
- User can access protected pages
```

---

## Test Coverage Guidelines

### **1. Happy Path (Positive Scenarios)**

Test the intended use case with valid inputs:
- ✅ Valid credentials login
- ✅ Successful form submission
- ✅ Normal user flow

### **2. Negative Scenarios**

Test with invalid inputs or conditions:
- ✅ Invalid email format
- ✅ Wrong password
- ✅ Empty required fields
- ✅ Special characters in input

### **3. Boundary Conditions**

Test limits and edge cases:
- ✅  Minimum/maximum length inputs
- ✅ First/last items in list
- ✅ Exactly at limit values

### **4. Error Handling**

Test system behavior under error conditions:
- ✅ Network timeout
- ✅ Server errors
- ✅ Invalid responses

---

## Test Case Categories

### **Smoke Tests**
Critical functionality that must work for basic app usage:
- Login/Logout
- Core navigation
- Critical transactions

### **Regression Tests**
Tests run after changes to ensure nothing broke:
- All existing features
- Integration points
- Previously fixed bugs

### **Integration Tests**
Tests that verify multiple components work together:
- Login → Dashboard → Feature
- Form submission → Email notification
- Payment → Order confirmation

---

## When to Automate

Use these criteria to decide which test cases to automate:

### **✅ SHOULD Automate:**
- Regression tests (run frequently)
- Smoke tests (run on every build)
- Data-driven tests (many variations)
- Repetitive tests
- Stable features (not changing often)
- CI/CD pipeline tests

### **❌ DON'T Automate:**
- Exploratory testing
- One-time tests
- Constantly changing features
- Complex UI validation requiring human judgment
- Tests requiring physical devices (unless necessary)
- Tests with ROI too low

---

## Test Case Organization

### **Folder Structure:**

```
test-cases/
├── functional/
│   ├── login/
│   │   ├── TC_LOGIN_001.md
│   │   ├── TC_LOGIN_002.md
│   │   └── TC_LOGIN_003.md
│   ├── search/
│   └── checkout/
├── regression/
├── smoke/
└── integration/
```

### **Naming Convention:**

Format: `TC_[FEATURE]_[NUMBER]`

Examples:
- `TC_LOGIN_001` - First login test
- `TC_SEARCH_015` - 15th search test
- `TC_CHECKOUT_005` - 5th checkout test

---

## Traceability Matrix

Link manual test cases to automation:

| Manual TC ID | TC Name | Automated? | Automation File | Status |
|--------------|---------|------------|-----------------|--------|
| TC_LOGIN_001 | Valid login | ✅ Yes | login.spec.js | ✅ Pass |
| TC_LOGIN_002 | Invalid email | ✅ Yes | login.spec.js | ✅ Pass |
| TC_LOGIN_003 | Empty password | ⏳ Pending | - | - |
| TC_LOGIN_004 | Forgot password | 🚫 Manual only | - | - |

---

## Best Practices

### **1. Be Specific**
❌ **Bad:** "Click the button"
✅ **Good:** "Click the 'Submit' button in the bottom-right corner"

### **2. One Objective Per Test**
❌ **Bad:** Test login AND profile update in one test
✅ **Good:** Separate tests for login and profile update

### **3. Independent Tests**
✅ Each test should work standalone
✅ Don't rely on previous test results
✅ Set up required state in preconditions

### **4. Clear Expected Results**
❌ **Bad:** "Page should load"
✅ **Good:** "Dashboard page loads within 3 seconds showing welcome message"

### **5. Include Test Data**
✅ Document exact values to use
✅ Include edge cases
✅ Note special characters if relevant

---

## Common Patterns

### **Form Submission Test:**
```markdown
**Test ID:** TC_FORM_001
**Title:** Verify contact form submission with valid data

**Test Steps:**
1. Navigate to contact page
2. Fill "Name" field with "John Doe"
3. Fill "Email" field with "john@example.com"
4. Fill "Message" field with "Test message"
5. Click "Send" button

**Expected Result:**
- Success message displays: "Thank you! We'll contact you soon"
- Form fields are cleared
- Confirmation email sent to john@example.com
```

### **Search Functionality:**
```markdown
**Test ID:** TC_SEARCH_001
**Title:** Verify search returns relevant results

**Test Steps:**
1. Navigate to homepage
2. Enter "laptop" in search box
3. Click "Search" or press Enter

**Expected Result:**
- Results page shows products containing "laptop"
- Results count is displayed
- Each result has image, title, and price
- Results are sorted by relevance
```

---

## Checklist Before Approving Test Cases

- [ ] Test ID follows naming convention
- [ ] Title is clear and descriptive
- [ ] Priority and type are assigned
- [ ] Preconditions are documented
- [ ] Test steps are numbered and specific
- [ ] Expected results are clear and measurable
- [ ] Test data is provided
- [ ] Postconditions documented (if any)
- [ ] Covers both positive and negative scenarios
- [ ] Can be automated (if needed)

---

## When to Use This Skill

The AI Agent should apply this skill when:
- Writing new manual test cases
- Reviewing test case quality
- Designing test scenarios for a feature
- Creating test coverage documentation
- Determining which tests to automate
- Organizing test case repositories

The AI will automatically follow these guidelines when you request test case creation or review.
