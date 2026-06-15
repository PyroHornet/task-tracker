# Task Tracker

A full-stack task management application built to handle real daily workflows.

**Live Demo:** [https://task-tracker-eight-green.vercel.app/](https://task-tracker-eight-green.vercel.app/)

## Current Status

This project is under active development. The core CRUD functionality (add and list tasks) is complete and connected to persistent storage. The current focus is expanding the feature set to make the app genuinely useful as a daily driver rather than a basic demo.

## Live Demo Notes

The live demo is hosted entirely on free tiers:

- **Frontend**: Vercel
- **Backend**: Render (free tier)
- **Database**: MongoDB Atlas (free tier)

**Important limitation**: Render free services spin down after periods of inactivity. This means:

- The task list may not populate on first load.
- Newly added tasks may appear delayed or not show until the backend wakes up (usually 20–60 seconds on the first request after sleeping).
- A page refresh or directly visiting the backend URL (https://task-tracker-qb2g.onrender.com/tasks) will usually wake the service.

This is a known constraint of free hosting tiers and not a bug in the application itself. Once the backend is active, reads and writes work normally against MongoDB.

## Features

**Current**
- Add tasks
- View list of tasks (persisted in MongoDB)
- Mobile-friendly design

**In Progress / Planned**
- Edit and delete tasks
- Due dates
- Priority levels
- Search and filtering
- Better task organization

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: 
  - Frontend → Vercel
  - Backend → Render (free tier)
  - Database → MongoDB Atlas (free tier)

## Key Decisions

- Chose MongoDB over SQLite for the persistence layer due to easier horizontal scaling potential and more flexible schema evolution as features are added.
- Separated frontend and backend into distinct concerns (even though they live in the same repository) to better reflect real-world full-stack architecture.
- Using free hosting tiers for the live demo to keep costs at zero during development. This introduces the sleeping service behavior documented above.

## Local Development

```bash
# Clone the repo
git clone https://github.com/SamaelGamboa/task-tracker.git
cd task-tracker

# Install frontend dependencies
npm install

# Run frontend (in one terminal)
npm run dev

# Run backend (in another terminal)
npm run server
```

**Note:** The backend requires a `MONGO_URI` environment variable. Create a `.env` file in the `server` directory with your MongoDB connection string.

## Roadmap

See the [issues](https://github.com/SamaelGamboa/task-tracker/issues) for current priorities and planned features.