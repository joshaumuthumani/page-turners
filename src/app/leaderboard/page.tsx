import { getLeaderboardData } from '@/lib/get-leaderboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, BookCopy, Book, Sparkles, Goal } from 'lucide-react';
import LeaderboardChart from '@/components/leaderboard-chart';
import { Progress } from '@/components/ui/progress';

export const dynamic = 'force-dynamic';

const MILESTONE = 10;
const GOAL = 20;
const STRETCH = 25;

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();

  if (!leaderboardData || leaderboardData.length < 2) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="font-headline text-5xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Not enough data yet. Keep reading!</p>
      </div>
    );
  }

  const [ellieData, jasonData] = leaderboardData;

  const getWinner = () => {
    if (ellieData.totalBooks > jasonData.totalBooks) return ellieData.childName;
    if (jasonData.totalBooks > ellieData.totalBooks) return jasonData.childName;
  
    // Tie on books — break by total pages
    if (ellieData.totalPages > jasonData.totalPages) return ellieData.childName;
    if (jasonData.totalPages > ellieData.totalPages) return jasonData.childName;
  
    if (ellieData.totalBooks === 0 && jasonData.totalBooks === 0) return 'Not enough data yet';
    return "It's a tie!";
  };

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
            <span>Current Leader: {getWinner()}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {[ellieData, jasonData].map((data) => {
          const progress = (data.totalBooks / STRETCH) * 100;

          return (
            <Card key={data.childName} className="transform hover:-translate-y-1 transition-transform">
              <CardHeader>
                <CardTitle className="font-headline text-3xl">{data.childName}</CardTitle>
                <CardDescription>{data.childName}'s current stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                  <BookCopy className="w-6 h-6 text-primary" />
                  <span><strong>Books Read:</strong> {data.totalBooks}</span>
                </div>

                <Progress value={progress} className="h-4 rounded-full bg-muted" />
                <div className="flex justify-between text-sm text-muted-foreground px-1">
                  <span>{data.totalBooks} / {STRETCH} books</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      {MILESTONE}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      {GOAL}
                    </span>
                    <span className="flex items-center gap-1">
                      <Goal className="h-4 w-4 text-green-500" />
                      {STRETCH}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Book className="w-6 h-6 text-primary" />
                  <span><strong>Total Pages:</strong> {data.totalPages.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Pages Read Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaderboardChart data={leaderboardData} mode="pages" />
        </CardContent>
      </Card>
    </div>
  );
}