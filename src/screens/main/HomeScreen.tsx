import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import { THEME } from '../../utils/constants';
import { Product } from '../../types';

const HomeScreen = ({ navigation }: any) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // TODO: Implement actual API call
      // const response = await fetch(`${API_BASE_URL}/products?limit=6`);
      // const data = await response.json();
      // setFeaturedProducts(data);
      
      // Mock data for now
      setFeaturedProducts([]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFeaturedProducts();
    setRefreshing(false);
  };

  const renderFeatureCard = ({ item }: { item: any }) => (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Text style={styles.featureEmoji}>{item.emoji}</Text>
      </View>
      <Text style={styles.featureTitle}>{item.title}</Text>
      <Text style={styles.featureDescription}>{item.description}</Text>
    </View>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}>
      <Image
        source={{ uri: item.images[0] || 'https://via.placeholder.com/200x200/22c55e/ffffff?text=No+Image' }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const features = [
    {
      id: '1',
      emoji: '🌱',
      title: 'Sustainable',
      description: 'Reduce waste by giving items a second life',
    },
    {
      id: '2',
      emoji: '💰',
      title: 'Affordable',
      description: 'Find great deals on quality second-hand items',
    },
    {
      id: '3',
      emoji: '🤝',
      title: 'Community',
      description: 'Connect with like-minded eco-conscious buyers',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Welcome to EcoFinds</Text>
          <Text style={styles.heroSubtitle}>
            Discover sustainable second-hand treasures and give items a second life
          </Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => navigation.navigate('Products')}>
            <Text style={styles.heroButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose EcoFinds?</Text>
        <FlatList
          data={features}
          renderItem={renderFeatureCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuresList}
        />
      </View>

      {/* Featured Products */}
      <View style={styles.productsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : featuredProducts.length > 0 ? (
          <FlatList
            data={featuredProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="store" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No products available</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Products')}>
              <Text style={styles.emptyButtonText}>Browse All Products</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Products')}>
            <Icon name="store" size={32} color={colors.forest[600]} />
            <Text style={styles.quickActionText}>Browse Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={32} color={colors.forest[600]} />
            <Text style={styles.quickActionText}>View Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Orders')}>
            <Icon name="receipt" size={32} color={colors.forest[600]} />
            <Text style={styles.quickActionText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" size={32} color={colors.forest[600]} />
            <Text style={styles.quickActionText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  heroSection: {
    backgroundColor: colors.forest[600],
    paddingVertical: THEME.spacing.xxl,
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: THEME.fontSize.xxxl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: THEME.spacing.md,
  },
  heroSubtitle: {
    fontSize: THEME.fontSize.lg,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: THEME.spacing.xl,
    opacity: 0.9,
  },
  heroButton: {
    backgroundColor: colors.text.inverse,
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  heroButtonText: {
    color: colors.forest[600],
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
  },
  featuresSection: {
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
  },
  sectionTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.lg,
  },
  featuresList: {
    paddingRight: THEME.spacing.lg,
  },
  featureCard: {
    backgroundColor: colors.background.primary,
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    marginRight: THEME.spacing.md,
    width: 200,
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.forest[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  featureEmoji: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  featureDescription: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  productsSection: {
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
  },
  seeAllText: {
    color: colors.forest[600],
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
  },
  loadingContainer: {
    padding: THEME.spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text.secondary,
    fontSize: THEME.fontSize.md,
  },
  productsList: {
    paddingRight: THEME.spacing.lg,
  },
  productCard: {
    backgroundColor: colors.background.primary,
    borderRadius: THEME.borderRadius.lg,
    marginRight: THEME.spacing.md,
    width: 200,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: THEME.borderRadius.lg,
    borderTopRightRadius: THEME.borderRadius.lg,
  },
  productInfo: {
    padding: THEME.spacing.md,
  },
  productTitle: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  productPrice: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
    marginBottom: THEME.spacing.xs,
  },
  productCategory: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: THEME.spacing.xl,
  },
  emptyText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    marginTop: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.forest[600],
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  emptyButtonText: {
    color: colors.text.inverse,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
  },
  quickActionsSection: {
    paddingHorizontal: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: colors.background.primary,
    width: '48%',
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.medium,
    color: colors.text.primary,
    marginTop: THEME.spacing.sm,
    textAlign: 'center',
  },
});

export default HomeScreen;
