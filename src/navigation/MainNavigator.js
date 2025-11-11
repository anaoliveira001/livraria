import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Main Screens
import HomeScreen from '../screens/Main/HomeScreen';
import WorkoutsScreen from '../screens/Main/WorkoutsScreen';
import AddWorkoutScreen from '../screens/Main/AddWorkoutScreen';
import WorkoutDetailsScreen from '../screens/Main/WorkoutDetailsScreen';
import FoodScreen from '../screens/Main/FoodScreen';
import AddFoodScreen from '../screens/Main/AddFoodScreen';
import StatisticsScreen from '../screens/Main/StatisticsScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import AboutScreen from '../screens/Main/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Home Stack Navigator
 * Nested stack for Home-related screens
 */
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'MyFit Journal' }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: 'Statistics' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Workouts Stack Navigator
 * Nested stack for Workout-related screens
 */
const WorkoutsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkoutsList"
        component={WorkoutsScreen}
        options={{ title: 'Workouts' }}
      />
      <Stack.Screen
        name="AddWorkout"
        component={AddWorkoutScreen}
        options={{ title: 'Add Workout' }}
      />
      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetailsScreen}
        options={{ title: 'Workout Details' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Food Stack Navigator
 * Nested stack for Food-related screens
 */
const FoodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FoodList"
        component={FoodScreen}
        options={{ title: 'Food Log' }}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={{ title: 'Add Food' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Profile Stack Navigator
 * Nested stack for Profile-related screens
 */
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'About' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Main Tab Navigator
 * Bottom tab navigation for the main app sections
 */
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'dumbbell' : 'dumbbell';
          } else if (route.name === 'Food') {
            iconName = focused ? 'food-apple' : 'food-apple-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Workouts" component={WorkoutsStack} />
      <Tab.Screen name="Food" component={FoodStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
