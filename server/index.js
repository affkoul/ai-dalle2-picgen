import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import chatgptRoutes from './routes/chatgptRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/chatgpt', chatgptRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB('mongodb://...');
    app.listen(8000, () => console.log('Server started on port 8000'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
