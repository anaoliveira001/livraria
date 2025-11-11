import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ==================== USER OPERATIONS ====================

/**
 * Create a new user profile in Firestore
 * @param {string} userId - User's unique ID
 * @param {Object} userData - User data to store
 * @returns {Promise<void>}
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    }).catch(async () => {
      // If document doesn't exist, create it
      await addDoc(collection(db, 'users'), {
        userId,
        ...userData,
        createdAt: serverTimestamp(),
      });
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Get user profile from Firestore
 * @param {string} userId - User's unique ID
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Update user profile in Firestore
 * @param {string} userId - User's unique ID
 * @param {Object} updates - Data to update
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// ==================== WORKOUT OPERATIONS ====================

/**
 * Add a new workout
 * @param {string} userId - User's unique ID
 * @param {Object} workoutData - Workout data
 * @returns {Promise<Object>} Created workout with ID
 */
export const addWorkout = async (userId, workoutData) => {
  try {
    const workoutsRef = collection(db, 'workouts');
    const docRef = await addDoc(workoutsRef, {
      userId,
      ...workoutData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...workoutData };
  } catch (error) {
    console.error('Error adding workout:', error);
    throw error;
  }
};

/**
 * Get all workouts for a user
 * @param {string} userId - User's unique ID
 * @param {number} limitCount - Optional limit for number of results
 * @returns {Promise<Array>} Array of workout objects
 */
export const getUserWorkouts = async (userId, limitCount = 50) => {
  try {
    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const workouts = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    
    return workouts;
  } catch (error) {
    console.error('Error getting workouts:', error);
    throw error;
  }
};

/**
 * Get a single workout by ID
 * @param {string} workoutId - Workout ID
 * @returns {Promise<Object>} Workout object
 */
export const getWorkout = async (workoutId) => {
  try {
    const workoutRef = doc(db, 'workouts', workoutId);
    const workoutSnap = await getDoc(workoutRef);
    
    if (workoutSnap.exists()) {
      return { id: workoutSnap.id, ...workoutSnap.data() };
    } else {
      throw new Error('Workout not found');
    }
  } catch (error) {
    console.error('Error getting workout:', error);
    throw error;
  }
};

/**
 * Update a workout
 * @param {string} workoutId - Workout ID
 * @param {Object} updates - Data to update
 * @returns {Promise<void>}
 */
export const updateWorkout = async (workoutId, updates) => {
  try {
    const workoutRef = doc(db, 'workouts', workoutId);
    await updateDoc(workoutRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

/**
 * Delete a workout
 * @param {string} workoutId - Workout ID
 * @returns {Promise<void>}
 */
export const deleteWorkout = async (workoutId) => {
  try {
    const workoutRef = doc(db, 'workouts', workoutId);
    await deleteDoc(workoutRef);
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

// ==================== FOOD OPERATIONS ====================

/**
 * Add a new food entry
 * @param {string} userId - User's unique ID
 * @param {Object} foodData - Food data
 * @returns {Promise<Object>} Created food entry with ID
 */
export const addFood = async (userId, foodData) => {
  try {
    const foodsRef = collection(db, 'foods');
    const docRef = await addDoc(foodsRef, {
      userId,
      ...foodData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...foodData };
  } catch (error) {
    console.error('Error adding food:', error);
    throw error;
  }
};

/**
 * Get all food entries for a user
 * @param {string} userId - User's unique ID
 * @param {string} date - Optional date filter (ISO format)
 * @returns {Promise<Array>} Array of food objects
 */
export const getUserFoods = async (userId, date = null) => {
  try {
    const foodsRef = collection(db, 'foods');
    let q;
    
    if (date) {
      q = query(
        foodsRef,
        where('userId', '==', userId),
        where('date', '==', date),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        foodsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const foods = [];
    querySnapshot.forEach((doc) => {
      foods.push({ id: doc.id, ...doc.data() });
    });
    
    return foods;
  } catch (error) {
    console.error('Error getting foods:', error);
    throw error;
  }
};

/**
 * Get a single food entry by ID
 * @param {string} foodId - Food ID
 * @returns {Promise<Object>} Food object
 */
export const getFood = async (foodId) => {
  try {
    const foodRef = doc(db, 'foods', foodId);
    const foodSnap = await getDoc(foodRef);
    
    if (foodSnap.exists()) {
      return { id: foodSnap.id, ...foodSnap.data() };
    } else {
      throw new Error('Food entry not found');
    }
  } catch (error) {
    console.error('Error getting food:', error);
    throw error;
  }
};

/**
 * Update a food entry
 * @param {string} foodId - Food ID
 * @param {Object} updates - Data to update
 * @returns {Promise<void>}
 */
export const updateFood = async (foodId, updates) => {
  try {
    const foodRef = doc(db, 'foods', foodId);
    await updateDoc(foodRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating food:', error);
    throw error;
  }
};

/**
 * Delete a food entry
 * @param {string} foodId - Food ID
 * @returns {Promise<void>}
 */
export const deleteFood = async (foodId) => {
  try {
    const foodRef = doc(db, 'foods', foodId);
    await deleteDoc(foodRef);
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;
  }
};
