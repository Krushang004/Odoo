# EcoFinds Mobile App

A React Native mobile application for EcoFinds - a sustainable second-hand marketplace. This app provides the same functionality as the web application with a native mobile experience.

## Features

### 🔐 Authentication
- Sign In / Sign Up screens
- User profile management
- Secure authentication flow

### 🛍️ Product Management
- Browse products with filtering and search
- Product detail view with image gallery
- Category-based filtering
- Price sorting options

### 🛒 Shopping Cart
- Add/remove items from cart
- Quantity management
- Cart persistence
- Checkout process

### 📦 Orders
- View purchase history
- Track order status
- Seller order management
- Order details and shipping information

### 👤 Profile
- User profile management
- Account settings
- Product listing management
- App preferences

## Design System

### Colors
The app uses the same color palette as the web application:
- **Primary Green**: `#22c55e` (Forest Green)
- **Secondary Blue**: `#0ea5e9` (Ocean Blue)
- **Neutral Grays**: Various shades for text and backgrounds
- **Status Colors**: Success, warning, error, and info colors

### Typography
- **Font Sizes**: 12px to 32px scale
- **Font Weights**: Normal (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights**: Optimized for mobile readability

### Spacing
- **Consistent spacing scale**: 4px, 8px, 16px, 24px, 32px, 48px
- **Component padding**: Standardized across all screens
- **Margin system**: Consistent vertical and horizontal spacing

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── main/          # Main app screens
│   └── ...            # Other screens
├── navigation/         # Navigation configuration
├── contexts/          # React contexts (Cart, Auth, etc.)
├── services/          # API services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions and constants
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **iOS Setup (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run the app:**
   ```bash
   # Android
   npx react-native run-android
   
   # iOS
   npx react-native run-ios
   ```

### Development

The app is built with:
- **React Native 0.81.1**
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Vector Icons** for icons
- **AsyncStorage** for local data persistence

## API Integration

The app is designed to work with the EcoFinds web API. Update the `API_BASE_URL` in `src/utils/constants.ts` to point to your backend:

```typescript
export const API_BASE_URL = 'https://your-api-domain.com/api';
```

## Features Implementation Status

### ✅ Completed
- [x] Project setup and navigation
- [x] Authentication screens (UI only)
- [x] Home screen with featured products
- [x] Products listing with filters
- [x] Product detail screen
- [x] Shopping cart functionality
- [x] Orders management
- [x] User profile screen
- [x] Checkout process
- [x] Order success screen
- [x] EcoFinds branding and colors

### 🚧 TODO (API Integration)
- [ ] Connect authentication to backend
- [ ] Implement product API calls
- [ ] Add cart persistence
- [ ] Connect orders to backend
- [ ] Add image upload functionality
- [ ] Implement push notifications
- [ ] Add offline support

## Customization

### Colors
Update colors in `src/utils/colors.ts` to match your brand:

```typescript
export const colors = {
  primary: {
    500: '#your-primary-color',
    // ... other shades
  },
  // ... other color groups
};
```

### Typography
Modify typography in `src/utils/constants.ts`:

```typescript
export const THEME = {
  fontSize: {
    xs: 12,
    sm: 14,
    // ... customize as needed
  },
  // ... other typography settings
};
```

## Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
1. Open `ios/EcoFindsApp.xcworkspace` in Xcode
2. Select "Generic iOS Device" as target
3. Product → Archive
4. Follow the distribution process

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the EcoFinds marketplace ecosystem.

## Support

For support and questions, please contact the development team or create an issue in the repository.