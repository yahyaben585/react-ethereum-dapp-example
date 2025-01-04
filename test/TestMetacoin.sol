// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MetaCoin.sol";

contract TestMetaCoin {

    // Test initial balance of the contract creator
    function testInitialBalanceUsingDeployedContract() public {
        MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());
        uint expected = 10000;
        uint actual = meta.getBalance(tx.origin);
        Assert.equal(actual, expected, "Owner should have 10000 MetaCoin initially");
    }

    // Test initial balance with a new instance of the contract
    function testInitialBalanceWithNewMetaCoin() public {
        MetaCoin meta = new MetaCoin();
        uint expected = 10000;
        uint actual = meta.getBalance(tx.origin);
        Assert.equal(actual, expected, "Owner should have 10000 MetaCoin initially");
    }

    // Test staking functionality
    function testStakeTokens() public {
        MetaCoin meta = new MetaCoin();
        uint amountToStake = 1000;
        uint expectedBalance = 10000 - amountToStake;  // Balance should decrease by staked amount
        
        // Initially, send some tokens to the contract creator to allow staking
        meta.sendCoin(tx.origin, amountToStake);  // Send tokens to sender
        bool stakeSuccessful = meta.stake(amountToStake);

        uint actualBalance = meta.getBalance(tx.origin);
        uint stakedBalance = meta.stakedBalances(tx.origin);
        
        Assert.isTrue(stakeSuccessful, "Stake should be successful");
        Assert.equal(actualBalance, expectedBalance, "Balance should be reduced by staked amount");
        Assert.equal(stakedBalance, amountToStake, "Staked balance should match the staked amount");
    }

    // Test unstaking functionality
    function testUnstakeTokens() public {
        MetaCoin meta = new MetaCoin();
        uint amountToStake = 1000;
        uint amountToUnstake = 500;
        uint expectedBalance = 10000 - amountToStake + amountToUnstake;
        
        // Send tokens and stake some of them
        meta.sendCoin(tx.origin, amountToStake);
        meta.stake(amountToStake);

        bool unstakeSuccessful = meta.unstake(amountToUnstake);

        uint actualBalance = meta.getBalance(tx.origin);
        uint stakedBalance = meta.stakedBalances(tx.origin);

        Assert.isTrue(unstakeSuccessful, "Unstake should be successful");
        Assert.equal(actualBalance, expectedBalance, "Balance should be adjusted correctly after unstaking");
        Assert.equal(stakedBalance, amountToStake - amountToUnstake, "Staked balance should be reduced by unstaked amount");
    }

    // Test loan taking functionality
    function testTakeLoan() public {
        MetaCoin meta = new MetaCoin();
        uint amountToStake = 1000;
        uint amountToLoan = 500;
        uint expectedBalanceAfterLoan = 10000 + amountToLoan;  // Balance should increase by the loan amount

        // Send tokens and stake some of them
        meta.sendCoin(tx.origin, amountToStake);
        meta.stake(amountToStake);

        bool loanTaken = meta.takeLoan(amountToLoan);

        uint actualBalance = meta.getBalance(tx.origin);
        uint loanBalance = meta.loanBalances(tx.origin);

        Assert.isTrue(loanTaken, "Loan should be successfully taken");
        Assert.equal(actualBalance, expectedBalanceAfterLoan, "Balance should be increased by loan amount");
        Assert.equal(loanBalance, amountToLoan, "Loan balance should match the loan amount");
    }

    // Test loan repayment functionality
    function testRepayLoan() public {
        MetaCoin meta = new MetaCoin();
        uint amountToStake = 1000;
        uint amountToLoan = 500;
        uint amountToRepay = 500;
        uint expectedBalanceAfterRepayment = 10000;  // After repaying loan, balance should return to normal

        // Send tokens, stake some, and take a loan
        meta.sendCoin(tx.origin, amountToStake);
        meta.stake(amountToStake);
        meta.takeLoan(amountToLoan);

        bool loanRepaid = meta.repayLoan(amountToRepay);

        uint actualBalance = meta.getBalance(tx.origin);
        uint loanBalance = meta.loanBalances(tx.origin);

        Assert.isTrue(loanRepaid, "Loan repayment should be successful");
        Assert.equal(actualBalance, expectedBalanceAfterRepayment, "Balance should return to normal after loan repayment");
        Assert.equal(loanBalance, 0, "Loan balance should be zero after repayment");
    }

}
