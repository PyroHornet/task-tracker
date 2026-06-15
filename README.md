# Task Tracker

A full-stack task management application built to handle real daily workflows.

**Live Demo:** [https://task-tracker-eight-green.vercel.app/](https://task-tracker-eight-green.vercel.app/)

## Current Status

This project is under active development. The core CRUD functionality is complete and connected to persistent storage. The current focus is expanding the feature set to make the app genuinely useful as a daily driver rather than a basic demo.

## Features

**Current**
- Create, read, update, and delete tasks
- Mark tasks as complete
- Responsive design (works on mobile)
- Persistent storage via MongoDB

**In Progress / Planned**
- Due dates
- Priority levels
- Search and filtering
- Better task organization

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (frontend)

## Key Decisions

- Chose MongoDB over SQLite for the persistence layer due to easier horizontal scaling potential and more flexible schema evolution as features are added.
- Separated frontend and backend into distinct concerns (even though they live in the same repository) to better reflect real-world full-stack architecture.

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