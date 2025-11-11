import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Card, SegmentedButtons } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';

/**
 * Statistics Screen
 * Displays charts and statistics for workouts and nutrition
 */
const StatisticsScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const screenWidth = Dimensions.get('window').width;

  // Sample data - replace with real data from Firebase
  const workoutData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [30, 45, 0, 60, 30, 90, 45],
      },
    ],
  };

  const caloriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1800, 2000, 1900, 2200, 1850, 2100, 1950],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Time Range Selector */}
      <View style={styles.selectorContainer}>
        <SegmentedButtons
          value={timeRange}
          onValueChange={setTimeRange}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
        />
      </View>

      {/* Workout Duration Chart */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.chartTitle}>Workout Duration (minutes)</Text>
          <LineChart
            data={workoutData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Calorie Intake Chart */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.chartTitle}>Daily Calorie Intake</Text>
          <BarChart
            data={caloriesData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </Card.Content>
      </Card>

      {/* Summary Stats */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.chartTitle}>Summary</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Workouts:</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Duration:</Text>
            <Text style={styles.statValue}>300 min</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Avg Workout:</Text>
            <Text style={styles.statValue}>25 min</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Avg Daily Calories:</Text>
            <Text style={styles.statValue}>1971 cal</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Note about data */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          Note: Charts display sample data. Real data will be populated from your workout and food logs.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  selectorContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    margin: 15,
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  noteContainer: {
    padding: 15,
    margin: 15,
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default StatisticsScreen;
