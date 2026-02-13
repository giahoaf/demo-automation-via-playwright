import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    // Locators
    private readonly allProductsTitle: Locator;
    private readonly productList: Locator;
    private readonly viewProductFirst: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly searchedProductsTitle: Locator;
    private readonly productItems: Locator;

    constructor(page: Page) {
        super(page);
        this.allProductsTitle = page.getByRole('heading', { name: 'All Products' });
        this.productList = page.locator('.features_items');
        this.viewProductFirst = page.locator('.choose > .nav > li > a').first();
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProductsTitle = page.getByRole('heading', { name: 'Searched Products' });
        this.productItems = page.locator('.single-products');
    }

    async isAllProductsTitleVisible(): Promise<boolean> {
        return await this.allProductsTitle.isVisible();
    }

    async isProductListVisible(): Promise<boolean> {
        return await this.productList.isVisible();
    }

    async clickViewProductOfFirstProduct(): Promise<void> {
        await this.viewProductFirst.click();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async isSearchedProductsTitleVisible(): Promise<boolean> {
        return await this.searchedProductsTitle.isVisible();
    }

    async getSearchedProductsCount(): Promise<number> {
        return await this.productItems.count();
    }

    getAllProductsTitle() { return this.allProductsTitle; }
    getSearchedProductsTitle() { return this.searchedProductsTitle; }
}
