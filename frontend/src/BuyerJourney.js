import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BuyerJourney() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data));
  }, []);

  const handleAdd = async () => {
    const newTask = {
      title,
      status: 'Pending',
      dueDate: new Date().toISOString()
    };
    const res = await axios.post('/api/tasks', newTask);
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const toggleComplete = async (id, status) => {
    const res = await axios.patch(`/api/tasks/${id}`, {
      status: status === 'Complete' ? 'Pending' : 'Complete'
    });
    setTasks(tasks.map(t => (t.id === id ? res.data : t)));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Buyer Journey</h2>
      <div className="flex space-x-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} className="flex-1 p-2 border rounded" placeholder="New task..." />
        <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="p-3 border rounded flex justify-between items-center">
            <span className={t.status === 'Complete' ? 'line-through' : ''}>{t.title}</span>
            <button onClick={() => toggleComplete(t.id, t.status)} className="text-sm text-blue-600 underline">
              Mark as {t.status === 'Complete' ? 'Pending' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyerJourney;