
const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./middleware/auth');

app.use(cors());
app.use(express.json());

app.use('/api/listings', auth, require('./api/listings'));
app.use('/api/mortgage', auth, require('./api/mortgage'));
app.use('/api/offer', auth, require('./api/offer'));
app.use('/api/pros', auth, require('./api/pros'));
app.use('/api/vault', auth, require('./api/vault'));
app.use('/api/tasks', auth, require('./api/tasks'));

app.listen(5000, () => console.log('✅ Homigo API server running on port 5000'));
