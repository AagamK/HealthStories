// Common functionality
document.addEventListener("DOMContentLoaded", async () => {
    // Load header
    const header = document.querySelector("header");
    if (!header) {
        const newHeader = document.createElement("header");
        newHeader.innerHTML = `
            <nav class="navbar">
                <div class="logo">
                    <h1>Health Stories</h1>
                </div>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="stories.html">Stories</a>
                    <a href="about.html">About</a>
                    <a href="contact.html">Contact</a>
                </div>
                <div class="auth-buttons" id="authButtons">
                    <!-- Auth buttons will be added dynamically based on auth state -->
                </div>
            </nav>
        `;
        document.body.insertBefore(newHeader, document.body.firstChild);
        header = newHeader;
    }

    // Add auth state observer
    const authButtons = document.getElementById("authButtons");
    if (authButtons) {
        const updateAuthButtons = (user) => {
            authButtons.innerHTML = user
                ? `<button id="logoutBtn" class="btn btn-primary">Logout</button>`
                : `<a href="login.html" class="btn btn-primary">Login</a>`;

            const logoutBtn = document.getElementById("logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", async () => {
                    try {
                        await logoutUser();
                        showToast("Logged out successfully!", "success");
                        setTimeout(() => {
                            window.location.href = "login.html";
                        }, 1500);
                    } catch (error) {
                        showToast("Error logging out. Please try again.", "error");
                    }
                });
            }
        };

        // Check initial auth state
        updateAuthButtons(auth.currentUser);

        // Listen for auth state changes
        auth.onAuthStateChanged(updateAuthButtons);
    }

    // Add scroll effect
    const headerScrollEffect = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", headerScrollEffect);

    // Add scroll to top button
    const scrollTopBtn = document.createElement("div");
    scrollTopBtn.className = "scroll-top";
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const toggleScrollTopBtn = () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
    };

    window.addEventListener("scroll", toggleScrollTopBtn);
});

// Show toast notification
const showToast = (message, type) => {
    const toastContainer = document.getElementById("toast-container") ||
        document.createElement("div");
    
    if (!toastContainer.id) {
        toastContainer.id = "toast-container";
        toastContainer.style.position = "fixed";
        toastContainer.style.top = "20px";
        toastContainer.style.right = "20px";
        toastContainer.style.zIndex = "1000";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// Toast notification function
function showToastNotification(message, type = "info") {
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        Object.assign(toastContainer.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "1000",
        });
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    Object.assign(toast.style, {
        backgroundColor: type === "error" ? "#e74c3c" : type === "success" ? "#2ecc71" : "#3498db",
        color: "#ffffff",
        padding: "12px 20px",
        borderRadius: "5px",
        marginBottom: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        animation: "fadeIn 0.3s ease, slideInFromRight 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    });

    const icon = type === "error" ? "exclamation-circle" : type === "success" ? "check-circle" : "info-circle";

    toast.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="margin-right: 10px;"><i class="fas fa-${icon}"></i></span>
            <span>${message}</span>
        </div>
        <button style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector("button");
    closeBtn.addEventListener("click", () => removeToast(toast, toastContainer));

    setTimeout(() => removeToast(toast, toastContainer), 5000);
}

function removeToast(toast, container) {
    if (toast.parentNode === container) {
        toast.style.opacity = "0";
        setTimeout(() => {
            if (toast.parentNode === container) {
                container.removeChild(toast);
            }
        }, 300);
    }
}

// Import auth functions
import { auth, logoutUser } from './firebase-config.js';
