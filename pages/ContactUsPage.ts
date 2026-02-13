import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ContactData interface for contact form
 */
export interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * ContactUsPage - Contact Us form page
 * 
 * Handles contact form interactions including file upload and form submission.
 */
export class ContactUsPage extends BasePage {
    // Locators
    private readonly getInTouchText: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly subjectInput: Locator;
    private readonly messageInput: Locator;
    private readonly uploadFileInput: Locator;
    private readonly submitButton: Locator;
    private readonly successMessage: Locator;
    private readonly homeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.getInTouchText = page.getByRole('heading', { name: 'Get In Touch' });
        // Use more specific locators within the contact form
        const contactForm = page.locator('#contact-us-form');
        this.nameInput = contactForm.getByPlaceholder('Name');
        this.emailInput = contactForm.getByPlaceholder('Email');
        this.subjectInput = contactForm.getByPlaceholder('Subject');
        this.messageInput = contactForm.getByPlaceholder('Your Message Here');
        this.uploadFileInput = contactForm.locator('input[name="upload_file"]');
        this.submitButton = contactForm.getByRole('button', { name: 'Submit' });
        // Success message appears in a div with status class
        this.successMessage = page.locator('div.status').getByText(/success/i);
        // Home button appears after successful submission
        this.homeButton = page.getByRole('link', { name: /home/i }).first();
    }

    /**
     * Fill contact form with provided data
     */
    async fillContactForm(data: ContactData): Promise<void> {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.subjectInput.fill(data.subject);
        await this.messageInput.fill(data.message);
    }

    /**
     * Upload a file
     */
    async uploadFile(filePath: string): Promise<void> {
        await this.uploadFileInput.setInputFiles(filePath);
    }

    /**
     * Click submit button and handle browser dialog
     */
    async clickSubmit(): Promise<void> {
        // Setup dialog handler before clicking submit
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.submitButton.click();
        // Wait for page reload after dialog
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click Home button to return to homepage
     */
    async clickHome(): Promise<void> {
        await this.homeButton.click();
    }

    /**
     * Get "Get In Touch" heading locator (for assertions)
     */
    getGetInTouchText(): Locator {
        return this.getInTouchText;
    }

    /**
     * Get success message locator (for assertions)
     */
    getSuccessMessage(): Locator {
        return this.successMessage;
    }
}
