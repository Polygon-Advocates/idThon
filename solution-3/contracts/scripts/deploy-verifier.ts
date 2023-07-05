import { ethers } from "hardhat";

async function main() {
  const verifierContract = "PlantCareVerifier";
  const verifierName = "PlantCarbonCredit";
  const verifierSymbol = "PCC20";

  const spongePoseidonLib = "0x12d8C87A61dAa6DD31d8196187cFa37d1C647153";
  const poseidon6Lib = "0xb588b8f07012Dc958aa90EFc7d3CF943057F17d7";

  const PlantVerifier = await ethers.getContractFactory(verifierContract,{
    libraries: {
      SpongePoseidon: spongePoseidonLib,
      PoseidonUnit6L: poseidon6Lib
    },
  });

  const plantCareVerifier = await PlantVerifier.deploy(
    verifierName,
    verifierSymbol
  );

  await plantCareVerifier.deployed();

  console.log(verifierName, " contract address:", plantCareVerifier.address);
}
