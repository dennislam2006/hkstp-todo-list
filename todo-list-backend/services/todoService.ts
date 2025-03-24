import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../firebaseKey.json")),
  });
}

const db = admin.firestore();
const collection = db.collection("todos");

class TodoService {
  private async nextID(): Promise<number> {
    const ref = db.collection("metadata").doc("todoCounter");
    return db.runTransaction(async (transaction) => {
      const counter = await transaction.get(ref);
      const current = counter.exists ? counter.data()?.count || 0 : 0;
      const nextID = current + 1;
      transaction.set(ref, { count: nextID }, { merge: true });
      return nextID;
    });
  }

  async getTodos() {
    const items = await collection.get();
    const result = items.docs.map((item) => ({
      id: Number(item.id),
      title: item.data().title,
      description: item.data().description,
      completed: item.data().completed || false,
      createdAt: new Date(item.data().createdAt),
      updatedAt: item.data().updatedAt ? new Date(item.data().updatedAt) : null,
      priority: item.data().priority,
    }));
    return result.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  async createTodo(data: {
    title: string;
    description: string;
    priority: string;
  }) {
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

  async updateTodo(
    id: number,
    data: {
      title: string;
      description?: string;
      completed: boolean;
      priority: string;
    }
  ) {
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

  async deleteTodo(id: number) {
    const ref = collection.doc(id.toString());
    const item = await ref.get();
    if (!item.exists) throw new Error(`Todo ID [${id}] not found`);
    await ref.delete();
  }
}

export const todoService = new TodoService();
