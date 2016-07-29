module.exports = {
  smartReplace(folderPath, prefix){
    return function __smartReplace(dest, src) {
      var pathRegexp = new RegExp(`${folderPath}/`);
      var slashRegexp = /\//g;
      var jsRegexp = /\.js$/;

      var simpleName = src.replace(pathRegexp, '').replace(jsRegexp, '').replace(slashRegexp, '.');

      var nameParts = simpleName.split('.');
      if(nameParts.length > 1){
        var lastTwoParts = nameParts.slice(-2);

        if(lastTwoParts[0] === lastTwoParts[1]){
          nameParts.pop();
        }
      }

      return prefix + nameParts.join('.') + '.js';
    }
  }
};
