import { db } from "@/lib/firebase/client";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where
} from "firebase/firestore";

export type TaskCategory = "One Time" | "Daily" | "Social" | "Games & Products";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  buttonText: string; // e.g., "Claim", "Post & Claim"
  reward: number; // Points
  actionUrl?: string; // Optional link
  isActive: boolean;
  isSpecial: boolean; // Highlights text (Primary Color)
  order: number; // Sorting order
  createdAt: number;
}

export class TasksService {
  private static collectionName = "tasks";

  // Get all tasks (ordered by custom order or creation)
  static async getAll(): Promise<Task[]> {
    try {
      const q = query(
        collection(db, TasksService.collectionName), 
        orderBy("order", "asc")
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  // Get by ID
  static async getById(id: string): Promise<Task | null> {
    try {
      const docRef = doc(db, TasksService.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Task;
      }
      return null;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }

  // Create
  static async create(task: Omit<Task, "id" | "createdAt">) {
    try {
      const now = Date.now();
      const docRef = await addDoc(collection(db, TasksService.collectionName), {
        ...task,
        createdAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // Update
  static async update(id: string, data: Partial<Task>) {
    try {
      const docRef = doc(db, TasksService.collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  // Delete
  static async delete(id: string) {
    try {
      const docRef = doc(db, TasksService.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}
