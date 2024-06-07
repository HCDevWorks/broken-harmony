import streamRoutes from '@/@main/routes/streamRoutes';
import streamController from '@/controllers/streamController';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', streamRoutes);

streamController.startInitialStreaming();

export default app;
