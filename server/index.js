const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config(); //

// Routes
const routers = require('./routes/userRoutes.js');
const tagrouters = require('./routes/tagRoutes.js');
const categoryrouters = require('./routes/categoryRoutes.js');
const routinerouters = require('./routes/routineRoutes.js');
const mealTypeRoutes = require('./routes/mealTypeRoutes.js');
const nutritionRoutes = require('./routes/nutritionRoutes.js');
const progressRoutes = require('./routes/progressRoutes.js');
const reminderRoutes = require('./routes/reminderRoutes.js');
const goalRoutes = require('./routes/goalRoutes.js');

const cors = require('cors');

const app = express();
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use("/user", routers);
app.use("/api", categoryrouters);
app.use("/r", routinerouters);
app.use("/t", tagrouters);
app.use("/type", mealTypeRoutes);
app.use("/nutrition", nutritionRoutes);
app.use("/progress", progressRoutes);
app.use("/remind", reminderRoutes);
app.use("/gl", goalRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default Route
app.get('/', (req, res) => res.send('Hello World!'));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ Error connecting to MongoDB Atlas', err);
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});
