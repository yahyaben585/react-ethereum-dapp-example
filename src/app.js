import React, { useState, createContext } from 'react';
import './App.css';
import WalletConnection from './WalletConnection';
import Staking from './Staking';
import Minting from './Minting';
import Airdrop from './Airdrop';
import Loans from './Loans';

// Create a Context for shared state
export const AppContext = createContext();

const App = () => {
  const [activeTab, setActiveTab] = useState('staking'); // Default tab
  const [walletConnected, setWalletConnected] = useState(false); // Wallet connection state
  const [userBalance, setUserBalance] = useState(0); // User balance state

  // Function to render the active component based on the selected tab
  const renderComponent = () => {
    switch (activeTab) {
      case 'staking':
        return <Staking />;
      case 'minting':
        return <Minting />;
      case 'airdrop':
        return <Airdrop />;
      case 'loans':
        return <Loans />;
      default:
        return <Staking />;
    }
  };

  return (
    <AppContext.Provider
      value={{
        walletConnected,
        setWalletConnected,
        userBalance,
        setUserBalance,
      }}
    >
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Wallet Connection Component */}
        <WalletConnection />

        {/* Navigation Bar */}
        <nav className="flex space-x-4 my-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'staking'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('staking')}
          >
            Staking
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'minting'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('minting')}
          >
            Minting
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'airdrop'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('airdrop')}
          >
            Airdrop
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'loans'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('loans')}
          >
            Loans
          </button>
        </nav>

        {/* Render Active Component */}
        <div className="mt-4">{renderComponent()}</div>
      </div>
    </AppContext.Provider>
  );
};

export default App;