import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import { getWorkout, deleteWorkout } from '../../firebase/firestore';
import LoadingSpinner from '../../components/LoadingSpinner';
import { format } from 'date-fns';

/**
 * Workout Details Screen
 * View, edit, or delete a specific workout
 */
const WorkoutDetailsScreen = ({ route, navigation }) => {
  const { workoutId } = route.params;
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  /**
   * Fetch workout details
   */
  const fetchWorkoutDetails = async () => {
    try {
      const data = await getWorkout(workoutId);
      setWorkout(data);
    } catch (error) {
      console.error('Error fetching workout:', error);
      Alert.alert('Error', 'Failed to load workout details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutDetails();
  }, [workoutId]);

  /**
   * Handle workout deletion
   */
  const handleDelete = () => {
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteWorkout(workoutId);
              Alert.alert('Success', 'Workout deleted successfully');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting workout:', error);
              Alert.alert('Error', 'Failed to delete workout');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>Workout not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Workout Name */}
          <Text style={styles.title}>{workout.name}</Text>
          
          {/* Workout Type */}
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Type: </Text>
            <Text style={styles.typeValue}>{workout.type}</Text>
          </View>

          {/* Date */}
          <View style={styles.infoRow}>
            <IconButton icon="calendar" size={20} />
            <Text style={styles.infoText}>
              {workout.date ? format(new Date(workout.date), 'PPP') : 'N/A'}
            </Text>
          </View>

          {/* Duration */}
          <View style={styles.infoRow}>
            <IconButton icon="clock-outline" size={20} />
            <Text style={styles.infoText}>{workout.duration} minutes</Text>
          </View>

          {/* Calories */}
          {workout.calories > 0 && (
            <View style={styles.infoRow}>
              <IconButton icon="fire" size={20} />
              <Text style={styles.infoText}>{workout.calories} calories</Text>
            </View>
          )}

          {/* Notes */}
          {workout.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notes:</Text>
              <Text style={styles.notesText}>{workout.notes}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Edit Button - Placeholder for future implementation */}
        <Button
          mode="outlined"
          icon="pencil"
          onPress={() => Alert.alert('Coming Soon', 'Edit functionality will be available soon')}
          style={styles.actionButton}
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          mode="contained"
          icon="delete"
          onPress={handleDelete}
          loading={deleting}
          disabled={deleting}
          style={[styles.actionButton, styles.deleteButton]}
          buttonColor="#f44336"
        >
          Delete
        </Button>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeLabel: {
    fontSize: 16,
    color: '#666',
  },
  typeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    textTransform: 'capitalize',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  notesContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    padding: 15,
  },
  actionButton: {
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
});

export default WorkoutDetailsScreen;
