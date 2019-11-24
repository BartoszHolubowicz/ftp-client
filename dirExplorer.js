const argKeywords = ['move', 'change'];

class DirExplorer {
  constructor(string, history = []) {
    let strippedString = string.replace(/^.*\/\//, '');

    this.dir = strippedString;
    this.slash = strippedString.match(/\\/) ? '\\' : '/';
    this.history = history;
  }
  root() {
    // C:/a/b/c -> C:/
    // C:/ -> C:/
    const rootRegex = /^.*?\\/;

    let r = new DirExplorer(this.dir, [...this.history, ['root']]);
    r.dir = r.dir.match(rootRegex)[0];

    return r;
  }
  up(times = 1) {
    // C:/a/b/c -> C:/a/b
    // C:/a -> C:/
    // C:/ -> C:/
    const directoryUpRegex = /.*(?=.*[\\\/])/;
    
    let r = new DirExplorer(this.dir, [...this.history, ['up']]);
    let newDir = r.dir.match(directoryUpRegex);

    if (newDir !== null)
      r.dir = newDir[0];
    if (/:$/.test(r.dir))
      r.dir = r.dir.replace(/:$/, `:${this.slash}`);

    if (times > 1)
      return r.up(times - 1);
    else
      return r;
  }
  move(string) {
    // move('new');
    // C:/ -> C:/new
    // C:/a/b -> C:/a/b/new
    let r = new DirExplorer(this.dir, [...this.history, ['move', string]]);
    r.dir = r.dir.replace(/[\\\/]$/, '')
      .concat(this.slash)
      .concat(string);
    
    return r;
  }
  change(newRoot) {
    // change('D')
    // C:/a/b/c -> D:/
    // C:/ -> D:/
    let r = new DirExplorer(this.dir, [...this.history, ['change', newRoot]]);
    r.dir = `${newRoot.toUpperCase()}:${this.slash}`;

    return r;
  }
  historyToString() {
    return this.history.map(ev => argKeywords.includes(ev[0]) ? `${ev[0]}:${ev[1]}` : ev[0]).join('.');
  }
  clone(emptyHistory = false) {
    return new DirExplorer(this.dir, emptyHistory ? [] : this.history);
  }

  static applyHistory(dirExplorer, history) {
    let r;
    if (dirExplorer.constructor.name === 'DirExplorer') {
      r = dirExplorer.clone(true);
    }
    if (typeof(dirExplorer) === 'string') {
      r = new DirExplorer(dirExplorer);
    }

    const minifiedHistory = DirExplorer.minifyHistory(history);
    minifiedHistory.forEach(ev => {
      if (argKeywords.includes(ev[0]))
        r = r[ev[0]](ev[1]);
      else
        r = r[ev[0]]();
    });

    return r;
  }

  static stringHistoryToArray(strHistory) {
    return strHistory.split('.').map(ev => ev.split(':'));
  }

  static minifyHistory(history) {
    // Removing everything before last root
    const lastRootIdx = history.reduce((acc, ev, i) => String(ev) === 'root' ? i : acc, -1);
    let newHistory = history.filter((ev, i) => i >= lastRootIdx);

    // Removing moves and ups when up() happens after move()
    const helper = [['-'], ...newHistory, ['-']];
    const filterArr = helper.map((ev, i) => {
        if (ev[0] === 'move' && helper[i + 1][0] === 'up' || ev[0] === 'up' && helper[i - 1][0] === 'move')
          return 0;
        return 1;
      })
      .slice(1, helper.length - 1);
    newHistory = newHistory.filter((ev, i) => filterArr[i]);

    return newHistory;
  }
}

module.exports = DirExplorer;