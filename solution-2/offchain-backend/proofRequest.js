const { KYCAgeCredential } = require("./vcHelpers/proof-of-student");

const humanReadableAuthReason =
  "Must be a student studying in a 4 year Program";

const credentialSubject = {
  birthday: {
    $lt: 20260629,
  },
};

const proofRequest = KYCAgeCredential(credentialSubject);

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};
