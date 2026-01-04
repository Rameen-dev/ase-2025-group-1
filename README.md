### ASE-2025-Group-1 - Applied Software Engineering Project

**SustainWear** | A sustainable clothing donation platform.

## Overview 
SustainWear is a full-stack web platform designed to connect donors, charities and administrators in order to help facilitate sustainable clothing donations.

The platform focuses on secure onboarding and authentication, controlled charity approval, donation tracking and sustainability impact analytics, such as estimated CO2 savings and clothing diverted from landfill.

The system was developed using Agile Scrum principles with repeated development, testing and reflection across multiple sprints.

---

## Key Features
- Secure donor authentication (Sign-up, Email Verification, Password reset).
- Controlled charity onboarding with admin approval and invite flow.
- Donation request creation and charity response management.
- Charity inventory and draft management.
- Admin dashboards for user oversight and analytics.
- Live sustainability impact metrics (Estimated CO2 saved, Clothing diverted from landfill.)
- Role-based dashboards for Donors, Charities and Admins.

---

## Technology Stack
- Frontend & Backend: Next.js (App Router)
- Database: PostgreSQL
- Cloud Database Hosting: Neon
- ORM: Prisma
- Image Storage: Cloudinary
- Validatioon: Zod
- Testing: Jest (unit tests)
- Version control: GitHub
- Design & Wireframes: Figma

---

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── auth/               # Authentication (login, signup, reset, OTP)
│   ├── donor/              # Donor dashboard & features
│   ├── charity/            # Charity dashboard & inventory
│   ├── admin/              # Admin dashboard & analytics
│   ├── api/                # Backend API routes
│   └── privacy/            # Privacy policy page
│
├── components/             # Reusable UI components & modals for different features
│   ├── donor/
│   ├── charity/
│   ├── forms/
│   └── UI/
│
├── lib/                    
│   ├── prisma.ts           # Database client
│   ├── impact.ts           # Sustainability calculations
│   ├── validation.ts       # Input validation schemas
│   └── email.ts            # Email services
│
├── types/                  # Shared TypeScript types
├── __tests__/              # Unit tests (auth & validation)
└── generated/              # Prisma generated 
```

We tried to make sure the project follows a modular, role-based structure, separating authentication, dashboards, backend APIs and testing to improve maintainability and scalability.

---

## Testing 
Unit testing was implemented using Jest. Our tests focus on: 
- Authentication flows
- Input validation schemas
- Password security and reset logic
In addition, Code coverage was used to ensure key backend logic and error handling paths were tested. 

---

## Team Members
- Rameen Burdabar - Scrum Master / Backend & Database
- Bogdan Dinulescu - Product Owner / Frontend & Backend
- Reefat Daniel Aziz - Developer / UI & Design
- Osama Elamami - Developer / Documentation

---

## Setting Up & Running the Project Locally
This is a quick guide on how the SustainWear platform can be run locally for demonstration or assessment purposes. 

# 1. Clone the Repository 
git clone <repository-url>
cd sustainwear

---

# 2. Install Dependencies
```npm install```

This installs all of the required frontend, backend and testing dependencies.

---

# 3. Environmental Variables 

This project uses environment variables to manage sensitive configuration such as database access, email credentials, and cloud services.

Create a `.env` file in the project root and configure the following variables:

env
# Database (PostgreSQL - Neon)
DATABASE_URL=

# Email (SMTP)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=

# Application
APP_BASE_URL=http://localhost:3000

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

# Google Gemini API Key for the AI-Chat Assistant
GEMINI_API_KEY=

---

# 4. Database Setup

For this project, we used PostgreSQL hosted on Neon, managed via Prisma.

Run the following command to apply the databse schema:

npx prisma migrate deploy

To view the database schema visually, run the following command: 

npx prisma studio

---

# 5. Run the Application 

Start the development server by running this:

npm run dev

The application will be available at:

http://localhost:3000

---

# 6. Running Tests (Jest)

Unit tests can be executed as well by running this command: 

npm test 

These tests validate authentication flows and shared validation logic

---

# 7. User Roles for Demoonstration

- Donor: Create an account via the standard sign-up flow
- Charity: Submit an application and complete sign-9up via admin invite
- Admin: Admin accounts are seeded manually in the database for security



