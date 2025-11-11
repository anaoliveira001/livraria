import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Card, List, Button } from 'react-native-paper';

/**
 * About Screen
 * Information about the app, features, and contact
 */
const AboutScreen = () => {
  /**
   * Open external link
   */
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* App Info Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.appTitle}>MyFit Journal</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.description}>
            Your personal fitness and nutrition tracking companion. 
            Log workouts, track meals, and monitor your progress towards a healthier lifestyle.
          </Text>
        </Card.Content>
      </Card>

      {/* Features Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <List.Item
            title="Workout Tracking"
            description="Log and monitor your exercise routines"
            left={(props) => <List.Icon {...props} icon="dumbbell" />}
          />
          
          <List.Item
            title="Food Logging"
            description="Track your daily nutrition and calories"
            left={(props) => <List.Icon {...props} icon="food-apple" />}
          />
          
          <List.Item
            title="Progress Statistics"
            description="Visualize your fitness journey with charts"
            left={(props) => <List.Icon {...props} icon="chart-line" />}
          />
          
          <List.Item
            title="Barcode Scanner"
            description="Quick food entry with barcode scanning"
            left={(props) => <List.Icon {...props} icon="barcode-scan" />}
          />
        </Card.Content>
      </Card>

      {/* Technology Stack Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Built With</Text>
          <Text style={styles.techText}>• React Native & Expo</Text>
          <Text style={styles.techText}>• Firebase (Authentication & Firestore)</Text>
          <Text style={styles.techText}>• React Navigation</Text>
          <Text style={styles.techText}>• React Native Paper (Material Design)</Text>
          <Text style={styles.techText}>• React Native Chart Kit</Text>
        </Card.Content>
      </Card>

      {/* Support Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Support & Feedback</Text>
          <Text style={styles.supportText}>
            We'd love to hear from you! If you have any questions, suggestions, 
            or feedback, please don't hesitate to reach out.
          </Text>
          
          <Button
            mode="outlined"
            icon="email"
            onPress={() => openLink('mailto:support@myfitjournal.com')}
            style={styles.supportButton}
          >
            Contact Support
          </Button>
        </Card.Content>
      </Card>

      {/* Legal Card */}
      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="Privacy Policy"
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openLink('https://example.com/privacy')}
          />
          
          <List.Item
            title="Terms of Service"
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openLink('https://example.com/terms')}
          />
          
          <List.Item
            title="Open Source Licenses"
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openLink('https://example.com/licenses')}
          />
        </Card.Content>
      </Card>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 MyFit Journal. All rights reserved.
        </Text>
        <Text style={styles.footerText}>Made with ❤️ for fitness enthusiasts</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 15,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  techText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  supportButton: {
    marginTop: 10,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default AboutScreen;
