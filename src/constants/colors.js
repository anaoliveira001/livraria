/**
 * Color Constants
 * Centralized color palette for the app
 */

export const Colors = {
  // Primary Colors
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#BBDEFB',
  
  // Secondary Colors
  secondary: '#FF6B6B',
  secondaryDark: '#E53935',
  secondaryLight: '#FFCDD2',
  
  // Accent Colors
  accent: '#4ECDC4',
  accentDark: '#26A69A',
  accentLight: '#B2DFDB',
  
  // Workout Type Colors
  cardio: '#FF6B6B',
  strength: '#4ECDC4',
  flexibility: '#95E1D3',
  
  // Meal Type Colors
  breakfast: '#FFA726',
  lunch: '#66BB6A',
  dinner: '#42A5F5',
  snack: '#AB47BC',
  
  // Semantic Colors
  success: '#4CAF50',
  error: '#f44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  background: '#F5F5F5',
  backgroundDark: '#121212',
  
  // Text Colors
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  textDark: '#000000',
  
  // Border Colors
  border: '#E0E0E0',
  borderDark: '#424242',
  
  // Chart Colors
  chartRed: '#FF6B6B',
  chartBlue: '#4ECDC4',
  chartGreen: '#95E1D3',
  chartOrange: '#FFA726',
  chartPurple: '#AB47BC',
  
  // Gradient Colors
  gradientStart: '#2196F3',
  gradientEnd: '#21CBF3',
};

/**
 * Dark Theme Colors
 */
export const DarkColors = {
  ...Colors,
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  border: '#424242',
};

/**
 * Get color by workout type
 */
export const getWorkoutColor = (type) => {
  const colorMap = {
    cardio: Colors.cardio,
    strength: Colors.strength,
    flexibility: Colors.flexibility,
  };
  return colorMap[type] || Colors.text;
};

/**
 * Get color by meal type
 */
export const getMealColor = (type) => {
  const colorMap = {
    breakfast: Colors.breakfast,
    lunch: Colors.lunch,
    dinner: Colors.dinner,
    snack: Colors.snack,
  };
  return colorMap[type] || Colors.text;
};

export default Colors;
