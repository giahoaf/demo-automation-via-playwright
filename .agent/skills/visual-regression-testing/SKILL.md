---
name: Visual Regression Testing
description: Techniques for detecting unintended visual changes using screenshot comparison in Playwright
---

# Visual Regression Testing

## Purpose

Visual regression testing helps catch unintended UI changes by comparing screenshots of the application against approved baselines. Playwright has built-in support for visual testing.

---

## Basic Visual Testing

### **Simple Screenshot Comparison:**

```javascript
test('Homepage should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // First run creates baseline
    // Subsequent runs compare against it
    await expect(page).toHaveScreenshot('homepage.png');
});
```

### **Component Screenshot:**

```javascript
test('Login form should match baseline', async ({ page }) => {
    await page.goto('/login');
    
    const loginForm = page.locator('.login-form');
    await expect(loginForm).toHaveScreenshot('login-form.png');
});
```

---

## Configuration

```javascript
// playwright.config.js
module.exports = {
    expect: {
        toHaveScreenshot: {
            maxDiffPixels: 100,  // Allow 100 pixels difference
            threshold: 0.2,       // 20% threshold
        },
    },
};
```

---

## Update Baselines

```bash
# Update all baselines
npx playwright test --update-snapshots

# Update specific test
npx playwright test login.spec.js --update-snapshots
```

---

## Best Practices

###  **1. Wait for Stability:**

```javascript
test('Visual test with stability', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to complete
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot();
});
```

### **2. Ignore Dynamic Content:**

```javascript
test('Homepage without timestamp', async ({ page }) => {
    await page.goto('/');
    
    // Hide timestamps before screenshot
    await page.locator('.timestamp').evaluate(el => el.style.visibility = 'hidden');
    
    await expect(page).toHaveScreenshot();
});
```

### **3. Mask Sensitive Data:**

```javascript
test('Profile with masked data', async ({ page }) => {
    await page.goto('/profile');
    
    await expect(page).toHaveScreenshot({
        mask: [page.locator('.email'), page.locator('.phone')],
    });
});
```

---

## Cross-Browser Visual Testing

```javascript
// Run same test on different browsers
test('Visual consistency across browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot(`homepage-${browserName}.png`);
});
```

---

## When to Use This Skill

Apply when implementing visual regression tests, updating visual baselines, or detecting unintended UI changes automatically.
