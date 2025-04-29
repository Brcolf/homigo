
const express = require('express');
const router = express.Router();

// Simulated property listing data (normally scraped or pulled from cache)
const listings = Array.from({ length: 30 }).map((_, i) => ({
  id: 'Z' + (1000 + i),
  address: `123${i} Maple Ave, Seattle, WA`,
  price: 450000 + i * 5000,
  beds: 3 + (i % 2),
  baths: 2 + (i % 2),
  sqft: 1500 + i * 50
}));

router.get('/', (req, res) => {
  const page = parseInt(req.query.page || '1');
  const perPage = 10;
  const paginated = listings.slice((page - 1) * perPage, page * perPage);
  res.json(paginated);
});

module.exports = router;
