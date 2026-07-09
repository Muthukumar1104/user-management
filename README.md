# User Management Application

## Installation

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

# Playwright

## Install Playwright

```bash
npx playwright install
```

## Run All Tests

```bash
npx playwright test
```

## Run All Tests (Headed Mode)

```bash
npx playwright test --headed
```

## Run Specific Test File

### Login

```bash
npx playwright test tests/auth/login.spec.ts --headed
```

### Signup

```bash
npx playwright test tests/auth/signup.spec.ts --headed
```

### Logout

```bash
npx playwright test tests/auth/logout.spec.ts --headed
```

### Dashboard

```bash
npx playwright test tests/dashboard/dashboard.spec.ts --headed
```

### Create User

```bash
npx playwright test tests/users/create-user.spec.ts --headed
```

### Edit User

```bash
npx playwright test tests/users/edit-user.spec.ts --headed
```

### Delete User

```bash
npx playwright test tests/users/delete-user.spec.ts --headed
```

### Pagination

```bash
npx playwright test tests/users/pagination.spec.ts --headed
```

---

## Run Tests in Chromium

```bash
npx playwright test --project=chromium
```

## Run Tests in Firefox

```bash
npx playwright test --project=firefox
```

## Run Tests in WebKit

```bash
npx playwright test --project=webkit
```

---

## Run Tests in UI Mode

```bash
npx playwright test --ui
```

---

## Debug Tests

```bash
npx playwright test --debug
```

---

## Generate HTML Report

```bash
npx playwright show-report
```

---

## View Trace

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Example:

```bash
npx playwright show-trace test-results/users-edit-user-Edit-User-chromium/trace.zip
```

---

## Project Structure

```
tests/
│
├── auth/
│   ├── login.spec.ts
│   ├── signup.spec.ts
│   └── logout.spec.ts
│
├── dashboard/
│   └── dashboard.spec.ts
│
└── users/
    ├── create-user.spec.ts
    ├── edit-user.spec.ts
    ├── delete-user.spec.ts
    └── pagination.spec.ts

CI/CD flow
    Developer
    │
    ▼
Push feature branch
    │
    ▼
Create Pull Request
    │
    ▼
GitHub Actions Triggered
    │
    ▼
Checkout Repository
    │
    ▼
Install Dependencies
    │
    ▼
Build React App
    │
    ▼
Start Vite Server
    │
    ▼
Run Playwright Tests
    │
    ├── ❌ Failed
    │      │
    │      ├── Upload HTML Report
    │      ├── Upload Screenshots
    │      ├── Upload Videos
    │      └── Block Merge
    │
    └── ✅ Passed
           │
           ▼
     Reviewer Approves PR
           │
           ▼
        Merge into main
           │
           ▼
     Vercel Auto Deploys
```