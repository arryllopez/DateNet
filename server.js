require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Views/Js/Routes/authRoutes');
const matchRoutes = require('./Views/Js/Routes/matchRoutes');
const errorHandler = require('./Views/Js/middleware/errorHandler'); // Correct path for errorHandler
const sequelize = require('./Views/Js/Config/db'); // Import database connection
const cors= require('cors');

const app = express();
app.use(bodyParser.json());

// Initialize routes

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);

// Error handling middleware (should be used after routes)
app.use(errorHandler);

// Testing database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error connecting to the database:', err));

// Syncing models with the database
sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));