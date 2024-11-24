
function logout() {

localStorage.removeItem('token'); 

window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
const userCard = document.querySelector('.user-card');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');
const messagePrompt = document.getElementById('message-prompt');
const promptUserName = document.getElementById('prompt-user-name');
const sendMessageBtn = document.getElementById('send-message-btn');
const cancelMessageBtn = document.getElementById('cancel-message-btn');
const messageInputPrompt = document.getElementById('message-input-prompt');
const inputPromptUserName = document.getElementById('input-prompt-user-name');
const messageInput = document.getElementById('message-input');
const submitMessageBtn = document.getElementById('submit-message-btn');
const cancelInputBtn = document.getElementById('cancel-input-btn');

let users = [];
let currentUserIndex = 0;
let isTransitioning = false;
// Fetch random users from the backend
async function fetchRandomUsers() {
try {
    const response = await fetch('http://localhost:3000/api/match/findMatches', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch random users');
    }
    console.log('Response status:', response.status);
    const data = await response.json();
    return data; // Assume the backend returns an array of user objects
} catch (error) {
    console.error('Error fetching random users:', error);
    return [];
}
}

// Update the user card with the current user's data
function updateUserCard(index) {
const user = users[index];
const cardInner = userCard.querySelector('.card-inner');

userCard.classList.add('transitioning');

setTimeout(() => {
    const frontContent = `
        <div class="card-front">
            <img src="${user.profilePhoto}" alt="${user.firstName}" class="user-image">
            <div class="user-info">
                <h2 class="user-name">${user.firstName}, ${user.age}</h2>
                <p class="user-bio">${user.bio}</p>
            </div>
        </div>
    `;

    const backContent = `
        <div class="card-back">
            <div class="user-details">
                <h2>${user.firstName}</h2>
                <p>Age: ${user.age}</p>
                <p class="school">Faculty: ${user.faculty || 'N/A'}</p>
                <p class="school">Year: ${user.year || 'Not Specified'}</p>
                <p>Bio: ${user.bio || 'No bio available'}</p>
                <p>Looking for: ${user.lookingFor || 'Not specified'}</p>
                <button class="chat-now-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Chat Now
                </button>
            </div>
        </div>
    `;

    cardInner.innerHTML = frontContent + backContent;

    setTimeout(() => {
        userCard.classList.remove('transitioning');
    }, 500);
}, 250);
}

// Show the message prompt
function showMessagePrompt() {
const currentUser = users[currentUserIndex];
promptUserName.textContent = currentUser.firstName;
messagePrompt.style.display = 'flex';
}

// Show the message input prompt
function showMessageInputPrompt() {
const currentUser = users[currentUserIndex];
inputPromptUserName.textContent = currentUser.firstName;
messageInputPrompt.style.display = 'flex';
}

// Event listeners for buttons
prevButton.addEventListener('click', () => {
if (!isTransitioning) {
    isTransitioning = true;
    currentUserIndex = (currentUserIndex - 1 + users.length) % users.length;
    updateUserCard(currentUserIndex);
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}
});

nextButton.addEventListener('click', () => {
showMessagePrompt();
});

document.addEventListener('click', (e) => {
if (e.target.closest('.chat-now-button')) {
    showMessagePrompt();
}
});

sendMessageBtn.addEventListener('click', () => {
messagePrompt.style.display = 'none';
showMessageInputPrompt();
});

cancelMessageBtn.addEventListener('click', () => {
messagePrompt.style.display = 'none';
});

submitMessageBtn.addEventListener('click', () => {
const message = messageInput.value.trim();
if (message) {
    console.log(`Sending message to ${users[currentUserIndex].firstName}: ${message}`);

    // Store the message in localStorage
    localStorage.setItem('lastMessage', JSON.stringify({
        user: users[currentUserIndex].firstName,
        message: message,
        timestamp: new Date().toISOString(),
    }));

    messageInput.value = '';
    messageInputPrompt.style.display = 'none';

    // Move to the next user after sending the message
    if (!isTransitioning) {
        isTransitioning = true;
        currentUserIndex = (currentUserIndex + 1) % users.length;
        updateUserCard(currentUserIndex);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}
});

cancelInputBtn.addEventListener('click', () => {
messageInput.value = '';
messageInputPrompt.style.display = 'none';
});

// Initialize the user card with random users
users = await fetchRandomUsers();
if (users.length > 0) {
updateUserCard(currentUserIndex);
} else {
console.error('No users found to display.');
}
});

