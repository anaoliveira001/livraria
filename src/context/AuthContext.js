import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserProfile } from '../firebase/firestore';

/**
 * Authentication Context
 * Manages global authentication state throughout the app
 */
export const AuthContext = createContext({
  user: null,
  userProfile: null,
  loading: true,
  error: null,
});

/**
 * Authentication Provider Component
 * Wraps the app and provides authentication state to all children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // User is signed in
            setUser(firebaseUser);
            
            // Fetch user profile from Firestore
            try {
              const profile = await getUserProfile(firebaseUser.uid);
              setUserProfile(profile);
            } catch (profileError) {
              console.warn('Could not fetch user profile:', profileError);
              // User exists in Auth but not in Firestore yet
              setUserProfile(null);
            }
          } else {
            // User is signed out
            setUser(null);
            setUserProfile(null);
          }
          setError(null);
        } catch (err) {
          console.error('Auth state change error:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Auth observer error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Refresh user profile data
   */
  const refreshUserProfile = async () => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } catch (err) {
        console.error('Error refreshing user profile:', err);
      }
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
