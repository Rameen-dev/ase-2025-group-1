# 📘 ASE-2025-Group-1 — Applied Software Engineering Project

This repository hosts the **Group 1 project** for the 2025 Applied Software Engineering module.  
It’s a **Next.js (React + Node.js)** monorepo with both frontend UI and backend API in one codebase.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (React + Node.js)  
- **Language:** JavaScript / TypeScript (if extended)  
- **Styling:** TailwindCSS  
- **CI/CD:** GitHub Actions (build + lint + tests)  
- **Package Manager:** npm

---

## 🌿 Branching & Git Workflow (Professional Setup)

We now use a **trunk-based + short-lived feature branch** model.  
👉 The old permanent `frontend` and `backend` branches have been removed for clarity.

```
(main)  ← production-only, stable
  ▲
(dev)   ← shared integration (auto-deploy & test)
  ▲
  ├─ feature/login-ui
  ├─ feature/login-api
  ├─ feature/payments-refactor
  └─ feature/bugfix-xyz
```

**Key rules**
- **`main`**: production-ready only. Updated *only* via PR from `dev` and tagged releases.  
- **`dev`**: single integration branch. All work merges here via PR after passing CI.  
- **`feature/*`**: short‑lived task branches (front or back end). Merge → `dev` via PR.

This keeps integration clean, supports parallel work, and mirrors industry practice.

---

## ⚙️ Quick Start (Local Setup)

```bash
git clone https://github.com/Rameen-dev/ase-2025-group-1.git
cd ase-2025-group-1

# Work from dev
git switch dev
git pull

# Create a task branch
git checkout -b feature/<topic-short-desc>

# Install dependencies (clean install for consistency)
npm ci

# Run the app
npm run dev   # http://localhost:3000
```

### Useful scripts
```bash
npm run build   # Production build
npm run start   # Run production build
npm run lint    # ESLint checks
npm test        # (when tests are added)
```

---

## 🔐 Branch Protection (recommended)
- **dev**: require PRs, passing status checks, 1–2 reviews, up‑to‑date with base.  
- **main**: same as dev **plus** releases are cut from tags (e.g., `v0.1.0`).

---

## 🤝 Collaboration Workflow

1) **Create** a feature branch from `dev`  
   ```bash
   git switch dev && git pull
   git checkout -b feature/<topic-short-desc>
   ```

2) **Develop & commit** (use Conventional Commits when possible)  
   ```bash
   git commit -m "feat: add login form component"
   ```

3) **Open PR → `dev`**  
   - CI runs: lint, typecheck, unit tests, build (and e2e when available).  
   - Address review comments; PR must be green.

4) **Merge** when CI passes. `dev` auto-deploys to the shared dev environment.

5) **Release**: when stable, open PR `dev → main`, run full checks, tag release.

> **Tip:** Slice work by *feature*, not by “frontend vs backend”. If a UI depends on an API change, coordinate two PRs (e.g., `feature/login-ui` and `feature/login-api`) that both target `dev`. Use feature flags if needed.

---

## ✅ CI/CD (GitHub Actions)

Every push and PR triggers:  
1. **Install deps** (`npm ci`)  
2. **Lint** (`npm run lint`)  
3. **Build** (`npm run build`)  
4. **Tests** (unit/e2e as configured)  
5. (Optional) **Preview Deploy** for PRs and **auto-deploy** for `dev`

---

## 🧩 Conventions

- **Branch names:** `feature/<topic-short-desc>`, `fix/<bug-id>`, `chore/<task>`  
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, etc.)  
- **PR Template:** add `.github/pull_request_template.md`

Example PR template:
```md
## Summary
<What this changes and why>

## Scope
- [ ] Frontend
- [ ] Backend
- [ ] DB/Schema
- [ ] Docs

## Tests
- [ ] Unit tests added/updated
- [ ] E2E/Smoke (if applicable)

## Notes
Feature flags / migrations / rollout:
```

---

## 🧾 Assessment Alignment

- **Agile & CI/CD:** Professional branching + PR reviews + automated checks.  
- **Version Control Rigor:** Protected branches and traceable releases.  
- **Maintainability:** Reproducible installs via `npm ci`; clear workflow docs.  
- **Professionalism:** Industry-aligned process that assessors can audit easily.

---

## 📌 Contribution Guidelines

- Pull latest before starting work: `git switch/ checkout dev && git pull`.  
- Do **not** commit directly to `main` or `dev`. Always use PRs.  
- Ensure `npm run lint` and `npm run build` pass locally before opening PRs.

---