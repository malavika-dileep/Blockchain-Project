// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assignment {
    struct AssignmentData {
        string facultyName;
        string studentUSN;
        string recordMarks;
        string remarks;
    }

    mapping(address => AssignmentData) public assignments;

    event AssignmentUploaded(
        address indexed user,
        string facultyName,
        string studentUSN,
        string recordMarks,
        string remarks
    );

    function uploadAssignment(
        string memory _facultyName,
        string memory _studentUSN,
        string memory _recordMarks,
        string memory _remarks
    ) public returns (bool) {
        assignments[msg.sender] = AssignmentData(_facultyName, _studentUSN, _recordMarks, _remarks);
        emit AssignmentUploaded(msg.sender, _facultyName, _studentUSN, _recordMarks, _remarks);
        return true; // Indicate success
    }

    function getAssignment(address _user) public view returns (AssignmentData memory) {
        return assignments[_user];
    }
}
-----------------------------------------------
1_initial_migration.js

const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
--------------------------------------------------

2_deploy_contracts.js

const Assignment = artifacts.require("Record");

module.exports = function(deployer) {
  deployer.deploy(Assignment);
};
