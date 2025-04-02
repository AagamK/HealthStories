document.addEventListener('DOMContentLoaded', function() {
    // Create a header element
    const header = document.createElement('header');
    
    // Fetch the header content
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            // Add the header content
            header.innerHTML = data;
            
            // Add it to the body
            document.body.insertBefore(header, document.body.firstChild);
            
            // Update active menu item based on current page
            updateActiveMenuItem();
        })
        .catch(error => console.error('Error loading header:', error));
});

function updateActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
