import configure from './controllers/index.js';
import { connectWithDb } from './mongo.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { handleErrors } from './middlewares/handleErrors.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

connectWithDb();

configure(app);

app.use(handleErrors);
export default app;
