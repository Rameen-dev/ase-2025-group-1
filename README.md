# 📘 ASE-2025-Group-1 --- Applied Software Engineering Project

This repository hosts the **Group 1 project** for the 2025 Applied
Software Engineering module. It is a **Next.js (React + Node.js)**
monorepo with both frontend and backend functionality managed in a
single codebase, split logically by branches and workflows.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (React + Node.js)\
-   **Language:** JavaScript / TypeScript (if extended)\
-   **Styling:** TailwindCSS\
-   **CI/CD:** GitHub Actions (build + lint checks)\
-   **Package Manager:** npm

------------------------------------------------------------------------

## 📂 Branch Strategy

We follow a **trunk-based + feature branching** model to ensure quality,
consistency, and alignment with Agile practices.

    (main)   ← production-ready, stable branch
       ▲
     (dev)   ← integration branch (frontend + backend merge here)
      ▲   ▲
      │   └── (backend) ← API, database, server-side features
      └───── (frontend) ← UI, pages, components

-   **`main`** → Stable release branch. Only updated from `dev`.
    Protected (PRs required).\
-   **`dev`** → Integration branch. Frontend and backend changes are
    merged here.\
-   **`frontend`** → Active development for UI and React pages.\
-   **`backend`** → Active development for API routes and backend
    logic.\
-   **feature branches** → Named as `feat/login-form`,
    `fix/api-timeout`, etc., and merged back into either `frontend` or
    `backend`.

All long-lived branches (**main**, **dev**, **frontend**, **backend**) have already been created.  
👉 Team members should only start working in these branches **once discussed and agreed during team planning** to avoid conflicts.  


------------------------------------------------------------------------

## 🔧 Setup Guide for Team Members

### 1. Clone the repository

``` bash
git clone https://github.com/Rameen-dev/ase-2025-group-1.git
cd ase-2025-group-1
```

### 2. Switch to the correct branch

Choose based on your work:

``` bash
git switch frontend   # For UI / Next.js pages
git switch backend    # For API / server logic / Database
git switch dev        # For integration tasks
```

### 3. Install dependencies

We use `npm ci` (clean install) to guarantee consistent dependencies:

``` bash
npm ci
```

### 4. Run in development mode

``` bash
npm run dev
```

Visit <http://localhost:3000> in your browser.

### 5. Other useful scripts

``` bash
npm run build   # Creates an optimized production build
npm run start   # Runs the production build
npm run lint    # Runs ESLint checks
npm test        # (if tests are added later)
```

------------------------------------------------------------------------

## 🛠 Dependency Reset (Windows Users)

If you run into errors with `npm ci` on Windows (locked files, EPERM) do this in Command prompt (Make sure to close VSC):

``` bat
@echo off
rmdir /s /q node_modules
npm cache clean --force
npm ci
echo Dependencies reset. Run: npm run dev
```

Run this if dependencies break or after pulling major changes.

------------------------------------------------------------------------

## ✅ CI/CD (GitHub Actions)

Every push and pull request triggers: 
1. **Install deps** (`npm ci`)\
2. **Lint** (`npm run lint`)\
3. **Build** (`npm run build`)\
4. **Run tests** (when configured)

Branches `main`, `dev`, `frontend`, and `backend` are protected to
require **passing checks** before merging.

------------------------------------------------------------------------

## 👥 Collaboration Workflow

1.  Create a **feature branch** from `frontend` or `backend`:

    ``` bash
    git switch frontend
    git checkout -b feat/login-form
    ```

2.  Commit changes with clear messages:

    ``` bash
    git commit -m "feat: add login form component"
    ```

3.  Push branch and open a Pull Request into `frontend` or `backend`.\

4.  Once reviewed, merged → `dev`.\

5.  `dev` is periodically merged into `main` after testing.

------------------------------------------------------------------------

## 🧾 Assessment Alignment

-   **Agile Practices:** We use a branching model aligned with Agile
    (Scrum), allowing parallel frontend/backend development and
    integration sprints.\
-   **CI/CD:** Automated builds, linting, and tests enforce software
    engineering best practices.\
-   **Version Control:** GitHub branch protection rules ensure
    collaborative, structured workflow.\
-   **Maintainability:** Dependency management with `npm ci` ensures
    reproducibility and consistency across environments.\
-   **Professionalism:** Clear README, scripts, and workflow
    documentation support team onboarding and project sustainability.

------------------------------------------------------------------------

## 📌 Contribution Guidelines

-   Always pull the latest changes before starting work:

    ``` bash
    git pull origin <branch>
    ```

-   Use meaningful commit messages (`feat:`, `fix:`, `chore:`).\

-   Do not commit directly to `main` or `dev`.\

-   Ensure lint and build checks pass locally before PR.

------------------------------------------------------------------------

## 🏁 Next Steps

-   Implement project features incrementally.
-   Maintain feature branches small and focused.
-   Use GitHub Issues/Projects to track tasks.
