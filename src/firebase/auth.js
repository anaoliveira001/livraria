import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';
import { createUserProfile } from './firestore';

/**
 * Sign up a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} displayName - User's display name
 * @returns {Promise<Object>} User credential object
 */
export const signUpUser = async (email, password, displayName) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, {
      displayName: displayName,
    });

    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      email: email,
      displayName: displayName,
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign in existing user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User credential object
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Send password reset email to user
 * @param {string} email - User's email
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Get current authenticated user
 * @returns {Object|null} Current user object or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
