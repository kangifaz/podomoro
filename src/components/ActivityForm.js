import { useState } from 'react';

export default function ActivityForm({ onAddActivity }) {
  const [activity, setActivity] = useState({
    startTime: '',
    endTime: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.startTime && activity.endTime && activity.description) {
      onAddActivity({ ...activity, id: Date.now() });
      setActivity({ startTime: '', endTime: '', description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h3>Add New Activity</h3>
      <div>
        <label>Start Time: </label>
        <input 
          type="time" 
          value={activity.startTime}
          onChange={(e) => setActivity({...activity, startTime: e.target.value})}
          required
        />
      </div>
      <div>
        <label>End Time: </label>
        <input 
          type="time" 
          value={activity.endTime}
          onChange={(e) => setActivity({...activity, endTime: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Activity: </label>
        <input 
          type="text" 
          value={activity.description}
          onChange={(e) => setActivity({...activity, description: e.target.value})}
          placeholder="What are you working on?"
          required
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
}