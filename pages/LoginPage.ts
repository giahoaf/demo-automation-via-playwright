import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - User authentication page
 * 
 * Handles login form interactions and error messages.
 */
export class LoginPage extends BasePage {
    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginHeaderText: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('form').filter({ hasText: 'Login' })
            .getByPlaceholder('Email Address');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginHeaderText = page.getByText('Login to your account');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
    }

    /**
     * Fill email field
     */
    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Fill password field
     */
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Click login button
     */
    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    /**
     * Complete login flow (email + password + click)
     */
    async login(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    /**
     * Get login header text locator (for assertions)
     */
    getLoginHeaderText(): Locator {
        return this.loginHeaderText;
    }

    /**
     * Get error message locator (for assertions)
     */
    getErrorMessage(): Locator {
        return this.errorMessage;
    }
}
