import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(\`/api/listings?page=\${page}\`)
      .then(res => setListings(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Listings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listings.map((l, i) => (
            <div key={i} className="border rounded p-4 shadow">
              <h3 className="font-semibold">{l.address}</h3>
              <p>${l.price}</p>
              <p>{l.beds} bd / {l.baths} ba / {l.sqft} sqft</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="px-4 py-2 bg-gray-300 rounded">Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-300 rounded">Next</button>
      </div>
    </div>
  );
}

export default SearchListings;