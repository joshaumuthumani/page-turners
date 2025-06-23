import { getLeaderboardData } from '@/lib/mock-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Book, BookCopy } from 'lucide-react';
import LeaderboardChart from '@/components/leaderboard-chart';

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();
  const [ellieData, jasonData] = leaderboardData;

  const winner = ellieData.totalPages > jasonData.totalPages ? ellieData.childName : jasonData.totalPages > ellieData.totalPages ? jasonData.childName : "It's a tie!";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Who's winning the Page Turners Showdown?</p>
      </div>
      
      <Card className="mb-8 bg-card/70 backdrop-blur-sm border-accent shadow-lg">
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
                <Trophy className="w-8 h-8 text-accent" />
                <span>Current Leader: {winner}</span>
            </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="transform hover:-translate-y-1 transition-transform">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Ellie</CardTitle>
            <CardDescription>Ellie's current stats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="flex items-center gap-4">
              <BookCopy className="w-6 h-6 text-primary" />
              <span><strong>Total Books:</strong> {ellieData.totalBooks}</span>
            </div>
            <div className="flex items-center gap-4">
              <Book className="w-6 h-6 text-primary" />
              <span><strong>Total Pages:</strong> {ellieData.totalPages.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="transform hover:-translate-y-1 transition-transform">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Jason</CardTitle>
            <CardDescription>Jason's current stats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="flex items-center gap-4">
              <BookCopy className="w-6 h-6 text-primary" />
              <span><strong>Total Books:</strong> {jasonData.totalBooks}</span>
            </div>
            <div className="flex items-center gap-4">
              <Book className="w-6 h-6 text-primary" />
              <span><strong>Total Pages:</strong> {jasonData.totalPages.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Pages Read Comparison</CardTitle>
        </CardHeader>
        <CardContent>
            <LeaderboardChart data={leaderboardData} />
        </CardContent>
      </Card>
    </div>
  );
}
