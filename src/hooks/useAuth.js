import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * Provides easy access to auth state and user data throughout the app
 * 
 * @returns {Object} Authentication context value
 * @property {Object|null} user - Firebase user object
 * @property {Object|null} userProfile - User profile from Firestore
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message if any
 * @property {Function} refreshUserProfile - Function to refresh user profile
 * 
 * @example
 * const { user, userProfile, loading } = useAuth();
 * 
 * if (loading) return <LoadingSpinner />;
 * if (!user) return <LoginScreen />;
 * return <HomeScreen />;
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
