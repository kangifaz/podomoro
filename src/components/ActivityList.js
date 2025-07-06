import { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const savedActivities = loadData('pomodoroActivities');
    if (savedActivities) setActivities(savedActivities);
  }, []);

  useEffect(() => {
    saveData('pomodoroActivities', activities);
  }, [activities]);

  const handleEdit = (id) => {
    const activity = activities.find(a => a.id === id);
    setEditingId(id);
    setEditForm({ ...activity });
  };

  const handleUpdate = () => {
    setActivities(activities.map(a => 
      a.id === editingId ? { ...editForm } : a
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <div className="activity-list">
      <h3>Today's Schedule</h3>
      {activities.length === 0 ? (
        <p>No activities scheduled yet</p>
      ) : (
        <ul>
          {activities.map(activity => (
            <li key={activity.id}>
              {editingId === activity.id ? (
                <div className="edit-form">
                  <input 
                    type="time" 
                    value={editForm.startTime}
                    onChange={e => setEditForm({...editForm, startTime: e.target.value})}
                  />
                  <input 
                    type="time" 
                    value={editForm.endTime}
                    onChange={e => setEditForm({...editForm, endTime: e.target.value})}
                  />
                  <input 
                    type="text" 
                    value={editForm.description}
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                  />
                  <button onClick={handleUpdate}>Save</button>
                </div>
              ) : (
                <>
                  <span>[{activity.startTime} - {activity.endTime}]</span>
                  <span>{activity.description}</span>
                  <button onClick={() => handleEdit(activity.id)}>Edit</button>
                  <button onClick={() => handleDelete(activity.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}