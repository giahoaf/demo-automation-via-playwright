---
name: Bug Reporting and Documentation
description: Standards for documenting bugs, test failures, and creating clear, actionable bug reports
---

# Bug Reporting and Documentation

## Purpose

Clear bug reports save time, improve communication, and help developers fix issues faster. This skill provides templates and guidelines for effective bug reporting from automation tests.

---

## Bug Report Template

```markdown
## Bug Report: [BUG-XXX]

**Title:** [Clear, concise description]

**Severity:** Critical | High | Medium | Low
**Priority:** P0 | P1 | P2 | P3
**Environment:** Staging | Production | Local
**Browser:** Chrome 120 | Firefox 121 | Safari 17

**Description:**
[Detailed description of the issue]

**Steps to Reproduce:**
1. Navigate to [URL]
2. Click [Element]
3. Enter [Data]
4. Observe [Issue]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Test Case:** TC_LOGIN_001
**Automation Test:** tests/login.spec.js:25
**Test Run:** https://github.com/repo/actions/runs/123

**Screenshots:**
![error-screenshot](path/to/screenshot.png)

**Logs:**
```
[Error logs here]
```

**Additional Context:**
- Occurs: Always | Sometimes | Rarely
- First seen: 2026-02-01
- Related tickets: BUG-123
```

---

## Severity Levels

| Severity | Description | Example |
|----------|-------------|---------|
| **Critical** | System crash, data loss, security breach | Cannot login at all |
| **High** | Major feature broken, no workaround | Checkout fails |
| **Medium** | Feature partially broken, workaround exists | Search slow |
| **Low** | Minor issue, cosmetic | Button misaligned |

---

## Automated Bug Reporting

### **Capture Evidence on Failure:**

```javascript
test('Login test', async ({ page }) => {
    try {
        await loginPage.login('test@example.com', 'Pass123');
        await expect(page).toHaveURL(/dashboard/);
    } catch (error) {
        // Capture screenshot
        await page.screenshot({ 
            path: `screenshots/bugs/login-failure-${Date.now()}.png` 
        });
        
        // Log page state
        console.log('Page URL:', page.url());
        console.log('Page title:', await page.title());
        
        throw error;
    }
});
```

### **Attach to Test Info:**

```javascript
test('Test with evidence', async ({ page }, testInfo) => {
    try {
        // Test logic
    } catch (error) {
        const screenshot = await page.screenshot();
        testInfo.attach('failure-screenshot', { 
            body: screenshot, 
            contentType: 'image/png' 
        });
        throw error;
    }
});
```

---

## When to Use This Skill

Apply when documenting test failures, creating bug reports from automation results, or establishing bug reporting standards for the team.
