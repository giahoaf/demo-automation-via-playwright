import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProductInfo {
    name: string;
    category: string;
    price: string;
    availability: string;
    condition: string;
    brand: string;
}

export class ProductDetailPage extends BasePage {
    // Locators
    private readonly productName: Locator;
    private readonly productCategory: Locator;
    private readonly productPrice: Locator;
    private readonly productAvailability: Locator;
    private readonly productCondition: Locator;
    private readonly productBrand: Locator;

    constructor(page: Page) {
        super(page);
        const detailInfo = page.locator('.product-information');
        this.productName = detailInfo.locator('h2');
        this.productCategory = detailInfo.locator('p').filter({ hasText: 'Category:' });
        this.productPrice = detailInfo.locator('span > span').filter({ hasText: 'Rs.' });
        this.productAvailability = detailInfo.locator('p').filter({ hasText: 'Availability:' });
        this.productCondition = detailInfo.locator('p').filter({ hasText: 'Condition:' });
        this.productBrand = detailInfo.locator('p').filter({ hasText: 'Brand:' });
    }

    async getProductInfo(): Promise<ProductInfo> {
        return {
            name: await this.productName.innerText(),
            category: await this.productCategory.innerText(),
            price: await this.productPrice.innerText(),
            availability: await this.productAvailability.innerText(),
            condition: await this.productCondition.innerText(),
            brand: await this.productBrand.innerText(),
        };
    }

    getProductNameLocator() { return this.productName; }
}
