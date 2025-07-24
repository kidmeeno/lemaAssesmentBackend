const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});