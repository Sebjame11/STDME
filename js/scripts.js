// JavaScript extracted from SHU.html

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

const input = document.querySelector('input');
const sendButton = document.querySelector('button');
const chatContainer = document.querySelector('.chat-container');
const profileName = document.querySelector('.profile-header h2');
const profileBio = document.querySelector('.profile-header p');
const socialLinks = document.querySelectorAll('.social-link');

// Create chat history container
const chatHistory = document.createElement('div');
chatHistory.className = 'chat-history';
chatHistory.style.marginBottom = '1rem';
chatHistory.style.maxHeight = '200px';
chatHistory.style.overflowY = 'auto';
chatContainer.insertBefore(chatHistory, document.querySelector('.chat-input'));

// Add message to chat history
function addMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.style.padding = '0.5rem';
    messageDiv.style.marginBottom = '0.5rem';
    messageDiv.style.borderRadius = '6px';
    messageDiv.style.backgroundColor = isUser ? 'white' : 'var(--vintage-green)';
    messageDiv.style.color = isUser ? 'black' : 'white';
    messageDiv.textContent = message;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Update profile information
function updateProfile(name, bio) {
    profileName.textContent = name;
    profileBio.textContent = bio;
}

// Process user input and generate response
function processUserInput(message) {
    // Simple response logic - can be enhanced with more sophisticated AI
    const responses = {
        name: "I'll help you create your profile. What's your name?",
        bio: "Great! Now, tell me a bit about yourself for your bio.",
        social: "I'll help you find your social media profiles. Which platforms are you on?"
    };

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        return responses.name;
    } else if (message.length < 20) {
        updateProfile(message, "Loading bio...");
        return responses.bio;
    } else if (message.length < 100) {
        updateProfile(profileName.textContent, message);
        return responses.social;
    } else {
        return "I've updated your profile! You can now click on the social media links to add your profiles.";
    }
}

// Handle social media link clicks
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.textContent;
        const url = prompt(`Enter your ${platform} profile URL:`);
        if (url) {
            link.href = url;
            link.style.backgroundColor = 'var(--vintage-green)';
            link.style.color = 'white';
        }
    });
});

// Handle send button click
sendButton.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
        addMessage(message);
        const response = processUserInput(message);
        setTimeout(() => addMessage(response, false), 500);
        input.value = '';
    }
});

// Handle enter key
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Add initial greeting
setTimeout(() => {
    addMessage("Hello! I'm here to help you create your profile. How can I assist you today?", false);
}, 500); 