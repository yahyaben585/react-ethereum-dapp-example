import React, { useState } from 'react';
import web3 from './web3'; // Import web3
import contract from './contract'; // Import contract

const Staking = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const stakeTokens = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setMessage('Staking in progress...');
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .stake(web3.utils.toWei(amount, 'ether'))
        .send({ from: accounts[0] });
      setMessage('Staking successful!');
      setAmount(''); // Reset input field after successful staking
    } catch (error) {
      setMessage('Error during staking. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Staking</h2>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to stake"
        className="w-full p-2 border rounded-lg mb-4"
      />
      <button
        onClick={stakeTokens}
        disabled={!amount || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Staking...' : 'Stake'}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default Staking;