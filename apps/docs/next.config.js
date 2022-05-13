const withTM = require("next-transpile-modules")(["ui-sample"]);

module.exports = withTM({
  reactStrictMode: true,
});
