document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('greeting').innerHTML =" Hello " +`${data.firstName}`;
            document.getElementById('name').value = `${data.firstName} ${data.lastName}`;
            document.getElementById('age').value = data.age;
            document.getElementById('bio').value = data.bio;
            document.getElementById('interests').value = data.interests;
        } else {
            alert(data.message || 'Error fetching profile data.');
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }

    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const bio = document.getElementById('bio').value;
        const interests = document.getElementById('interests').value;
        const hobbies = document.getElementById('hobbies').value;
        const business = document.getElementById('business').value;
        const futureGoals = document.getElementById('futureGoals').value;
        const importantThing = document.getElementById('importantThing').value;
    
        try {
            const response = await fetch('http://localhost:3000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ bio, interests, hobbies, business, futureGoals, importantThing }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                alert(data.message || 'Error updating profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    });
    
});
