import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { addWorkout } from '../../firebase/firestore';

/**
 * Add Workout Screen
 * Form to add a new workout entry
 */
const AddWorkoutScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [workoutType, setWorkoutType] = useState('cardio');
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');

  /**
   * Validate form inputs
   */
  const validateForm = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return false;
    }
    if (!duration || isNaN(duration) || Number(duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid duration in minutes');
      return false;
    }
    return true;
  };

  /**
   * Handle workout submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const workoutData = {
        name: workoutName.trim(),
        type: workoutType,
        duration: Number(duration),
        calories: calories ? Number(calories) : 0,
        notes: notes.trim(),
        date: new Date().toISOString(),
      };

      await addWorkout(user.uid, workoutData);
      Alert.alert('Success', 'Workout added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error adding workout:', error);
      Alert.alert('Error', 'Failed to add workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Workout Type Selector */}
          <SegmentedButtons
            value={workoutType}
            onValueChange={setWorkoutType}
            buttons={[
              { value: 'cardio', label: 'Cardio' },
              { value: 'strength', label: 'Strength' },
              { value: 'flexibility', label: 'Flexibility' },
            ]}
            style={styles.segmentedButtons}
          />

          {/* Workout Name */}
          <TextInput
            label="Workout Name *"
            value={workoutName}
            onChangeText={setWorkoutName}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., Morning Run"
            disabled={loading}
          />

          {/* Duration */}
          <TextInput
            label="Duration (minutes) *"
            value={duration}
            onChangeText={setDuration}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            placeholder="e.g., 30"
            disabled={loading}
          />

          {/* Calories (optional) */}
          <TextInput
            label="Calories Burned (optional)"
            value={calories}
            onChangeText={setCalories}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            placeholder="e.g., 300"
            disabled={loading}
          />

          {/* Notes */}
          <TextInput
            label="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Add any additional details..."
            disabled={loading}
          />

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Add Workout
          </Button>

          {/* Cancel Button */}
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            disabled={loading}
            style={styles.button}
          >
            Cancel
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});

export default AddWorkoutScreen;
