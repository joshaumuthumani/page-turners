'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing reading suggestions based on sentiment analysis of book descriptions.
 *
 * - getSentimentBasedRecommendations - A function that returns tailored book recommendations based on user interests and sentiment analysis.
 * - SentimentBasedRecommendationsInput - The input type for the getSentimentBasedRecommendations function.
 * - SentimentBasedRecommendationsOutput - The return type for the getSentimentBasedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentimentBasedRecommendationsInputSchema = z.object({
  interests: z.string().describe('The reading interests of the user.'),
  bookDescription: z.string().describe('The description of the book to analyze.'),
});
export type SentimentBasedRecommendationsInput = z.infer<typeof SentimentBasedRecommendationsInputSchema>;

const SentimentBasedRecommendationsOutputSchema = z.object({
  recommendation: z.string().describe('A recommendation for the user based on the sentiment of the book description and their interests.'),
});
export type SentimentBasedRecommendationsOutput = z.infer<typeof SentimentBasedRecommendationsOutputSchema>;

export async function getSentimentBasedRecommendations(input: SentimentBasedRecommendationsInput): Promise<SentimentBasedRecommendationsOutput> {
  return sentimentBasedRecommendationsFlow(input);
}

const sentimentAnalysisPrompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: SentimentBasedRecommendationsInputSchema},
  output: {schema: SentimentBasedRecommendationsOutputSchema},
  prompt: `You are a book recommendation expert. You will analyze the sentiment of a book description and, based on the user's stated interests, provide a tailored recommendation.

User Interests: {{{interests}}}
Book Description: {{{bookDescription}}}

Provide a recommendation that aligns with the user's interests and the sentiment expressed in the book description.`, 
});

const sentimentBasedRecommendationsFlow = ai.defineFlow(
  {
    name: 'sentimentBasedRecommendationsFlow',
    inputSchema: SentimentBasedRecommendationsInputSchema,
    outputSchema: SentimentBasedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await sentimentAnalysisPrompt(input);
    return output!;
  }
);
