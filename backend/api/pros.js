
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all professionals
router.get('/', async (req, res) => {
  const pros = await prisma.serviceProvider.findMany();
  res.json(pros);
});

// POST a new professional
router.post('/', async (req, res) => {
  const { name, type, phone, email } = req.body;
  if (!name || !type || !phone || !email) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const created = await prisma.serviceProvider.create({
    data: { name, type, phone, email }
  });
  res.status(201).json(created);
});

module.exports = router;
