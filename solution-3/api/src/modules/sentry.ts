const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const pkg = require("../../package.json");

Sentry.init({
  dsn: "https://266c4813f6124fbaa3190f7680e02a38@o1400298.ingest.sentry.io/4505343979552768",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: `<project-name>@${pkg.version}`,
});

export default Sentry;
