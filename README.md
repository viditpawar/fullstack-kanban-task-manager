# Full Stack Kanban Task Manager

A full-stack task management application built with React, Node.js, and Express, featuring a Kanban-style board for task tracking and an automated CI pipeline using GitHub Actions.

## Features

- Create tasks from the UI
- View tasks in Kanban columns
- Update task status across workflow stages
- Delete tasks from the board
- Backend API for task management
- Automated linting and backend testing with GitHub Actions

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express

### Testing
- Jest
- Supertest

### DevOps / CI
- GitHub Actions

## Project Structure

```text
fullstack-kanban-task-manager/
├── .github/workflows/      # GitHub Actions CI workflow
├── client/                 # React frontend
├── server/                 # Express backend
├── architecture.md         # Project architecture notes
└── README.md


Application Architecture
client contains the React-based frontend UI
server contains the Express API and task management logic
frontend communicates with backend using REST API calls
GitHub Actions runs lint and test checks on push and pull request events
Local Development Setup
Clone the repository
git clone https://github.com/viditpawar/fullstack-kanban-task-manager.git
cd fullstack-kanban-task-manager
Install dependencies
npm install
npm install --prefix client
npm install --prefix server
Run the backend
npm run server
Run the frontend

In another terminal:

npm run client

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:5000
API Endpoints
Get all tasks
GET /api/tasks
Create a task
POST /api/tasks
Update a task
PUT /api/tasks/:id
Delete a task
DELETE /api/tasks/:id
Quality Checks

Run linting:

npm run lint

Run backend tests:

npm run test
CI Pipeline

The GitHub Actions workflow automatically runs on:

pushes to main
pull requests to main

It performs:

dependency installation
lint checks
backend test execution
Future Improvements
Add persistent database storage
Add drag-and-drop task movement
Add edit-task functionality
Add authentication and user accounts
Deploy frontend and backend to cloud platforms
License

This project is licensed under the MIT License.


## 2) Update `architecture.md`

Open `architecture.md` and replace it with this:

```md
# Architecture Notes

## Overview

This project is a full-stack Kanban task manager application with a React frontend and an Express backend.

## Components

### Frontend
The frontend is built with React and Vite. It renders the Kanban board UI, handles task creation, and communicates with the backend API using HTTP requests.

### Backend
The backend is built with Node.js and Express. It exposes REST endpoints for task retrieval, creation, update, and deletion.

### Testing
Backend API tests are implemented using Jest and Supertest.

### CI Pipeline
GitHub Actions is used to automate linting and backend test execution on every push and pull request to the main branch.

## Current Data Model
The application currently uses an in-memory task array with the following fields:
- `id`
- `title`
- `description`
- `status`
- `priority`

## Request Flow
1. User interacts with the React UI
2. React sends API requests to the Express backend
3. Backend processes task operations
4. Updated data is returned to the frontend
5. Frontend re-renders the Kanban board