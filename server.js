const express = require('express');
const path = require('path');
const app = express();

const port = process.env.port || 3000;

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => console.log(`Server listening at localhost:${port}`));