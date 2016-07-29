const accountInfo = require('./config/account.js');
const userData = require('./config/blueprints.js');

function getDefaultSettings (build) {
  return {};
}

module.exports = function (ForemanBuild) {
  const userSettings = userData(ForemanBuild);

  return Object.assign(
    getDefaultSettings(ForemanBuild),
    userSettings,
    userData, {
      accountInfo
    });
};
