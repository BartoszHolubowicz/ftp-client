const router = require('express').Router();
const DirExplorer = require('../dirExplorer');
const fs = require('fs-extra');

router.get('/', async (req, res) => {
  try {
    const dir = await fs.readdir(__dirname);
    await res.json({
      currentDir: __dirname,
      files: dir,
    })
  } catch (err) {
    res.json({ err });
  }
});

router.get('/:history', async (req, res) => {
  try {
    const currentDir = DirExplorer.applyHistory(__dirname, DirExplorer.stringHistoryToArray(req.params.history));

    const dir = await fs.readdir(currentDir.dir);
    await res.json({
      currentDir: currentDir.dir,
      files: dir,
    });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;