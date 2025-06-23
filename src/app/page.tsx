import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h1 className="font-headline text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-400 to-accent text-transparent bg-clip-text">
        Welcome to the Summer Reading Challenge!
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12">
        Get ready to dive into new worlds, explore amazing stories, and compete to see who can read the most pages this summer. Let the Page Turners Showdown begin!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="hover:shadow-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Ellie's Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="mb-6 flex-grow">Ready to log a new adventure, Ellie? Head to your page to add books and see your progress.</p>
            <Button asChild size="lg" className="w-full mt-auto">
              <Link href="/ellie">
                Go to Ellie's Page <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Jason's Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="mb-6 flex-grow">Jason, is another book finished? Go to your dashboard to add it to your list and climb the ranks.</p>
            <Button asChild size="lg" className="w-full mt-auto">
              <Link href="/jason">
                Go to Jason's Page <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-accent transition-all duration-300 md:col-span-2 lg:col-span-1 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">View the Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="mb-6 flex-grow">Check out the live leaderboard to see who's in the lead in the Page Turners Showdown!</p>
            <Button asChild size="lg" className="w-full mt-auto" variant="secondary">
              <Link href="/leaderboard">
                See the Leaderboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
