import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - AutomationExercise.com homepage
 * 
 * Handles main navigation and user status verification.
 */
export class HomePage extends BasePage {
    // Locators
    private readonly signupLoginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly deleteAccountLink: Locator;
    private readonly continueButton: Locator;
    private readonly contactUsLink: Locator;
    private readonly productsLink: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
        this.productsLink = page.getByRole('link', { name: ' Products' });
    }

    /**
     * Navigate to homepage
     */
    async goto(): Promise<void> {
        await super.goto('https://automationexercise.com');
    }

    /**
     * Click Signup / Login button
     */
    async clickSignupLogin(): Promise<void> {
        await this.signupLoginLink.click();
    }

    /**
     * Click Logout button
     */
    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    /**
     * Click Delete Account button
     */
    async clickDeleteAccount(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    /**
     * Click Continue button (after account created/deleted)
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Click Contact Us button
     */
    async clickContactUs(): Promise<void> {
        await this.contactUsLink.click();
    }

    async clickProducts(): Promise<void> {
        await this.productsLink.click();
    }

    /**
     * Check if user is logged in
     */
    async isLoggedIn(username: string): Promise<boolean> {
        const loggedInText = this.page.getByText(`Logged in as ${username}`);
        try {
            await loggedInText.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get logged in username text locator (for assertions)
     */
    getLoggedInText(username: string): Locator {
        return this.page.getByText(`Logged in as ${username}`);
    }

    /**
     * Get account created message locator (for assertions)
     */
    getAccountCreatedMessage(): Locator {
        return this.page.getByText('ACCOUNT CREATED!');
    }

    /**
     * Get account deleted message locator (for assertions)
     */
    getAccountDeletedMessage(): Locator {
        return this.page.getByText('Account Deleted!');
    }
}
