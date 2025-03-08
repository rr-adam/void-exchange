const hre = require("hardhat");
const { setBalance } = require("@nomicfoundation/hardhat-network-helpers");

module.exports = async function deployFixture() {
  // Example address
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = deployer.address;

  globalThis.Deployer = deployerAddress;
  globalThis.parseEther = (value) => hre.ethers.utils.parseEther(value);

  setBalance(Deployer, parseEther("10000"));

  // Deploy VoidFactory
  console.log("Deploying VoidFactory...");

  const VoidFactory = await hre.ethers.getContractFactory("VoidFactory");
  globalThis.voidFactory = await VoidFactory.deploy(2);
  await voidFactory.deployed();
  console.log(`VoidFactory deployed at ${voidFactory.address}`);

  // Deploy tokenA and TokenB example tokens
  console.log("Deploying example tokens...");

  const ExampleToken = await hre.ethers.getContractFactory("ExampleToken");

  globalThis.tokenA = await ExampleToken.deploy(
    parseEther("2000"),
    "Token A",
    "TA"
  );
  await tokenA.deployed();
  console.log(`TokenA deployed at ${tokenA.address}`);

  globalThis.tokenB = await ExampleToken.deploy(
    parseEther("2000"),
    "Token B",
    "TB"
  );
  await tokenB.deployed();
  console.log(`TokenB deployed at ${tokenB.address}`);

  // Deploy example VoidPair
  console.log("Deploying VoidPair example...");

  await voidFactory.createPair(tokenA.address, tokenB.address);

  const pairAddress = await voidFactory.getPairAddress(
    tokenA.address,
    tokenB.address
  );
  const pairArtifact = await artifacts.readArtifact("VoidPair");
  const pairAbi = pairArtifact.abi;
  globalThis.voidPair = new hre.ethers.Contract(pairAddress, pairAbi, deployer);

  console.log(`Example VoidPair of A and B deployed at ${voidPair.address}`);

  // Give approval to VoidPair contract from deployer
  await tokenA.approve(pairAddress, parseEther("2000"));
  await tokenB.approve(pairAddress, parseEther("2000"));

  await voidPair.addLiquidity(parseEther("100"), parseEther("200"));

  // Deploy Multicall
  const Multicall2 = await hre.ethers.getContractFactory("Multicall2");
  globalThis.multicall2 = await Multicall2.deploy();
  await multicall2.deployed();
  console.log(`Multicall deployed at ${multicall2.address}`);
};
