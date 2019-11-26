const router = require('express').Router();
const Client = require('ssh2-sftp-client');

var rememberedSession = {
  host: "",
  port: "",
  username: "",
  password: "",
};

router.post('/', (req, res) => {
  const { host, port, username, password } = req.body;

  let sftp = new Client();

  sftp.connect({
    host, port, username, password
  }).then(() => {
    console.log("Connected");
  }).then(() => {
    rememberedSession = { host, port, username, password };
    res.json({
      connectionSuccessful: true
    });
    return sftp.end();
  }).catch(err => {
    res.json({
      connectionSuccessful: false
    });
    console.error(err);
  });
});

router.get('/', (req, res) => {
  let sftp = new Client();

  sftp.connect(rememberedSession)
  .then(() => {
    console.log('Connected with', rememberedSession);
    sftp.list('.');
  }).then(data => {
    console.log('data info', data);
    res.json(data);
  }).catch(err => console.err);
});

module.exports = router;