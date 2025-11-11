import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton, Chip } from 'react-native-paper';

/**
 * Food Card Component
 * Reusable card to display food entry information
 */
const FoodCard = ({ food, onPress }) => {
  /**
   * Get meal type color
   */
  const getMealTypeColor = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return '#FFA726';
      case 'lunch':
        return '#66BB6A';
      case 'dinner':
        return '#42A5F5';
      case 'snack':
        return '#AB47BC';
      default:
        return '#999';
    }
  };

  /**
   * Capitalize first letter
   */
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{food.name}</Text>
            <Chip
              style={[
                styles.mealChip,
                { backgroundColor: getMealTypeColor(food.mealType) },
              ]}
              textStyle={styles.chipText}
            >
              {capitalize(food.mealType)}
            </Chip>
          </View>
          <IconButton icon="chevron-right" size={24} />
        </View>

        {food.servingSize && (
          <Text style={styles.servingText}>{food.servingSize}</Text>
        )}

        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <IconButton icon="fire" size={18} />
            <Text style={styles.macroText}>{food.calories} cal</Text>
          </View>

          {food.protein > 0 && (
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>P: </Text>
              <Text style={styles.macroText}>{food.protein}g</Text>
            </View>
          )}

          {food.carbs > 0 && (
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>C: </Text>
              <Text style={styles.macroText}>{food.carbs}g</Text>
            </View>
          )}

          {food.fats > 0 && (
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>F: </Text>
              <Text style={styles.macroText}>{food.fats}g</Text>
            </View>
          )}
        </View>
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
    marginBottom: 5,
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
  mealChip: {
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
  servingText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  macrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  macroText: {
    fontSize: 14,
    color: '#666',
  },
});

export default FoodCard;
