'use server';

/**
 * @fileOverview A fake news detection AI agent.
 *
 * - detectFakeNews - A function that handles the fake news detection process.
 * - DetectFakeNewsInput - The input type for the detectFakeNews function.
 * - DetectFakeNewsOutput - The return type for the detectFakeNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFakeNewsInputSchema = z.object({
  text: z.string().describe('The text passage to analyze for fake news.'),
});
export type DetectFakeNewsInput = z.infer<typeof DetectFakeNewsInputSchema>;

const DetectFakeNewsOutputSchema = z.object({
  isFakeNews: z
    .boolean()
    .describe('Whether or not the input text is likely to contain fake news.'),
  confidence: z
    .number()
    .describe('The confidence level (0-1) of the fake news detection.'),
  explanation:
    z.string().describe('The explanation for why the text is classified as such.'),
});
export type DetectFakeNewsOutput = z.infer<typeof DetectFakeNewsOutputSchema>;

export async function detectFakeNews(input: DetectFakeNewsInput): Promise<DetectFakeNewsOutput> {
  return detectFakeNewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectFakeNewsPrompt',
  input: {schema: DetectFakeNewsInputSchema},
  output: {schema: DetectFakeNewsOutputSchema},
  prompt: `You are an expert fact-checker specializing in identifying fake news.

You will analyze the input text passage and determine the likelihood of it containing fake news.

You will provide a confidence level (0-1) for your assessment and an explanation for your classification.

Text passage: {{{text}}}`,
});

const detectFakeNewsFlow = ai.defineFlow(
  {
    name: 'detectFakeNewsFlow',
    inputSchema: DetectFakeNewsInputSchema,
    outputSchema: DetectFakeNewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
