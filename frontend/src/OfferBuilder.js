import React, { useState } from 'react';
import axios from 'axios';

function OfferBuilder() {
  const [form, setForm] = useState({ propertyId: '', offerAmount: '' });
  const [link, setLink] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('/api/offer', form);
    setLink(res.data.downloadUrl);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Offer Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="propertyId" placeholder="Property ID" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="offerAmount" placeholder="Offer Amount" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Generate Offer</button>
      </form>
      {link && (
        <p className="mt-4">Offer created. <a className="text-blue-600 underline" href={link} target="_blank" rel="noreferrer">Download</a></p>
      )}
    </div>
  );
}

export default OfferBuilder;