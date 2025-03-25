# Firestore Database Schema (No-SQL)
Firestore database schema for the Todo List application, designed to support CRUD operations efficiently.

## Collections
- **todos**
  - **Purpose**: Stores individual to-do items.
  - **Document ID**: Numeric string (e.g., `"1"`, `"2"`) managed by a counter.
  - **Fields**:
    - `title`: `string` (required)
      - The task’s title.
    - `description`: `string` (optional)
      - Additional details about the task.
    - `completed`: `boolean` (default: `false`)
      - Indicates the completion status of the task.
    - `createdAt`: `string` (ISO 8601)
      - Timestamp of when the todo was created.
    - `updatedAt`: `string` (ISO 8601, optional)
      - Timestamp of the last update, if any.
    - `priority`: `string` (enum: `"high"`, `"medium"`, `"low"`)
      - Priority level of the task.

- **metadata**
  - **Purpose**: Stores a counter for generating numeric IDs.
  - **Document ID**: `"todoCounter"`
  - **Fields**:
    - `count`: `number`
      - The last used ID, incremented for each new todo.

## Example Document in todos
```json
{
  "id": "1",
  "title": "Finish HKSTP Assignment",
  "description": "Complete the to-do list app",
  "completed": false,
  "createdAt": "2025-03-24T10:00:00Z",
  "updatedAt": null,
  "priority": "high"
}
```
## Example Document in metadata
```json
{ 
  "count": 1 
}
```

