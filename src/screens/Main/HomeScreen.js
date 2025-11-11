import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { getUserWorkouts } from '../../firebase/firestore';
import { getUserFoods } from '../../firebase/firestore';
import StatCard from '../../components/StatCard';

/**
 * Home Screen (Dashboard)
 * Displays weekly summary of workouts, nutrition, and overall progress
 */
const HomeScreen = ({ navigation }) => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState({
    workouts: 0,
    calories: 0,
    duration: 0,
  });

  /**
   * Fetch weekly statistics
   */
  const fetchWeeklyStats = async () => {
    setLoading(true);
    try {
      // Fetch workouts and foods for the current week
      const workouts = await getUserWorkouts(user.uid, 10);
      const foods = await getUserFoods(user.uid);

      // Calculate statistics (simplified example)
      const totalWorkouts = workouts.length;
      const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0);
      const totalDuration = workouts.reduce((sum, workout) => sum + (workout.duration || 0), 0);

      setWeeklyStats({
        workouts: totalWorkouts,
        calories: totalCalories,
        duration: totalDuration,
      });
    } catch (error) {
      console.error('Error fetching weekly stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyStats();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchWeeklyStats} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{userProfile?.displayName || user?.displayName || 'User'}!</Text>
      </View>

      {/* Weekly Summary Cards */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>This Week</Text>
        
        <View style={styles.statsRow}>
          <StatCard
            icon="dumbbell"
            label="Workouts"
            value={weeklyStats.workouts}
            color="#FF6B6B"
          />
          <StatCard
            icon="fire"
            label="Calories"
            value={weeklyStats.calories}
            color="#FFA500"
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="clock-outline"
            label="Minutes"
            value={weeklyStats.duration}
            color="#4ECDC4"
          />
          <StatCard
            icon="chart-line"
            label="Progress"
            value="85%"
            color="#95E1D3"
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <Card style={styles.actionCard}>
          <Card.Content>
            <Button
              mode="contained"
              icon="plus"
              onPress={() => navigation.navigate('Workouts', { screen: 'AddWorkout' })}
              style={styles.actionButton}
            >
              Log Workout
            </Button>
            
            <Button
              mode="contained"
              icon="plus"
              onPress={() => navigation.navigate('Food', { screen: 'AddFood' })}
              style={styles.actionButton}
            >
              Log Food
            </Button>
            
            <Button
              mode="outlined"
              icon="chart-box"
              onPress={() => navigation.navigate('Statistics')}
              style={styles.actionButton}
            >
              View Statistics
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Motivational Quote */}
      <Card style={styles.quoteCard}>
        <Card.Content>
          <Text style={styles.quote}>
            "The only bad workout is the one that didn't happen."
          </Text>
          <Text style={styles.quoteAuthor}>- Unknown</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionsContainer: {
    padding: 15,
  },
  actionCard: {
    marginBottom: 15,
  },
  actionButton: {
    marginBottom: 10,
  },
  quoteCard: {
    margin: 15,
    marginTop: 5,
    backgroundColor: '#E3F2FD',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default HomeScreen;
