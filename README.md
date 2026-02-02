# Playwright Automation Template

A professional, reusable Playwright automation testing framework with built-in best practices and AI-powered skill guidelines.

---

## 🚀 Quick Start

### 1. Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 2. Setup New Project

```bash
# Copy this template to your project directory
cp -r D:\Playwright-Automation-Template path/to/your-project

# Navigate to your project
cd path/to/your-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 3. Configure for Your Application

Edit `playwright.config.js`:

```javascript
use: {
    baseURL: 'https://your-app.com',  // Change to your app URL
    // ...
}
```

### 4. Write Your First Test

Create a new test file in `tests/` following the example in `tests/example.spec.js`.

### 5. Run Tests

```bash
# Run all tests
npx playwright test

# Run in UI mode (recommended)
npx playwright test --ui

# Run specific test file
npx playwright test tests/your-test.spec.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📁 Project Structure

```
Playwright-Automation-Template/
├── .agent/
│   └── skills/
│       └── playwright-testing/
│           └── SKILL.md           # AI Agent guidelines
├── tests/
│   └── example.spec.js            # Template test file
├── screenshots/
│   ├── functional/                # Feature test screenshots
│   ├── responsive/                # Mobile/tablet screenshots
│   ├── visual/                    # Visual regression screenshots
│   └── debug/                     # Debug/error screenshots
├── playwright.config.js           # Playwright configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## 🎯 Writing Tests - The 5-Step Structure

Every test should follow this structure:

```javascript
test('Should do something', async ({ page }) => {
    // 1. Setup - Navigate to page
    await page.goto('https://your-app.com/');
    await page.waitForLoadState('networkidle');
    
    // 2. Action - Perform user actions
    await page.getByRole('button', { name: 'Click me' }).click();
    
    // 3. Assert - Verify results
    await expect(page.getByText('Success')).toBeVisible();
    
    // 4. Screenshot - Capture evidence (optional)
    await page.screenshot({
        path: 'screenshots/functional/test-name.png',
        fullPage: true
    });
    
    // 5. Log - Output status
    console.log('✅ Test completed successfully');
});
```

---

## 🔑 Key Principles

### **1. Selector Priority (Use in this order):**

```javascript
// 🥇 BEST - Accessible selectors
page.getByRole('button', { name: 'Login' })
page.getByLabel('Email')
page.getByPlaceholder('Enter email')

// 🥈 GOOD - Text-based selectors
page.getByText('Submit', { exact: true })

// 🥉 OK - Test IDs
page.getByTestId('submit-button')

// ⚠️ AVOID - CSS/XPath
page.locator('.btn-primary')  // Fragile
```

### **2. Wait Strategies:**

```javascript
// ✅ GOOD
await page.waitForLoadState('networkidle');
await page.getByRole('button').waitFor();

// ⚠️ USE SPARINGLY (animations only)
await page.waitForTimeout(500);

// ❌ AVOID
await page.waitForTimeout(5000);  // Too long
```

### **3. Assertions:**

```javascript
// ✅ GOOD - Specific
await expect(page.getByRole('button')).toBeVisible();
expect(buttonText).toContain('Submit');

// ❌ BAD - Vague
expect(true).toBe(true);
```

---

## 📸 Screenshot Organization

Save screenshots in organized folders:

- `screenshots/functional/` - Feature functionality tests
- `screenshots/responsive/` - Mobile/tablet/desktop layouts
- `screenshots/visual/` - Visual regression tests
- `screenshots/debug/` - Error cases and debugging

**Example:**
```javascript
await page.screenshot({
    path: 'screenshots/functional/login-success.png',
    fullPage: true
});
```

---

## 🤖 AI Agent Integration

This template includes an **AI Skill** (`SKILL.md`) that provides:

- Automated best practice enforcement
- Consistent code style across tests
- Built-in debugging patterns
- Common test patterns

The AI Agent will automatically apply these guidelines when you:
- Write new tests
- Debug failing tests
- Review test code
- Refactor existing tests

---

## 📚 Additional Resources

### View the Skill Guidelines:
```bash
cat .agent/skills/playwright-testing/SKILL.md
```

### Playwright Documentation:
- [Playwright Official Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

---

## ✅ Pre-Commit Checklist

Before committing tests, ensure:

- [ ] Used semantic selectors (`getByRole`, `getByText`)
- [ ] Added proper waits (`waitForLoadState`)
- [ ] Included meaningful assertions
- [ ] Added screenshots for visual tests
- [ ] Added console logs for debugging
- [ ] Tested on multiple viewports (if applicable)
- [ ] No hardcoded waits > 1000ms
- [ ] Test names are descriptive
- [ ] Followed 5-step structure

---

## 🛠️ Troubleshooting

### Common Issues:

| Issue | Solution |
|-------|----------|
| **Strict mode violation** | Use exact selectors: `getByText(text, {exact: true})` |
| **Element not found** | Add `waitForLoadState('networkidle')` |
| **Flaky tests** | Avoid fixed timeouts, use `waitFor()` |
| **Screenshots not saving** | Check folder exists and path is correct |

---

## 📝 Next Steps

1. ✅ Update `playwright.config.js` with your app URL
2. ✅ Write your first test based on `example.spec.js`
3. ✅ Run tests: `npx playwright test --ui`
4. ✅ Review test results and screenshots
5. ✅ Commit and share with your team!

---

## 🎉 Happy Testing!

For questions or contributions, refer to the `SKILL.md` file or Playwright documentation.
