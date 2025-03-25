import admin from "firebase-admin";

// Load firebase account
const firebaseKey = require("../key.json");

// Helper function to ensure a fresh Firebase credential
function ensureFreshCredential() {
  // If no app exists, initialize it
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseKey),
    });
    console.log("Firebase Admin SDK initialized");
  } else {
    console.log("Firebase app already initialized");
  }
  return admin.firestore();
}

/**
 * Service layer for managing to-do items in Firestore
 */
class TodoService {
  // Get a fresh Firestore instance for each operation
  private getDb() {
    return ensureFreshCredential();
  }

  /**
   * Generates a unique number for new todos
   * @returns {Promise<number>} the next ID.
   */
  private async nextID(): Promise<number> {
    const db = this.getDb();
    const ref = db.collection("metadata").doc("todoCounter");
    return db.runTransaction(async (transaction) => {
      const counter = await transaction.get(ref);
      const current = counter.exists ? counter.data()?.count || 0 : 0;
      const nextID = current + 1;
      transaction.set(ref, { count: nextID }, { merge: true });
      return nextID;
    });
  }

  /**
   * Retrieves all to-do items, sorted by completion status.
   * @returns a List of todos, incomplete first.
   */
  async getTodos() {
    const db = this.getDb();
    const collection = db.collection("todos");
    try {
      const items = await collection.get();
      const result = items.docs.map((item) => ({
        id: Number(item.id),
        title: item.data().title,
        description: item.data().description,
        completed: item.data().completed || false,
        createdAt: new Date(item.data().createdAt),
        updatedAt: item.data().updatedAt
          ? new Date(item.data().updatedAt)
          : null,
        priority: item.data().priority,
      }));
      return result.sort((a, b) => Number(a.completed) - Number(b.completed));
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  /**
   * Creates a new to-do item.
   * @param {Object} data - Todo data to create.
   * @returns The created todo.
   */
  async createTodo(data: {
    title: string;
    description: string;
    priority: string;
  }) {
    const db = this.getDb();
    const collection = db.collection("todos");
    const id = await this.nextID();
    const now = new Date();
    const item = {
      id,
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: now.toISOString(),
      updatedAt: null,
      priority: data.priority,
    };
    await collection.doc(id.toString()).set({ ...item });
    return item;
  }

  /**
   * Updates an existing to-do item.
   * @param {number} id - The ID of the todo to update.
   * @param {Object} data - Fields to update.
   * @returns The updated todo.
   * @throws {Error} If todo is not found.
   */
  async updateTodo(
    id: number,
    data: {
      title: string;
      description?: string;
      completed: boolean;
      priority: string;
    }
  ) {
    const db = this.getDb();
    const collection = db.collection("todos");
    const ref = collection.doc(id.toString());
    const item = await ref.get();
    const now = new Date();
    if (item) {
      const updateItem = { ...data, updatedAt: now.toISOString() };
      await ref.update(updateItem);
      const updatedData = await ref.get();
      return {
        id,
        title: updatedData.data()!.title,
        description: updatedData.data()!.description,
        completed: updatedData.data()!.completed || false,
        createdAt: new Date(updatedData.data()!.createdAt),
        updatedAt: new Date(updatedData.data()!.updatedAt),
        priority: updatedData.data()!.priority,
      };
    } else {
      throw new Error(`Todo ID [${id}] not found`);
    }
  }

  /**
   * Deletes a to-do item.
   * @param {number} id - The ID of the todo to delete.
   * @throws {Error} If todo is not found.
   */
  async deleteTodo(id: number) {
    const db = this.getDb();
    const collection = db.collection("todos");
    const ref = collection.doc(id.toString());
    const item = await ref.get();
    if (!item.exists) throw new Error(`Todo ID [${id}] not found`);
    await ref.delete();
  }
}

export const todoService = new TodoService();
