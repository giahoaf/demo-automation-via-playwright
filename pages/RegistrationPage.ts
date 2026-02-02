import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * User data interface for registration
 */
export interface UserData {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

/**
 * RegistrationPage - User registration flow
 * 
 * Handles complete user registration process from signup to account creation.
 */
export class RegistrationPage extends BasePage {
    // Signup form locators
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly signupButton: Locator;
    private readonly newUserSignupText: Locator;
    private readonly emailExistsError: Locator;

    // Account information form locators
    private readonly genderMr: Locator;
    private readonly genderMrs: Locator;
    private readonly passwordInput: Locator;
    private readonly daysDropdown: Locator;
    private readonly monthsDropdown: Locator;
    private readonly yearsDropdown: Locator;
    private readonly newsletterCheckbox: Locator;
    private readonly specialOffersCheckbox: Locator;

    // Address information form locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyInput: Locator;
    private readonly addressInput: Locator;
    private readonly address2Input: Locator;
    private readonly countryDropdown: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileNumberInput: Locator;

    // Buttons
    private readonly createAccountButton: Locator;

    // Messages
    private readonly accountInfoText: Locator;

    constructor(page: Page) {
        super(page);

        // Signup form
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.locator('form').filter({ hasText: 'Signup' })
            .getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.newUserSignupText = page.getByText('New User Signup!');
        this.emailExistsError = page.getByText('Email Address already exist!');

        // Account information
        this.genderMr = page.getByLabel('Mr.');
        this.genderMrs = page.getByLabel('Mrs.');
        this.passwordInput = page.getByLabel('Password *');
        this.daysDropdown = page.locator('#days');
        this.monthsDropdown = page.locator('#months');
        this.yearsDropdown = page.locator('#years');
        this.newsletterCheckbox = page.getByLabel('Sign up for our newsletter!');
        this.specialOffersCheckbox = page.getByLabel('Receive special offers from our partners!');

        // Address information
        this.firstNameInput = page.getByLabel('First name *');
        this.lastNameInput = page.getByLabel('Last name *');
        this.companyInput = page.getByLabel('Company', { exact: true });
        this.addressInput = page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)');
        this.address2Input = page.getByLabel('Address 2');
        this.countryDropdown = page.getByLabel('Country *');
        this.stateInput = page.getByLabel('State *');
        this.cityInput = page.getByLabel('City *');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.getByLabel('Mobile Number *');

        // Buttons and messages
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.accountInfoText = page.getByText('Enter Account Information');
    }

    /**
     * Enter signup information (name and email)
     */
    async enterSignupInfo(name: string, email: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
    }

    /**
     * Click signup button
     */
    async clickSignup(): Promise<void> {
        await this.signupButton.click();
    }

    /**
     * Select gender (Mr. or Mrs.)
     */
    async selectGender(gender: 'Mr.' | 'Mrs.'): Promise<void> {
        if (gender === 'Mr.') {
            await this.genderMr.check();
        } else {
            await this.genderMrs.check();
        }
    }

    /**
     * Fill account information (password, DOB, checkboxes)
     */
    async fillAccountInformation(userData: UserData): Promise<void> {
        await this.selectGender('Mr.');
        await this.passwordInput.fill(userData.password);
        await this.fillDateOfBirth('15', '6', '1990');
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();
    }

    /**
     * Fill date of birth
     */
    async fillDateOfBirth(day: string, month: string, year: string): Promise<void> {
        await this.daysDropdown.selectOption(day);
        await this.monthsDropdown.selectOption(month);
        await this.yearsDropdown.selectOption(year);
    }

    /**
     * Fill address information
     */
    async fillAddressInformation(userData: UserData): Promise<void> {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.companyInput.fill(userData.company);
        await this.addressInput.fill(userData.address);

        if (userData.address2) {
            await this.address2Input.fill(userData.address2);
        }

        await this.countryDropdown.selectOption(userData.country);
        await this.stateInput.fill(userData.state);
        await this.cityInput.fill(userData.city);
        await this.zipcodeInput.fill(userData.zipcode);
        await this.mobileNumberInput.fill(userData.mobileNumber);
    }

    /**
     * Click Create Account button
     */
    async clickCreateAccount(): Promise<void> {
        await this.createAccountButton.click();
    }

    /**
     * Complete full registration flow
     */
    async registerUser(userData: UserData): Promise<void> {
        await this.enterSignupInfo(userData.name, userData.email);
        await this.clickSignup();
        await this.fillAccountInformation(userData);
        await this.fillAddressInformation(userData);
        await this.clickCreateAccount();
    }

    /**
     * Get "New User Signup!" text locator (for assertions)
     */
    getNewUserSignupText(): Locator {
        return this.newUserSignupText;
    }

    /**
     * Get "Enter Account Information" text locator (for assertions)
     */
    getAccountInfoText(): Locator {
        return this.accountInfoText;
    }

    /**
     * Get "Email Address already exist!" error locator (for assertions)
     */
    getEmailExistsError(): Locator {
        return this.emailExistsError;
    }
}
