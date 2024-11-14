require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
