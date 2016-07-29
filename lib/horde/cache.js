function fetchCacheInstance (targetObject) {
  var cache = targetObject.memory;

  if (!cache) {
    var memKey = `_hordeCache[${targetObject.ID}]` || '_GENERAL';
    if (!Memory[memKey]) {
      Memory[memKey] = {};
    }
    cache = Memory[memKey];
  }

  return {
    getValueOnce(key, generationCallback){
      var value = this.get(key);
      if (value) {
        return value;
      }

      value = generationCallback();
      return value;
    },
    get(key){
      return cache[key];
    },
    set(key, value){
      return cache[key] = value
    }
  }
};

function tickCache () {
  this.vals = {};
}

tickCache.prototype.wrap = function _wrapFunc(callback) {
  const key = callback.name;
  const wrappedFunc = function _cacheForTickCB () {
    if (this._vals[key]) {
      return this._vals[key];
    }

    return this._vals[key] = callback();
  };
  return wrappedFunc;
};

module.exports = {
  fetchInstance(gameObject){
    return fetchCacheInstance(gameObject);
  },
  tickCache
};
