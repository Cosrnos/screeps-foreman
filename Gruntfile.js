const requireAll = require('require-all');
const _ = require('lodash');

module.exports = function (grunt) {
  // TODO Provide environment info
  const Blueprints = require('./blueprints.js')();

  const tasks = requireAll({
    dirname: __dirname + '/build/tasks',
    recursive: true
  });
  const jobs = requireAll({
    dirname: __dirname + '/build/jobs'
  });
  const taskNames = _.keys(tasks);
  const config = _.reduce(tasks, function (config, files, dir) {
    dir = dir.replace('grunt-contrib-', '');
    _.each(files, (exports, name)=> {
      if(name.indexOf('_') === 0){
        return;
      }
      config[dir] = config[dir] || {};
      config[dir][name] = exports;
    });
    return config;
  }, {});

  // Apply Screeps config
  config.screeps = {
    options: getAccountOptions(Blueprints.accountInfo),
    dist: {
      src: ['dist/*.js']
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-screeps');

  _.each(taskNames, (npmTaskName)=> {
    grunt.loadNpmTasks(npmTaskName);
  });

  _.each(jobs, function (exports, name) {
    grunt.task.registerTask(name, exports);
  });
};

function getAccountOptions (userConf) {
  return Object.assign({
    ptr: false,
    branch: 'default'
  }, userConf);
}
