---
name: Test Data Management
description: Best practices for managing, organizing, and maintaining test data for automation testing
---

# Test Data Management

## Purpose

Effective test data management ensures your automation tests are reliable, maintainable, and can run in different environments. This skill provides guidelines for organizing, storing, and using test data in Playwright automation.

---

## Data Storage Strategies

### **1. JSON Files** (Recommended for most cases)

```javascript
// data/users.json
{
  "validUser": {
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "John",
    "lastName": "Doe"
  },
  "invalidUser": {
    "email": "invalid@email",
    "password": "weak"
  },
  "adminUser": {
    "email": "admin@example.com",
    "password": "Admin123!@#"
  }
}
```

```javascript
// Usage in tests
const users = require('../data/users.json');

test('Login with valid user', async ({ page }) => {
    await loginPage.login(users.validUser.email, users.validUser.password);
});
```

### **2. Environment Variables** (For secrets)

```javascript
// .env
BASE_URL=https://app.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecretPass123
```

```javascript
// playwright.config.js
require('dotenv').config();

module.exports = {
    use: {
        baseURL: process.env.BASE_URL,
    },
};
```

```javascript
// Usage in tests
test('Admin login', async ({ page }) => {
    await loginPage.login(
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD
    );
});
```

### **3. Test Fixtures** (Playwright-specific)

```javascript
// fixtures/testData.js
const { test as base } = require('@playwright/test');

exports.test = base.extend({
    validUser: async ({}, use) => {
        await use({
            email: 'test@example.com',
            password: 'Test123'
        });
    },
});
```

```javascript
// Usage
const { test } = require('../fixtures/testData');

test('Should login', async ({ page, validUser }) => {
    await loginPage.login(validUser.email, validUser.password);
});
```

---

## Folder Structure

```
project/
├── data/
│   ├── users.json               # User credentials
│   ├── products.json            # Product data
│   ├── config.json              # App configuration
│   └── test-scenarios/
│       ├── login-scenarios.json
│       └── checkout-scenarios.json
├── .env                         # Environment variables
├── .env.staging                 # Staging environment
└── .env.production              # Production environment
```

---

## Data-Driven Testing

### **1. Simple Parameterization**

```javascript
const testCases = [
    { email: 'test1@example.com', password: 'Pass1', expected: 'success' },
    { email: 'test2@example.com', password: 'Pass2', expected: 'success' },
    { email: 'invalid@email', password: 'any', expected: 'error' },
];

testCases.forEach(({ email, password, expected }) => {
    test(`Login with ${email}`, async ({ page }) => {
        await loginPage.login(email, password);
        
        if (expected === 'success') {
            await expect(page).toHaveURL(/dashboard/);
        } else {
            await expect(page.locator('.error')).toBeVisible();
        }
    });
});
```

### **2. CSV/Excel Data (using libraries)**

```javascript
// Install: npm install csv-parse
const { parse } = require('csv-parse/sync');
const fs = require('fs');

const records = parse(fs.readFileSync('data/users.csv'), {
    columns: true,
    skip_empty_lines: true
});

records.forEach(record => {
    test(`Test with ${record.email}`, async ({ page }) => {
        await loginPage.login(record.email, record.password);
    });
});
```

---

## Dynamic Data Generation

### **1. Faker.js** (Random data)

```javascript
// Install: npm install @faker-js/faker
const { faker } = require('@faker-js/faker');

test('Create user with random data', async ({ page }) => {
    const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    
    await signupPage.register(user);
});
```

### **2. Unique Identifiers**

```javascript
test('Create product with unique name', async ({ page }) => {
    const timestamp = Date.now();
    const productName = `Product_${timestamp}`;
    
    await productPage.createProduct(productName);
    await expect(page.getByText(productName)).toBeVisible();
});
```

---

## Test Data Setup and Cleanup

### **1. Before Test (Setup)**

```javascript
test.beforeEach(async ({ page, request }) => {
    // Create test user via API
    const response = await request.post('/api/users', {
        data: {
            email: 'test@example.com',
            password: 'Test123'
        }
    });
    
    const userId = response.json().id;
    // Store for cleanup
    test.info().attach('userId', userId);
});
```

### **2. After Test (Cleanup)**

```javascript
test.afterEach(async ({ request }, testInfo) => {
    // Delete test user
    const userId = testInfo.attachments.find(a => a.name === 'userId');
    if (userId) {
        await request.delete(`/api/users/${userId}`);
    }
});
```

---

## Environment Management

### **Multi-Environment Setup**

```javascript
// playwright.config.js
const environment = process.env.ENV || 'staging';

const environments = {
    staging: {
        baseURL: 'https://staging.app.com',
        api: 'https://api.staging.app.com'
    },
    production: {
        baseURL: 'https://app.com',
        api: 'https://api.app.com'
    }
};

module.exports = {
    use: {
        baseURL: environments[environment].baseURL,
    },
};
```

```bash
# Run tests on different environments
ENV=staging npx playwright test
ENV=production npx playwright test
```

---

## Data Security Best Practices

### **✅ DO:**
- Store sensitive data in `.env` files
- Add `.env` to `.gitignore`
- Use different credentials for each environment
- Rotate test credentials regularly
- Use API keys with limited permissions

### **❌ DON'T:**
- Commit passwords to Git
- Share production credentials
- Use real user data in tests
- Hardcode API keys in test files

---

## Common Patterns

### **Pattern 1: Test Data Factory**

```javascript
// utils/dataFactory.js
class DataFactory {
    static createUser(overrides = {}) {
        return {
            email: faker.internet.email(),
            password: 'Test123!@#',
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            ...overrides
        };
    }
    
    static createProduct(overrides = {}) {
        return {
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            ...overrides
        };
    }
}

module.exports = { DataFactory };
```

```javascript
// Usage
const user = DataFactory.createUser({ email: 'specific@email.com' });
```

### **Pattern 2: Test Data Pools**

```javascript
// data/userPool.json
{
  "available": [
    {"email": "user1@test.com", "password": "Pass1"},
    {"email": "user2@test.com", "password": "Pass2"}
  ],
  "inUse": []
}
```

```javascript
// utils/userPool.js
class UserPool {
    static checkoutUser() {
        // Get available user
        // Move to inUse
        // Return user
    }
    
    static releaseUser(user) {
        // Move back to available
    }
}
```

---

## File Organization Examples

### **Simple Project:**

```
data/
├── users.json
├── products.json
└── config.json
```

### **Complex Project:**

```
data/
├── users/
│   ├── valid-users.json
│   ├── invalid-users.json
│   └── admin-users.json
├── products/
│   ├── electronics.json
│   └── clothing.json
├── scenarios/
│   ├── happy-path.json
│   └── edge-cases.json
└── environments/
    ├── staging.json
    └── production.json
```

---

## Checklist

- [ ] Test data separated from test code
- [ ] Sensitive data in environment variables
- [ ] `.env` files in `.gitignore`
- [ ] Data organized by feature/module
- [ ] Dynamic data generation for unique values
- [ ] Setup/cleanup for database changes
- [ ] Different data sets for different environments
- [ ] Data files are version controlled (except secrets)

---

## When to Use This Skill

The AI Agent should apply this skill when:
- Setting up test data for automation tests
- Organizing data files and structures
- Implementing data-driven testing
- Managing multi-environment test data
- Creating dynamic test data generation
- Setting up test data cleanup strategies

The AI will automatically follow these patterns when you request test data organization or data-driven test implementation.
