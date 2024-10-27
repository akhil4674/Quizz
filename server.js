const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Serve static files from the 'public' folder
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const userInput = req.body.userInput;
    
    // Append the input to a text file
    fs.appendFile('user-inputs.txt', `${userInput}\n`, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
        } else {
            res.send('Thank you! Your input has been saved.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
