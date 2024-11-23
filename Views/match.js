document.addEventListener('DOMContentLoaded', () => {
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

    const users = [
        {
            name: 'Anthony George',
            age: 21,
            image: 'Images/randomPerson.jpg',
            bio: 'Adventure seeker and coffee enthusiast',
            school: 'Carleton University',
            lookingFor: 'Someone to share adventures and quiet moments alike.'
        },
        {
            name: 'Tony Palermo',
            age: 20,
            image: 'Images/randomPerson2.jpg',
            bio: 'Business Major and aspiring Real Estate Agent',
            school: 'Toronto Metropolitan University',
            lookingFor: 'A partner to explore new cuisines and gadgets with.'
        },
        {
            name: 'Carol Davis',
            age: 19,
            image: 'Images/randomPerson3.jpg',
            bio: 'Yoga instructor and nature lover',
            school: 'Durham College',
            lookingFor: 'Someone who appreciates mindfulness and outdoor activities.'
        },
        { 
            name: 'Daniel Murray', 
            age: 19, 
            image: 'Images/randomPerson4.jpg', 
            bio: 'Cooking enthusiast, basketball fanatic', 
            school: 'Ontario Tech University', 
            lookingFor: 'A kind and caring person who will love my cooking!' 
        }
    ];

    let currentUserIndex = 0;
    let isTransitioning = false;

    function updateUserCard(index) {
        const user = users[index];
        const cardInner = userCard.querySelector('.card-inner');
        
        userCard.classList.add('transitioning');
        
        setTimeout(() => {
            const frontContent = `
                <div class="card-front">
                    <img src="${user.image}" alt="${user.name}" class="user-image">
                    <div class="user-info">
                        <h2 class="user-name">${user.name}, ${user.age}</h2>
                        <p class="user-bio">${user.bio}</p>
                    </div>
                </div>
            `;

            const backContent = `
                <div class="card-back">
                    <div class="user-details">
                        <h2>${user.name}</h2>
                        <p>Age: ${user.age}</p>
                        <p class="school">School: ${user.school}</p>
                        <p>Bio: ${user.bio}</p>
                        <p>Looking for: ${user.lookingFor}</p>
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

    function showMessagePrompt() {
        const currentUser = users[currentUserIndex];
        promptUserName.textContent = currentUser.name;
        messagePrompt.style.display = 'flex';
    }

    function showMessageInputPrompt() {
        const currentUser = users[currentUserIndex];
        inputPromptUserName.textContent = currentUser.name;
        messageInputPrompt.style.display = 'flex';
    }

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
            console.log(`Sending message to ${users[currentUserIndex].name}: ${message}`);
            
            // Store the message in localStorage
            localStorage.setItem('lastMessage', JSON.stringify({
                user: users[currentUserIndex].name,
                message: message,
                timestamp: new Date().toISOString()
            }));
            
            messageInput.value = '';
            messageInputPrompt.style.display = 'none';
            // Here you would typically send the message to a server
            // For now, we'll just move to the next user
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


    submitMessageBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            console.log(`Sending message to ${users[currentUserIndex].name}: ${message}`);
            
            // Store the message in localStorage
            localStorage.setItem('lastMessage', JSON.stringify({
                user: users[currentUserIndex].name,
                message: message,
                timestamp: new Date().toISOString()
            }));
            
            messageInput.value = '';
            messageInputPrompt.style.display = 'none';

            // Show message sent popup
            showMessageSentPopup();

            // Here you would typically send the message to a server
            // For now, we'll just move to the next user
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

    function showMessageSentPopup() {
        const popup = document.createElement('div');
        popup.className = 'message-sent-popup';
        popup.textContent = 'Message sent successfully!';
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }






    // Initialize with the first user
    updateUserCard(currentUserIndex);
});