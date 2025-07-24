const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users');


app.use(cors({
  origin: 'https://lema-frontend-phi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use((req, res, next) => {
  console.log('Incoming request origin:', req.headers.origin);
  next();
});

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
