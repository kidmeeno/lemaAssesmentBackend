const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const app = express();

// CORS config
app.use(cors({
  origin: 'https://lema-frontend-phi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Logging middleware
app.use((req: any, res: any, next: any) => {
  console.log('Incoming request origin:', req.headers.origin);
  next();
});

// JSON body parser
app.use(express.json());

// API routes
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
