
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
  const { propertyId, offerAmount } = req.body;

  if (!propertyId || !offerAmount) {
    return res.status(400).json({ error: 'Missing propertyId or offerAmount' });
  }

  const pdfContent = `
    HOMIGO PURCHASE OFFER
    ---------------------
    Property: ${propertyId}
    Offer Amount: $${offerAmount}
    Submitted: ${new Date().toISOString()}
  `;

  const filename = `offer-${propertyId}.txt`;
  const filepath = path.join(__dirname, '..', 'offers', filename);

  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, pdfContent);

  res.json({ success: true, downloadUrl: `/offers/${filename}` });
});

module.exports = router;
