
const admin = require('firebase-admin');
const serviceAccount = require('../homigo-d47c2-firebase-adminsdk-fbsvc-bbcc54f153.json'); // Replace with your credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Forbidden' });
  }
};
