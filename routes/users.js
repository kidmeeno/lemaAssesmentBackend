const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/users?page=1&limit=4
router.get('/users', (req, res) => {
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '4');
  const offset = (page - 1) * limit;

  const users = db.prepare(`
    SELECT 
      users.id, 
      users.name, 
      users.email,
      addresses.street, 
      addresses.state, 
      addresses.city, 
      addresses.zipcode
    FROM users
    LEFT JOIN addresses ON users.id = addresses.user_id
    LIMIT ? OFFSET ?
  `).all(limit, offset);

  const total = db.prepare(`SELECT COUNT(*) AS count FROM users`).get().count;

  res.json({ data: users, total });
});

// GET /api/users/:id/posts?page=1&limit=5
router.get('/users/:id/posts', (req, res) => {
  const userId = req.params.id;
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '5');
  const offset = (page - 1) * limit;

  const posts = db.prepare(`
    SELECT id, title, body
    FROM posts
    WHERE user_id = ?
    LIMIT ? OFFSET ?
  `).all(userId, limit, offset);

  const count = db.prepare(`
    SELECT COUNT(*) AS count FROM posts WHERE user_id = ?
  `).get(userId).count;

  const user = db.prepare(`
    SELECT id, name, email FROM users WHERE id = ?
  `).get(userId);

  res.json({ user, posts, total: count });
});

// DELETE /api/posts/:postId
router.delete('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  const stmt = db.prepare(`DELETE FROM posts WHERE id = ?`);
  const info = stmt.run(postId);

  if (info.changes === 0) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json({ success: true });
});

// POST /api/users/:id/posts
router.post('/users/:id/posts', (req, res) => {
  const userId = req.params.id;
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }

  const stmt = db.prepare(`
    INSERT INTO posts (user_id, title, body, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `);

  const result = stmt.run(userId, title, body);

  const newPost = db.prepare(`SELECT id, title, body FROM posts WHERE id = ?`).get(result.lastInsertRowid);

  res.status(201).json({ post: newPost });
});


module.exports = router;
