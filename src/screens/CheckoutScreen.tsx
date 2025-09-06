import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../utils/colors';
import { THEME } from '../utils/constants';
import { CartItem } from '../types';

const CheckoutScreen = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      // TODO: Implement actual API call
      // const response = await fetch(`${API_BASE_URL}/cart`);
      // const data = await response.json();
      // setCartItems(data.items || []);
      
      // Mock data for now
      setCartItems([]);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      Alert.alert('Error', 'Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    // Validate form
    const { street, city, state, zipCode, country } = shippingAddress;
    if (!street || !city || !state || !zipCode || !country) {
      Alert.alert('Error', 'Please fill in all shipping address fields');
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    setProcessing(true);
    try {
      // TODO: Implement actual API call
      // const response = await fetch(`${API_BASE_URL}/orders`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: cartItems,
      //     shippingAddress,
      //   }),
      // });
      
      // if (response.ok) {
      //   navigation.navigate('OrderSuccess');
      // } else {
      //   throw new Error('Failed to place order');
      // }
      
      // Mock success for now
      navigation.navigate('OrderSuccess');
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item._id} style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.itemPrice}>₹{item.product.price}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemTotal}>
        ₹{item.product.price * item.quantity}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading checkout...</Text>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={64} color={colors.gray[300]} />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyDescription}>
          Add some items to your cart before checking out.
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Products')}>
          <Text style={styles.browseButtonText}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map(renderCartItem)}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Items ({calculateTotalItems()})</Text>
            <Text style={styles.totalValue}>₹{calculateTotal()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>Free</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total</Text>
            <Text style={styles.finalTotalValue}>₹{calculateTotal()}</Text>
          </View>
        </View>
      </View>

      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your street address"
            placeholderTextColor={colors.gray[400]}
            value={shippingAddress.street}
            onChangeText={(value) => handleInputChange('street', value)}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor={colors.gray[400]}
              value={shippingAddress.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
          </View>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.inputLabel}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="State"
              placeholderTextColor={colors.gray[400]}
              value={shippingAddress.state}
              onChangeText={(value) => handleInputChange('state', value)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.inputLabel}>ZIP Code</Text>
            <TextInput
              style={styles.input}
              placeholder="ZIP Code"
              placeholderTextColor={colors.gray[400]}
              value={shippingAddress.zipCode}
              onChangeText={(value) => handleInputChange('zipCode', value)}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              placeholderTextColor={colors.gray[400]}
              value={shippingAddress.country}
              onChangeText={(value) => handleInputChange('country', value)}
            />
          </View>
        </View>
      </View>

      {/* Place Order Button */}
      <View style={styles.placeOrderContainer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, processing && styles.buttonDisabled]}
          onPress={handlePlaceOrder}
          disabled={processing}>
          <Text style={styles.placeOrderText}>
            {processing ? 'Processing...' : `Place Order - ₹${calculateTotal()}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.xl,
  },
  emptyTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginTop: THEME.spacing.lg,
    marginBottom: THEME.spacing.sm,
  },
  emptyDescription: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: THEME.spacing.xl,
  },
  browseButton: {
    backgroundColor: colors.forest[600],
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  browseButtonText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
  section: {
    backgroundColor: colors.background.primary,
    marginBottom: THEME.spacing.md,
    padding: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  itemPrice: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: THEME.spacing.xs,
  },
  itemQuantity: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
  },
  itemTotal: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
  },
  totalContainer: {
    marginTop: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  totalLabel: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
  },
  totalValue: {
    fontSize: THEME.fontSize.md,
    color: colors.text.primary,
    fontWeight: THEME.fontWeight.medium,
  },
  finalTotal: {
    marginTop: THEME.spacing.sm,
    paddingTop: THEME.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  finalTotalLabel: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
  },
  finalTotalValue: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
  },
  inputContainer: {
    marginBottom: THEME.spacing.lg,
  },
  inputLabel: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    fontSize: THEME.fontSize.md,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  placeOrderContainer: {
    padding: THEME.spacing.lg,
    backgroundColor: colors.background.primary,
  },
  placeOrderButton: {
    backgroundColor: colors.forest[600],
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.gray[300],
  },
  placeOrderText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
  },
});

export default CheckoutScreen;
