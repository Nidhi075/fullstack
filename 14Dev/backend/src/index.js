const express = require('express');
const app = express();
require('dotenv').config();

const main = require('./config/db'); // ✅ no "src" in path
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routers
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter = require('./routes/problemCreator');
const submitRouter = require('./routes/submit');
const aiRouter = require('./routes/aiChatting');
const videoRouter = require('./routes/videoCreator');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Mount routers
app.use('/user', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);
app.use('/video', videoRouter);

// Initialize DB + Redis connections, then start server
const InitializeConnection = async () => {
  try {
    await Promise.all([
      main(),                // MongoDB connection
      redisClient.connect()  // Redis connection
    ]);
    console.log("DB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server listening at port number: " + (process.env.PORT || 5000));
    });
  } catch (err) {
    console.log("Error: " + err);
    process.exit(1);
  }
};

InitializeConnection();