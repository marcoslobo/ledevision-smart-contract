// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Division is Ownable {
    struct participant {
        uint256 totalReceived;
        bool blocked;
    }

    mapping(address => participant) participants;

    uint256 totalInContract;

    uint256 public totalParticipants;

    constructor(address[] memory pDivisors) {
        for (uint256 i = 0; i < pDivisors.length; i++) {
            addParticipant(pDivisors[i]);
        }
    }

    receive() external payable {
        if (msg.value <= 0) return;
        share(msg.value);
    }

    function addParticipant(address participant_) public onlyOwner {
        participants[participant_] = participant(0, false);
        totalParticipants += 1;
    }

    function share(uint256 valueToShare) private {
        totalInContract += valueToShare;
    }

    function getValueToShareForAddress(address participant_)
        private
        view
        returns (uint256)
    {
        if (participants[participant_].blocked) return 0;

        uint256 valueToShare = totalInContract / totalParticipants;
        return valueToShare - participants[participant_].totalReceived;
    }

    function withdraw() public payable {
        address msgSender = _msgSender();

        uint256 valueToShare = getValueToShareForAddress(msgSender);

        require(valueToShare > 0, "you dont have funds for withdraw");

        participants[msgSender].totalReceived += valueToShare;

        payable(msgSender).transfer(valueToShare);
    }

    function getBalance() external view returns (uint256) {
        return getValueToShareForAddress(_msgSender());
    }

    function getDivisorsQuantity() external view returns (uint256) {
        return totalParticipants;
    }

    function blockParticipant(address participant_) external onlyOwner {
        participants[participant_].blocked = true;
        totalParticipants -= 1;
    }

    function unblockParticipant(address participant_) external onlyOwner {
        participants[participant_].blocked = false;
        totalParticipants += 1;
    }
}
