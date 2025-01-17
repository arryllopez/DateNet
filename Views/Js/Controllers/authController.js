//Managing signup , login authentication

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const UserPreferences = require('../Models/UserPreferences');

// Signup controller
async function signup(req, res) {
    console.log("Request body:", req.body); // Debugging log
    const { username, password, email, firstName, lastName, gender,dateOfBirth } = req.body;

    // if (!password) {
    //     return res.status(400).json({ message: "Password is required" });
    // }
    if(!gender){
        return res.status(400).json({ message: 'Gender is Required!' });

    }
    try {
        // Validate age
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        // const monthDiff = today.getMonth() - birthDate.getMonth();
        const isUnder18 = age < 18 || (age === 18 && today < new Date(birthDate.setFullYear(today.getFullYear())));

        if (isUnder18) {
            return res.status(400).json({ message: 'You must be 18 or older to sign up.' });
        }
        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use. Please use a different email.' });
        }
        const existingUsername = await User.findOne({
            where: { username },
        });

        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already taken. Please choose a different username.' });
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            username,
            passwordHash: hashedPassword,
            email,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            // Additional fields can be added here
        });

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error('Error during signup:', error); // Log the error
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Handle duplicate entry error
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }
        res.status(500).json({ message: 'Internal server error'});
    }
}

// Login function
async function login(req, res) {
    console.log('Login request body:', req.body); // Debugging log
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
   
    
    try {
        // Find user in the database
        const user = await User.findOne({ where: { username } });
        console.log('User found:', user);
        if (!user) {
            console.log('User not found for username:', username);
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            console.log('Invalid password for username:', username);
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.UserId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
}

// Future Enhancement 

// Real time validation trial but ended in failure 
// async function checkUsername(req, res) {
//     const { username } = req.body;

//     try {
//         const existingUser = await User.findOne({ where: { username } });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username is already taken.' });
//         }
//         res.status(200).json({ message: 'Username is available.' });
//     } catch (error) {
//         console.error('Error checking username:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// // Check if email exists
// async function checkEmail(req, res) {
//     const { email } = req.body;

//     try {
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email is already in use.' });
//         }
//         res.status(200).json({ message: 'Email is available.' });
//     } catch (error) {
//         console.error('Error checking email:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// module.exports = { signup, login, checkUsername, checkEmail };

async function getUserProfile(req, res) {
    try {
        const userId = req.user.userId;
        // const user = await User.findOne({ where: { id: req.user.userId } });
        if (!userId) {
            return res.status(404).json({ message: 'Invalid user ID' });
        }
        // res.json(user);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['passwordHash'] } // Exclude sensitive fields like password
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user); 
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function updateUserProfile(req, res) {
    try {
        const userId = req.user.userId;
        const {profilePhoto,displayPic1,  bio, interests, hobbies, location , program ,faculty, year, futureGoals, businessToStart, mostImportantThing, lastLogin, achievements, preferredAge, preferredgender, lookingFor, role} = req.body;
        
        await User.update(
            { profilePhoto,displayPic1, bio, interests, hobbies, location , program ,faculty, year, futureGoals, businessToStart, mostImportantThing, lastLogin, achievements, preferredAge, preferredgender, lookingFor,role,},
    { where: { UserId: userId } }
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUsers(req, res) {
    console.log("Fetching users...");
    try {
        const users = await User.findAll({
            attributes: ['UserId', 'firstName', 'lastName', 'email'] // Specify the fields you want to retrieve
        });
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.UserId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        await user.save();

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { signup, login, getUserProfile, updateUserProfile,getUsers, createUser, updateUser, deleteUser};