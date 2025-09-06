/**
 * EcoFinds Mobile App
 * Sustainable Second-Hand Marketplace
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/utils/colors';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.primary}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
