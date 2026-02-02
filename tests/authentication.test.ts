/**
 * Authentication Module Tests
 * 
 * Test Cases:
 * - TC_001: Register User (18 steps)
 * - TC_002: Login with correct credentials (10 steps)
 * - TC_003: Login with incorrect credentials (8 steps)
 * - TC_004: Logout User (10 steps)
 * - TC_005: Register with existing email (8 steps)
 * 
 * @see test-cases/AutomationExercise_TestCases.md
 */

import { test, expect } from '@playwright/test';

test.describe('Authentication Module', () => {

    /**
     * TC_001: Register User
     * Priority: High | Type: Smoke Test
     * Steps: 18
     */
    test('TC_001: Register User', async ({ page }) => {
        // 1. Setup - Navigate to homepage
        await page.goto('https://automationexercise.com');
        await page.waitForLoadState('networkidle');

        // Verify home page is visible
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Click on 'Signup / Login' button
        await page.getByRole('link', { name: 'Signup / Login' }).click();

        // Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();

        // Generate unique test data
        const timestamp = Date.now();
        const testUser = {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            password: 'Test@123456',
            firstName: 'John',
            lastName: 'Doe',
            company: 'Test Company',
            address: '123 Test Street',
            address2: 'Apt 456',
            country: 'United States',
            state: 'California',
            city: 'Los Angeles',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };

        // Enter name and email address
        await page.getByPlaceholder('Name').fill(testUser.name);
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(testUser.email);

        // Click 'Signup' button
        await page.getByRole('button', { name: 'Signup' }).click();

        // Verify 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByText('Enter Account Information')).toBeVisible();

        // Fill account details: Title, Password, Date of birth
        await page.getByLabel('Mr.').check();
        await page.getByLabel('Password *').fill(testUser.password);

        // Date of birth
        await page.locator('#days').selectOption('15');
        await page.locator('#months').selectOption('6');
        await page.locator('#years').selectOption('1990');

        // Select checkboxes
        await page.getByLabel('Sign up for our newsletter!').check();
        await page.getByLabel('Receive special offers from our partners!').check();

        // Fill address information
        await page.getByLabel('First name *').fill(testUser.firstName);
        await page.getByLabel('Last name *').fill(testUser.lastName);
        await page.getByLabel('Company', { exact: true }).fill(testUser.company);
        await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(testUser.address);
        await page.getByLabel('Address 2').fill(testUser.address2);
        await page.getByLabel('Country *').selectOption(testUser.country);
        await page.getByLabel('State *').fill(testUser.state);
        await page.getByLabel('City *').fill(testUser.city);
        await page.getByLabel('Zipcode *').fill(testUser.zipcode);
        await page.getByLabel('Mobile Number *').fill(testUser.mobileNumber);

        // Click 'Create Account' button
        await page.getByRole('button', { name: 'Create Account' }).click();

        // 3. Assert - Verify 'ACCOUNT CREATED!' is visible
        await expect(page.getByText('Account Created!')).toBeVisible();

        // Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click();

        // Verify 'Logged in as username' is visible
        await expect(page.getByText(`Logged in as ${testUser.name}`)).toBeVisible();

        // 4. Screenshot - Capture successful registration
        await page.screenshot({
            path: `screenshots/auth/tc001-registration-success-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Delete Account
        await page.getByRole('link', { name: 'Delete Account' }).click();

        // Verify 'ACCOUNT DELETED!' is visible
        await expect(page.getByText('Account Deleted!')).toBeVisible();

        // Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click();

        // 5. Log - Confirm test completion
        console.log('✅ TC_001: User registration completed and account deleted');
    });

    /**
     * TC_002: Login User with correct email and password
     * Priority: High | Type: Smoke Test
     * Steps: 10
     */
    test('TC_002: Login with correct credentials', async ({ page }) => {
        // Prerequisites: Create a test account first
        const timestamp = Date.now();
        const testUser = {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            password: 'Test@123456'
        };

        // Create account (setup)
        await page.goto('https://automationexercise.com');
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await page.getByPlaceholder('Name').fill(testUser.name);
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(testUser.email);
        await page.getByRole('button', { name: 'Signup' }).click();
        await page.getByLabel('Mr.').check();
        await page.getByLabel('Password *').fill(testUser.password);
        await page.locator('#days').selectOption('15');
        await page.locator('#months').selectOption('6');
        await page.locator('#years').selectOption('1990');
        await page.getByLabel('First name *').fill('John');
        await page.getByLabel('Last name *').fill('Doe');
        await page.getByLabel('Company', { exact: true }).fill('Test Co');
        await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill('123 Test St');
        await page.getByLabel('Country *').selectOption('United States');
        await page.getByLabel('State *').fill('CA');
        await page.getByLabel('City *').fill('LA');
        await page.getByLabel('Zipcode *').fill('90001');
        await page.getByLabel('Mobile Number *').fill('1234567890');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await page.getByRole('link', { name: 'Continue' }).click();

        // Logout to test login
        await page.getByRole('link', { name: 'Logout' }).click();

        // 1. Setup - Navigate to homepage
        await page.goto('https://automationexercise.com');
        await page.waitForLoadState('networkidle');

        // Verify home page is visible
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Click on 'Signup / Login' button
        await page.getByRole('link', { name: 'Signup / Login' }).click();

        // Verify 'Login to your account' is visible
        await expect(page.getByText('Login to your account')).toBeVisible();

        // Enter correct email and password
        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(testUser.email);
        await page.getByPlaceholder('Password').fill(testUser.password);

        // Click 'login' button
        await page.getByRole('button', { name: 'Login' }).click();

        // 3. Assert - Verify 'Logged in as username' is visible
        await expect(page.getByText(`Logged in as ${testUser.name}`)).toBeVisible();

        // 4. Screenshot - Capture successful login
        await page.screenshot({
            path: `screenshots/auth/tc002-login-success-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Delete Account
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();

        // 5. Log - Confirm test completion
        console.log('✅ TC_002: Login with correct credentials completed');
    });

    /**
     * TC_003: Login User with incorrect email and password
     * Priority: Medium | Type: Negative Test
     * Steps: 8
     */
    test('TC_003: Login with incorrect credentials', async ({ page }) => {
        // 1. Setup - Navigate to homepage
        await page.goto('https://automationexercise.com');
        await page.waitForLoadState('networkidle');

        // Verify home page is visible
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Click on 'Signup / Login' button
        await page.getByRole('link', { name: 'Signup / Login' }).click();

        // Verify 'Login to your account' is visible
        await expect(page.getByText('Login to your account')).toBeVisible();

        // Enter incorrect email and password
        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('invalid@test.com');
        await page.getByPlaceholder('Password').fill('wrongpassword123');

        // Click 'login' button
        await page.getByRole('button', { name: 'Login' }).click();

        // 3. Assert - Verify error message is visible
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

        // 4. Screenshot - Capture error message
        await page.screenshot({
            path: `screenshots/auth/tc003-login-error-${Date.now()}.png`,
            fullPage: true
        });

        // 5. Log - Confirm test completion
        console.log('✅ TC_003: Login with incorrect credentials - error message verified');
    });

    /**
     * TC_004: Logout User
     * Priority: Medium | Type: Functional
     * Steps: 10
     */
    test('TC_004: Logout User', async ({ page }) => {
        // Prerequisites: Create and login with test account
        const timestamp = Date.now();
        const testUser = {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            password: 'Test@123456'
        };

        // Create and login (setup)
        await page.goto('https://automationexercise.com');
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await page.getByPlaceholder('Name').fill(testUser.name);
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(testUser.email);
        await page.getByRole('button', { name: 'Signup' }).click();
        await page.getByLabel('Mr.').check();
        await page.getByLabel('Password *').fill(testUser.password);
        await page.locator('#days').selectOption('15');
        await page.locator('#months').selectOption('6');
        await page.locator('#years').selectOption('1990');
        await page.getByLabel('First name *').fill('John');
        await page.getByLabel('Last name *').fill('Doe');
        await page.getByLabel('Company', { exact: true }).fill('Test Co');
        await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill('123 Test St');
        await page.getByLabel('Country *').selectOption('United States');
        await page.getByLabel('State *').fill('CA');
        await page.getByLabel('City *').fill('LA');
        await page.getByLabel('Zipcode *').fill('90001');
        await page.getByLabel('Mobile Number *').fill('1234567890');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await page.getByRole('link', { name: 'Continue' }).click();

        // 1. Setup - Verify logged in
        await expect(page.getByText(`Logged in as ${testUser.name}`)).toBeVisible();

        // 2. Action - Click 'Logout' button
        await page.getByRole('link', { name: 'Logout' }).click();

        // 3. Assert - Verify navigated to login page
        await expect(page.getByText('Login to your account')).toBeVisible();
        await expect(page.url()).toContain('/login');

        // 4. Screenshot - Capture logout state
        await page.screenshot({
            path: `screenshots/auth/tc004-logout-success-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Login and delete account
        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(testUser.email);
        await page.getByPlaceholder('Password').fill(testUser.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await page.getByRole('link', { name: 'Continue' }).click();

        // 5. Log - Confirm test completion
        console.log('✅ TC_004: Logout completed - user redirected to login page');
    });

    /**
     * TC_005: Register User with existing email
     * Priority: Medium | Type: Negative Test
     * Steps: 8
     */
    test('TC_005: Register with existing email', async ({ page }) => {
        // Prerequisites: Create a test account first
        const timestamp = Date.now();
        const existingUser = {
            name: `Existing User ${timestamp}`,
            email: `existing${timestamp}@example.com`,
            password: 'Test@123456'
        };

        // Create existing account (setup)
        await page.goto('https://automationexercise.com');
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await page.getByPlaceholder('Name').fill(existingUser.name);
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(existingUser.email);
        await page.getByRole('button', { name: 'Signup' }).click();
        await page.getByLabel('Mr.').check();
        await page.getByLabel('Password *').fill(existingUser.password);
        await page.locator('#days').selectOption('15');
        await page.locator('#months').selectOption('6');
        await page.locator('#years').selectOption('1990');
        await page.getByLabel('First name *').fill('John');
        await page.getByLabel('Last name *').fill('Doe');
        await page.getByLabel('Company', { exact: true }).fill('Test Co');
        await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill('123 Test St');
        await page.getByLabel('Country *').selectOption('United States');
        await page.getByLabel('State *').fill('CA');
        await page.getByLabel('City *').fill('LA');
        await page.getByLabel('Zipcode *').fill('90001');
        await page.getByLabel('Mobile Number *').fill('1234567890');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await page.getByRole('link', { name: 'Continue' }).click();

        // Logout
        await page.getByRole('link', { name: 'Logout' }).click();

        // 1. Setup - Navigate to homepage
        await page.goto('https://automationexercise.com');
        await page.waitForLoadState('networkidle');

        // Verify home page is visible
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Click on 'Signup / Login' button
        await page.getByRole('link', { name: 'Signup / Login' }).click();

        // Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();

        // Enter name and existing email address
        await page.getByPlaceholder('Name').fill('New User');
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(existingUser.email);

        // Click 'Signup' button
        await page.getByRole('button', { name: 'Signup' }).click();

        // 3. Assert - Verify error 'Email Address already exist!' is visible
        await expect(page.getByText('Email Address already exist!')).toBeVisible();

        // 4. Screenshot - Capture error message
        await page.screenshot({
            path: `screenshots/auth/tc005-duplicate-email-error-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Login and delete the existing account
        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(existingUser.email);
        await page.getByPlaceholder('Password').fill(existingUser.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await page.getByRole('link', { name: 'Continue' }).click();

        // 5. Log - Confirm test completion
        console.log('✅ TC_005: Register with existing email - error message verified');
    });

});

/**
 * Test Documentation
 * 
 * This file contains authentication tests following the 5-step structure:
 * 1. Setup - Navigate and prepare test environment
 * 2. Action - Perform user actions
 * 3. Assert - Verify expected results
 * 4. Screenshot - Capture visual evidence
 * 5. Log - Output test results
 * 
 * All tests include cleanup (account deletion) to maintain test independence.
 * 
 * Test Data:
 * - Dynamic timestamps ensure unique emails for each test run
 * - Consistent password format for all tests
 * - Standard address information for registration
 * 
 * Screenshots saved to: screenshots/auth/
 */
