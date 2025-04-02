import { loginUser, onAuthStateChange } from './auth-service.js';

// Handle login form submission
const handleLogin = async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const user = await loginUser(email, password);
        if (user) {
            showToast('Login successful!', 'success');
            // Redirect to index page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast(error.message || 'An error occurred during login. Please try again.', 'error');
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

// Check authentication state
const checkAuthState = () => {
    onAuthStateChange((user) => {
        if (user) {
            // User is signed in
            // Redirect to index page if not already there
            if (window.location.pathname !== '/index.html') {
                window.location.href = 'index.html';
            }
        } else {
            // User is signed out
        }
    });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    checkAuthState();
});
