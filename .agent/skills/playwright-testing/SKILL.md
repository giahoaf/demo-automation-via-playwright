---
name: Playwright Testing Best Practices
description: Universal standards for writing, debugging, and reviewing Playwright automation tests in any web testing project
---

# Playwright Testing Best Practices

## Purpose

This skill provides universal guidelines and best practices for writing automated tests using Playwright. It ensures consistency, maintainability, and reliability across all test files in any web testing project.

---

## Core Principles

### 1. **Selector Priority**

Always use selectors in this order of preference:

```javascript
// 🥇 BEST - Accessible selectors
page.getByRole('button', { name: 'Login' })
page.getByLabel('Email')
page.getByPlaceholder('Enter your email')

// 🥈 GOOD - Text-based selectors
page.getByText('Tiếng Việt', { exact: true })
page.getByTitle('Settings')

// 🥉 OK - Test IDs
page.getByTestId('submit-button')

// ⚠️ AVOID - CSS selectors (brittle)
page.locator('.btn-primary')
page.locator('#login-form')

// ❌ NEVER - XPath
page.locator('//button[@class="submit"]')
```

### 2. **Wait Strategies**

```javascript
// ✅ GOOD - Wait for network to be idle
await page.waitForLoadState('networkidle');

// ✅ GOOD - Wait for specific element
await page.getByRole('button', { name: 'Submit' }).waitFor();

// ⚠️ USE SPARINGLY - Fixed timeouts (only for animations)
await page.waitForTimeout(500); // Only for dropdowns, animations

// ❌ AVOID - Long fixed waits
await page.waitForTimeout(5000); // Too long, use proper waits
```

### 3. **Test Structure**

Every test file should follow this structure:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Name Tests', () => {
    
    test('Should do something specific', async ({ page }) => {
        // 1. Setup - Navigate to page
        await page.goto('https://spec2s.ai/');
        await page.waitForLoadState('networkidle');
        
        // 2. Action - Perform user actions
        await page.getByRole('button', { name: 'Click me' }).click();
        
        // 3. Assert - Verify results
        await expect(page.getByText('Success')).toBeVisible();
        
        // 4. Screenshot (for visual tests)
        await page.screenshot({
            path: 'screenshots/feature/test-name.png',
            fullPage: true
        });
        
        // 5. Log (for debugging)
        console.log('✅ Test completed successfully');
    });
    
});
```

---

## Project-Specific Examples (Optional)

The following are example patterns from a real project. You can adapt these for your own project's specific needs.

### **Language Switching Tests**

When testing i18n features:

```javascript
// ✅ CORRECT - Flexible selector for language button
await page.getByRole('button').filter({ hasText: /EN|VN|JP/ }).first().click();

// ✅ CORRECT - Exact text match for language options
await page.getByText('Tiếng Việt').click();

// ✅ CORRECT - Navigate up parent levels correctly
const button = page.getByText('English').locator('../..'); // span → div → button
```

### **Screenshot Naming**

```javascript
// ✅ GOOD - Descriptive, organized
'screenshots/i18n/vietnamese.png'
'screenshots/functional/login-success.png'
'screenshots/responsive/mobile-homepage.png'

// ❌ BAD - Generic names
'screenshot1.png'
'test.png'
```

### **Assertions**

```javascript
// ✅ GOOD - Specific assertions
expect(buttonText).toContain('VN');
await expect(page.getByRole('button')).toBeVisible();
await expect(page.locator('svg.lucide-check')).toBeVisible();

// ❌ BAD - Vague assertions
expect(true).toBe(true);
```

---

## Common Patterns

### **Pattern 1: Dropdown Interaction**

```javascript
// Open dropdown
await page.getByRole('button').filter({ hasText: /EN|VN|JP/ }).first().click();
await page.waitForTimeout(500); // Wait for dropdown animation

// Select option
await page.getByText('Tiếng Việt').click();
await page.waitForTimeout(500); // Wait for selection to apply
```

### **Pattern 2: Mobile Testing**

```javascript
test('Should work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('https://spec2s.ai/');
    
    // Your test logic...
    
    // Mobile-specific screenshot
    await page.screenshot({
        path: 'screenshots/mobile/feature-name.png',
        fullPage: true
    });
});
```

### **Pattern 3: Persistence Testing**

```javascript
// Check localStorage
const savedValue = await page.evaluate(() => {
    return localStorage.getItem('language') || 
           localStorage.getItem('lang');
});

console.log('💾 Saved value:', savedValue);
expect(savedValue).toMatch(/vi|vn/i);
```

---

## Error Handling

### **Debugging Failed Tests**

```javascript
// Add screenshot on failure
test('My test', async ({ page }) => {
    try {
        // Test logic...
    } catch (error) {
        await page.screenshot({ path: 'screenshots/debug/failure.png' });
        throw error;
    }
});

// Log element count for strict mode violations
const count = await page.locator('span:has-text("EN")').count();
console.log('Found', count, 'elements'); // Should be 1
```

### **Common Issues**

| Issue | Solution |
|-------|----------|
| Strict mode violation | Use exact selectors: `text-is()` or `getByText(text, {exact: true})` |
| Element not found | Add proper waits: `waitForLoadState('networkidle')` |
| Checkmark not visible | Navigate up correct parent levels: `locator('../..')` |
| Flaky tests | Avoid fixed timeouts, use `waitFor()` instead |

---

## Test Organization

```
automation-tests/
├── tests/
│   ├── spec2s-homepage.spec.js      # Homepage tests
│   ├── language-persistence.spec.js  # i18n tests
│   └── [feature].spec.js            # Feature-specific tests
├── screenshots/
│   ├── functional/
│   ├── responsive/
│   ├── i18n/
│   └── visual/
└── playwright.config.js
```

---

## Checklist Before Committing Tests

- [ ] Used semantic selectors (`getByRole`, `getByText`)
- [ ] Added proper waits (`waitForLoadState`, not fixed timeouts)
- [ ] Included assertions with meaningful messages
- [ ] Added screenshots for visual verification
- [ ] Added console logs for debugging
- [ ] Tested on multiple viewports (if applicable)
- [ ] No hardcoded waits > 1000ms
- [ ] Test names are descriptive
- [ ] Screenshots saved in correct folders

---

## Examples

Apply these patterns to your test files following the recommended structure:
- Homepage/landing page test suites
- Feature-specific test suites
- Integration and end-to-end tests

---

## When to Use This Skill

The AI Agent should apply this skill when:
- Writing new Playwright test files
- Debugging or fixing failing tests
- Reviewing test code for quality and best practices
- Refactoring existing test suites
- Adding new test scenarios or test cases
- Answering questions about Playwright testing patterns

The AI will automatically follow these guidelines when you request any Playwright automation testing work.
