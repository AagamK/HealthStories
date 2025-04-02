document.addEventListener('DOMContentLoaded', function() {
    // Create a footer element
    const footer = document.createElement('footer');
    
    // Fetch the footer content
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            // Add the footer content
            footer.innerHTML = data;
            
            // Add it to the body
            document.body.appendChild(footer);
        })
        .catch(error => console.error('Error loading footer:', error));
});
