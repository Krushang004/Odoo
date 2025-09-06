import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import { THEME } from '../../utils/constants';
import { Order } from '../../types';

const OrdersScreen = ({ navigation }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      // TODO: Implement actual API call
      // const response = await fetch(`${API_BASE_URL}/orders?type=${activeTab}`);
      // const data = await response.json();
      // setOrders(data);
      
      // Mock data for now
      setOrders([]);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'confirmed':
        return colors.info;
      case 'shipped':
        return colors.ocean[600];
      case 'delivered':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray[500];
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderTitle}>
            {item.product ? item.product.title : 'Product No Longer Available'}
          </Text>
          <Text style={styles.orderSubtitle}>
            {activeTab === 'buyer' ? 'Seller' : 'Buyer'}: {activeTab === 'buyer' ? item.seller.name : item.buyer.name}
          </Text>
        </View>
        <View style={styles.orderMeta}>
          <Text style={styles.orderPrice}>₹{item.totalPrice}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      {item.product && (
        <View style={styles.productInfo}>
          <Image
            source={{ uri: item.product.images[0] || 'https://via.placeholder.com/60x60/22c55e/ffffff?text=No+Image' }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {item.product.title}
            </Text>
            <Text style={styles.productPrice}>₹{item.product.price}</Text>
            <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
          </View>
        </View>
      )}

      <View style={styles.orderFooter}>
        <Text style={styles.orderDate}>
          Ordered on {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        {activeTab === 'buyer' && (
          <Text style={styles.shippingAddress} numberOfLines={2}>
            {item.shippingAddress.street}, {item.shippingAddress.city}, {item.shippingAddress.state} {item.shippingAddress.zipCode}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="receipt" size={64} color={colors.gray[300]} />
      <Text style={styles.emptyTitle}>
        {activeTab === 'buyer' ? 'No purchases yet' : 'No sales yet'}
      </Text>
      <Text style={styles.emptyDescription}>
        {activeTab === 'buyer'
          ? 'Start shopping to see your purchases here'
          : 'List products to start selling'}
      </Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate(activeTab === 'buyer' ? 'Products' : 'Profile')}>
        <Text style={styles.actionButtonText}>
          {activeTab === 'buyer' ? 'Browse Products' : 'List a Product'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'buyer' && styles.activeTab]}
          onPress={() => setActiveTab('buyer')}>
          <Text style={[styles.tabText, activeTab === 'buyer' && styles.activeTabText]}>
            Purchases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'seller' && styles.activeTab]}
          onPress={() => setActiveTab('seller')}>
          <Text style={[styles.tabText, activeTab === 'seller' && styles.activeTabText]}>
            Sales
          </Text>
        </TouchableOpacity>
      </View>

      {orders.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.ordersList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: THEME.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.forest[600],
  },
  tabText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    fontWeight: THEME.fontWeight.medium,
  },
  activeTabText: {
    color: colors.forest[600],
    fontWeight: THEME.fontWeight.semibold,
  },
  ordersList: {
    padding: THEME.spacing.lg,
  },
  orderCard: {
    backgroundColor: colors.background.primary,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  orderInfo: {
    flex: 1,
    marginRight: THEME.spacing.md,
  },
  orderTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  orderSubtitle: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
  },
  orderMeta: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
    marginBottom: THEME.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
  },
  statusText: {
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.semibold,
    textTransform: 'capitalize',
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.md,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: THEME.borderRadius.md,
    marginRight: THEME.spacing.md,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  productPrice: {
    fontSize: THEME.fontSize.sm,
    color: colors.forest[600],
    fontWeight: THEME.fontWeight.semibold,
    marginBottom: THEME.spacing.xs,
  },
  quantityText: {
    fontSize: THEME.fontSize.xs,
    color: colors.text.secondary,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: THEME.spacing.md,
  },
  orderDate: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: THEME.spacing.xs,
  },
  shippingAddress: {
    fontSize: THEME.fontSize.sm,
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
  actionButton: {
    backgroundColor: colors.forest[600],
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  actionButtonText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
});

export default OrdersScreen;
