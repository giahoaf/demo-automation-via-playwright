# Manual Test Cases - AutomationExercise.com

> Source: https://automationexercise.com/test_cases
> 
> This document contains 26 manual test cases for practicing automation testing on AutomationExercise.com e-commerce website.

---

## Test Cases Summary

| TC ID | Test Case Name | Priority | Steps | Category |
|-------|---------------|----------|-------|----------|
| TC_001 | Register User | High | 18 | Authentication |
| TC_002 | Login User with correct email and password | High | 10 | Authentication |
| TC_003 | Login User with incorrect email and password | Medium | 8 | Authentication |
| TC_004 | Logout User | Medium | 10 | Authentication |
| TC_005 | Register User with existing email | Medium | 8 | Authentication |
| TC_006 | Contact Us Form | Medium | 11 | Communication |
| TC_007 | Verify Test Cases Page | Low | 5 | Navigation |
| TC_008 | Verify All Products and product detail page | High | 9 | Products |
| TC_009 | Search Product | High | 8 | Products |
| TC_010 | Verify Subscription in home page | Medium | 7 | Subscription |
| TC_011 | Verify Subscription in Cart page | Medium | 8 | Subscription |
| TC_012 | Add Products in Cart | High | 10 | Shopping Cart |
| TC_013 | Verify Product quantity in Cart | Medium | 9 | Shopping Cart |
| TC_014 | Place Order: Register while Checkout | Critical | 20 | Checkout |
| TC_015 | Place Order: Register before Checkout | Critical | 18 | Checkout |
| TC_016 | Place Order: Login before Checkout | Critical | 17 | Checkout |
| TC_017 | Remove Products From Cart | Medium | 8 | Shopping Cart |
| TC_018 | View Category Products | Medium | 8 | Products |
| TC_019 | View & Cart Brand Products | Medium | 8 | Products |
| TC_020 | Search Products and Verify Cart After Login | High | 12 | Shopping Cart |
| TC_021 | Add review on product | Low | 9 | Products |
| TC_022 | Add to cart from Recommended items | Medium | 7 | Shopping Cart |
| TC_023 | Verify address details in checkout page | High | 11+ | Checkout |
| TC_024 | Download Invoice after purchase order | Medium | TBD | Orders |
| TC_025 | Verify Scroll Up using 'Arrow' button | Low | TBD | Navigation |
| TC_026 | Verify Scroll Up without 'Arrow' button | Low | TBD | Navigation |

---

## TC_001: Register User

**Test ID:** TC_REG_001  
**Title:** Verify successful user registration with valid details  
**Feature/Module:** User Registration  
**Priority:** High  
**Type:** Functional, Smoke

**Preconditions:**
- Browser is installed and working
- Internet connection is available
- No existing account with test email

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and email address
7. Click 'Signup' button
8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
9. Fill details: Title, Name, Email, Password, Date of birth
10. Select checkbox 'Sign up for our newsletter!'
11. Select checkbox 'Receive special offers from our partners!'
12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
13. Click 'Create Account button'
14. Verify that 'ACCOUNT CREATED!' is visible
15. Click 'Continue' button
16. Verify that 'Logged in as username' is visible
17. Click 'Delete Account' button
18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

**Expected Result:**
- User account is created successfully
- Welcome message displays username
- Account can be deleted after creation

**Test Data:**
- Name: [Any valid name]
- Email: [Unique email address]
- Password: [Strong password]
- DOB: [Valid date]
- Address: [Valid address details]

**Postconditions:**
- Account is deleted (cleanup)
- No data remains in system

---

## TC_002: Login User with correct email and password

**Test ID:** TC_LOGIN_001  
**Title:** Verify successful login with valid credentials  
**Feature/Module:** User Login  
**Priority:** High  
**Type:** Functional, Smoke

**Preconditions:**
- User account exists with valid credentials
- User is not already logged in

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Delete Account' button
10. Verify that 'ACCOUNT DELETED!' is visible

**Expected Result:**
- User logs in successfully
- Username displays in header
- User can delete account

**Test Data:**
- Email: [Valid registered email]
- Password: [Correct password]

**Postconditions:**
- Account is deleted

---

## TC_003: Login User with incorrect email and password

**Test ID:** TC_LOGIN_002  
**Title:** Verify error message for invalid login credentials  
**Feature/Module:** User Login  
**Priority:** Medium  
**Type:** Functional, Negative

**Preconditions:**
- Browser is installed
- User is on homepage

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter incorrect email address and password
7. Click 'login' button
8. Verify error 'Your email or password is incorrect!' is visible

**Expected Result:**
- Login fails
- Error message displays: "Your email or password is incorrect!"
- User remains on login page

**Test Data:**
- Email: invalid@test.com
- Password: wrongpassword123

**Postconditions:**
- User not logged in

---

## TC_004: Logout User

**Test ID:** TC_LOGOUT_001  
**Title:** Verify successful user logout  
**Feature/Module:** User Logout  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- User has valid account
- User is logged in

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Logout' button
10. Verify that user is navigated to login page

**Expected Result:**
- User logs out successfully
- Redirected to login page
- Session is cleared

**Test Data:**
- Email: [Valid email]
- Password: [Valid password]

**Postconditions:**
- User session ended
- User not logged in

---

## TC_005: Register User with existing email

**Test ID:** TC_REG_002  
**Title:** Verify error when registering with existing email  
**Feature/Module:** User Registration  
**Priority:** Medium  
**Type:** Functional, Negative

**Preconditions:**
- An account already exists with test email

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and already registered email address
7. Click 'Signup' button
8. Verify error 'Email Address already exist!' is visible

**Expected Result:**
- Registration fails
- Error message: "Email Address already exist!"
- User stays on signup page

**Test Data:**
- Name: Test User
- Email: [Already registered email]

**Postconditions:**
- No new account created

---

## TC_006: Contact Us Form

**Test ID:** TC_CONTACT_001  
**Title:** Verify Contact Us form submission  
**Feature/Module:** Contact Form  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Browser is working
- Internet connection available

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Contact Us' button
5. Verify 'GET IN TOUCH' is visible
6. Enter name, email, subject and message
7. Upload file
8. Click 'Submit' button
9. Click OK button
10. Verify success message 'Success! Your details have been submitted successfully.' is visible
11. Click 'Home' button and verify that landed to home page successfully

**Expected Result:**
- Form submits successfully
- Success message displays
- User redirected to homepage

**Test Data:**
- Name: Test User
- Email: test@example.com
- Subject: Test Subject
- Message: Test message content
- File: [Any file to upload]

**Postconditions:**
- Form submission recorded
- User on homepage

---

## TC_007: Verify Test Cases Page

**Test ID:** TC_NAV_001  
**Title:** Verify navigation to Test Cases page  
**Feature/Module:** Navigation  
**Priority:** Low  
**Type:** Functional

**Preconditions:**
- User on homepage

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Test Cases' button
5. Verify user is navigated to test cases page successfully

**Expected Result:**
- Test Cases page loads
- URL contains /test_cases

**Test Data:**
- None required

**Postconditions:**
- User on test cases page

---

## TC_008: Verify All Products and product detail page

**Test ID:** TC_PROD_001  
**Title:** Verify product listing and detail page  
**Feature/Module:** Products  
**Priority:** High  
**Type:** Functional

**Preconditions:**
- Products exist in database

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. The products list is visible
7. Click on 'View Product' of first product
8. User is landed to product detail page
9. Verify that detail is visible: product name, category, price, availability, condition, brand

**Expected Result:**
- Products list displays
- Product detail page shows complete information
- All product attributes visible

**Test Data:**
- None required

**Postconditions:**
- User on product detail page

---

## TC_009: Search Product

**Test ID:** TC_SEARCH_001  
**Title:** Verify product search functionality  
**Feature/Module:** Search  
**Priority:** High  
**Type:** Functional

**Preconditions:**
- Products exist in system

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8. Verify all the products related to search are visible

**Expected Result:**
- Search results display
- Results match search term
- "SEARCHED PRODUCTS" title visible

**Test Data:**
- Search term: [Any product name, e.g., "Top", "Jeans", "Dress"]

**Postconditions:**
- User on search results page

---

## TC_010: Verify Subscription in home page

**Test ID:** TC_SUB_001  
**Title:** Verify email subscription from homepage  
**Feature/Module:** Newsletter Subscription  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- User on homepage

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down to footer
5. Verify text 'SUBSCRIPTION'
6. Enter email address in input and click arrow button
7. Verify success message 'You have been successfully subscribed!' is visible

**Expected Result:**
- Subscription successful
- Success message displays

**Test Data:**
- Email: test@example.com

**Postconditions:**
- Email subscribed to newsletter

---

## TC_011: Verify Subscription in Cart page

**Test ID:** TC_SUB_002  
**Title:** Verify email subscription from cart page  
**Feature/Module:** Newsletter Subscription  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- User can access cart page

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Cart' button
5. Scroll down to footer
6. Verify text 'SUBSCRIPTION'
7. Enter email address in input and click arrow button
8. Verify success message 'You have been successfully subscribed!' is visible

**Expected Result:**
- Subscription successful from cart page
- Success message displays

**Test Data:**
- Email: test@example.com

**Postconditions:**
- Email subscribed

---

## TC_012: Add Products in Cart

**Test ID:** TC_CART_001  
**Title:** Verify adding multiple products to cart  
**Feature/Module:** Shopping Cart  
**Priority:** High  
**Type:** Functional

**Preconditions:**
- Products available in catalog

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Products' button
5. Hover over first product and click 'Add to cart'
6. Click 'Continue Shopping' button
7. Hover over second product and click 'Add to cart'
8. Click 'View Cart' button
9. Verify both products are added to Cart
10. Verify their prices, quantity and total price

**Expected Result:**
- Both products in cart
- Prices displayed correctly
- Quantities correct
- Total calculated properly

**Test Data:**
- Product 1: First product in list
- Product 2: Second product in list

**Postconditions:**
- Cart contains 2 products

---

## TC_013: Verify Product quantity in Cart

**Test ID:** TC_CART_002  
**Title:** Verify product quantity can be increased  
**Feature/Module:** Shopping Cart  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Products available

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'View Product' for any product on home page
5. Verify product detail is opened
6. Increase quantity to 4
7. Click 'Add to cart' button
8. Click 'View Cart' button
9. Verify that product is displayed in cart page with exact quantity

**Expected Result:**
- Product added with quantity 4
- Quantity displays correctly in cart

**Test Data:**
- Quantity: 4

**Postconditions:**
- Cart has 1 product with quantity 4

---

## TC_014: Place Order: Register while Checkout

**Test ID:** TC_ORDER_001  
**Title:** Verify order placement with registration during checkout  
**Feature/Module:** Checkout & Payment  
**Priority:** Critical  
**Type:** Functional, E2E

**Preconditions:**
- Products available
- No existing account with test email

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click Proceed To Checkout
8. Click 'Register / Login' button
9. Fill all details in Signup and create account
10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
11. Verify 'Logged in as username' at top
12. Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify success message 'Your order has been placed successfully!'
19. Click 'Delete Account' button
20. Verify 'ACCOUNT DELETED!' and click 'Continue' button

**Expected Result:**
- Account created during checkout
- Order placed successfully
- Payment processed
- Confirmation message displays

**Test Data:**
- User details: [New user information]
- Payment: Name on Card, Card Number, CVC, Expiry

**Postconditions:**
- Order placed
- Account deleted

---

## TC_015: Place Order: Register before Checkout

**Test ID:** TC_ORDER_002  
**Title:** Verify order placement with pre-registration  
**Feature/Module:** Checkout & Payment  
**Priority:** Critical  
**Type:** Functional, E2E

**Preconditions:**
- Products available

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify 'Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify Address Details and Review Your Order
13. Enter description in comment text area and click 'Place Order'
14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
15. Click 'Pay and Confirm Order' button
16. Verify success message 'Your order has been placed successfully!'
17. Click 'Delete Account' button
18. Verify 'ACCOUNT DELETED!' and click 'Continue' button

**Expected Result:**
- Account created first
- Order placed with existing account
- Payment successful
- Order confirmation received

**Test Data:**
- User registration: [New user details]
- Payment: Card details

**Postconditions:**
- Order completed
- Account deleted

---

## TC_016: Place Order: Login before Checkout

**Test ID:** TC_ORDER_003  
**Title:** Verify order placement with existing logged-in user  
**Feature/Module:** Checkout & Payment  
**Priority:** Critical  
**Type:** Functional, E2E

**Preconditions:**
- User account already exists

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill email, password and click 'Login' button
6. Verify 'Logged in as username' at top
7. Add products to cart
8. Click 'Cart' button
9. Verify that cart page is displayed
10. Click Proceed To Checkout
11. Verify Address Details and Review Your Order
12. Enter description in comment text area and click 'Place Order'
13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
14. Click 'Pay and Confirm Order' button
15. Verify success message 'Your order has been placed successfully!'
16. Click 'Delete Account' button
17. Verify 'ACCOUNT DELETED!' and click 'Continue' button

**Expected Result:**
- Logged in user can checkout
- Order placed successfully
- Payment processed

**Test Data:**
- Login: [Existing credentials]
- Payment: Card details

**Postconditions:**
- Order placed
- Account deleted

---

## TC_017: Remove Products From Cart

**Test ID:** TC_CART_003  
**Title:** Verify removing product from cart  
**Feature/Module:** Shopping Cart  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Products in cart

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click 'X' button corresponding to particular product
8. Verify that product is removed from the cart

**Expected Result:**
- Product removed from cart
- Cart updates correctly
- **Total price recalculated

**Test Data:**
- Product: [Any product]

**Postconditions:**
- Product not in cart

---

## TC_018: View Category Products

**Test ID:** TC_CAT_001  
**Title:** Verify category filtering  
**Feature/Module:** Product Categories  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Categories exist with products

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that categories are visible on left side bar
4. Click on 'Women' category
5. Click on any category link under 'Women' category, for example: Dress
6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
7. On left side bar, click on any sub-category link of 'Men' category
8. Verify that user is navigated to that category page

**Expected Result:**
- Category products display
- Filter works correctly
- Navigation between categories works

**Test Data:**
- Category: Women > Dress
- Category: Men > [Any subcategory]

**Postconditions:**
- User on category page

---

## TC_019: View & Cart Brand Products

**Test ID:** TC_BRAND_001  
**Title:** Verify brand filtering  
**Feature/Module:** Product Brands  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Brands exist with products

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify that Brands are visible on left side bar
5. Click on any brand name
6. Verify that user is navigated to brand page and brand products are displayed
7. On left side bar, click on any other brand link
8. Verify that user is navigated to that brand page and can see products

**Expected Result:**
- Brand products display
- Brand filter works
- Navigation between brands works

**Test Data:**
- Brand 1: [Any brand, e.g., Polo]
- Brand 2: [Another brand, e.g., H&M]

**Postconditions:**
- User on brand page

---

## TC_020: Search Products and Verify Cart After Login

**Test ID:** TC_CART_004  
**Title:** Verify cart persistence after user login  
**Feature/Module:** Shopping Cart  
**Priority:** High  
**Type:** Functional

**Preconditions:**
- User account exists
- Products available

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify user is navigated to ALL PRODUCTS page successfully
5. Enter product name in search input and click search button
6. Verify 'SEARCHED PRODUCTS' is visible
7. Verify all the products related to search are visible
8. Add those products to cart
9. Click 'Cart' button and verify that products are visible in cart
10. Click 'Signup / Login' button and submit login details
11. Again, go to Cart page
12. Verify that those products are visible in cart after login as well

**Expected Result:**
- Products added to cart before login
- Cart persists after login
- All products still in cart

**Test Data:**
- Search term: [Product name]
- Login: [Valid credentials]

**Postconditions:**
- User logged in
- Cart has products

---

## TC_021: Add review on product

**Test ID:** TC_REVIEW_001  
**Title:** Verify adding product review  
**Feature/Module:** Product Reviews  
**Priority:** Low  
**Type:** Functional

**Preconditions:**
- Products available

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify user is navigated to ALL PRODUCTS page successfully
5. Click on 'View Product' button
6. Verify 'Write Your Review' is visible
7. Enter name, email and review
8. Click 'Submit' button
9. Verify success message 'Thank you for your review.'

**Expected Result:**
- Review form submits
- Success message displays
- Review added

**Test Data:**
- Name: Test Reviewer
- Email: reviewer@test.com
- Review: "Great product!"

**Postconditions:**
- Review submitted

---

## TC_022: Add to cart from Recommended items

**Test ID:** TC_CART_005  
**Title:** Verify adding recommended products to cart  
**Feature/Module:** Shopping Cart  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Recommended items exist

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Scroll to bottom of page
4. Verify 'RECOMMENDED ITEMS' are visible
5. Click on 'Add To Cart' on Recommended product
6. Click on 'View Cart' button
7. Verify that product is displayed in cart page

**Expected Result:**
- Recommended items visible
- Product added to cart
- Cart displays product

**Test Data:**
- Product: [Any recommended item]

**Postconditions:**
- Cart contains recommended product

---

## TC_023: Verify address details in checkout page

**Test ID:** TC_ADDR_001  
**Title:** Verify delivery and billing address in checkout  
**Feature/Module:** Checkout  
**Priority:** High  
**Type:** Functional

**Preconditions:**
- User can create account

**Test Steps:**
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify 'Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify that delivery address matches the address filled during registration
13. Verify that billing address matches the address filled during registration
14. Click 'Delete Account' button
15. Verify 'ACCOUNT DELETED!' and click 'Continue' button

**Expected Result:**
- Delivery address correct
- Billing address correct
- Addresses match registration data

**Test Data:**
- User details: [Complete address information]

**Postconditions:**
- Account deleted

---

## TC_024: Download Invoice after purchase order

**Test ID:** TC_INV_001  
**Title:** Verify invoice download after order  
**Feature/Module:** Orders  
**Priority:** Medium  
**Type:** Functional

**Preconditions:**
- Order placed successfully

**Test Steps:**
(Steps to be defined based on website functionality)

**Expected Result:**
- Invoice downloads successfully
- Invoice contains order details

**Test Data:**
- Order ID: [Completed order]

**Postconditions:**
- Invoice file downloaded

---

## TC_025: Verify Scroll Up using 'Arrow' button

**Test ID:** TC_NAV_002  
**Title:** Verify scroll to top functionality  
**Feature/Module:** Navigation  
**Priority:** Low  
**Type:** Functional

**Preconditions:**
- Page has scroll

**Test Steps:**
(Steps to be defined)

**Expected Result:**
- Scroll to top button works
- Page scrolls to top

**Test Data:**
- None

**Postconditions:**
- User at top of page

---

## TC_026: Verify Scroll Up without 'Arrow' button

**Test ID:** TC_NAV_003  
**Title:** Verify scrolling to top without arrow button  
**Feature/Module:** Navigation  
**Priority:** Low  
**Type:** Functional

**Preconditions:**
- Page has scroll

**Test Steps:**
(Steps to be defined)

**Expected Result:**
- User can scroll to top manually

**Test Data:**
- None

**Postconditions:**
- User at top of page

---

## Test Automation Priority

### **Phase 1 - Critical (Must Automate First):**
- TC_001: Register User
- TC_002: Login with correct credentials
- TC_003: Login with incorrect credentials
- TC_014: Place Order - Register while Checkout
- TC_015: Place Order - Register before Checkout
- TC_016: Place Order - Login before Checkout

### **Phase 2 - High Priority:**
- TC_008: Verify All Products
- TC_009: Search Product
- TC_012: Add Products in Cart
- TC_020: Search and Cart After Login
- TC_023: Verify address in checkout

### **Phase 3 - Medium Priority:**
- TC_004: Logout User
- TC_005: Register with existing email
- TC_006: Contact Us Form
- TC_010: Subscription in home page
- TC_011: Subscription in cart page
- TC_013: Product quantity in cart
- TC_017: Remove from cart
- TC_018: View Category Products
- TC_019: View Brand Products
- TC_022: Add from Recommended items

### **Phase 4 - Low Priority:**
- TC_007: Verify Test Cases Page
- TC_021: Add product review
- TC_024: Download Invoice
- TC_025: Scroll up with arrow
- TC_026: Scroll up without arrow

---

## Notes

- All test cases use base URL: http://automationexercise.com
- Most test cases include account deletion as cleanup
- Test data should be unique for each test run where applicable
- Some test cases (TC_024, TC_025, TC_026) require detailed steps to be added

**Created:** 2026-02-02  
**Source:** AutomationExercise.com official test cases  
**Format:** Following Manual Test Case Writing Skill standards
