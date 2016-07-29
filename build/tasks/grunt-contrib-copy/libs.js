const utils = require('./_utils');

module.exports = {
  expand: true,
  src: ['lib/**'],
  dest: 'dist/',
  filter: 'isFile',
  rename: utils.smartReplace('lib', 'dist/')
};
