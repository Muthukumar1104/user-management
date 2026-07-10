# User Management Application

A modern **User Management Application** built with **React 19**, **Vite**, **TypeScript**, **Context API**, **MSW**, **Docker**, **Playwright**, **GitHub Actions**, and **Vercel**.

---

# Features

- User Authentication
- User Management (CRUD)
- Dashboard
- Pagination
- Form Validation
- Context API State Management
- Mock API using MSW
- Responsive UI
- Docker Support
- Playwright End-to-End Testing
- GitHub Actions CI
- Vercel CD

---

# Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Bootstrap 5 |
| State Management | React Context API |
| Form Handling | React Hook Form |
| Validation | Zod |
| HTTP Client | Axios |
| Mock API | MSW |
| Testing | Playwright |
| Containerization | Docker |
| CI | GitHub Actions |
| CD | Vercel |

---

# Project Setup

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd user-management
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

# Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start Vite development server |
| npm run build | Build production application |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

# Docker

## Build Docker Image

```bash
npm run docker:build
```

---

## Start Docker Container

```bash
npm run docker:start
```

Application:

```
http://localhost:5173
```

---

## Stop Docker Container

```bash
npm run docker:stop
```

---

## Restart Docker Container

```bash
npm run docker:restart
```

---

## View Docker Logs

```bash
npm run docker:logs
```

---

## View Docker Images

```bash
npm run docker:images
```

---

# Docker Compose

## Development

```bash
docker compose -f docker-compose.dev.yml up --build
```

---

## Production

```bash
docker compose up --build
```

---

# Playwright

## Install Browsers

```bash
npx playwright install
```

---

## Run All Tests

```bash
npm run test:e2e
```

---

## Run Tests (Headed)

```bash
npm run test:e2e:headed
```

---

## Run UI Mode

```bash
npm run test:e2e:ui
```

---

## Debug Tests

```bash
npm run test:e2e:debug
```

---

## HTML Report

```bash
npm run test:e2e:report
```

---

## Run Inside Docker

```bash
npm run docker:test
```

---

## Run Docker (Headed)

```bash
npm run docker:test:headed
```

---

## Run Docker UI Mode

```bash
npm run docker:test:ui
```

---

# Run Individual Test Files

## Authentication

```bash
npx playwright test tests/auth/login.spec.ts
```

```bash
npx playwright test tests/auth/signup.spec.ts
```

```bash
npx playwright test tests/auth/logout.spec.ts
```

---

## Dashboard

```bash
npx playwright test tests/dashboard/dashboard.spec.ts
```

---

## Users

```bash
npx playwright test tests/users/create-user.spec.ts
```

```bash
npx playwright test tests/users/edit-user.spec.ts
```

```bash
npx playwright test tests/users/delete-user.spec.ts
```

```bash
npx playwright test tests/users/pagination.spec.ts
```

---

# Folder Structure

```
user-management
│
├── .github
│   └── workflows
│       ├── playwright.yml
│       └── deploy.yml
│
├── .vscode
│   ├── launch.json
│   └── tasks.json
│
├── public
├── src
├── tests
│
├── Dockerfile
├── Dockerfile.dev
├── docker-compose.yml
├── docker-compose.dev.yml
├── nginx.conf
├── playwright.config.ts
├── vite.config.ts
└── package.json
```

---

# CI/CD Workflow

```
Developer
    │
    ▼
Create Feature Branch
    │
    ▼
Push Code
    │
    ▼
Create Pull Request
    │
    ▼
GitHub Actions
    │
    ▼
Checkout Repository
    │
    ▼
Build Docker Image
    │
    ▼
Run Docker Container
    │
    ▼
Wait Until Application Starts
    │
    ▼
Install Playwright
    │
    ▼
Run Playwright Tests
    │
    ├── Failed
    │     │
    │     ├── Upload HTML Report
    │     ├── Upload Videos
    │     ├── Upload Screenshots
    │     └── Block Merge
    │
    └── Passed
          │
          ▼
      Merge Pull Request
          │
          ▼
Deploy Workflow
          │
          ▼
Checkout Repository
          │
          ▼
Build Docker Image
          │
          ▼
Push Docker Image (GHCR)
          │
          ▼
Build Vercel Project
          │
          ▼
Deploy to Vercel Production
```

---

# Deployment

Production deployment is automatically triggered when a Pull Request is merged into the **main** branch.

Deployment includes:

- Build Docker Image
- Push Docker Image to GitHub Container Registry
- Build Vercel Project
- Deploy to Production

---

# Testing Strategy

- Unit-ready architecture
- End-to-End Testing using Playwright
- Mock APIs using MSW
- Dockerized application testing
- GitHub Actions automation

---

# Future Improvements

- Role Based Authentication
- JWT Authentication
- Backend Integration
- PostgreSQL
- Redis Caching
- Kubernetes Deployment
- SonarQube
- Code Coverage
- Lighthouse Performance Testing

---

# Author

**Muthukumar R**

Frontend Developer

React • TypeScript • Vite • Docker • Playwright • GitHub Actions