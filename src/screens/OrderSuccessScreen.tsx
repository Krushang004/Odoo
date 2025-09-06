import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../utils/colors';
import { THEME } from '../utils/constants';

const OrderSuccessScreen = ({ navigation }: any) => {
  const handleContinueShopping = () => {
    navigation.navigate('Products');
  };

  const handleViewOrders = () => {
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={80} color={colors.success} />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Thank you for your purchase. Your order has been confirmed and the seller will be notified.
        </Text>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>#ECF-2024-001</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={styles.detailValue}>₹0.00</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>3-5 business days</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinueShopping}>
            <Text style={styles.primaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewOrders}>
            <Text style={styles.secondaryButtonText}>View My Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What's Next?</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Icon name="notifications" size={20} color={colors.forest[600]} />
              <Text style={styles.infoText}>You'll receive order updates via email</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="local-shipping" size={20} color={colors.forest[600]} />
              <Text style={styles.infoText}>Seller will prepare and ship your items</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="support" size={20} color={colors.forest[600]} />
              <Text style={styles.infoText}>Contact support if you have any questions</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.xl,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  title: {
    fontSize: THEME.fontSize.xxl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: THEME.spacing.md,
  },
  subtitle: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: THEME.spacing.xl,
  },
  orderDetails: {
    backgroundColor: colors.background.primary,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  detailLabel: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
  },
  detailValue: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
  },
  actionButtons: {
    marginBottom: THEME.spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.forest[600],
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
  secondaryButton: {
    backgroundColor: colors.background.primary,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  secondaryButtonText: {
    color: colors.text.primary,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
  infoContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
  },
  infoTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.md,
  },
  infoList: {
    gap: THEME.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    marginLeft: THEME.spacing.md,
    flex: 1,
  },
});

export default OrderSuccessScreen;
