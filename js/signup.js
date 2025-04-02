import { registerUser } from './auth-service.js';

// Handle signup form submission
const handleSignup = async (e) => {
    e.preventDefault();
    
    const userData = {
        username: document.getElementById('username').value.trim(),
        aadhaar: document.getElementById('aadhaar').value.trim(),
        bloodGroup: document.getElementById('bloodGroup').value
    };

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        // Validate form data
        if (!userData.username) {
            throw new Error('Please enter a username');
        }

        // Validate Aadhaar number
        if (!/^[0-9]{12}$/.test(userData.aadhaar)) {
            throw new Error('Aadhaar number must be 12 digits');
        }

        // Validate email
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Validate password
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Register user
        const user = await registerUser(email, password, userData);
        
        if (user) {
            showToast('Sign up successful! Please check your email for verification.', 'success');
            // Redirect to index page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    } catch (error) {
        console.error('Signup error:', error);
        if (error.message.includes('username')) {
            showToast('Username is required', 'error');
        } else if (error.message.includes('Aadhaar')) {
            showToast('Invalid Aadhaar number', 'error');
        } else if (error.message.includes('email')) {
            showToast('Invalid email address', 'error');
        } else if (error.message.includes('password')) {
            showToast('Password must be at least 6 characters long', 'error');
        } else if (error.message.includes('permission')) {
            showToast('Permission denied. Please try again later.', 'error');
        } else {
            showToast('An error occurred during signup. Please try again.', 'error');
        }
    }
};

// Show toast notification
const showToast = (message, type) => {
    const toastContainer = document.getElementById('toast-container') ||
        document.createElement('div');
    
    if (!toastContainer.id) {
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});
