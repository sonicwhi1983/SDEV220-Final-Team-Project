// Toggle the visibility of the navigation menu
function toggleMenu() {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show-menu');
}

// Fetch and display author suggestions
function showSuggestions(str) {
    // Check if the input string is empty
    if (str.length === 0) {
        document.getElementById("suggestions").innerHTML = ""; // Clear suggestions
        return;
    }

    // Make a request to the server for author suggestions
    fetch(`/authors/suggestions?q=${encodeURIComponent(str)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Generate the HTML for the suggestions list
            let suggestions = data.map(author => `
                <a href="/authors/${author.pk}" class="author-name">
                    ${author.first_name} ${author.last_name}
                </a>`).join('');
            
            // Inject the suggestions into the DOM
            document.getElementById("suggestions").innerHTML = suggestions;
        })
        .catch(error => {
            console.error("Error fetching suggestions:", error);
        });
}
