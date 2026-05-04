// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleDAO
 * @dev A simple decentralized governance contract for creating and voting on proposals.
 */
contract SimpleDAO {
    // --- Data Structures ---

    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
        address proposer;
    }

    // List of all proposals
    Proposal[] public proposals;

    // Mapping to track if a user has already voted on a specific proposal
    // proposalId => (userAddress => hasVoted)
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // --- Events ---

    event ProposalCreated(uint256 indexed id, string title, address proposer);
    event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id);

    // --- Functions ---

    /**
     * @notice Creates a new proposal.
     * @param _title Short title of the proposal.
     * @param _description Detailed explanation.
     * @param _durationInSeconds How long the voting will last.
     */
    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _durationInSeconds
    ) external returns (uint256) {
        uint256 proposalId = proposals.length;
        
        proposals.push(Proposal({
            id: proposalId,
            title: _title,
            description: _description,
            yesVotes: 0,
            noVotes: 0,
            deadline: block.timestamp + _durationInSeconds,
            executed: false,
            proposer: msg.sender
        }));

        emit ProposalCreated(proposalId, _title, msg.sender);
        return proposalId;
    }

    /**
     * @notice Casts a vote on a proposal.
     * @param _proposalId The ID of the proposal.
     * @param _support True for Yes, False for No.
     */
    function vote(uint256 _proposalId, bool _support) external {
        // Validation logic
        require(_proposalId < proposals.length, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp <= proposal.deadline, "Voting has ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        // Record the vote
        if (_support) {
            proposal.yesVotes += 1;
        } else {
            proposal.noVotes += 1;
        }

        hasVoted[_proposalId][msg.sender] = true;

        emit VoteCast(_proposalId, msg.sender, _support, 1);
    }

    /**
     * @notice Executes a passed proposal.
     * @param _proposalId The ID of the proposal.
     */
    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];

        require(block.timestamp > proposal.deadline, "Voting is still active");
        require(!proposal.executed, "Already executed");
        require(proposal.yesVotes > proposal.noVotes, "Proposal did not pass");

        proposal.executed = true;

        emit ProposalExecuted(_proposalId);
    }

    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }
}
