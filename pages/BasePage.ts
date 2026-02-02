import { Page } from '@playwright/test';

/**
 * BasePage - Common functionality for all page objects
 * 
 * Provides shared methods for navigation, waiting, and screenshots.
 */
export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a URL with networkidle wait
     */
    async goto(url: string): Promise<void> {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Wait for an element to be visible
     */
    async waitForElement(locator: any): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    /**
     * Capture a screenshot
     */
    async screenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    /**
     * Wait for a fixed amount of time (use sparingly)
     */
    async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
