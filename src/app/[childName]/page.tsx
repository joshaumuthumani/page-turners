import { notFound } from 'next/navigation';
import { getBooksForChild } from '@/lib/mock-api';
import GoalTracker from '@/components/goal-tracker';
import BookSearch from '@/components/book-search';
import Recommendations from '@/components/recommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Sparkles, BookHeart } from 'lucide-react';
import Image from 'next/image';

type ChildPageProps = {
  params: {
    childName: string;
  };
};

export default async function ChildPage({ params }: ChildPageProps) {
  const childName = params.childName.toLowerCase();

  if (childName !== 'ellie' && childName !== 'jason') {
    notFound();
  }

  const formattedChildName = childName.charAt(0).toUpperCase() + childName.slice(1) as 'Ellie' | 'Jason';
  const books = await getBooksForChild(formattedChildName);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-headline text-5xl font-bold text-center mb-8">
        Welcome, {formattedChildName}!
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Reading Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <GoalTracker booksRead={books.length} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2"><BookHeart className="w-6 h-6 text-primary" />Log a New Book</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Finished a book? Search for it below and add it to your collection!
              </p>
              <BookSearch childName={formattedChildName} />
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    AI Reading Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Recommendations />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Book className="w-6 h-6 text-primary" />
                Your Bookshelf
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-y-auto">
              {books.length > 0 ? (
                <ul className="space-y-4">
                  {books.map(book => (
                    <li key={book.id} className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                       {book.coverImage && <Image src={book.coverImage} alt={book.bookTitle} width={40} height={60} className="rounded-sm shadow-md flex-shrink-0" data-ai-hint="book cover" />}
                      <div>
                        <p className="font-bold leading-tight">{book.bookTitle}</p>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-4">You haven't logged any books yet. Start reading!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
