---
name: Page Object Model (POM)
description: Architectural pattern for organizing Playwright automation code using Page Objects for better maintainability and reusability
---

# Page Object Model (POM) for Playwright

## Purpose

The Page Object Model is a design pattern that creates an object repository for web UI elements. It helps reduce code duplication, improves test maintenance, and makes tests more readable by separating page structure from test logic.

---

## Core Concepts

###  **What is a Page Object?**

A Page Object is a class that represents a web page or a component. It encapsulates:
- **Locators** - How to find elements
- **Actions** - What you can do on the page
- **Assertions** - What you can verify

###  **Benefits:**

✅ **Single Source of Truth** - Update selector once, affects all tests
✅ **Reusability** - Same page methods used in multiple tests
✅ **Readability** - Tests read like business scenarios
✅ **Maintainability** - Easy to update when UI changes

---

## Basic Structure

### **Page Object Class:**

```javascript
// pages/LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        
        // Locators
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.error-message');
    }
    
    // Actions
    async goto() {
        await this.page.goto('/login');
    }
    
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { LoginPage };
```

### **Using in Tests:**

```javascript
// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('test@example.com', 'Pass123');
    
    await expect(page).toHaveURL(/.*dashboard/);
});
```

---

## Folder Structure

```
project/
├── pages/
│   ├── BasePage.js              # Common page methods
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── ProductPage.js
│   └── components/
│       ├── Header.js            # Reusable components
│       └── Footer.js
├── tests/
│   ├── login.spec.js
│   ├── product.spec.js
│   └── checkout.spec.js
└── fixtures/
    └── pages.js                 # Page fixtures
```

---

## Best Practices

### **1. One Page Object Per Page/Component**

```javascript
// ✅ GOOD - Separate page objects
pages/LoginPage.js
pages/DashboardPage.js
pages/components/Navigation.js

// ❌ BAD - Everything in one file
pages/AllPages.js
```

### **2. Methods Return Page Objects (Fluent Interface)**

```javascript
// ✅ GOOD - Chainable
class LoginPage {
    async enterEmail(email) {
        await this.emailInput.fill(email);
        return this;  // Return this for chaining
    }
    
    async enterPassword(password) {
        await this.passwordInput.fill(password);
        return this;
    }
}

// Usage
await loginPage
    .enterEmail('test@example.com')
    .enterPassword('Pass123');
```

### **3. Keep Assertions in Tests, Not Page Objects**

```javascript
// ❌ BAD - Assertion in page object
class LoginPage {
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.page).toHaveURL('/dashboard'); // ❌
    }
}

// ✅ GOOD - Assertion in test
class LoginPage {
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

// Test
await loginPage.login('test@example.com', 'Pass123');
await expect(page).toHaveURL('/dashboard'); // ✅
```

### **4. Use Descriptive Method Names**

```javascript
// ❌ BAD
await loginPage.click();

// ✅ GOOD
await loginPage.clickLoginButton();
await loginPage.submitLoginForm();
```

---

## Advanced Patterns

### **1. Base Page Class**

```javascript
// pages/BasePage.js
class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    async goto(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }
    
    async waitForElement(locator) {
        await locator.waitFor({ state: 'visible' });
    }
    
    async screenshot(name) {
        await this.page.screenshot({ 
            path: `screenshots/${name}.png`,
            fullPage: true 
        });
    }
}

module.exports = { BasePage };
```

```javascript
// pages/LoginPage.js
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = page.getByLabel('Email');
        // ...
    }
    
    async goto() {
        await super.goto('/login');
    }
}
```

### **2. Component Objects**

```javascript
// pages/components/Header.js
class Header {
    constructor(page) {
        this.page = page;
        this.logo = page.locator('.logo');
        this.userMenu = page.locator('.user-menu');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }
    
    async logout() {
        await this.userMenu.click();
        await this.logoutButton.click();
    }
}

module.exports = { Header };
```

```javascript
// pages/DashboardPage.js
const { Header } = require('./components/Header');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page);  // Compose component
    }
    
    async logout() {
        await this.header.logout();
    }
}
```

### **3. Page Fixtures (Playwright-Specific)**

```javascript
// fixtures/pages.js
const { test as base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

exports.test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
});

exports.expect = base.expect;
```

```javascript
// tests/login.spec.js
const { test, expect } = require('../fixtures/pages');

test('Should login', async ({ loginPage }) => {
    // loginPage is automatically created!
    await loginPage.goto();
    await loginPage.login('test@example.com', 'Pass123');
});
```

---

## Complete Example

### **Page Object:**

```javascript
// pages/CheckoutPage.js
class CheckoutPage {
    constructor(page) {
        this.page = page;
        
        // Locators
        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.addressInput = page.getByLabel('Address');
        this.cardNumberInput = page.getByLabel('Card Number');
        this.submitButton = page.getByRole('button', { name: 'Complete Purchase' });
        this.confirmationMessage = page.locator('.confirmation');
    }
    
    async goto() {
        await this.page.goto('/checkout');
    }
    
    async fillShippingInfo(firstName, lastName, address) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
    }
    
    async fillPaymentInfo(cardNumber) {
        await this.cardNumberInput.fill(cardNumber);
    }
    
    async submitOrder() {
        await this.submitButton.click();
    }
    
    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }
}

module.exports = { CheckoutPage };
```

### **Test Using Page Object:**

```javascript
// tests/checkout.spec.js
const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Should complete checkout successfully', async ({ page }) => {
    // 1. Setup
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    
    // 2. Action - Readable business logic!
    await checkoutPage.fillShippingInfo('John', 'Doe', '123 Main St');
    await checkoutPage.fillPaymentInfo('4111111111111111');
    await checkoutPage.submitOrder();
    
    // 3. Assert
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toContain('Order confirmed');
});
```

---

## Migration Guide

### **Before (Without POM):**

```javascript
test('Login test', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Pass123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard');
});
```

### **After (With POM):**

```javascript
test('Login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('test@example.com', 'Pass123');
    await expect(page).toHaveURL('/dashboard');
});
```

**Benefits:**
- If email selector changes, update LoginPage once
- `login()` method reused in 20+ tests
- Test intent is clearer

---

## Common Patterns

### **Pattern 1: Navigation Methods Return New Page**

```javascript
class LoginPage {
    async loginAndNavigateToDashboard(email, password) {
        await this.login(email, password);
        return new DashboardPage(this.page);
    }
}

// Usage
const dashboardPage = await loginPage.loginAndNavigateToDashboard(...);
await dashboardPage.clickMenuItem('Settings');
```

### **Pattern 2: Wait for Page Load**

```javascript
class ProductPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator('h1.product-title');
    }
    
    async waitForLoad() {
        await this.productTitle.waitFor();
    }
}

// Usage
const productPage = new ProductPage(page);
await productPage.goto();
await productPage.waitForLoad();
```

---

## Checklist

- [ ] One class per page or component
- [ ] Locators defined in constructor
- [ ] Methods represent user actions
- [ ] No  assertions in page objects (keep in tests)
- [ ] Methods return page objects for chaining
- [ ] Use descriptive method names
- [ ] Common functionality in BasePage
- [ ] Reusable components separated

---

## When to Use This Skill

The AI Agent should apply this skill when:
- Creating automation tests that need better organization
- Refactoring existing tests to use Page Objects
- Building reusable page components
- Setting up a new automation framework
- Reviewing code for maintainability improvements

The AI will automatically follow POM patterns when you request well-structured automation code.
