# CodeSync

CodeSync is a collaborative coding room app focused on real-time pair programming, room-based problem solving, and protected workspace navigation. The current implementation emphasizes the collaborative experience: authentication, room creation, live editor sync, and challenge browsing are the core features that are working in this build.

## Overview

The app currently lets users:

- sign up and log in securely
- access protected pages only when authenticated
- create rooms or join them with a unique room code
- collaborate inside a shared coding workspace
- see live updates when teammates type in the same room
- browse coding problems and assign a challenge to a room
- move between dashboard, problem pages, and room pages without breaking access rules

This version is built as a collaborative coding experience, not as a fully implemented online judge or automated testcase runner.

## Tech Stack

- Frontend: React + Vite
- Routing: React Router
- UI: custom responsive styling
- Backend: Node.js + Express
- Real-time sync: Socket.IO
- Database: PostgreSQL + Prisma ORM
- Authentication: JWT + bcrypt

## Implemented Features

### User authentication
- User registration and login flows
- JWT-based authentication checks
- Protected routes for dashboard, problems, and room content
- Current user retrieval via authenticated requests

### Room management
- Create a room with a custom name
- Join an existing room using a room code
- View participants inside the room
- See room details and join state from the dashboard

### Live collaboration
- Real-time room join handling
- Shared code synchronization across connected clients
- Shared language updates in the active workspace
- Live editor updates visible across tabs and users in the same room

### Problem workflow
- Browse available challenges
- Open a challenge detail page
- Assign a selected problem to a room
- View examples, description, constraints, and expected format

### Access control
- Login and registration pages are public
- Dashboard, problems, and room pages are protected
- Unauthorized users are redirected away from protected areas

## Project Structure

```text
CodeSync/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── server/                 # Express API + Prisma + database layer
│   ├── src/
│   ├── prisma/ 
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── README.md
└── .gitignore
```

## Architecture

### Frontend
The client app handles:

- authentication pages
- dashboard flow
- room creation and joining
- challenge browsing and details
- Monaco-based editor usage
- real-time Socket.IO communication

### Backend
The server exposes REST endpoints for:

- authentication routes
- room creation and room lookup
- challenge retrieval
- real-time room behavior through Socket.IO

### Database
Prisma models support:

- users
- rooms
- participants
- problems
- submissions

## Prerequisites

Before running the app, make sure you have:

- Node.js 20+
- npm
- PostgreSQL running locally

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd CodeSync
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Configure the server environment

Create a local environment file in the server folder:

```bash
cd server
copy .env.example .env
```

Then update the values in `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/codesync"
JWT_SECRET="replace-with-a-long-random-secret"
PORT=5000
```

### 4. Start PostgreSQL

Make sure your PostgreSQL database is running and that the database name matches the value in `DATABASE_URL`.

### 5. Run Prisma migrations

```bash
cd server
npx prisma migrate deploy
```

If needed, generate the Prisma client:

```bash
npx prisma generate
```

### 6. Start the backend

```bash
cd server
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

### 7. Start the frontend

Open a second terminal and run:

```bash
cd client
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

## Typical User Flow

1. Register or log in.
2. Open the dashboard.
3. Create a room or join with a code.
4. Collaborate inside the room.
5. Pick a challenge and view the problem details.
6. Work on the shared editor with live updates across users.

## Screenshots

### Home / Landing Page

![CodeSync Collaboration](screenshots/landing.png)

### Dashboard

![CodeSync Dashboard](screenshots/dashboard.png)

### Problem Workspace

![CodeSync Problem](screenshots/problem.png)

### Collaborative Coding Room

![CodeSync Room](screenshots/room.png)

## Notes

- The project is currently focused on collaborative room workflow and secure access control.
- Automated running and judging of submitted code is a future enhancement, not part of the current implementation.
- Keep your `.env` file private and do not commit secrets to version control.
