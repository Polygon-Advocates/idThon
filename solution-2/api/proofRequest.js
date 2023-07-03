const { KYCAgeCredential } = require("./vcHelpers/KYCAgeCredential");

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/

const humanReadableAuthReason = "You weren't there to party in 1999! 🎉";

const credentialSubject = {
  birthday: {
    // users must be born before this year
    // birthday is less than Jan 1, 2000
    $lt: 20000101,
  },
};

const proofRequest = KYCAgeCredential(credentialSubject);

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};
