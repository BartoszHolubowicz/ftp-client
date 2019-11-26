process.env.TZ = 'Europe/Warsaw';

const express = require('express');
const Client = require('ssh2-sftp-client');
const path = require('path');
const fs = require('fs-extra');
const app = express();

const apiLocalRoute = require('./routes/apiLocal');
const apiRemoteRoute = require('./routes/apiRemote');

const port = process.env.port || 3000;

app.use(express.json());

app.use(express.static('public'));
app.use(express.static('dist'));

app.use('/uikit', express.static(path.join(__dirname, 'node_modules/uikit/dist')));
app.use('/api/local', apiLocalRoute);
app.use('/api/remote', apiRemoteRoute);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// sftp = new Client();

// sftp.connect({
//   host: 'orfi.uwm.edu.pl',
//   port: 22,
//   username: 'konto12',
//   password: 'm1OkLdV'
// }).then(() => {
//   return sftp.fastPut('test.txt', 'public_html/grupa1/test.txt');
// }).then(() => {
//   return sftp.end();
// }).catch(console.error);

app.listen(port, () => console.log(`Server listening at localhost:${port}`));