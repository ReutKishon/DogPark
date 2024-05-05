import express from 'express';
import dogsRouter from './routes/dogs.js';
import userRouter from './routes/user.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use('/dogs',dogsRouter)
app.use('/users',userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
