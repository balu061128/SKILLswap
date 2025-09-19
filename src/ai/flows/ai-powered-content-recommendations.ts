'use server';
/**
 * @fileOverview AI-powered content recommendations flow.
 *
 * This file defines a Genkit flow that recommends learning materials and resources
 * tailored to a user's skills and interests.
 *
 * @fileOverview A content recommendation AI agent.
 *
 * - recommendContent - A function that handles the content recommendation process.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of the user\u2019s skills.'),
  userInterests: z
    .array(z.string())
    .describe('A list of the user\u2019s interests.'),
  contentFormatPreferences: z
    .array(z.string())
    .optional()
    .describe(
      'Optional list of content formats the user prefers (e.g., video, article, tutorial).'
    ),
  pastInteractions: z
    .array(z.string())
    .optional()
    .describe(
      'Optional list of past learning materials or resources the user has interacted with.'
    ),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendedContent: z
    .array(z.string())
    .describe(
      'A list of recommended learning materials and resources based on the user\u2019s skills and interests.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why each content was recommended, referencing skills, interests, and preferences.'
    ),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(
  input: RecommendContentInput
): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an AI learning content recommendation expert. Based on a user's skills, interests, content format preferences, and past interactions, recommend learning materials and resources.

Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}
Interests: {{#if userInterests}}{{#each userInterests}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}
Content Format Preferences: {{#if contentFormatPreferences}}{{#each contentFormatPreferences}}- {{{this}}}\n{{/each}}{{else}}No specific preferences{{/if}}
Past Interactions: {{#if pastInteractions}}{{#each pastInteractions}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}

Based on the user's profile, provide a list of recommended learning materials and resources, along with a brief explanation for each recommendation.
`,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
