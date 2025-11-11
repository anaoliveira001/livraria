import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { getUserWorkouts } from '../../firebase/firestore';
import WorkoutCard from '../../components/WorkoutCard';
import LoadingSpinner from '../../components/LoadingSpinner';

/**
 * Workouts Screen
 * Displays list of all user's workouts
 */
const WorkoutsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Fetch user's workouts
   */
  const fetchWorkouts = async () => {
    try {
      const data = await getUserWorkouts(user.uid);
      setWorkouts(data);
      setFilteredWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  /**
   * Handle search query
   */
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredWorkouts(workouts);
    } else {
      const filtered = workouts.filter((workout) =>
        workout.name?.toLowerCase().includes(query.toLowerCase()) ||
        workout.type?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredWorkouts(filtered);
    }
  };

  /**
   * Handle refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkouts();
  };

  /**
   * Navigate to workout details
   */
  const handleWorkoutPress = (workout) => {
    navigation.navigate('WorkoutDetails', { workoutId: workout.id });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Searchbar
        placeholder="Search workouts..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      {/* Workouts List */}
      <FlatList
        data={filteredWorkouts}
        renderItem={({ item }) => (
          <WorkoutCard
            workout={item}
            onPress={() => handleWorkoutPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workouts yet</Text>
            <Text style={styles.emptySubText}>
              Tap the + button to add your first workout
            </Text>
          </View>
        }
      />

      {/* Add Workout FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddWorkout')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 10,
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

export default WorkoutsScreen;
