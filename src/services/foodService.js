import {
  addFood,
  getUserFoods,
  getFood,
  updateFood,
  deleteFood,
} from '../firebase/firestore';

/**
 * Food Service
 * Business logic layer for food operations
 */

/**
 * Create a new food entry
 */
export const createFoodEntry = async (userId, foodData) => {
  try {
    // Validate food data
    if (!foodData.name || !foodData.calories) {
      throw new Error('Food name and calories are required');
    }

    // Add food to database
    const food = await addFood(userId, foodData);
    return { success: true, data: food };
  } catch (error) {
    console.error('Error in createFoodEntry:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch all food entries for a user
 */
export const fetchUserFoods = async (userId, date = null) => {
  try {
    const foods = await getUserFoods(userId, date);
    return { success: true, data: foods };
  } catch (error) {
    console.error('Error in fetchUserFoods:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch a single food entry by ID
 */
export const fetchFood = async (foodId) => {
  try {
    const food = await getFood(foodId);
    return { success: true, data: food };
  } catch (error) {
    console.error('Error in fetchFood:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update an existing food entry
 */
export const updateFoodEntry = async (foodId, updates) => {
  try {
    await updateFood(foodId, updates);
    return { success: true };
  } catch (error) {
    console.error('Error in updateFoodEntry:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Remove a food entry
 */
export const removeFoodEntry = async (foodId) => {
  try {
    await deleteFood(foodId);
    return { success: true };
  } catch (error) {
    console.error('Error in removeFoodEntry:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Calculate daily nutrition totals
 */
export const calculateDailyTotals = (foods) => {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    mealBreakdown: {
      breakfast: { count: 0, calories: 0 },
      lunch: { count: 0, calories: 0 },
      dinner: { count: 0, calories: 0 },
      snack: { count: 0, calories: 0 },
    },
  };

  foods.forEach((food) => {
    totals.calories += food.calories || 0;
    totals.protein += food.protein || 0;
    totals.carbs += food.carbs || 0;
    totals.fats += food.fats || 0;

    // Breakdown by meal type
    const mealType = food.mealType || 'snack';
    if (totals.mealBreakdown[mealType]) {
      totals.mealBreakdown[mealType].count += 1;
      totals.mealBreakdown[mealType].calories += food.calories || 0;
    }
  });

  return totals;
};

/**
 * Search for food in external API (placeholder)
 * This would integrate with APIs like USDA FoodData Central, Nutritionix, etc.
 */
export const searchFoodDatabase = async (query) => {
  try {
    // TODO: Implement API integration
    console.log('Searching food database for:', query);
    
    // Placeholder response
    return {
      success: true,
      data: [],
      message: 'API integration pending',
    };
  } catch (error) {
    console.error('Error in searchFoodDatabase:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Scan barcode and fetch nutritional info (placeholder)
 * This would integrate with APIs like Open Food Facts, etc.
 */
export const scanBarcode = async (barcode) => {
  try {
    // TODO: Implement barcode API integration
    console.log('Scanning barcode:', barcode);
    
    // Placeholder response
    return {
      success: true,
      data: null,
      message: 'Barcode scanning API integration pending',
    };
  } catch (error) {
    console.error('Error in scanBarcode:', error);
    return { success: false, error: error.message };
  }
};

export default {
  createFoodEntry,
  fetchUserFoods,
  fetchFood,
  updateFoodEntry,
  removeFoodEntry,
  calculateDailyTotals,
  searchFoodDatabase,
  scanBarcode,
};
