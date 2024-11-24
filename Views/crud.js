function back(){
    window.location.href = 'profile.html';
}
document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();

    // Function to fetch all users
    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/api/auth/users', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Fetched users:", data);
            populateUsersTable(data.users || []); // Assuming 'users' is the key containing the array.
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    
    
    function populateUsersTable(users) {
        const tbody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        users.forEach(user => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = user.UserId;
            row.insertCell(1).textContent = user.firstName;
            row.insertCell(2).textContent = user.lastName;
            row.insertCell(3).textContent = user.email;
            const actionsCell = row.insertCell(4);
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'button button-edit';
            editBtn.onclick = function () { editUser(user.UserId); };
            actionsCell.appendChild(editBtn);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'button button-delete';
            deleteBtn.onclick = function () { deleteUser(user.UserId); };
            actionsCell.appendChild(deleteBtn);
        });
    }

    // Function to edit a user
    function editUser(userId) {
        console.log('Edit user:', userId);
        // Code to fill form for editing
    }

    // Function to delete a user
    function deleteUser(userId) {
        console.log('Delete user:', userId);
        if (confirm('Are you sure you want to delete this user?')) {
            fetch(`http://localhost:3000/api/auth/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                if (response.ok) {
                    fetchUsers(); // Refresh users list
                } else {
                    alert('Failed to delete user.');
                }
            })
            .catch(error => console.error('Error deleting user:', error));
        }
    }
});
