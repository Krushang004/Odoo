import { colors } from './colors';

export const API_BASE_URL = 'http://localhost:3000/api'; // Your Next.js API URL

export const SCREEN_NAMES = {
  // Auth Stack
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  
  // Main Tabs
  HOME: 'Home',
  PRODUCTS: 'Products',
  CART: 'Cart',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
  
  // Stack Screens
  PRODUCT_DETAIL: 'ProductDetail',
  CHECKOUT: 'Checkout',
  ORDER_SUCCESS: 'OrderSuccess',
} as const;

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Other',
] as const;

export const PRODUCT_CONDITIONS = [
  'new',
  'like-new',
  'good',
  'fair',
  'poor',
] as const;

export const ORDER_STATUS = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export const THEME = {
  colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export default THEME;
