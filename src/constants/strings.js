/**
 * String Constants
 * Centralized text strings for the app
 */

export const Strings = {
  // App Info
  appName: 'MyFit Journal',
  appTagline: 'Track your fitness journey',
  appVersion: '1.0.0',
  
  // Authentication
  login: 'Login',
  logout: 'Logout',
  register: 'Register',
  createAccount: 'Create Account',
  forgotPassword: 'Forgot Password?',
  resetPassword: 'Reset Password',
  sendResetEmail: 'Send Reset Email',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  displayName: 'Full Name',
  
  // Navigation
  home: 'Home',
  workouts: 'Workouts',
  food: 'Food',
  profile: 'Profile',
  settings: 'Settings',
  about: 'About',
  statistics: 'Statistics',
  
  // Workout Strings
  workoutName: 'Workout Name',
  workoutType: 'Workout Type',
  duration: 'Duration',
  calories: 'Calories',
  notes: 'Notes',
  addWorkout: 'Add Workout',
  editWorkout: 'Edit Workout',
  deleteWorkout: 'Delete Workout',
  workoutDetails: 'Workout Details',
  noWorkouts: 'No workouts yet',
  noWorkoutsSubtext: 'Tap the + button to add your first workout',
  
  // Food Strings
  foodName: 'Food Name',
  mealType: 'Meal Type',
  servingSize: 'Serving Size',
  protein: 'Protein',
  carbs: 'Carbs',
  fats: 'Fats',
  addFood: 'Add Food',
  editFood: 'Edit Food',
  deleteFood: 'Delete Food',
  foodDetails: 'Food Details',
  noFoods: 'No food logged today',
  noFoodsSubtext: 'Tap the + button to add your first meal',
  scanBarcode: 'Scan Barcode',
  
  // Meal Types
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
  
  // Workout Types
  cardio: 'Cardio',
  strength: 'Strength',
  flexibility: 'Flexibility',
  
  // Common Actions
  save: 'Save',
  cancel: 'Cancel',
  delete: 'Delete',
  edit: 'Edit',
  add: 'Add',
  search: 'Search',
  filter: 'Filter',
  refresh: 'Refresh',
  loading: 'Loading...',
  submit: 'Submit',
  
  // Profile
  editProfile: 'Edit Profile',
  accountInfo: 'Account Information',
  memberSince: 'Member Since',
  yourStats: 'Your Stats',
  
  // Settings
  appearance: 'Appearance',
  darkMode: 'Dark Mode',
  notifications: 'Notifications',
  pushNotifications: 'Push Notifications',
  dataPrivacy: 'Data & Privacy',
  clearCache: 'Clear Cache',
  exportData: 'Export Data',
  changePassword: 'Change Password',
  
  // Statistics
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  thisYear: 'This Year',
  totalWorkouts: 'Total Workouts',
  totalDuration: 'Total Duration',
  avgWorkout: 'Avg Workout',
  avgDailyCalories: 'Avg Daily Calories',
  
  // Error Messages
  errorGeneric: 'An error occurred. Please try again.',
  errorNetwork: 'Network error. Please check your connection.',
  errorAuth: 'Authentication error. Please login again.',
  errorNotFound: 'Item not found.',
  errorPermission: 'Permission denied.',
  
  // Success Messages
  successSaved: 'Saved successfully!',
  successDeleted: 'Deleted successfully!',
  successUpdated: 'Updated successfully!',
  
  // Validation Messages
  requiredField: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPassword: 'Password must be at least 6 characters',
  passwordMismatch: 'Passwords do not match',
  
  // Time Ranges
  week: 'Week',
  month: 'Month',
  year: 'Year',
  
  // Confirmation Messages
  confirmDelete: 'Are you sure you want to delete this item?',
  confirmLogout: 'Are you sure you want to logout?',
  cannotUndo: 'This action cannot be undone.',
  
  // Empty States
  noData: 'No data available',
  noResults: 'No results found',
  
  // Motivational Quotes (can be expanded)
  quotes: [
    'The only bad workout is the one that didn\'t happen.',
    'Your body can stand almost anything. It\'s your mind that you have to convince.',
    'Take care of your body. It\'s the only place you have to live.',
    'Fitness is not about being better than someone else. It\'s about being better than you used to be.',
    'The groundwork for all happiness is good health.',
  ],
};

/**
 * Get random motivational quote
 */
export const getRandomQuote = () => {
  const quotes = Strings.quotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export default Strings;
