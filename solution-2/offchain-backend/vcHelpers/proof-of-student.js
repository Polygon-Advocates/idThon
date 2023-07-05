module.exports = {
  // VC type: KYCAgeCredential
  // https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld
  KYCAgeCredential: (credentialSubject) => ({
    id: 1,
    circuitId: "credentialAtomicQuerySigV2",
    query: {
      allowedIssuers: ["*"],
      type: "Student ID",
      context:
        "https://raw.githubusercontent.com/guha-rahul/Id_Thon/main/onchain-backend/schema/proof-of-student.jsonld",
      credentialSubject,
    },
  }),
  // See more off-chain examples
  // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
};
