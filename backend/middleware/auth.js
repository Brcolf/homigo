const admin = require('firebase-admin');
const fs = require('fs');

// Load Firebase Admin SDK from Render's secret file mount
const serviceAccount = JSON.parse(
  fs.readFileSync('/etc/secrets/firebase-adminsdk.json', 'utf8')
);

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

