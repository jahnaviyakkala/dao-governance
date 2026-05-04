export const SIMPLE_DAO_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const SIMPLE_DAO_ABI = [
  "function createProposal(string _title, string _description, uint256 _duration) external returns (uint256)",
  "function vote(uint256 _proposalId, bool _support) external",
  "function executeProposal(uint256 _proposalId) external",
  "function getProposalCount() external view returns (uint256)",
  "function proposals(uint256) external view returns (uint256 id, string title, string description, uint256 yesVotes, uint256 noVotes, uint256 deadline, bool executed, address proposer)",
  "function hasVoted(uint256, address) external view returns (bool)",
  "event ProposalCreated(uint256 indexed id, string title, address proposer)",
  "event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight)"
];
