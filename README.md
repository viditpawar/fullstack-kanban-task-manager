# Full Stack Kanban Task Manager

[![CI Pipeline](https://github.com/viditpawar/fullstack-kanban-task-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/viditpawar/fullstack-kanban-task-manager/actions/workflows/ci.yml)

A full-stack task management application built with React and Express, featuring a Kanban-style board and automated CI checks with GitHub Actions.

## Features

- Create tasks from the UI
- View tasks in Kanban columns
- Update task status across workflow stages
- Delete tasks from the board
- Manage tasks through a REST API
- Run automated linting and backend tests in CI

## Dashboard Preview

![Kanban task management dashboard with three columns labeled To Do, In Progress, and Done, displaying task cards with titles and status indicators in a professional blue and grey color scheme](docs/images/dashboard.png)

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
|-- .github/workflows/      # GitHub Actions workflows
|-- client/                 # React frontend
|-- server/                 # Express backend
|-- architecture.md         # Architecture notes
`-- README.md
```

## Local Development Setup

### Prerequisites

- Node.js 20+ (recommended)
- npm 9+

### 1) Clone the repository

```bash
git clone https://github.com/viditpawar/fullstack-kanban-task-manager.git
cd fullstack-kanban-task-manager
```

### 2) Install dependencies

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 3) Run the backend

```bash
npm run server
```

Backend runs on `http://localhost:5000`.

### 4) Run the frontend

In a second terminal:

```bash
npm run client
```

Frontend runs on `http://localhost:5173`.

## Local Docker Setup

Use Docker Compose to run frontend and backend together for local testing.

### Prerequisites

- Docker Desktop (or Docker Engine with Compose plugin)

### 1) Build and start containers

```bash
docker compose up --build
```

or from the root scripts:

```bash
npm run docker:up
```

### 2) Access the app

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:5000`

The frontend container proxies `/api/*` requests to the backend container.

### 3) Stop containers

```bash
docker compose down
```

or:

```bash
npm run docker:down
```

## Local Kubernetes Setup (Helm)

This repository includes a Helm chart at `helm/kanban` for deploying the app to a local Kubernetes cluster (for example, Docker Desktop Kubernetes).

### Prerequisites

- `kubectl` configured to your local cluster
- Helm installed
- Docker running

### 1) Build local images

```bash
docker compose build
```

### 2) Start a local Docker registry

```bash
docker run -d -p 5001:5000 --restart unless-stopped --name kanban-local-registry registry:2
```

If the container already exists:

```bash
docker start kanban-local-registry
```

### 3) Tag and push images to the local registry

```bash
docker tag fullstack-kanban-task-manager-client:latest localhost:5001/fullstack-kanban-task-manager-client:local
docker tag fullstack-kanban-task-manager-server:latest localhost:5001/fullstack-kanban-task-manager-server:local
docker push localhost:5001/fullstack-kanban-task-manager-client:local
docker push localhost:5001/fullstack-kanban-task-manager-server:local
```

### 4) Deploy with Helm

```bash
helm upgrade --install kanban-local ./helm/kanban \
  --namespace kanban-local \
  --create-namespace \
  -f ./helm/kanban/values.local.yaml
```

### 5) Access the app

```bash
kubectl -n kanban-local port-forward service/client 8080:80
```

Open `http://localhost:8080`.

### 6) Validate rollout

```bash
kubectl -n kanban-local get pods,svc
```

## Available Scripts (Root)

- `npm run client`: Start the Vite frontend dev server
- `npm run server`: Start the backend with nodemon
- `npm run lint`: Run frontend and backend lint checks
- `npm run test`: Run backend tests
- `npm run docker:up`: Build and start Docker Compose services
- `npm run docker:down`: Stop Docker Compose services

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## CI Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on:

- Pushes to `main`
- Pull requests to `main`

It performs:

- Dependency installation (root, client, server)
- Lint checks
- Backend test execution

## Future Improvements

- Add persistent database storage
- Add drag-and-drop task movement
- Add edit-task functionality
- Add authentication and user accounts
- Deploy frontend and backend to cloud platforms

## License

This project is licensed under the MIT License.
