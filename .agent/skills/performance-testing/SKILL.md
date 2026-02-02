---
name: Performance Testing with Playwright
description: Techniques for measuring and validating web application performance using Playwright
---

# Performance Testing with Playwright

## Purpose

Performance testing ensures your application loads fast and provides a good user experience. Playwright can measure page load times, Core Web Vitals, and other performance metrics.

---

## Basic Performance Testing

### **Measure Page Load Time:**

```javascript
test('Should load within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://example.com/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
    console.log(`Page loaded in ${loadTime}ms`);
});
```

---

## Core Web Vitals

### **First Contentful Paint (FCP):**

```javascript
test('Should have fast FCP', async ({ page }) => {
    await page.goto('/');
    
    const fcp = await page.evaluate(() => {
        return new Promise((resolve) => {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
                if (fcp) resolve(fcp.startTime);
            }).observe({ entryTypes: ['paint'] });
            
            setTimeout(() => resolve(null), 5000);
        });
    });
    
    expect(fcp).toBeLessThan(1800); // < 1.8s is good
    console.log(`FCP: ${fcp}ms`);
});
```

### **Largest Contentful Paint (LCP):**

```javascript
test('Should have fast LCP', async ({ page }) => {
    await page.goto('/');
    
    const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                resolve(lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            setTimeout(() => resolve(null), 10000);
        });
    });
    
    expect(lcp).toBeLessThan(2500); // < 2.5s is good
    console.log(`LCP: ${lcp}ms`);
});
```

---

## Network Performance

### **Monitor Request Count:**

```javascript
test('Should not make too many requests', async ({ page }) => {
    const requests = [];
    
    page.on('request', request => requests.push(request.url()));
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(requests.length).toBeLessThan(50);
    console.log(`Total requests: ${requests.length}`);
});
```

### **Check Resource Sizes:**

```javascript
test('Should have small page size', async ({ page }) => {
    let totalSize = 0;
    
    page.on('response', async response => {
        const buffer = await response.body().catch(() => null);
        if (buffer) totalSize += buffer.length;
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalMB = (totalSize / 1024 / 1024).toFixed(2);
    expect(parseFloat(totalMB)).toBeLessThan(5); // < 5MB
    console.log(`Total page size: ${totalMB}MB`);
});
```

---

## Performance Budgets

```javascript
const performanceBudget = {
    maxLoadTime: 3000,
    maxRequests: 50,
    maxPageSize: 5 * 1024 * 1024, // 5MB
    maxFCP: 1800,
    maxLCP: 2500,
};

test('Should meet performance budget', async ({ page }) => {
    // Measure all metrics
    // Assert against budget
});
```

---

## Lighthouse Integration

```javascript
// Install: npm install -D playwright-lighthouse
const { playAudit } = require('playwright-lighthouse');

test('Lighthouse audit', async ({ page }) => {
    await page.goto('/');
    
    await playAudit({
        page,
        thresholds: {
            performance: 90,
            accessibility: 90,
            'best-practices': 90,
            seo: 90,
        },
        port: 9222,
    });
});
```

---

## When to Use This Skill

Apply when measuring page performance, validating Core Web Vitals, setting performance budgets, or detecting performance regressions.
