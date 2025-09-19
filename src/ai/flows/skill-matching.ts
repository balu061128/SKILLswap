'use server';

/**
 * @fileOverview Skill matching AI agent.
 *
 * - skillMatching - A function that handles the skill matching process.
 * - SkillMatchingInput - The input type for the skillMatching function.
 * - SkillMatchingOutput - The return type for the skillMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchingInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including skills and interests.'),
  statedNeeds: z
    .string()
    .describe('The stated needs of the user for skill sharing.'),
  pastExchanges: z
    .string()
    .describe('The history of past skill exchanges involving the user.'),
  skillDescriptions: z
    .string()
    .describe('Descriptions of skills the user is interested in.'),
});
export type SkillMatchingInput = z.infer<typeof SkillMatchingInputSchema>;

const SkillMatchingOutputSchema = z.array(z.object({
  userId: z.string().describe('The ID of the matched user.'),
  matchScore: z
    .number()
    .describe('A score indicating the strength of the match.'),
  justification: z
    .string()
    .describe('Explanation of why this user is a good match.'),
}));
export type SkillMatchingOutput = z.infer<typeof SkillMatchingOutputSchema>;

export async function skillMatching(input: SkillMatchingInput): Promise<SkillMatchingOutput> {
  return skillMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillMatchingPrompt',
  input: {schema: SkillMatchingInputSchema},
  output: {schema: SkillMatchingOutputSchema},
  prompt: `You are an expert skill matching agent. Based on the user's profile, stated needs, past exchanges, and skill descriptions, identify potential collaborators for skill-sharing.

User Profile: {{{userProfile}}}
Stated Needs: {{{statedNeeds}}}
Past Exchanges: {{{pastExchanges}}}
Skill Descriptions: {{{skillDescriptions}}}

Provide a list of potential user matches with a match score and justification for each.`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  }
});

const skillMatchingFlow = ai.defineFlow(
  {
    name: 'skillMatchingFlow',
    inputSchema: SkillMatchingInputSchema,
    outputSchema: SkillMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
