import React, { useState } from 'react';
import web3 from './web3'; // Ensure web3 is properly initialized
import contract from './contract'; // Ensure contract is properly initialized

const Minting = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate the input amount
  const isValidAmount = (value) => {
    const amount = parseFloat(value);
    return !isNaN(amount) && amount > 0;
  };

  // Mint tokens
  const mintTokens = async () => {
    if (!isValidAmount(amount)) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setMessage('Minting in progress...');
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .mint(web3.utils.toWei(amount, 'ether'))
        .send({ from: accounts[0] });
      setMessage('Minting successful!');
      setAmount(''); // Reset input field after successful minting
    } catch (error) {
      setMessage('Error during minting. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Minting</h2>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to mint"
        className="w-full p-2 border rounded-lg mb-4"
      />
      <button
        onClick={mintTokens}
        disabled={!isValidAmount(amount) || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Minting...' : 'Mint'}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default Minting;