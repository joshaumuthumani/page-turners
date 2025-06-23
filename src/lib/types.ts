export interface BookEntry {
  id: string;
  timestamp: string;
  childName: 'Ellie' | 'Jason';
  bookTitle: string;
  author: string;
  pages: number;
  coverImage?: string;
}

export interface LeaderboardEntry {
  childName: 'Ellie' | 'Jason';
  totalBooks: number;
  totalPages: number;
}

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    pageCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    description?: string;
  };
}
