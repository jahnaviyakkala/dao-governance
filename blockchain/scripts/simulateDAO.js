const hre = require("hardhat");

async function main() {
  const [owner, userB, userC] = await hre.ethers.getSigners();
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const SimpleDAO = await hre.ethers.getContractFactory("SimpleDAO");
  const dao = await SimpleDAO.attach(address);

  console.log("--- 🏁 Starting DAO Simulation ---");

  // 1. Owner creates a proposal
  console.log("\n1. User A (Owner) is creating a proposal...");
  const createTx = await dao.createProposal(
    "Automated Test Proposal", 
    "This proposal was created by an AI simulation script.", 
    3600
  );
  await createTx.wait();
  console.log("✅ Proposal created successfully!");

  // 2. User B votes Yes
  console.log("\n2. User B is voting 'YES'...");
  const voteBTx = await dao.connect(userB).vote(0, true);
  await voteBTx.wait();
  console.log("✅ User B voted YES.");

  // 3. User C votes No
  console.log("\n3. User C is voting 'NO'...");
  const voteCTx = await dao.connect(userC).vote(0, false);
  await voteCTx.wait();
  console.log("✅ User C voted NO.");

  // 4. Final Verification
  console.log("\n--- 📊 Final Verification ---");
  const proposal = await dao.proposals(0);
  console.log(`Proposal Title: ${proposal.title}`);
  console.log(`YES Votes: ${proposal.yesVotes.toString()}`);
  console.log(`NO Votes: ${proposal.noVotes.toString()}`);

  if (proposal.yesVotes == 1 && proposal.noVotes == 1) {
    console.log("\n🏆 SIMULATION SUCCESS: The DAO logic is working perfectly!");
  } else {
    console.log("\n❌ SIMULATION FAILED: Vote counts are incorrect.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
