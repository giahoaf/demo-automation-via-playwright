---
name: CI/CD Integration for Playwright  
description: Guidelines for integrating Playwright tests into CI/CD pipelines for automated testing on every commit
---

# CI/CD Integration for Playwright Tests

## Purpose

Running Playwright tests in CI/CD pipelines ensures that every code change is automatically tested, catching issues early and maintaining code quality. This skill covers integration with popular CI/CD platforms.

---

## GitHub Actions

### **Basic Workflow:**

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: 18
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
      
    - name: Run Playwright tests
      run: npx playwright test
      
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### **Parallel Testing:**

```yaml
strategy:
  fail-fast: false
  matrix:
    shard Index: [1, 2, 3, 4]
steps:
  - name: Run tests
    run: npx playwright test --shard=${{ matrix.shardIndex }}/4
```

---

## GitLab CI

```yaml
# .gitlab-ci.yml
test:
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 1 week
```

---

## Jenkins

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
```

---

##Configuration Tips

### **Run Only on CI:**

```javascript
// playwright.config.js
const isCI = !!process.env.CI;

module.exports = {
    retries: isCI ? 2 : 0,
    workers: isCI ? 1 : undefined,
    reporter: isCI ? 'github' : 'html',
};
```

### **Environment Variables:**

```yaml
env:
  BASE_URL: ${{ secrets.BASE_URL }}
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

---

## When to Use This Skill

Apply when setting up automated test execution in CI/CD pipelines, configuring parallel test execution, or integrating test reports.
