import express from 'express';
import connection from './db.js'; 
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
