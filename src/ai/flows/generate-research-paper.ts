// src/ai/flows/generate-research-paper.ts
'use server';

/**
 * @fileOverview Generates a detailed, plagiarism-free research paper based on a user-defined topic.
 *
 * - generateResearchPaper - A function that generates the research paper.
 * - GenerateResearchPaperInput - The input type for the generateResearchPaper function.
 * - GenerateResearchPaperOutput - The return type for the generateResearchPaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResearchPaperInputSchema = z.object({
  topic: z.string().describe('The topic of the research paper.'),
  numPages: z.number().default(5).describe('The desired number of pages for the research paper.'),
});
export type GenerateResearchPaperInput = z.infer<typeof GenerateResearchPaperInputSchema>;

const GenerateResearchPaperOutputSchema = z.object({
  title: z.string().describe('The title of the research paper.'),
  abstract: z.string().describe('A brief summary of the research paper.'),
  introduction: z.string().describe('The introductory section of the research paper.'),
  methodology: z.string().describe('The methodology section of the research paper.'),
  results: z.string().describe('The results section of the research paper.'),
  conclusion: z.string().describe('The conclusion section of the research paper.'),
});
export type GenerateResearchPaperOutput = z.infer<typeof GenerateResearchPaperOutputSchema>;

export async function generateResearchPaper(input: GenerateResearchPaperInput): Promise<GenerateResearchPaperOutput> {
  return generateResearchPaperFlow(input);
}

const researchPaperPrompt = ai.definePrompt({
  name: 'researchPaperPrompt',
  input: {schema: GenerateResearchPaperInputSchema},
  output: {schema: GenerateResearchPaperOutputSchema},
  prompt: `You are an expert academic writer. Your task is to generate a well-structured, plagiarism-free research paper on the given topic, formatted into distinct sections: title, abstract, introduction, methodology, results, and conclusion. The research paper should be approximately {{numPages}} pages long.

Topic: {{{topic}}}

Ensure that the generated content is original and properly structured for academic purposes.

Follow this format:
Title: [Generated Title]
Abstract: [Generated Abstract]
Introduction: [Generated Introduction]
Methodology: [Generated Methodology]
Results: [Generated Results]
Conclusion: [Generated Conclusion]`, 
});

const generateResearchPaperFlow = ai.defineFlow(
  {
    name: 'generateResearchPaperFlow',
    inputSchema: GenerateResearchPaperInputSchema,
    outputSchema: GenerateResearchPaperOutputSchema,
  },
  async input => {
    const {output} = await researchPaperPrompt(input);
    return output!;
  }
);
