// script.js
document.getElementById('theme-toggle').addEventListener('click', function() {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root).getPropertyValue('--background-color').trim();
    
    if (currentBg === '#f4f4f4') {
        // Switch to dark theme
        root.style.setProperty('--primary-color', '#74b9ff');
        root.style.setProperty('--secondary-color', '#a29bfe');
        root.style.setProperty('--background-color', '#2d3436');
        root.style.setProperty('--text-color', '#dfe6e9');
        root.style.setProperty('--header-bg', '#636e72');
        root.style.setProperty('--footer-bg', '#636e72');
        root.style.setProperty('--footer-text', '#dfe6e9');
    } else {
        // Switch back to light theme
        root.style.setProperty('--primary-color', '#3498db');
        root.style.setProperty('--secondary-color', '#2ecc71');
        root.style.setProperty('--background-color', '#f4f4f4');
        root.style.setProperty('--text-color', '#333');
        root.style.setProperty('--header-bg', '#fff');
        root.style.setProperty('--footer-bg', '#333');
        root.style.setProperty('--footer-text', '#fff');
    }
});