// import 'dotenv/config';
// import express from 'express';
// import cors from "cors";
// import userRouter from './routes/user.route.js';
// import pinRouter from './routes/pin.route.js';
// import commentRouter from './routes/comment.route.js';
// import boardRouter from './routes/board.route.js';
// import connectDB from './utils/connectDB.js';
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import dns from 'dns';

// // change dns
// dns.setServers(["1.1.1.1", "8.8.8.8"]);
 
// const app = express(); 

// app.use(express.json());

// const allowedOrigins = [
//   process.env.CLIENT_URL,
//   "http://127.0.0.1:5173",
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://127.0.0.1:5174",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS policy: Origin not allowed"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(fileUpload());

// app.use("/user", userRouter);
// app.use("/pin", pinRouter);
// app.use("/comment", commentRouter);
// app.use("/boards", boardRouter);

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);

//   res.json({
//     message: error.message || "Something went wrong!",
//     status: error.status,
//     stack: error.stack,
//   });
// });

// app.listen(3000, async () => {
//     await connectDB();
//     console.log('Server is running on port 3000');
// })

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import pinRouter from './routes/pin.route.js';
import commentRouter from './routes/comment.route.js';
import boardRouter from './routes/board.route.js';
import connectDB from './utils/connectDB.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// API routes
app.use('/user', userRouter);
app.use('/pin', pinRouter);
app.use('/comment', commentRouter);
app.use('/boards', boardRouter);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Pinterest API is running successfully!',
  });
});

// Error handling
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong!',
    status: error.status || 500,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error.stack,
    }),
  });
});

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
