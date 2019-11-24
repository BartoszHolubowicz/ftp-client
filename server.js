const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const app = express();

const apiRoute = require('./routes/api');

const port = process.env.port || 3000;

app.use(express.static('public'));
app.use(express.static('dist'));

app.use('/uikit', express.static(path.join(__dirname, 'node_modules/uikit/dist')));
app.use('/api', apiRoute);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => console.log(`Server listening at localhost:${port}`));