import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpenCheck className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
          <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">Page Turners Showdown</h1>
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <Button asChild variant="ghost">
            <Link href="/ellie">Ellie</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/jason">Jason</Link>
          </Button>
          <Button asChild>
            <Link href="/leaderboard">Leaderboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
