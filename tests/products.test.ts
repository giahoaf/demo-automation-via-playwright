/**
 * Products Module Tests
 * 
 * Test Cases:
 * - TC_008: Verify All Products and product detail page (9 steps)
 * - TC_009: Search Product (8 steps)
 * 
 * @see test-cases/AutomationExercise_TestCases.md
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Products Module', () => {

    /**
     * TC_008: Verify All Products and product detail page
     * Priority: High | Steps: 9
     */
    test('TC_008: Verify All Products and product detail page', async ({ page }) => {
        // 1. Setup - Initialize page objects and navigate
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const productDetailPage = new ProductDetailPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Action - Navigate to Products page
        await homePage.clickProducts();

        // Verify "ALL PRODUCTS" page loaded
        await expect(productsPage.getAllProductsTitle()).toBeVisible();
        expect(await productsPage.isProductListVisible()).toBeTruthy();

        // 3. Screenshot - Products List
        await page.screenshot({ path: 'screenshots/products/tc008-products-list.png', fullPage: true });

        // Action - View first product
        await productsPage.clickViewProductOfFirstProduct();

        // 4. Assert - Verify product details
        await expect(productDetailPage.getProductNameLocator()).toBeVisible();

        const info = await productDetailPage.getProductInfo();
        console.log('Product Info:', info);

        expect(info.name).not.toBe('');
        expect(info.category).toContain('Category:');
        expect(info.price).toContain('Rs.');
        expect(info.availability).toContain('Availability:');
        expect(info.condition).toContain('Condition:');
        expect(info.brand).toContain('Brand:');

        // 5. Screenshot - Product Detail
        await page.screenshot({ path: 'screenshots/products/tc008-product-detail.png', fullPage: true });

        // 6. Log
        console.log('✅ TC_008: Products and Detail page verified successfully');
    });

    /**
     * TC_009: Search Product
     * Priority: High | Steps: 8
     */
    test('TC_009: Search Product', async ({ page }) => {
        // 1. Setup
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);

        await homePage.goto();

        // 2. Action - Navigate to Products
        await homePage.clickProducts();
        await expect(productsPage.getAllProductsTitle()).toBeVisible();

        // Search for a product
        const searchTerm = 'Blue Top';
        await productsPage.searchProduct(searchTerm);

        // 3. Assert - Verify searched products
        await expect(productsPage.getSearchedProductsTitle()).toBeVisible();
        const count = await productsPage.getSearchedProductsCount();
        expect(count).toBeGreaterThan(0);

        // 4. Screenshot - Search Results
        await page.screenshot({ path: 'screenshots/products/tc009-search-results.png', fullPage: true });

        // 5. Log
        console.log(`✅ TC_009: Search for "${searchTerm}" returned ${count} results`);
    });

});
