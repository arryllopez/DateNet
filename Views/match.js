document.addEventListener('DOMContentLoaded', () => {
    const userCard = document.querySelector('.user-card');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    const users = [
        {
            name: 'Alice Johnson',
            age: 28,
            image: '/placeholder.svg?height=400&width=300',
            bio: 'Adventure seeker and coffee enthusiast',
            school: 'University of Example',
            lookingFor: 'Someone to share adventures and quiet moments alike.'
        },
        {
            name: 'Bob Smith',
            age: 32,
            image: '/placeholder.svg?height=400&width=300',
            bio: 'Tech enthusiast and amateur chef',
            school: 'Tech Institute',
            lookingFor: 'A partner to explore new cuisines and gadgets with.'
        },
        {
            name: 'Carol Davis',
            age: 26,
            image: '/placeholder.svg?height=400&width=300',
            bio: 'Yoga instructor and nature lover',
            school: 'Greendale Community College',
            lookingFor: 'Someone who appreciates mindfulness and outdoor activities.'
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
        if (!isTransitioning) {
            isTransitioning = true;
            currentUserIndex = (currentUserIndex + 1) % users.length;
            updateUserCard(currentUserIndex);
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    });

    // Initialize with the first user
    updateUserCard(currentUserIndex);
});

