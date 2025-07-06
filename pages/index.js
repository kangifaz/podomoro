import { useState, useEffect } from 'react';
import NameInput from '../components/NameInput';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import PomodoroTimer from '../components/PomodoroTimer';
import Head from 'next/head';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem('pomodoroName');
    if (savedName) setUserName(savedName);
    
    const savedActivities = localStorage.getItem('pomodoroActivities');
    if (savedActivities) setActivities(JSON.parse(savedActivities));
  }, []);

  const handleAddActivity = (newActivity) => {
    setActivities([...activities, newActivity]);
  };

  return (
    <div className="container">
      <Head>
        <title>Pomodoro Time Tracker</title>
        <meta name="description" content="Personal Pomodoro timer app" />
      </Head>

      <header>
        <h1>Pomodoro Time Tracker{userName && ` for ${userName}`}</h1>
      </header>

      <main>
        <NameInput />
        
        <div className="app-sections">
          <div className="left-panel">
            <PomodoroTimer />
            <ActivityForm onAddActivity={handleAddActivity} />
          </div>
          
          <div className="right-panel">
            <ActivityList activities={activities} />
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .app-sections {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }
        .left-panel {
          flex: 1;
        }
        .right-panel {
          flex: 1;
        }
        .pomodoro-timer {
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          text-align: center;
        }
        .pomodoro-timer.work {
          background-color: #ffebee;
        }
        .pomodoro-timer.break {
          background-color: #e8f5e9;
        }
        .timer-display {
          font-size: 3rem;
          margin: 1rem 0;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}