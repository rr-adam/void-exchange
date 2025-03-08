const hre = require("hardhat");

module.exports = async function deployFixture() {
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = deployer.address;

  globalThis.Deployer = deployerAddress;

  // Deploy VoidFactory
  console.log("Deploying VoidFactory...");

  const VoidFactory = await hre.ethers.getContractFactory("VoidFactory");
  globalThis.voidFactory = await VoidFactory.deploy(2);
  await voidFactory.deployed();
  console.log(`VoidFactory deployed at ${voidFactory.address}`);
};
