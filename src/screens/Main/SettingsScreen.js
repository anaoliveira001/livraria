import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { List, Switch, Divider, Button } from 'react-native-paper';
import { logoutUser } from '../../firebase/auth';

/**
 * Settings Screen
 * App settings including theme toggle and logout
 */
const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  /**
   * Handle theme toggle
   */
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    Alert.alert(
      'Theme Change',
      'Dark mode functionality will be fully implemented in a future update.'
    );
  };

  /**
   * Handle notifications toggle
   */
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setLoggingOut(true);
            try {
              await logoutUser();
              // Navigation will be handled automatically by RootNavigator
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Appearance Settings */}
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          description="Enable dark theme"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={handleThemeToggle}
            />
          )}
        />
      </List.Section>

      <Divider />

      {/* Notifications Settings */}
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Push Notifications"
          description="Receive workout reminders"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={handleNotificationsToggle}
            />
          )}
        />
      </List.Section>

      <Divider />

      {/* Data & Privacy */}
      <List.Section>
        <List.Subheader>Data & Privacy</List.Subheader>
        <List.Item
          title="Clear Cache"
          description="Free up storage space"
          left={(props) => <List.Icon {...props} icon="broom" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
        <List.Item
          title="Export Data"
          description="Download your workout data"
          left={(props) => <List.Icon {...props} icon="download" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
      </List.Section>

      <Divider />

      {/* Account Actions */}
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Change Password"
          left={(props) => <List.Icon {...props} icon="lock-reset" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
      </List.Section>

      <Divider />

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          icon="logout"
          onPress={handleLogout}
          loading={loggingOut}
          disabled={loggingOut}
          style={styles.logoutButton}
          buttonColor="#f44336"
        >
          Logout
        </Button>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <List.Item
          title="App Version"
          description="1.0.0"
          left={(props) => <List.Icon {...props} icon="information" />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutContainer: {
    padding: 20,
    paddingTop: 30,
  },
  logoutButton: {
    paddingVertical: 5,
  },
  versionContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default SettingsScreen;
