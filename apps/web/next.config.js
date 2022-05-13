const withTM = require("next-transpile-modules")(["ui-sample", "@gravis-os/form"]);

module.exports = withTM({
  reactStrictMode: true,
});
