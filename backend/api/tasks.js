
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all tasks for current user
router.get('/', async (req, res) => {
  const tasks = await prisma.buyerTask.findMany({
    where: { userId: req.user.uid },
    orderBy: { dueDate: 'asc' }
  });
  res.json(tasks);
});

// POST create new task
router.post('/', async (req, res) => {
  const { title, status, dueDate } = req.body;
  if (!title || !status || !dueDate) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const task = await prisma.buyerTask.create({
    data: {
      userId: req.user.uid,
      title,
      status,
      dueDate: new Date(dueDate)
    }
  });
  res.status(201).json(task);
});

// PATCH update a task status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) return res.status(400).json({ error: 'Missing status' });

  const updated = await prisma.buyerTask.update({
    where: { id },
    data: { status }
  });

  res.json(updated);
});

module.exports = router;
