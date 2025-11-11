import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Stat Card Component
 * Reusable card to display statistics with icon
 */
const StatCard = ({ icon, label, value, color = '#2196F3' }) => {
  return (
    <Card style={[styles.card, { borderLeftColor: color }]}>
      <Card.Content style={styles.content}>
        <MaterialCommunityIcons name={icon} size={32} color={color} />
        <View style={styles.textContainer}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    borderLeftWidth: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default StatCard;
