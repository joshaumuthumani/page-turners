import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

type LeaderboardEntry = {
    childName: 'Ellie' | 'Jason';
    totalBooks: number;
    totalPages: number;
  };

export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  const booksSnapshot = await getDocs(collection(db, 'books'));

  const summary: Record<string, { totalBooks: number; totalPages: number }> = {};

  booksSnapshot.forEach((doc) => {
    const { childName, pages } = doc.data();

    if (!childName) return;

    if (!summary[childName]) {
      summary[childName] = { totalBooks: 0, totalPages: 0 };
    }

    summary[childName].totalBooks += 1;
    summary[childName].totalPages += pages || 0;
  });

  const leaderboard: LeaderboardEntry[] = Object.entries(summary)
    .map(([childName, stats]) => ({
        childName: childName as 'Ellie' | 'Jason',
      totalBooks: stats.totalBooks,
      totalPages: stats.totalPages,
    }))
    .sort((a, b) => b.totalPages - a.totalPages); // You could also sort by books

  return leaderboard;
}