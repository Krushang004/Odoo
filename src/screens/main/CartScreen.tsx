import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import { THEME } from '../../utils/constants';
import { CartItem } from '../../types';

const CartScreen = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCartItems();
    setRefreshing(false);
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      // TODO: Implement actual API call
      // await fetch(`${API_BASE_URL}/cart/${productId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ quantity: newQuantity }),
      // });
      
      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      // TODO: Implement actual API call
      // await fetch(`${API_BASE_URL}/cart/${productId}`, { method: 'DELETE' });
      
      setCartItems(prev => prev.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Implement actual API call
              // await fetch(`${API_BASE_URL}/cart`, { method: 'DELETE' });
              setCartItems([]);
            } catch (error) {
              console.error('Error clearing cart:', error);
              Alert.alert('Error', 'Failed to clear cart');
            }
          },
        },
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.images[0] || 'https://via.placeholder.com/100x100/22c55e/ffffff?text=No+Image' }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.itemPrice}>₹{item.product.price}</Text>
        <Text style={styles.itemStatus}>{item.product.status}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.product._id, item.quantity - 1)}>
            <Icon name="remove" size={16} color={colors.forest[600]} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.product._id, item.quantity + 1)}>
            <Icon name="add" size={16} color={colors.forest[600]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.product._id)}>
          <Icon name="delete" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="shopping-cart" size={64} color={colors.gray[300]} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyDescription}>
        Add some items to get started!
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Products')}>
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.cartList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
          
          {/* Cart Summary */}
          <View style={styles.cartSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({calculateTotalItems()})</Text>
              <Text style={styles.summaryValue}>₹{calculateTotal()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryTotal}>₹{calculateTotal()}</Text>
            </View>
            
            <View style={styles.summaryActions}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearCart}>
                <Text style={styles.clearButtonText}>Clear Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
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
  cartList: {
    padding: THEME.spacing.lg,
  },
  cartItem: {
    backgroundColor: colors.background.primary,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
    flexDirection: 'row',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: THEME.borderRadius.md,
  },
  itemInfo: {
    flex: 1,
    marginLeft: THEME.spacing.md,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  itemPrice: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
    marginBottom: THEME.spacing.xs,
  },
  itemStatus: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.forest[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginHorizontal: THEME.spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: THEME.spacing.sm,
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
  cartSummary: {
    backgroundColor: colors.background.primary,
    padding: THEME.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  summaryLabel: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: THEME.fontSize.md,
    color: colors.text.primary,
    fontWeight: THEME.fontWeight.medium,
  },
  summaryTotal: {
    fontSize: THEME.fontSize.lg,
    color: colors.text.primary,
    fontWeight: THEME.fontWeight.bold,
  },
  summaryActions: {
    flexDirection: 'row',
    marginTop: THEME.spacing.lg,
  },
  clearButton: {
    flex: 1,
    paddingVertical: THEME.spacing.md,
    marginRight: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.medium,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    fontWeight: THEME.fontWeight.medium,
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: colors.forest[600],
    paddingVertical: THEME.spacing.md,
    marginLeft: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.inverse,
    fontWeight: THEME.fontWeight.semibold,
  },
});

export default CartScreen;
