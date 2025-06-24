'use server';

import { addBook } from '@/lib/add-book';
import { revalidatePath } from 'next/cache';
import type { BookEntry, GoogleBook } from '@/lib/types';
import { getSentimentBasedRecommendations } from '@/ai/flows/sentiment-analysis-recommendations';

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query: string): Promise<GoogleBook[]> {
  if (!query) return [];
  if (!GOOGLE_BOOKS_API_KEY) {
    console.warn("Google Books API key is not set in .env.local. Search will not work.");
    return [];
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${GOOGLE_BOOKS_API_KEY}&maxResults=5`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error(`Google Books API error: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return (data.items || []) as GoogleBook[];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
}

export async function logBook(bookData: Omit<BookEntry, 'id' | 'timestamp'>) {
  try {
    const newBook = await addBook(bookData); // <-- Now writes to Firestore
    revalidatePath('/leaderboard');
    revalidatePath(`/${bookData.childName.toLowerCase()}`);
    return { success: true, book: newBook };
  } catch (error) {
    console.error('Failed to log book:', error);
    return { success: false, error: 'Failed to log book.' };
  }
}

export async function getRecommendationAction(prevState: any, formData: FormData) {
  const interests = formData.get('interests') as string;
  const bookDescription = formData.get('bookDescription') as string;

  if (!interests || !bookDescription) {
    return { recommendation: '', error: 'Please provide both interests and a book description.' };
  }

  try {
    const result = await getSentimentBasedRecommendations({ interests, bookDescription });
    return { recommendation: result.recommendation, error: null };
  } catch (error) {
    console.error(error);
    return { recommendation: '', error: 'Failed to get recommendations. Please try again.' };
  }
}