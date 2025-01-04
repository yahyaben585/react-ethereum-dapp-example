import React, { useState } from 'react';
import web3 from './web3'; // Ensure web3 is properly initialized
import contract from './contract'; // Ensure contract is properly initialized

const Airdrop = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Follow us on Twitter', completed: false },
    { id: 2, description: 'Join our Telegram group', completed: false },
    { id: 3, description: 'Share our post on social media', completed: false },
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if all tasks are completed
  const allTasksCompleted = tasks.every((task) => task.completed);

  // Mark a task as completed
  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  // Claim airdrop
  const claimAirdrop = async () => {
    if (!allTasksCompleted) {
      setMessage('Complete all tasks to claim your airdrop.');
      return;
    }

    setLoading(true);
    setMessage('Claiming airdrop...');
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.claimAirdrop().send({ from: accounts[0] });
      setMessage('Airdrop claimed successfully!');
    } catch (error) {
      setMessage('Error during airdrop claim. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Airdrop</h2>
      <div className="mb-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
              className="mr-2"
              disabled={task.completed}
            />
            <span
              className={task.completed ? 'text-gray-500 line-through' : ''}
            >
              {task.description}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={claimAirdrop}
        disabled={!allTasksCompleted || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Claiming...' : 'Claim Airdrop'}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default Airdrop;