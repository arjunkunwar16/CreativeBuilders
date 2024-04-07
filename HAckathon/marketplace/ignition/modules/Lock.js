const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("LockModule", (m) => {
  const lock = m.contract("NFTMarketplace");
  console.log(lock.address);
  return { lock };
});

// async function main() {

//   const [deployer] = await ethers.getSigners();

//   console.log(
//   "Deploying contracts with the account:",
//   deployer.address
//   );

//   const NFTMarketplace = await ethers.contract("NFTMarketplace");
//   const contract = await NFTMarketplace.deploy();

//   console.log("Contract deployed at:", contract.address);

//   const saySomething = await contract.speak();
  
//   console.log("saySomething value:", saySomething);
// }

// main()
// .then(() => process.exit(0))
// .catch(error => {
//   console.error(error);
//   process.exit(1);
// });