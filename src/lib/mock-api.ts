import type { BookEntry, LeaderboardEntry } from '@/lib/types';
import { appendToSheet } from '@/lib/google-sheets';

// In-memory store to simulate the database
let mockBookEntries: BookEntry[] = [
    { id: '1', timestamp: new Date(2024, 6, 1).toISOString(), childName: 'Ellie', bookTitle: 'The Cat in the Hat', author: 'Dr. Seuss', pages: 61, coverImage: 'https://books.google.com/books/content?id=1d1aDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' },
    { id: '2', timestamp: new Date(2024, 6, 2).toISOString(), childName: 'Jason', bookTitle: 'Where the Wild Things Are', author: 'Maurice Sendak', pages: 48, coverImage: 'https://books.google.com/books/content?id=j3m9CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' },
    { id: '3', timestamp: new Date(2024, 6, 3).toISOString(), childName: 'Ellie', bookTitle: 'Green Eggs and Ham', author: 'Dr. Seuss', pages: 65, coverImage: 'https://books.google.com/books/content?id=t-o-EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' },
];

export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const ellieBooks = mockBookEntries.filter(b => b.childName === 'Ellie');
    const jasonBooks = mockBookEntries.filter(b => b.childName === 'Jason');

    const ellieData: LeaderboardEntry = {
        childName: 'Ellie',
        totalBooks: ellieBooks.length,
        totalPages: ellieBooks.reduce((acc, book) => acc + book.pages, 0),
    };

    const jasonData: LeaderboardEntry = {
        childName: 'Jason',
        totalBooks: jasonBooks.length,
        totalPages: jasonBooks.reduce((acc, book) => acc + book.pages, 0),
    };
    
    return [ellieData, jasonData];
}

export async function getBooksForChild(childName: 'Ellie' | 'Jason'): Promise<BookEntry[]> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return mockBookEntries.filter(b => b.childName === childName).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function addBook(book: Omit<BookEntry, 'id' | 'timestamp'>): Promise<BookEntry> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const newEntry: BookEntry = {
        ...book,
        id: (mockBookEntries.length + 1).toString(),
        timestamp: new Date().toISOString(),
    };
    mockBookEntries.push(newEntry);
    
    await appendToSheet(newEntry);
    
    return newEntry;
}
