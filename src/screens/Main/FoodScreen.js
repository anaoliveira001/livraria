import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { FAB, Chip } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { getUserFoods } from '../../firebase/firestore';
import FoodCard from '../../components/FoodCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { format } from 'date-fns';

/**
 * Food Screen
 * Displays list of food entries for the current day
 */
const FoodScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  /**
   * Fetch food entries
   */
  const fetchFoods = async () => {
    try {
      const data = await getUserFoods(user.uid, selectedDate);
      setFoods(data);
      
      // Calculate totals
      const calories = data.reduce((sum, food) => sum + (food.calories || 0), 0);
      const protein = data.reduce((sum, food) => sum + (food.protein || 0), 0);
      setTotalCalories(calories);
      setTotalProtein(protein);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [selectedDate]);

  /**
   * Handle refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    fetchFoods();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      {/* Date and Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.dateText}>{format(new Date(selectedDate), 'EEEE, MMMM d')}</Text>
        
        <View style={styles.chipsContainer}>
          <Chip icon="fire" style={styles.chip}>
            {totalCalories} cal
          </Chip>
          <Chip icon="food-drumstick" style={styles.chip}>
            {totalProtein}g protein
          </Chip>
        </View>
      </View>

      {/* Food List */}
      <FlatList
        data={foods}
        renderItem={({ item }) => <FoodCard food={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No food logged today</Text>
            <Text style={styles.emptySubText}>
              Tap the + button to add your first meal
            </Text>
          </View>
        }
      />

      {/* Add Food FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddFood')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    marginRight: 10,
  },
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});

export default FoodScreen;
