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
 * 
 * Refactored with Page Object Model for maintainability and reusability.
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage, UserData } from '../pages/RegistrationPage';

test.describe('Authentication Module', () => {

    /**
     * TC_001: Register User
     * Priority: High | Type: Smoke Test
     * Steps: 18
     */
    test('TC_001: Register User', async ({ page }) => {
        // 1. Setup - Initialize page objects and navigate
        const homePage = new HomePage(page);
        const regPage = new RegistrationPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Navigate to signup
        await homePage.clickSignupLogin();

        // Verify signup page
        await expect(regPage.getNewUserSignupText()).toBeVisible();

        // Generate unique test data
        const timestamp = Date.now();
        const testUser: UserData = {
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

        // Complete registration
        await regPage.enterSignupInfo(testUser.name, testUser.email);
        await regPage.clickSignup();

        await expect(regPage.getAccountInfoText()).toBeVisible();

        await regPage.fillAccountInformation(testUser);
        await regPage.fillAddressInformation(testUser);
        await regPage.clickCreateAccount();

        // 3. Assert - Verify account created
        await expect(homePage.getAccountCreatedMessage()).toBeVisible();

        await homePage.clickContinue();
        await expect(homePage.getLoggedInText(testUser.name)).toBeVisible();

        // 4. Screenshot - Capture successful registration
        await page.screenshot({
            path: `screenshots/auth/tc001-registration-success-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Delete Account
        await homePage.clickDeleteAccount();
        await expect(homePage.getAccountDeletedMessage()).toBeVisible();
        await homePage.clickContinue();

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
        const homePage = new HomePage(page);
        const regPage = new RegistrationPage(page);
        const loginPage = new LoginPage(page);

        const timestamp = Date.now();
        const testUser: UserData = {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            password: 'Test@123456',
            firstName: 'John',
            lastName: 'Doe',
            company: 'Test Co',
            address: '123 Test St',
            country: 'United States',
            state: 'CA',
            city: 'LA',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };

        // Create account (setup)
        await homePage.goto();
        await homePage.clickSignupLogin();
        await regPage.registerUser(testUser);
        await homePage.clickContinue();

        // Logout to test login
        await homePage.clickLogout();

        // 1. Setup - Navigate to homepage
        await homePage.goto();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Login
        await homePage.clickSignupLogin();
        await expect(loginPage.getLoginHeaderText()).toBeVisible();

        await loginPage.login(testUser.email, testUser.password);

        // 3. Assert - Verify logged in
        await expect(homePage.getLoggedInText(testUser.name)).toBeVisible();

        // 4. Screenshot - Capture successful login
        await page.screenshot({
            path: `screenshots/auth/tc002-login-success-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Delete Account
        await homePage.clickDeleteAccount();
        await expect(homePage.getAccountDeletedMessage()).toBeVisible();
        await homePage.clickContinue();

        // 5. Log - Confirm test completion
        console.log('✅ TC_002: Login with correct credentials completed');
    });

    /**
     * TC_003: Login User with incorrect email and password
     * Priority: Medium | Type: Negative Test
     * Steps: 8
     */
    test('TC_003: Login with incorrect credentials', async ({ page }) => {
        // 1. Setup - Initialize page objects and navigate
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Attempt login with invalid credentials
        await homePage.clickSignupLogin();
        await expect(loginPage.getLoginHeaderText()).toBeVisible();

        await loginPage.login('invalid@test.com', 'wrongpassword123');

        // 3. Assert - Verify error message
        await expect(loginPage.getErrorMessage()).toBeVisible();

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
        const homePage = new HomePage(page);
        const regPage = new RegistrationPage(page);
        const loginPage = new LoginPage(page);

        const timestamp = Date.now();
        const testUser: UserData = {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            password: 'Test@123456',
            firstName: 'John',
            lastName: 'Doe',
            company: 'Test Co',
            address: '123 Test St',
            country: 'United States',
            state: 'CA',
            city: 'LA',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };

        // Create and login (setup)
        await homePage.goto();
        await homePage.clickSignupLogin();
        await regPage.registerUser(testUser);
        await homePage.clickContinue();

        // 1. Setup - Verify logged in
        await expect(homePage.getLoggedInText(testUser.name)).toBeVisible();

        // 2. Action - Logout
        await homePage.clickLogout();

        // 3. Assert - Verify navigated to login page
        await expect(loginPage.getLoginHeaderText()).toBeVisible();
        await expect(page.url()).toContain('/login');

        // 4. Screenshot - Capture logout state
        await page.screenshot({
            path: `screenshots/auth/tc004-logout-success-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Login and delete account
        await loginPage.login(testUser.email, testUser.password);
        await homePage.clickDeleteAccount();
        await homePage.clickContinue();

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
        const homePage = new HomePage(page);
        const regPage = new RegistrationPage(page);
        const loginPage = new LoginPage(page);

        const timestamp = Date.now();
        const existingUser: UserData = {
            name: `Existing User ${timestamp}`,
            email: `existing${timestamp}@example.com`,
            password: 'Test@123456',
            firstName: 'John',
            lastName: 'Doe',
            company: 'Test Co',
            address: '123 Test St',
            country: 'United States',
            state: 'CA',
            city: 'LA',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };

        // Create existing account (setup)
        await homePage.goto();
        await homePage.clickSignupLogin();
        await regPage.registerUser(existingUser);
        await homePage.clickContinue();
        await homePage.clickLogout();

        // 1. Setup - Navigate to homepage
        await homePage.goto();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Attempt to register with existing email
        await homePage.clickSignupLogin();
        await expect(regPage.getNewUserSignupText()).toBeVisible();

        await regPage.enterSignupInfo('New User', existingUser.email);
        await regPage.clickSignup();

        // 3. Assert - Verify error message
        await expect(regPage.getEmailExistsError()).toBeVisible();

        // 4. Screenshot - Capture error message
        await page.screenshot({
            path: `screenshots/auth/tc005-duplicate-email-error-${timestamp}.png`,
            fullPage: true
        });

        // Cleanup - Login and delete the existing account
        await loginPage.login(existingUser.email, existingUser.password);
        await homePage.clickDeleteAccount();
        await homePage.clickContinue();

        // 5. Log - Confirm test completion
        console.log('✅ TC_005: Register with existing email - error message verified');
    });

});

/**
 * Test Documentation
 * 
 * This file contains authentication tests refactored using Page Object Model:
 * - BasePage: Common functionality
 * - HomePage: Navigation and user status
 * - LoginPage: Login functionality
 * - RegistrationPage: Complete registration flow
 * 
 * Tests follow the 5-step structure:
 * 1. Setup - Navigate and prepare test environment
 * 2. Action - Perform user actions using page objects
 * 3. Assert - Verify expected results
 * 4. Screenshot - Capture visual evidence
 * 5. Log - Output test results
 * 
 * All tests include cleanup (account deletion) to maintain test independence.
 * 
 * Test Data:
 * - Dynamic timestamps ensure unique emails for each test run
 * - UserData interface ensures type safety
 * - Consistent test data structure across all tests
 * 
 * Screenshots saved to: screenshots/auth/
 */
