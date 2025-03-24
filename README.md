# Todo App
A web application for managing personal to-do lists.

## Tech Stack
- Frontend: Next.js 14, Material UI
- Backend: Node.js, Express
- Database: Firebase Firestore
- Version Control: Git

## Setup Instructions
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
3. Configure Firebase (add service account key).
4. Run:
   - Frontend: `npm run dev`
   - Backend: `ts-node index.ts`

## API Endpoints
- GET /api/todos: Fetch all todos
- POST /api/todos: Create a todo
- PUT /api/todos/:id: Update a todo
- DELETE /api/todos/:id: Delete a todo