require('dotenv').config();
const express = require('express');
const authRoutes = require('./Views/Js/Routes/authRoutes');
const matchRoutes = require('./Views/Js/Routes/matchRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
