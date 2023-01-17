import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
const app = express(); //initialising
// dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors()); //call it as a function
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://maaz:1234@cluster0.woorz6e.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
mongoose.set('strictQuery', false);