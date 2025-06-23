'use client';

import { Progress } from '@/components/ui/progress';

interface GoalTrackerProps {
  booksRead: number;
}

const PRIMARY_GOAL = 20;
const BONUS_GOAL = 25;

export default function GoalTracker({ booksRead }: GoalTrackerProps) {
  const progressPercentage = (booksRead / BONUS_GOAL) * 100;
  const primaryGoalPercentage = (PRIMARY_GOAL / BONUS_GOAL) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg">
          You've read <span className="font-bold text-primary text-2xl">{booksRead}</span> out of <span className="font-bold text-2xl">{PRIMARY_GOAL}</span> books!
        </p>
        {booksRead >= PRIMARY_GOAL && booksRead < BONUS_GOAL && (
          <p className="text-accent font-semibold mt-1 animate-pulse">
            Great job! Now aim for the bonus goal of {BONUS_GOAL} books!
          </p>
        )}
        {booksRead >= BONUS_GOAL && (
            <p className="text-green-600 font-bold mt-1">
                Wow! You've reached the bonus goal! Keep it up!
            </p>
        )}
      </div>
      <div className="relative w-full pt-6">
        <Progress value={progressPercentage} className="h-4" />
        <div 
          className="absolute top-6 h-4 w-1 bg-background/75 border-x border-muted-foreground/50 z-10"
          style={{ left: `${primaryGoalPercentage}%` }}
        >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">🏆 {PRIMARY_GOAL}</span>
        </div>
        <div className="absolute top-0 right-0 text-xs font-bold text-muted-foreground">🌟 {BONUS_GOAL}</div>
      </div>
    </div>
  );
}
