// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract voting {
    struct Candidate {
        string name;
        uint256 votes;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;

    uint256 public votingStartTime;
    uint256 public votingEndTime;

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for(uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                votes: 0
            }));
        }
        owner = msg.sender;
        votingStartTime = block.timestamp;
        votingEndTime = votingStartTime + _durationInMinutes * 1 minutes;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _candidateName) public onlyOwner{
        candidates.push(Candidate({
            name: _candidateName,
            votes: 0
        }));
    }


    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        candidates[_candidateIndex].votes++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStartTime && block.timestamp <= votingEndTime);
    }

    function getTimeLeft() public view returns (uint256) {
        require(block.timestamp >= votingStartTime, "Voting is yet to commence");
        if(block.timestamp >= votingEndTime) {
            return 0;   
        }
        return votingEndTime - block.timestamp;
    }
}