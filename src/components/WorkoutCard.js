import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton, Chip } from 'react-native-paper';
import { format } from 'date-fns';

/**
 * Workout Card Component
 * Reusable card to display workout information
 */
const WorkoutCard = ({ workout, onPress }) => {
  /**
   * Format workout type for display
   */
  const getWorkoutTypeColor = (type) => {
    switch (type) {
      case 'cardio':
        return '#FF6B6B';
      case 'strength':
        return '#4ECDC4';
      case 'flexibility':
        return '#95E1D3';
      default:
        return '#999';
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{workout.name}</Text>
            <Chip
              style={[
                styles.typeChip,
                { backgroundColor: getWorkoutTypeColor(workout.type) },
              ]}
              textStyle={styles.chipText}
            >
              {workout.type}
            </Chip>
          </View>
          <IconButton icon="chevron-right" size={24} />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <IconButton icon="clock-outline" size={20} />
            <Text style={styles.infoText}>{workout.duration} min</Text>
          </View>

          {workout.calories > 0 && (
            <View style={styles.infoItem}>
              <IconButton icon="fire" size={20} />
              <Text style={styles.infoText}>{workout.calories} cal</Text>
            </View>
          )}
        </View>

        {workout.date && (
          <Text style={styles.dateText}>
            {format(new Date(workout.date), 'PPP')}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  typeChip: {
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default WorkoutCard;
