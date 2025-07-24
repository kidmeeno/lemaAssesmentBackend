## ✅ Backend: `backend/README.md`

```markdown
# 📦 Lema Backend API

This is the backend service for the **Lema** project. It provides a simple RESTful API built with **Express.js** and **SQLite (better-sqlite3)**, responsible for user and post management.

---

## 🚀 Features

- Users & addresses fetching (paginated)
- User-specific posts fetching (paginated)
- Create a post for a user
- Delete a post
- CORS configuration for frontend connection
- Clean and modular route architecture

---

## ⚙️ Technologies

- **Node.js**
- **Express.js**
- **better-sqlite3**
- **SQLite**
- **CORS**
- **Render** (deployment)

---

## 📁 Folder Structure

```
backend/
│
├── db.js                 # Database connection with better-sqlite3
├── index.js             # Main server entry
├── routes/
│   └── users.js         # All API endpoints related to users & posts
├── data.db              # SQLite database file
└── README.md

````

---

## 🧪 API Endpoints

> Base URL: `/api`

| Method | Endpoint                     | Description                        |
|--------|------------------------------|------------------------------------|
| GET    | `/users?page=1&limit=4`      | Fetch paginated users + addresses |
| GET    | `/users/:id/posts`           | Get a user's posts                 |
| POST   | `/users/:id/posts`           | Add a post for a user              |
| DELETE | `/posts/:postId`             | Delete a specific post             |

---

## 🌐 CORS Setup

We’ve enabled CORS for the deployed frontend only:

```js
cors({
  origin: 'https://lema-frontend-phi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});
````

---

## 🧑‍💻 Running Locally

1. **Clone the repo**

```bash
git clone [https://github.com/your-username/lema-backend.git](https://github.com/kidmeeno/lemaAssesmentBackend)
cd lemaAssesmentBackend
```

2. **Install dependencies**

```bash
npm install
```

3. **Ensure `data.db` is present** in the root.

4. **Run the server**

```bash
npm run dev
```

The API should be available at:
`http://localhost:8080/api`

---

## 🚢 Deployment

Deployed on **Render**
👉 `[https://lema-backend.onrender.com/api/users](https://lemaassesmentbackend.onrender.com/)`

To deploy:

* Push to GitHub
* Link repo to Render
* Set build/start commands (just `npm install` and `npm start`)

---

## 🧠 Notes

* No authentication/authorization is added (for simplicity)
* Assumes SQLite `data.db` is already seeded

---

## 👨‍💼 Author

**Bosah Arthur**
Email: [arthurbosah41@gmail.com](mailto:arthurbosah41@gmail.com)
````
