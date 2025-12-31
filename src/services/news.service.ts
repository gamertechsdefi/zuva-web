import { db, storage } from "@/lib/firebase/client";
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
  Timestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  imageUrl?: string;
  author: {
    email: string;
    name?: string;
    photoURL?: string;
  };
  isPublished: boolean;
  publishedAt: number; // Milliseconds
  createdAt: number;
}

const COLLECTION_NAME = "news";

export const NewsService = {
  // Get all articles (ordered by date)
  getAll: async (): Promise<NewsArticle[]> => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy("publishedAt", "desc")
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsArticle));
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  // Get single article
  getById: async (id: string): Promise<NewsArticle | null> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as NewsArticle;
      }
      return null;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },

  // Create article
  create: async (article: Omit<NewsArticle, "id" | "createdAt" | "publishedAt">) => {
    try {
      const now = Date.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...article,
        createdAt: now,
        publishedAt: now, 
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  // Update article
  update: async (id: string, data: Partial<NewsArticle>) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },

  // Delete article
  delete: async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },

  // Upload Image
  uploadImage: async (file: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `news/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
};
