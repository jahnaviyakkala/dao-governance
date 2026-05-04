const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("SimpleDAO", function () {
  let simpleDAO;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const SimpleDAO = await ethers.getContractFactory("SimpleDAO");
    simpleDAO = await SimpleDAO.deploy();
  });

  it("Should create a proposal correctly", async function () {
    await simpleDAO.createProposal("Test Title", "Test Desc", 3600);
    const proposal = await simpleDAO.proposals(0);
    
    expect(proposal.title).to.equal("Test Title");
    expect(proposal.proposer).to.equal(owner.address);
  });

  it("Should allow voting and prevent double voting", async function () {
    await simpleDAO.createProposal("Vote Test", "Desc", 3600);
    
    await simpleDAO.connect(addr1).vote(0, true); // Vote Yes
    const proposal = await simpleDAO.proposals(0);
    expect(proposal.yesVotes).to.equal(1);

    await expect(simpleDAO.connect(addr1).vote(0, true)).to.be.revertedWith("Already voted");
  });

  it("Should execute a proposal after deadline", async function () {
    await simpleDAO.createProposal("Exec Test", "Desc", 3600);
    await simpleDAO.connect(addr1).vote(0, true);
    
    // Fast forward time
    await time.increase(3601);
    
  it("Should prevent voting after the deadline", async function () {
    await simpleDAO.createProposal("Late Vote", "Desc", 100);
    await time.increase(101);
    await expect(simpleDAO.connect(addr1).vote(0, true)).to.be.revertedWith("Voting has ended");
  });

  it("Should prevent execution if proposal did not pass", async function () {
    await simpleDAO.createProposal("Fail Test", "Desc", 100);
    await simpleDAO.connect(addr1).vote(0, false); // Vote No
    await time.increase(101);
    await expect(simpleDAO.executeProposal(0)).to.be.revertedWith("Proposal did not pass");
  });

  it("Should prevent execution before the deadline", async function () {
    await simpleDAO.createProposal("Early Exec", "Desc", 100);
    await expect(simpleDAO.executeProposal(0)).to.be.revertedWith("Voting is still active");
  });
});
