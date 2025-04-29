import React, { useState } from 'react';
import axios from 'axios';

function MortgagePrequal() {
  const [form, setForm] = useState({ income: '', debt: '', creditScore: '' });
  const [result, setResult] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('/api/mortgage', form);
    setResult(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mortgage Prequalification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="income" placeholder="Annual Income" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="debt" placeholder="Total Monthly Debt" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="creditScore" placeholder="Credit Score" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Estimate Approval</button>
      </form>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p><strong>Approval:</strong> {result.approved ? 'Yes' : 'No'}</p>
          <p><strong>Amount:</strong> ${result.amount}</p>
          <p><strong>DTI:</strong> {result.dti}</p>
          <p><strong>Credit Score:</strong> {result.creditScore}</p>
        </div>
      )}
    </div>
  );
}

export default MortgagePrequal;