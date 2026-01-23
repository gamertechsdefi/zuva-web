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

// Cloudinary Config (Pending Keys from User)
// const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export class NewsService {
  private static collectionName = "news";

  // Get all articles (ordered by date)
  static async getAll(): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, NewsService.collectionName), 
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
  }

  // Get single article
  static async getById(id: string): Promise<NewsArticle | null> {
    try {
      const docRef = doc(db, NewsService.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as NewsArticle;
      }
      return null;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }

  // Create article
  static async create(article: Omit<NewsArticle, "id" | "createdAt" | "publishedAt">) {
    try {
      const now = Date.now();
      const docRef = await addDoc(collection(db, NewsService.collectionName), {
        ...article,
        createdAt: now,
        publishedAt: now, 
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  }

  // Update article
  static async update(id: string, data: Partial<NewsArticle>) {
    try {
      const docRef = doc(db, NewsService.collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  }

  // Delete article
  static async delete(id: string) {
    try {
      const docRef = doc(db, NewsService.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  }

  // CHANGED: Transitioning to Cloudinary
  static async uploadImage(file: File): Promise<string> {
    // Cloudinary Logic
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
       throw new Error("Missing Cloudinary Configuration");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Failed:", error);
      throw error;
    }
  }
}
