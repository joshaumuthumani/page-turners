// lib/add-book.ts
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { BookEntry } from './types';

export async function addBook(book: Omit<BookEntry, 'id' | 'timestamp'>) {
  const docRef = await addDoc(collection(db, 'books'), {
    ...book,
    timestamp: serverTimestamp(),
  });

  return {
    id: docRef.id,
    ...book,
  };
}