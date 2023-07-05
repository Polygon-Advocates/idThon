import { ethers } from "hardhat";

async function main() {
  const verifierContract = "PlantCareVerifier";
  const verifierName = "Plant Carbon Credit";
  const verifierSymbol = "PCC20";

  const spongePoseidonLib = "0x12d8C87A61dAa6DD31d8196187cFa37d1C647153";
  const poseidon6Lib = "0xb588b8f07012Dc958aa90EFc7d3CF943057F17d7";

  const PlantVerifierVerifier = await ethers.getContractFactory(verifierContract,{
    libraries: {
      SpongePoseidon: spongePoseidonLib,
      PoseidonUnit6L: poseidon6Lib
    },
  } );
  const erc20Verifier = await PlantVerifierVerifier.deploy(
    verifierName,
    verifierSymbol
  );

  await erc20Verifier.deployed();
  console.log(verifierName, " contract address:", erc20Verifier.address);
}
