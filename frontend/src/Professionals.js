import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Professionals() {
  const [pros, setPros] = useState([]);

  useEffect(() => {
    axios.get('/api/pros')
      .then(res => setPros(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recommended Professionals</h2>
      <ul className="space-y-3">
        {pros.map((p, i) => (
          <li key={i} className="p-4 border rounded shadow">
            <p><strong>{p.name}</strong> ({p.type})</p>
            <p>{p.phone} | {p.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Professionals;