import React, { useState } from 'react';

function Onboarding() {
  const [form, setForm] = useState({
    buyerType: '',
    budgetMin: '',
    budgetMax: '',
    locations: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted:', form); // Replace with actual API call
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Onboarding</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="buyerType" value={form.buyerType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Buyer Type</option>
          <option value="First-time">First-time</option>
          <option value="Investor">Investor</option>
          <option value="Repeat">Repeat Buyer</option>
        </select>
        <input name="budgetMin" placeholder="Min Budget" value={form.budgetMin} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="budgetMax" placeholder="Max Budget" value={form.budgetMax} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="locations" placeholder="Preferred Locations (comma-separated)" value={form.locations} onChange={handleChange} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">Save</button>
      </form>
    </div>
  );
}

export default Onboarding;