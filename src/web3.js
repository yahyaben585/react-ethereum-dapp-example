import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useState } from 'react';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        const networkData = YourContract.networks[networkId];
        if (networkData) {
          const abi = YourContract.abi;
          const address = networkData.address;
          const contractInstance = new web3Instance.eth.Contract(abi, address);
          setContract(contractInstance);
        }
      } else {
        alert('Please install MetaMask or another Ethereum wallet.');
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>Ethereum DApp</h1>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          {/* Add interaction with contract here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
