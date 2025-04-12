require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/services/db');

const weatherRoutes = require('./src/routes/weather.routes');
const historyRoutes = require('./src/routes/history.routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);
app.use('/history', historyRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));