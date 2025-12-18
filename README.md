<<<<<<< HEAD
# postorale
=======
# Postorale

A modern Medium-like blogging platform built with Angular 19, Node.js (Express), and Google Gemini.

## Project Structure

- **Frontend** (`/`): Angular 19 application with NgRx and PrimeNG.
- **Backend** (`/backend`): Node.js + Express server with Supabase & Firebase.

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in `backend/` based on `backend/.env.example` (or the created `.env`).
   - Fill in:
     - `SUPABASE_URL` & `SUPABASE_KEY`
     - `FIREBASE_SERVICE_ACCOUNT` (Path to JSON)
     - `GEMINI_API_KEY`
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the root directory.
2. Install dependencies (updated with NgRx/Firebase):
   ```bash
   npm install
   ```
3. Start the Angular app:
   ```bash
   npm start
   ```

## Features Implemented

- **Architecture**: Core/Shared/Features split, NgRx Store (Auth, Blog Entity), Services.
- **Backend API**: Auth (Google/JWT), Blog CRUD, AI generation endpoints.
- **AI Integration**: Gemini API connected via Backend.
- **UI Scaffold**: PrimeNG integration, TailwindCSS, Home/Login pages.
>>>>>>> a9ae150 (Re-structure repo: move frontend and backend into separate folders)
