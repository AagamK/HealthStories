import { auth, db } from './firebase-config.js';

// Authentication Functions
const registerUser = async (email, password, userData) => {
    try {
        // Validate email
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Validate password
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Validate Aadhaar
        if (!/^[0-9]{12}$/.test(userData.aadhaar)) {
            throw new Error('Aadhaar number must be 12 digits');
        }

        // Validate blood group
        if (!['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(userData.bloodGroup)) {
            throw new Error('Please select a valid blood group');
        }

        // Create user with Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Wait for authentication to be fully established
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save user data to Firestore with proper security
        await db.collection('users').doc(user.uid).set({
            ...userData,
            email: email,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        }, { merge: true });

        return user;
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('Email is already registered. Please login or use a different email.');
        } else if (error.code === 'auth/weak-password') {
            throw new Error('Password must be at least 6 characters long');
        } else if (error.code === 'auth/invalid-email') {
            throw new Error('Please enter a valid email address');
        } else if (error.code === 'permission-denied') {
            throw new Error('Permission denied. Please try again later.');
        }
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        // Validate email
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Validate password
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Wait for authentication to be fully established
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update last login time
        await db.collection('users').doc(user.uid).update({
            lastLogin: new Date().toISOString()
        });

        return user;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            throw new Error('No user found with this email. Please sign up first.');
        } else if (error.code === 'auth/wrong-password') {
            throw new Error('Incorrect password. Please try again.');
        } else if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many failed login attempts. Please try again later.');
        } else if (error.code === 'permission-denied') {
            throw new Error('Permission denied. Please try again later.');
        }
        throw error;
    }
};

const logoutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        throw error;
    }
};

// Get current user data
const getUserData = async (userId) => {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
};

// Update user data
const updateUserData = async (userId, data) => {
    try {
        await db.collection('users').doc(userId).update(data);
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};

// Authentication state observer
const onAuthStateChange = (callback) => {
    return auth.onAuthStateChanged(callback);
};

export { registerUser, loginUser, logoutUser, getUserData, updateUserData, onAuthStateChange };
