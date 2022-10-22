// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const web3 = require("web3");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await hre.ethers.getSigners();

  const DivisiondContractFactory = await hre.ethers.getContractFactory(
    "Division"
  );

  let owners = [
    "0x64eb4Abe091301Fb7403bb1b19159b80ea1Fac29",
    "0x64eb4Abe091301Fb7403bb1b19159b80ea1Fac29",
  ];

  const DivisionContract = await DivisiondContractFactory.deploy(owners);
  await DivisionContract.deployed();

  console.log("Division deployed to:", CryptoWorldContract.address);

  console.log("Division owner address:", owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
