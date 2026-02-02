---
name: API Testing with Playwright
description: Guidelines for testing REST APIs using Playwright's built-in API testing capabilities to complement E2E testing
---

# API Testing with Playwright

## Purpose

Playwright provides built-in API testing capabilities that allow you to test REST APIs directly. This complements E2E tests and allows for faster test data setup, API validation, and hybrid test scenarios.

---

## Basic API Testing

### **Simple GET Request:**

```javascript
const { test, expect } = require('@playwright/test');

test('Should get user list', async ({ request }) => {
    const response = await request.get('https://api.example.com/users');
    
    // Assert status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // Assert response data
    const users = await response.json();
    expect(users).toHaveLength(10);
    expect(users[0]).toHaveProperty('email');
});
```

### **POST Request:**

```javascript
test('Should create user', async ({ request }) => {
    const response = await request.post('https://api.example.com/users', {
        data: {
            name: 'John Doe',
            email: 'john@example.com'
        }
    });
    
    expect(response.status()).toBe(201);
    
    const user = await response.json();
    expect(user.name).toBe('John Doe');
    expect(user.id).toBeTruthy();
});
```

---

## Authentication

### **Bearer Token:**

```javascript
test('API with auth token', async ({ request }) => {
    const response = await request.get('https://api.example.com/profile', {
        headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
    });
    
    expect(response.ok()).toBeTruthy();
});
```

### **Basic Auth:**

```javascript
test('API with basic auth', async ({ request }) => {
    const response = await request.get('https://api.example.com/data', {
        headers: {
            'Authorization': `Basic ${Buffer.from('user:pass').toString('base64')}`
        }
    });
});
```

---

## Hybrid Tests (UI + API)

### **Setup Data via API, Test via UI:**

```javascript
test('Should display created product', async ({ page, request }) => {
    // 1. Setup - Create product via API (fast!)
    const response = await request.post('/api/products', {
        data: {
            name: 'Test Product',
            price: 99.99
        }
    });
    
    const product = await response.json();
    
    // 2. Action - Navigate to UI
    await page.goto('/products');
    
    // 3. Assert - Verify UI shows the product
    await expect(page.getByText('Test Product')).toBeVisible();
    await expect(page.getByText('$99.99')).toBeVisible();
    
    // 4. Cleanup - Delete via API
    await request.delete(`/api/products/${product.id}`);
});
```

---

## API Fixtures

```javascript
// fixtures/api.js
const { test as base } = require('@playwright/test');

exports.test = base.extend({
    apiContext: async ({ playwright }, use) => {
        const context = await playwright.request.newContext({
            baseURL: 'https://api.example.com',
            extraHTTPHeaders: {
                'Authorization': `Bearer ${process.env.API_TOKEN}`,
                'Accept': 'application/json'
            }
        });
        await use(context);
        await context.dispose();
    }
});
```

```javascript
// Usage
const { test } = require('../fixtures/api');

test('Test with API context', async ({ apiContext }) => {
    const response = await apiContext.get('/users');
    expect(response.ok()).toBeTruthy();
});
```

---

## Best Practices

### **1. Verify Response Structure:**

```javascript
test('Should have correct user structure', async ({ request }) => {
    const response = await request.get('/api/users/1');
    const user = await response.json();
    
    // Verify required fields
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('name');
    
    // Verify types
    expect(typeof user.id).toBe('number');
    expect(typeof user.email).toBe('string');
});
```

### **2. Test Error Handling:**

```javascript
test('Should return 404 for non-existent user', async ({ request }) => {
    const response = await request.get('/api/users/99999');
    
    expect(response.status()).toBe(404);
    
    const error = await response.json();
    expect(error.message).toContain('User not found');
});
```

### **3. Cleanup After Tests:**

```javascript
let createdUserId;

test('Create and cleanup user', async ({ request }) => {
    // Create
    const createResponse = await request.post('/api/users', {
        data: { name: 'Test User', email: 'test@example.com' }
    });
    
    const user = await createResponse.json();
    createdUserId = user.id;
    
    // Test logic...
});

test.afterEach(async ({ request }) => {
    if (createdUserId) {
        await request.delete(`/api/users/${createdUserId}`);
    }
});
```

---

## When to Use This Skill

The AI Agent should apply this skill when:
- Testing REST APIs directly
- Setting up test data via API for UI tests
- Creating hybrid API + UI test scenarios
- Validating API responses and error handling
- Implementing fast data cleanup after tests

The AI will automatically use Playwright's API testing capabilities when you request API test creation.
