import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../utils/colors';
import { THEME } from '../utils/constants';
import { Product } from '../types';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      // TODO: Implement actual API call
      // const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      // const data = await response.json();
      // setProduct(data);
      
      // Mock data for now
      setProduct(null);
    } catch (error) {
      console.error('Error fetching product:', error);
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      // TODO: Implement actual API call
      // await fetch(`${API_BASE_URL}/cart`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ productId, quantity: 1 }),
      // });
      
      Alert.alert('Success', 'Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  const buyNow = () => {
    // TODO: Implement buy now functionality
    navigation.navigate('Checkout');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error" size={64} color={colors.gray[300]} />
        <Text style={styles.errorTitle}>Product not found</Text>
        <Text style={styles.errorDescription}>
          The product you're looking for doesn't exist or has been removed.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Product Images */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[currentImageIndex] || 'https://via.placeholder.com/400x400/22c55e/ffffff?text=No+Image' }}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <View style={styles.imageDots}>
            {product.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  index === currentImageIndex && styles.activeDot,
                ]}
                onPress={() => setCurrentImageIndex(index)}
              />
            ))}
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>₹{product.price}</Text>
        </View>

        <View style={styles.productMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Category</Text>
            <Text style={styles.metaValue}>{product.category}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Condition</Text>
            <Text style={styles.metaValue}>{product.condition}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.metaValue}>{product.status}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        <View style={styles.sellerContainer}>
          <Text style={styles.sellerTitle}>Seller Information</Text>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatar}>
              <Icon name="person" size={24} color={colors.forest[600]} />
            </View>
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{product.seller.name}</Text>
              <Text style={styles.sellerEmail}>{product.seller.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={addToCart}>
          <Icon name="shopping-cart" size={24} color={colors.text.inverse} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={buyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.xl,
  },
  errorTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginTop: THEME.spacing.lg,
    marginBottom: THEME.spacing.sm,
  },
  errorDescription: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: THEME.spacing.xl,
  },
  backButton: {
    backgroundColor: colors.forest[600],
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  backButtonText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: width,
  },
  imageDots: {
    position: 'absolute',
    bottom: THEME.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.inverse,
    opacity: 0.5,
    marginHorizontal: THEME.spacing.xs,
  },
  activeDot: {
    opacity: 1,
  },
  productInfo: {
    backgroundColor: colors.background.primary,
    padding: THEME.spacing.lg,
  },
  productHeader: {
    marginBottom: THEME.spacing.lg,
  },
  productTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.sm,
  },
  productPrice: {
    fontSize: THEME.fontSize.xxl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.lg,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: THEME.spacing.xs,
  },
  metaValue: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.medium,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  descriptionContainer: {
    marginBottom: THEME.spacing.lg,
  },
  descriptionTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.sm,
  },
  descriptionText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  sellerContainer: {
    marginBottom: THEME.spacing.lg,
  },
  sellerTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.md,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.forest[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  sellerEmail: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: THEME.spacing.lg,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.forest[600],
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    marginRight: THEME.spacing.sm,
  },
  addToCartText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    marginLeft: THEME.spacing.sm,
  },
  buyNowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ocean[600],
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    marginLeft: THEME.spacing.sm,
  },
  buyNowText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
});

export default ProductDetailScreen;
