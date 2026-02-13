/**
 * Communication Module Tests
 * 
 * Test Cases:
 * - TC_006: Contact Us Form (11 steps)
 * 
 * @see test-cases/AutomationExercise_TestCases.md
 * 
 * Refactored with Page Object Model for maintainability and reusability.
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage, ContactData } from '../pages/ContactUsPage';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Communication Module', () => {

    /**
     * TC_006: Contact Us Form
     * Priority: Medium | Type: Functional
     * Steps: 11
     */
    test('TC_006: Contact Us Form', async ({ page }) => {
        // 1. Setup - Initialize page objects and navigate
        const homePage = new HomePage(page);
        const contactUsPage = new ContactUsPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Navigate to Contact Us page
        await homePage.clickContactUs();

        // Verify Contact Us page loaded
        await expect(contactUsPage.getGetInTouchText()).toBeVisible();

        // Prepare test data
        const timestamp = Date.now();
        const contactData: ContactData = {
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@example.com`,
            subject: 'Test Inquiry',
            message: 'This is an automated test message for the Contact Us form.'
        };

        // Create a temporary test file to upload
        const testFilePath = path.join(__dirname, '..', 'test-file.txt');
        fs.writeFileSync(testFilePath, 'This is a test file for Contact Us form automation.');

        // Fill contact form
        await contactUsPage.fillContactForm(contactData);

        // Upload file
        await contactUsPage.uploadFile(testFilePath);

        // 3. Screenshot - Before submission
        await page.screenshot({
            path: `screenshots/contact/tc006-before-submit-${timestamp}.png`,
            fullPage: true
        });

        // Submit form (will handle OK dialog automatically)
        await contactUsPage.clickSubmit();

        // 4. Assert - Verify success message
        await expect(contactUsPage.getSuccessMessage()).toBeVisible();

        // 5. Screenshot - After successful submission
        await page.screenshot({
            path: `screenshots/contact/tc006-success-${timestamp}.png`,
            fullPage: true
        });

        // Navigate back to home
        await contactUsPage.clickHome();
        await expect(page).toHaveURL('https://automationexercise.com');

        // Cleanup - Delete test file
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }

        // 6. Log - Confirm test completion
        console.log('✅ TC_006: Contact Us form submitted successfully');
    });

});

/**
 * Test Documentation
 * 
 * This file contains communication tests refactored using Page Object Model:
 * - HomePage: Navigation to Contact Us page
 * - ContactUsPage: Contact form interactions, file upload, and dialog handling
 * 
 * Tests follow the 6-step structure:
 * 1. Setup - Navigate and prepare test environment
 * 2. Action - Perform user actions using page objects
 * 3. Screenshot - Capture visual evidence before submission
 * 4. Assert - Verify expected results
 * 5. Screenshot - Capture visual evidence after submission
 * 6. Log - Output test results
 * 
 * File Upload:
 * - Creates a temporary test file dynamically
 * - Uploads it using setInputFiles()
 * - Cleans up the file after test completion
 * 
 * Dialog Handling:
 * - Browser alert/confirm dialogs are automatically handled in ContactUsPage.clickSubmit()
 * - Uses page.once('dialog') to accept the OK button
 * 
 * Screenshots saved to: screenshots/contact/
 */
