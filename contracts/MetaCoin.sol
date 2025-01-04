// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ConvertLib.sol";

contract MetaCoin {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public loanBalances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Staked(address indexed _user, uint256 _amount);
    event Unstaked(address indexed _user, uint256 _amount);
    event LoanTaken(address indexed _user, uint256 _amount);
    event LoanRepaid(address indexed _user, uint256 _amount);

    // Constructor initializes with an initial balance
    constructor() {
        balances[msg.sender] = 10000; // Give the creator an initial supply
    }

    // Send coins to another address
    function sendCoin(address receiver, uint256 amount) public returns (bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    // Get balance of an address
    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }

    // Stake tokens (this locks tokens for the user)
    function stake(uint256 amount) public returns (bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        stakedBalances[msg.sender] += amount;
        emit Staked(msg.sender, amount);
        return true;
    }

    // Unstake tokens (this releases tokens to the user)
    function unstake(uint256 amount) public returns (bool sufficient) {
        if (stakedBalances[msg.sender] < amount) return false;
        stakedBalances[msg.sender] -= amount;
        balances[msg.sender] += amount;
        emit Unstaked(msg.sender, amount);
        return true;
    }

    // Take a loan (collateralized by staked tokens)
    function takeLoan(uint256 amount) public returns (bool) {
        require(stakedBalances[msg.sender] >= amount, "Insufficient collateral");
        loanBalances[msg.sender] += amount;
        balances[msg.sender] += amount; // Mint new tokens (add to balance)
        emit LoanTaken(msg.sender, amount);
        return true;
    }

    // Repay a loan
    function repayLoan(uint256 amount) public returns (bool) {
        if (loanBalances[msg.sender] < amount) return false;
        loanBalances[msg.sender] -= amount;
        balances[msg.sender] -= amount; // Burn tokens (remove from balance)
        emit LoanRepaid(msg.sender, amount);
        return true;
    }

    // Convert balance to ETH equivalent (using a conversion library)
    function getBalanceInEth(address addr) public view returns (uint256) {
        return ConvertLib.convert(getBalance(addr), 2); // Using conversion logic
    }
}
