const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying SimpleDAO with the account:", deployer.address);

  const SimpleDAO = await hre.ethers.getContractFactory("SimpleDAO");
  const simpleDAO = await SimpleDAO.deploy();

  await simpleDAO.waitForDeployment();
  const address = await simpleDAO.getAddress();

  console.log("SimpleDAO deployed to:", address);

  // Wait for few blocks for indexing
  console.log("Waiting for block confirmations...");
  await simpleDAO.deploymentTransaction().wait(5);

  // Verification logic (optional)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Verifying contract...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
    } catch (e) {
      console.log("Verification failed:", e.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
