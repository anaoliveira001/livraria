import {
  addWorkout,
  getUserWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} from '../firebase/firestore';

/**
 * Workout Service
 * Business logic layer for workout operations
 */

/**
 * Create a new workout
 */
export const createWorkout = async (userId, workoutData) => {
  try {
    // Validate workout data
    if (!workoutData.name || !workoutData.duration) {
      throw new Error('Workout name and duration are required');
    }

    // Add workout to database
    const workout = await addWorkout(userId, workoutData);
    return { success: true, data: workout };
  } catch (error) {
    console.error('Error in createWorkout:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch all workouts for a user
 */
export const fetchUserWorkouts = async (userId, limit = 50) => {
  try {
    const workouts = await getUserWorkouts(userId, limit);
    return { success: true, data: workouts };
  } catch (error) {
    console.error('Error in fetchUserWorkouts:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch a single workout by ID
 */
export const fetchWorkout = async (workoutId) => {
  try {
    const workout = await getWorkout(workoutId);
    return { success: true, data: workout };
  } catch (error) {
    console.error('Error in fetchWorkout:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update an existing workout
 */
export const updateWorkoutData = async (workoutId, updates) => {
  try {
    await updateWorkout(workoutId, updates);
    return { success: true };
  } catch (error) {
    console.error('Error in updateWorkoutData:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Remove a workout
 */
export const removeWorkout = async (workoutId) => {
  try {
    await deleteWorkout(workoutId);
    return { success: true };
  } catch (error) {
    console.error('Error in removeWorkout:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Calculate total workout statistics
 */
export const calculateWorkoutStats = (workouts) => {
  const stats = {
    totalWorkouts: workouts.length,
    totalDuration: 0,
    totalCalories: 0,
    averageDuration: 0,
    averageCalories: 0,
    workoutsByType: {},
  };

  workouts.forEach((workout) => {
    stats.totalDuration += workout.duration || 0;
    stats.totalCalories += workout.calories || 0;

    // Count by type
    const type = workout.type || 'other';
    stats.workoutsByType[type] = (stats.workoutsByType[type] || 0) + 1;
  });

  if (workouts.length > 0) {
    stats.averageDuration = Math.round(stats.totalDuration / workouts.length);
    stats.averageCalories = Math.round(stats.totalCalories / workouts.length);
  }

  return stats;
};

export default {
  createWorkout,
  fetchUserWorkouts,
  fetchWorkout,
  updateWorkoutData,
  removeWorkout,
  calculateWorkoutStats,
};
