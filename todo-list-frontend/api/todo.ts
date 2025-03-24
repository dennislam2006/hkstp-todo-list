import { Todo, TodoPriority } from "../types/todo";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  };

  try {
    const response = await fetch(url, config);
    if (response && response?.status === 200) {
      return response.json;
    } else {
      throw new Error(`API errors [${response.status}]: ${response.text()}`);
    }
  } catch (error) {
    console.error(`Fail to call ${url}, ${error}`);
    throw error;
  }
}

const TodoApiCall = {
  fetchTodos: () => apiCall("/todos"),

  createTodo: (data: {
    title: string;
    description?: string;
    priority: TodoPriority;
  }) => apiCall("/todos", { method: "POST", body: JSON.stringify(data) }),

  updateTodo: (
    id: number,
    data: {
      title: string;
      description?: string;
      completed: boolean;
      priority: TodoPriority;
    }
  ) => apiCall(`/todos/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  deleteTodo: (id: number) => apiCall(`/todos/${id}`, { method: "DELETE" }),
};

export const fetchTodos = TodoApiCall.fetchTodos;
export const createTodo = TodoApiCall.createTodo;
export const updateTodo = TodoApiCall.updateTodo;
export const deleteTodo = TodoApiCall.deleteTodo;
