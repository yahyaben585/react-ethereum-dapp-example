// src/contract.js
import web3 from './web3';

// Replace with your contract's ABI and address
const abi = [
  // Add your contract's ABI here
];
const address = '0x3e9CE0AF7047e13074999D177B278d09B436C55b'; // Your contract address

const contract = new web3.eth.Contract(abi, address);

export default contract;
