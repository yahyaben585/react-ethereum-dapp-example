import React, { useState, useEffect } from 'react';
import web3 from './web3';
import contract from './contract'; // Assume ABI and contract address are configured here

const WalletConnection = () => {
  const [account, setAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [vaultBalance, setVaultBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch ETH and token balances
  const fetchBalances = async (account) => {
    try {
      const ethBalance = await web3.eth.getBalance(account);
      setEthBalance(web3.utils.fromWei(ethBalance, 'ether'));

      const vaultCoinBalance = await contract.methods.balanceOf(account).call();
      setVaultBalance(vaultCoinBalance);
    } catch (err) {
      setError('Failed to fetch balances.');
      console.error(err);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    setLoading(true);
    setError('');
    try {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      await fetchBalances(accounts[0]);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount('');
    setEthBalance('');
    setVaultBalance('');
    setError('');
  };

  // Automatically connect wallet if already connected (e.g., page refresh)
  useEffect(() => {
    const checkWalletConnection = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await fetchBalances(accounts[0]);
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {account ? (
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> {account}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">ETH Balance:</span> {ethBalance} ETH
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Vaultcoin Balance:</span> {vaultBalance}
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={connectWallet}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletConnection;