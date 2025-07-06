import { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

export default function NameInput() {
  const [name, setName] = useState('');

  useEffect(() => {
    const savedName = loadData('pomodoroName');
    if (savedName) setName(savedName);
  }, []);

  const handleSave = () => {
    saveData('pomodoroName', name);
  };

  return (
    <div className="name-section">
      <label>Your Name: </label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name"
      />
      <button onClick={handleSave}>Save Name</button>
    </div>
  );
}