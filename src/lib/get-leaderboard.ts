import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

type LeaderboardEntry = {
  childName: 'Ellie' | 'Jason';
  totalBooks: number;
  totalPages: number;
};

export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  const snapshot = await getDocs(collection(db, 'books'));

  const data: Record<string, { totalPages: number; totalBooks: number }> = {};

  snapshot.forEach((doc) => {
    const { childName, pageCount } = doc.data();
    if (!data[childName]) {
      data[childName] = { totalPages: 0, totalBooks: 0 };
    }
    data[childName].totalPages += typeof pageCount === 'number' ? pageCount : 0;
    console.log('doc data', doc.data());
    data[childName].totalBooks += 1;
  });

  const leaderboard: LeaderboardEntry[] = ['Ellie', 'Jason'].map((name) => ({
    childName: name as 'Ellie' | 'Jason',
    totalBooks: data[name]?.totalBooks || 0,
    totalPages: data[name]?.totalPages || 0,
  }));

  return leaderboard.sort((a, b) => b.totalPages - a.totalPages);
}