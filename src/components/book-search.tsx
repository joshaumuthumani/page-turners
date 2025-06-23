'use client';

import { useState, useTransition, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { logBook, searchBooks } from '@/lib/actions';
import type { GoogleBook } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, Search } from 'lucide-react';

interface BookSearchProps {
  childName: 'Ellie' | 'Jason';
}

const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced;
};

export default function BookSearch({ childName }: BookSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const books = await searchBooks(searchQuery);
    setResults(books);
    setIsLoading(false);
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 400), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSelectBook = (book: GoogleBook) => {
    setSelectedBook(book);
  };

  const handleConfirm = () => {
    if (!selectedBook) return;

    startTransition(async () => {
      const bookData = {
        childName,
        bookTitle: selectedBook.volumeInfo.title,
        author: selectedBook.volumeInfo.authors?.join(', ') || 'Unknown Author',
        pages: selectedBook.volumeInfo.pageCount || 0,
        coverImage: selectedBook.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || 'https://placehold.co/128x192.png',
      };
      
      const result = await logBook(bookData);

      if (result.success) {
        toast({
          title: 'Book Added!',
          description: `"${result.book?.bookTitle}" has been added to your bookshelf.`,
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
      setSelectedBook(null);
      setQuery('');
      setResults([]);
    });
  };
  
  useEffect(() => {
    if (!query) {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book title..."
          className="pl-10"
        />
        {isLoading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
      </div>
      
      {results.length > 0 && (
        <Card className="mt-4 max-h-72 overflow-y-auto">
          <CardContent className="p-2">
            <ul>
              {results.map((book) => (
                <li key={book.id}>
                  <button
                    onClick={() => handleSelectBook(book)}
                    className="w-full text-left p-2 rounded-md hover:bg-muted flex items-start gap-4"
                  >
                    <Image
                      src={book.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || 'https://placehold.co/128x192.png'}
                      alt={book.volumeInfo.title}
                      width={50}
                      height={75}
                      className="rounded-sm object-cover flex-shrink-0"
                      data-ai-hint="book cover"
                    />
                    <div>
                      <p className="font-semibold leading-tight">{book.volumeInfo.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {book.volumeInfo.authors?.join(', ')}
                      </p>
                       <p className="text-sm text-muted-foreground">
                        {book.volumeInfo.pageCount || 'N/A'} pages
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {selectedBook && (
        <AlertDialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add this book?</AlertDialogTitle>
              <AlertDialogDescription>
                Please confirm that you have finished reading this book.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-4 my-4">
                <Image
                    src={selectedBook.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || 'https://placehold.co/128x192.png'}
                    alt={selectedBook.volumeInfo.title}
                    width={80}
                    height={120}
                    className="rounded-md shadow-md"
                    data-ai-hint="book cover"
                />
                <div>
                    <h3 className="font-bold">{selectedBook.volumeInfo.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedBook.volumeInfo.authors?.join(', ')}</p>
                    <p className="text-sm text-muted-foreground">{selectedBook.volumeInfo.pageCount || 0} pages</p>
                </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Book
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
