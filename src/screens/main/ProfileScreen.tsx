import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import { THEME } from '../../utils/constants';
import { User } from '../../types';

const ProfileScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // TODO: Implement actual API call
      // const response = await fetch(`${API_BASE_URL}/profile`);
      // const data = await response.json();
      // setUser(data);
      
      // Mock data for now
      setUser({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        images: ['https://via.placeholder.com/100x100/22c55e/ffffff?text=JD'],
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement actual sign out
            console.log('Sign out');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'edit',
      onPress: () => console.log('Edit Profile'),
    },
    {
      id: '2',
      title: 'My Products',
      icon: 'store',
      onPress: () => console.log('My Products'),
    },
    {
      id: '3',
      title: 'List New Product',
      icon: 'add-box',
      onPress: () => console.log('List New Product'),
    },
    {
      id: '4',
      title: 'Settings',
      icon: 'settings',
      onPress: () => console.log('Settings'),
    },
    {
      id: '5',
      title: 'Help & Support',
      icon: 'help',
      onPress: () => console.log('Help & Support'),
    },
    {
      id: '6',
      title: 'About',
      icon: 'info',
      onPress: () => console.log('About'),
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <Icon name={item.icon} size={24} color={colors.forest[600]} />
        </View>
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Icon name="chevron-right" size={24} color={colors.gray[400]} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.images[0] || 'https://via.placeholder.com/100x100/22c55e/ffffff?text=User' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.memberSince}>
          Member since {new Date(user?.createdAt || '').toLocaleDateString()}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Products Listed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>

      {/* Sign Out Button */}
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Icon name="logout" size={24} color={colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appName}>EcoFinds</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appDescription}>
          Sustainable Second-Hand Marketplace
        </Text>
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
  profileHeader: {
    backgroundColor: colors.background.primary,
    paddingVertical: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  avatarContainer: {
    marginBottom: THEME.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.forest[200],
  },
  userName: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  userEmail: {
    fontSize: THEME.fontSize.md,
    color: colors.text.secondary,
    marginBottom: THEME.spacing.xs,
  },
  memberSince: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.tertiary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    paddingVertical: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: THEME.fontSize.xxl,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
    marginBottom: THEME.spacing.xs,
  },
  statLabel: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: colors.background.primary,
    marginBottom: THEME.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.forest[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  menuText: {
    fontSize: THEME.fontSize.md,
    color: colors.text.primary,
    fontWeight: THEME.fontWeight.medium,
  },
  signOutContainer: {
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error,
  },
  signOutText: {
    fontSize: THEME.fontSize.md,
    color: colors.error,
    fontWeight: THEME.fontWeight.semibold,
    marginLeft: THEME.spacing.sm,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.lg,
  },
  appName: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: colors.forest[600],
    marginBottom: THEME.spacing.xs,
  },
  appVersion: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: THEME.spacing.xs,
  },
  appDescription: {
    fontSize: THEME.fontSize.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});

export default ProfileScreen;
