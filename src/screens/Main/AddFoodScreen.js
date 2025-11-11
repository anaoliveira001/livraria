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
import { addFood } from '../../firebase/firestore';

/**
 * Add Food Screen
 * Form to add a new food entry with optional barcode scanning
 */
const AddFoodScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState('breakfast');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [servingSize, setServingSize] = useState('');

  /**
   * Validate form inputs
   */
  const validateForm = () => {
    if (!foodName.trim()) {
      Alert.alert('Error', 'Please enter a food name');
      return false;
    }
    if (!calories || isNaN(calories) || Number(calories) < 0) {
      Alert.alert('Error', 'Please enter valid calories');
      return false;
    }
    return true;
  };

  /**
   * Handle food submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const foodData = {
        name: foodName.trim(),
        mealType: mealType,
        calories: Number(calories),
        protein: protein ? Number(protein) : 0,
        carbs: carbs ? Number(carbs) : 0,
        fats: fats ? Number(fats) : 0,
        servingSize: servingSize.trim(),
        date: new Date().toISOString().split('T')[0], // Store date as YYYY-MM-DD
        timestamp: new Date().toISOString(),
      };

      await addFood(user.uid, foodData);
      Alert.alert('Success', 'Food entry added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error adding food:', error);
      Alert.alert('Error', 'Failed to add food entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Placeholder for barcode scanner
   */
  const handleScanBarcode = () => {
    Alert.alert(
      'Barcode Scanner',
      'Barcode scanning will be available in a future update. This feature requires camera permissions and integration with a food database API.',
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Barcode Scanner Button */}
          <Button
            mode="outlined"
            icon="barcode-scan"
            onPress={handleScanBarcode}
            style={styles.barcodeButton}
            disabled={loading}
          >
            Scan Barcode
          </Button>

          {/* Meal Type Selector */}
          <SegmentedButtons
            value={mealType}
            onValueChange={setMealType}
            buttons={[
              { value: 'breakfast', label: 'Breakfast' },
              { value: 'lunch', label: 'Lunch' },
              { value: 'dinner', label: 'Dinner' },
              { value: 'snack', label: 'Snack' },
            ]}
            style={styles.segmentedButtons}
          />

          {/* Food Name */}
          <TextInput
            label="Food Name *"
            value={foodName}
            onChangeText={setFoodName}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., Chicken Breast"
            disabled={loading}
          />

          {/* Serving Size */}
          <TextInput
            label="Serving Size"
            value={servingSize}
            onChangeText={setServingSize}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., 100g or 1 cup"
            disabled={loading}
          />

          {/* Calories */}
          <TextInput
            label="Calories *"
            value={calories}
            onChangeText={setCalories}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            placeholder="e.g., 165"
            disabled={loading}
          />

          {/* Macronutrients Section */}
          <View style={styles.macrosRow}>
            <TextInput
              label="Protein (g)"
              value={protein}
              onChangeText={setProtein}
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.macroInput]}
              placeholder="31"
              disabled={loading}
            />
            <TextInput
              label="Carbs (g)"
              value={carbs}
              onChangeText={setCarbs}
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.macroInput]}
              placeholder="0"
              disabled={loading}
            />
            <TextInput
              label="Fats (g)"
              value={fats}
              onChangeText={setFats}
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.macroInput]}
              placeholder="3.6"
              disabled={loading}
            />
          </View>

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Add Food Entry
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
  barcodeButton: {
    marginBottom: 20,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});

export default AddFoodScreen;
