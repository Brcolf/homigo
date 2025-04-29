
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { income, debt, creditScore } = req.body;

  if (!income || !debt || !creditScore) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const dti = debt / income;
  let approvalAmount = income * 4;

  if (dti > 0.4 || creditScore < 620) {
    approvalAmount = income * 2.5;
  } else if (creditScore > 750) {
    approvalAmount = income * 5;
  }

  res.json({
    approved: approvalAmount >= 200000,
    amount: Math.round(approvalAmount),
    dti: dti.toFixed(2),
    creditScore
  });
});

module.exports = router;
