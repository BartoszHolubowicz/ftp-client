const toDate = require('normalize-date');
const date = require('date-and-time');

module.exports = (ts, pattern = 'YYYY-MM-DD HH:mm') => date.format(toDate(Math.floor(ts)), pattern);