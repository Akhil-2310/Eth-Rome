// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProposalContract {
    struct Proposal {
        uint id;
        address proposer;
        string description;
        uint yesVotes;
        uint noVotes;
        uint votingDeadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    uint public proposalCount;
    mapping(uint => Proposal) public proposals;
    uint public constant VOTING_PERIOD = 7 days;

    event ProposalCreated(uint indexed proposalId, address indexed proposer, string description);
    event Voted(uint indexed proposalId, address indexed voter, bool vote);
    event ProposalExecuted(uint indexed proposalId);

    function createProposal(string memory _description) public {
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.description = _description;
        newProposal.votingDeadline = block.timestamp + VOTING_PERIOD;

        emit ProposalCreated(proposalCount, msg.sender, _description);
    }

    function vote(uint _proposalId, bool _inFavor) public {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp <= proposal.votingDeadline, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "You have already voted on this proposal");

        proposal.hasVoted[msg.sender] = true;
        if (_inFavor) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        emit Voted(_proposalId, msg.sender, _inFavor);
    }

    function executeProposal(uint _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.votingDeadline, "Voting period has not ended yet");
        require(!proposal.executed, "Proposal has already been executed");
        require(proposal.yesVotes > proposal.noVotes, "Proposal did not pass");

        proposal.executed = true;

        // Here you would typically add the logic to execute the proposal
        // For this basic example, we'll just emit an event
        emit ProposalExecuted(_proposalId);
    }

    function getProposal(uint _proposalId) public view returns (
        uint id,
        address proposer,
        string memory description,
        uint yesVotes,
        uint noVotes,
        uint votingDeadline,
        bool executed
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.proposer,
            proposal.description,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.votingDeadline,
            proposal.executed
        );
    }
}