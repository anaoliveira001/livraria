import {
  getUserProfile,
  updateUserProfile,
} from '../firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';

/**
 * User Service
 * Business logic layer for user profile operations
 */

/**
 * Fetch user profile
 */
export const fetchUserProfile = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    return { success: true, data: profile };
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateUserProfileData = async (userId, updates) => {
  try {
    // Update Firestore profile
    await updateUserProfile(userId, updates);

    // If display name is updated, also update Firebase Auth profile
    if (updates.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: updates.displayName,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error in updateUserProfileData:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user settings
 */
export const updateUserSettings = async (userId, settings) => {
  try {
    await updateUserProfile(userId, { settings });
    return { success: true };
  } catch (error) {
    console.error('Error in updateUserSettings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Calculate user activity stats
 */
export const calculateUserStats = async (userId, workouts, foods) => {
  try {
    const stats = {
      totalWorkouts: workouts.length,
      totalFoodLogs: foods.length,
      daysActive: calculateActiveDays(workouts, foods),
      currentStreak: calculateStreak(workouts, foods),
      longestStreak: 0, // TODO: Implement streak tracking
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error in calculateUserStats:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Calculate number of active days
 */
const calculateActiveDays = (workouts, foods) => {
  const activeDates = new Set();

  workouts.forEach((workout) => {
    if (workout.date) {
      activeDates.add(workout.date.split('T')[0]);
    }
  });

  foods.forEach((food) => {
    if (food.date) {
      activeDates.add(food.date.split('T')[0]);
    }
  });

  return activeDates.size;
};

/**
 * Calculate current streak of consecutive active days
 */
const calculateStreak = (workouts, foods) => {
  // Simplified streak calculation
  // TODO: Implement proper consecutive day tracking
  const activeDays = calculateActiveDays(workouts, foods);
  return Math.min(activeDays, 7); // Placeholder
};

/**
 * Export user data (for GDPR compliance)
 */
export const exportUserData = async (userId, workouts, foods, profile) => {
  try {
    const exportData = {
      profile,
      workouts,
      foods,
      exportDate: new Date().toISOString(),
    };

    // TODO: Implement data export functionality
    // This could generate a JSON file or send via email
    console.log('Exporting user data:', exportData);

    return { success: true, data: exportData };
  } catch (error) {
    console.error('Error in exportUserData:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete user account and all associated data
 */
export const deleteUserAccount = async (userId) => {
  try {
    // TODO: Implement account deletion
    // This should:
    // 1. Delete all user workouts
    // 2. Delete all user foods
    // 3. Delete user profile
    // 4. Delete Firebase Auth account
    
    console.warn('Account deletion not yet implemented');
    return { success: false, error: 'Feature not implemented' };
  } catch (error) {
    console.error('Error in deleteUserAccount:', error);
    return { success: false, error: error.message };
  }
};

export default {
  fetchUserProfile,
  updateUserProfileData,
  updateUserSettings,
  calculateUserStats,
  exportUserData,
  deleteUserAccount,
};
