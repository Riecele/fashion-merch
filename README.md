# Fashion E-Commerce Single Page Application

A modern, responsive single-page application for fashion e-commerce with a seamless shopping experience.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Application Architecture](#application-architecture)
- [Flowcharts](#flowcharts)
- [Setup and Installation](#setup-and-installation)
- [Contributing](#contributing)

## Technologies Used

### Frontend
- **React.js** - UI component library
- **Redux** - State management
- **Redux Toolkit** - Simplified Redux development
- **React Router** - Navigation management
- **Styled Components** - CSS-in-JS styling

### Backend
- **Firebase** - Cloud database and backend services
- **Firebase Authentication** - User management and authentication
- **Firebase Firestore** - NoSQL document database
- **Firebase Storage** - File storage for product images
- **Firebase Cloud Functions** - Serverless backend logic

### DevOps & Tools
- **Git/GitHub** - Version control
- **Webpack** - Module bundler
- **ESLint/Prettier** - Code quality

## Features
- User authentication
- Product browsing and filtering
- Shopping cart management
- Checkout process
- Order history
- Admin dashboard for inventory management

## Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                     CLIENT SIDE                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │    React    │  │    Redux    │  │   Router    │  │
│  │  Components │◄─┤    Store    │◄─┤   Routes    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└───────────────────────────┬─────────────────────────┘
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────┐
│                     SERVER SIDE                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Express.js │  │  Business   │  │    Auth     │  │
│  │   Routes    │◄─┤   Logic     │◄─┤  Middleware │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└───────────────────────────┬─────────────────────────┘
                            │ Database Operations
                            ▼
┌─────────────────────────────────────────────────────┐
│                      DATABASE                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Users     │  │  Products   │  │   Orders    │  │
│  │ Collection  │  │ Collection  │  │ Collection  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Flowcharts

### User Authentication Flow

```mermaid
flowchart TD
    A[User visits site] --> B{Has account?}
    B -->|No| C[Sign Up Form]
    B -->|Yes| D[Login Form]
    C --> E[Submit user data]
    D --> F[Submit credentials]
    E --> G[Validate data]
    F --> G
    G -->|Valid| H[Generate JWT]
    G -->|Invalid| I[Show error]
    H --> J[Store token]
    J --> K[Redirect to home]
    I --> B
```

### Buying Process Flow

```mermaid
flowchart TD
    A[Browse products] --> B[View product details]
    B --> C[Add to cart]
    C --> D{Continue shopping?}
    D -->|Yes| A
    D -->|No| E[View cart]
    E --> F[Proceed to checkout]
    F --> G[Enter shipping details]
    G --> H[Enter payment info]
    H --> I[Process payment]
    I -->|Success| J[Create order]
    J --> K[Show confirmation]
    I -->|Failure| L[Show error]
    L --> H
```

### Inventory Management Flow

```mermaid
flowchart TD
    A[Admin login] --> B[Access inventory dashboard]
    B --> C{Choose action}
    C --> D[Add product]
    C --> E[Edit product]
    C --> F[Delete product]
    D --> G[Fill product form]
    G --> H[Validate data]
    H -->|Valid| I[Save to database]
    H -->|Invalid| G
    E --> J[Update product info]
    J --> H
    F --> K[Confirm deletion]
    K -->|Confirmed| L[Remove from database]
    K -->|Canceled| B
    I --> M[Update inventory count]
    L --> M
    M --> B
```

### Redux Cart Logic (CRUD Operations)

```mermaid
flowchart TD
    A[Initialize empty cart] --> B{User action}
    B --> C[Add item - CREATE]
    B --> D[View cart - READ]
    B --> E[Update quantity - UPDATE]
    B --> F[Remove item - DELETE]
    
    C --> G[Dispatch ADD_TO_CART action]
    G --> H[Reducer updates store]
    
    D --> I[Select cart items from store]
    I --> J[Render cart component]
    
    E --> K[Dispatch UPDATE_QUANTITY action]
    K --> H
    
    F --> L[Dispatch REMOVE_ITEM action]
    L --> H
    
    H --> M[Persist to localStorage]
    M --> N[Update UI]
    N --> B
```

