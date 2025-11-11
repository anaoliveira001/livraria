import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

/**
 * Main App Component
 * Entry point for the MyFit Journal application
 * 
 * Features:
 * - Firebase Authentication
 * - React Navigation
 * - Material Design (React Native Paper)
 * - Dark/Light Theme Support
 * - Safe Area Context
 */
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Custom theme configuration
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2196F3',
      accent: '#4ECDC4',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#333333',
      error: '#f44336',
    },
  };

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#2196F3',
      accent: '#4ECDC4',
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      error: '#f44336',
    },
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          <RootNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
