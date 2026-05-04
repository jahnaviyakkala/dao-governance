const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy Governance Token
  const GovernanceToken = await hre.ethers.getContractFactory("GovernanceToken");
  const token = await GovernanceToken.deploy(hre.ethers.parseEther("1000000")); // 1M tokens
  await token.waitForDeployment();
  console.log("GovernanceToken deployed to:", await token.getAddress());

  // 2. Deploy TimeLock
  const minDelay = 3600; // 1 hour
  const TimeLock = await hre.ethers.getContractFactory("TimeLock");
  const timelock = await TimeLock.deploy(minDelay, [], [], deployer.address);
  await timelock.waitForDeployment();
  console.log("TimeLock deployed to:", await timelock.getAddress());

  // 3. Deploy Governor
  const Governor = await hre.ethers.getContractFactory("GovernorContract");
  const governor = await Governor.deploy(await token.getAddress(), await timelock.getAddress());
  await governor.waitForDeployment();
  console.log("GovernorContract deployed to:", await governor.getAddress());

  // 4. Deploy Box
  const Box = await hre.ethers.getContractFactory("Box");
  const box = await Box.deploy();
  await box.waitForDeployment();
  console.log("Box deployed to:", await box.getAddress());

  // Setup roles
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();
  const adminRole = await timelock.DEFAULT_ADMIN_ROLE();

  await timelock.grantRole(proposerRole, await governor.getAddress());
  await timelock.grantRole(executorRole, hre.ethers.ZeroAddress); // Anyone can execute
  await timelock.revokeRole(adminRole, deployer.address);

  // Transfer ownership of Box to TimeLock
  await box.transferOwnership(await timelock.getAddress());
  console.log("Box ownership transferred to TimeLock");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
