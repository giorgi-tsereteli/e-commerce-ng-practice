# Angular Practice

This small project is a practice application built with **Angular** and **Angular Material** to learn and implement angular topics that I covered. It includes a functional e-commerce store with features like product listing, filtering, sorting, a shopping cart, and Stripe integration for payments.

## Features

- **Product Listing**: Displays products fetched from a public API.
- **Filtering and Sorting**: Allows filtering products by category and sorting by price.
- **Shopping Cart**: Add, remove, and update quantities of items in the cart.
- **Stripe Integration**: Secure payment processing using Stripe Checkout.
- **Responsive Design**: Built with Angular Material components for a clean and responsive UI.

## Modules and Components

### Pages
- **Home Page**: Displays products with filtering and sorting options.
- **Cart Page**: Shows cart items with options to update quantities or proceed to checkout.

### Components
- **Header Component**: Displays the navigation bar and cart summary.
- **Filters Component**: Allows filtering products by category.
- **Products Header Component**: Provides sorting and item count options.
- **Product Box Component**: Displays individual product details.

### Services
- **Cart Service**: Manages cart state using `BehaviorSubject`.
- **Store Service**: Fetches products and categories from the API.

### Models
- **Cart Model**: Defines the structure of cart and cart items.
- **Product Model**: Defines the structure of product data.

## Stripe Integration

The application integrates with Stripe for payment processing. It uses the Stripe API to create checkout sessions and redirect users to Stripe's secure payment page.

- **Server**: A Node.js server handles the creation of Stripe checkout sessions.
- **Client**: The Angular app sends cart data to the server and redirects to Stripe for payment.

## Angular and Material Topics Covered

- **Angular Basics**: Components, Modules, Services, and Routing.
- **Reactive Programming**: Using `BehaviorSubject` for state management.
- **HTTP Client**: Fetching data from APIs.
- **Angular Material**: Implementing Material Design components like `MatToolbar`, `MatCard`, `MatGridList`, `MatTable`, and more.
- **Responsive Design**: Using Angular Material's grid system and CSS utilities.
- **Third-Party Libraries**: Integration with Stripe and TailwindCSS.

## How to Use

### Prerequisites
- Node.js and npm
- Angular CLI (`npm install -g @angular/cli`).

### Installation
1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. Start the Node.js server for Stripe integration:
   ```bash
   cd server
   node server.js
   ```
   The server will run on `http://localhost:4242`.

2. Start the Angular development server:
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200`.


## API and Data
- Products and categories are fetched from [Fake Store API](https://fakestoreapi.com).
- Stripe is used for payment processing.

## Future Improvements
- Add user authentication.
- Implement order history and tracking.
- Enhance UI/UX with more animations and transitions.
