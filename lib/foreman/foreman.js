const Dispatcher = require('foreman.dispatcher');
const Horde = require('horde');

// Caches
const cache = Horde.cache.fetchInstance({
  ID: 'FOREMAN'
});
const tickCache = new Horde.cache.tickCache();

// Sub Modules
const source = {
  getAllStats: tickCache.wrap(function getAllStats(){
    return _.map(Game.rooms, (room)=> room.getSources().stats());
  }),
  getNeedy: tickCache.wrap(function getNeedy(){
    const sources = source.getSourceStats();
    return _.filter(sources, (source) => !source.isOptimal());
  })
};

// Prototype Mods
const Foreman = Dispatcher;

Foreman.tick = function gameTick(callback){
  const state = {};
  this.emit('_init', state);
  this.emit('setup', state);
  this.emit('ready', state);

  try{
    callback.call(Foreman, state);
  }catch(ex){
    console.log('Exception thrown in gameTick', ex && ex.stack || ex);
  }

  this.emit('_finalize', state);
  this.emit('done', state);
};

Foreman.source = source;

module.exports = Foreman;
