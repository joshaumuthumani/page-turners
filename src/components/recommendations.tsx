'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { getRecommendationAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';

const initialState = {
  recommendation: '',
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Get Recommendation
    </Button>
  );
}

export default function Recommendations() {
  const [state, formAction] = useActionState(getRecommendationAction, initialState);

  return (
    <div>
        <p className="text-muted-foreground mb-4">
            Curious what to read next? Enter a book description you like and your interests, and our AI will suggest a book for you!
        </p>
        <form action={formAction} className="space-y-4">
            <div>
                <Label htmlFor="interests">Your Interests</Label>
                <Input id="interests" name="interests" placeholder="e.g., fantasy, mystery, space travel" required />
            </div>
            <div>
                <Label htmlFor="bookDescription">A Book Description You Like</Label>
                <Textarea id="bookDescription" name="bookDescription" placeholder="e.g., A young wizard discovers his magical heritage on his eleventh birthday and enrolls in a school of witchcraft and wizardry." required />
            </div>
            <SubmitButton />
        </form>

        {state?.error && <p className="text-destructive mt-4 text-sm">{state.error}</p>}
        
        {state?.recommendation && (
            <Card className="mt-6 bg-accent/20 border-accent">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <Lightbulb className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-headline text-lg font-semibold mb-2">Here's a suggestion for you:</h4>
                            <p>{state.recommendation}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
