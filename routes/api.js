const router = require('express').Router();
const fs = require('fs-extra');
const readdirp = require('readdirp');
const prettyBytes = require('pretty-bytes');
const DirExplorer = require('../DirExplorer');
const timestampToDatetime = require('../functions/timestampToDatetime');
const Client = require('ssh2-sftp-client');

const FOLDER = 16822;
const FILE = 33206;

router.get('/', async (req, res) => {
  let files = [];

  readdirp(__dirname, {type: 'files_directories', alwaysStat: true, depth: 0})
    .on('data', (entry) => {
      const {path, stats: {mode, size, mtimeMs}} = entry;
      files = [...files, {path, type: mode === FILE ? 'file' : 'directory', size: prettyBytes(size), modified: timestampToDatetime(mtimeMs)}];
    })
    // Optionally call stream.destroy() in `warn()` in order to abort and cause 'close' to be emitted
    .on('warn', error => console.error('non-fatal error', error))
    .on('error', error => console.error('fatal error', error))
    .on('end', () => res.json({currentDir: __dirname, files}));
});

router.get(/^\/(.+)/, async (req, res) => {
  const history = req.params[0].replace(/[\\\/]$/, '');
  let files = [];

  const currentDir = DirExplorer.applyHistory(__dirname, DirExplorer.stringHistoryToArray(history));
  readdirp(currentDir.dir, {type: 'files_directories', alwaysStat: true, depth: 0})
    .on('data', (entry) => {
      const {path, stats: {mode, size, mtimeMs}} = entry;
      files = [...files, {path, type: mode === FILE ? 'file' : 'directory', size: prettyBytes(size), modified: timestampToDatetime(mtimeMs)}];
    })
    // Optionally call stream.destroy() in `warn()` in order to abort and cause 'close' to be emitted
    .on('warn', error => console.error('non-fatal error', error))
    .on('error', error => console.error('fatal error', error))
    .on('end', () => res.json({currentDir: currentDir.dir, files}));
});

router.post('/', async (req, res) => {
  const { host, port, username, password } = req.body;

  let sftp = new Client();

  sftp.connect({
    host, port, username, password
  }).then(() => {
    console.log("yay");
  }).then(() => {
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

module.exports = router;