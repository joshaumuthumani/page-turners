// src/lib/get-books.ts
import { db } from './firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { BookEntry } from './types';

export async function getBooksForChild(childName: 'Ellie' | 'Jason'): Promise<BookEntry[]> {
  const booksRef = collection(db, 'books');

  const q = query(
    booksRef,
    where('childName', '==', childName),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as BookEntry[];
}