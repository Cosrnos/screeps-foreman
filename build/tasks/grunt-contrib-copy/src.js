const utils = require('./_utils');

module.exports = {
  expand: true,
  src: ['src/**'],
  dest: 'dist/',
  filter: 'isFile',
  rename: utils.smartReplace('src', 'dist/')
};
