# Todo App
A web application for managing personal to-do lists.
CRUD operations for a to-do lists, responsive design, clean design pattern and version control.

## Tech Stack
- Frontend: Next.js 15 with Material UI, calling RESTful APIs
- Backend: Node.js with Express, integrated with Firebase Firestore
- Database: Firebase Firestore (No-SQL)
- Version Control: Git
- Environment Management: .env

## Setup Instructions
1. Clone the repo: `git clone https://github.com/dennislam2006/hkstp-todo-list`
2. Install dependencies:
   - Frontend: `cd todo-list-frontend && npm install`
   - Backend: `cd todo-list-backend && npm install`
3. Download the Firebase Key file (key.json) from email and move to the root of `todo-list-backend` folder
4. Run:
   - Frontend: `npm run dev`
   - Backend: `npm run dev`

## API Endpoints
- GET /api/todos/health: Health check
- GET /api/todos: Fetch all todos
- POST /api/todos: Create a todo
- PUT /api/todos/:id: Update a todo
- DELETE /api/todos/:id: Delete a todo

## Docs
- [API Docs] API.md
- [Database Schema] DB_Schema.md