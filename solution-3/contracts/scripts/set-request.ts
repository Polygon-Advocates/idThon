import { ethers } from "hardhat";

const Operators = {
  NOOP : 0, // No operation, skip query verification in circuit
  EQ : 1, // equal
  LT : 2, // less than
  GT : 3, // greater than
  IN : 4, // in
  NIN : 5, // not in
  NE : 6   // not equal
}

async function main() {

  // you can run https://go.dev/play/p/rnrRbxXTRY6 to get schema hash and claimPathKey using YOUR schema
  const schemaBigInt = "209543395612790186105037825491917560734"

   // merklized path to field in the W3C credential according to JSONLD  schema e.g. birthday in the KYCAgeCredential under the url "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"
  const schemaClaimPathKey = "13470801096912623173173333546115366666582305917159077526516204131948137815238"

  const requestId = 1;

  const query = {
    schema: schemaBigInt,
    claimPathKey  : schemaClaimPathKey,
    operator: Operators.EQ, // operator
    value: [1], // for operators 1-3 only first value matters
    };

  // add the address of the contract just deployed
  const PlantCareVerifierAddress = "<PlantCareVerifierAddress>"

  let plantCareVerifier = await ethers.getContractAt("PlantCareVerifier", PlantCareVerifierAddress)

  const validatorAddress = "0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450"; // sig validator
  // const validatorAddress = "0x3DcAe4c8d94359D31e4C89D7F2b944859408C618"; // mtp validator

  try {
    await plantCareVerifier.setZKPRequest(
        requestId,
        validatorAddress,
        query.schema,
        query.claimPathKey,
        query.operator,
        query.value
    );
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}
