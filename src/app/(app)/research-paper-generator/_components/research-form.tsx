
"use client";

import type { GenerateResearchPaperInput, GenerateResearchPaperOutput } from "@/ai/flows/generate-research-paper";
import { generateResearchPaper } from "@/ai/flows/generate-research-paper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2, Copy, FileText as FileTextIcon, Printer } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(5, "Topic must be at least 5 characters long."),
  numPages: z.coerce.number().min(1, "Number of pages must be at least 1.").max(20, "Number of pages cannot exceed 20."),
});

type ResearchFormValues = z.infer<typeof formSchema>;

export function ResearchForm() {
  const [isPending, startTransition] = useTransition();
  const [generatedPaper, setGeneratedPaper] = useState<GenerateResearchPaperOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ResearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      numPages: 5,
    },
  });

  const onSubmit: SubmitHandler<ResearchFormValues> = (data) => {
    startTransition(async () => {
      try {
        setGeneratedPaper(null); // Clear previous results
        const input: GenerateResearchPaperInput = { topic: data.topic, numPages: data.numPages };
        const result = await generateResearchPaper(input);
        setGeneratedPaper(result);
        toast({
          title: "Research Paper Generated",
          description: "Your paper has been successfully created.",
        });
      } catch (error) {
        console.error("Error generating research paper:", error);
        toast({
          title: "Error",
          description: "Failed to generate research paper. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleCopyToClipboard = () => {
    if (!generatedPaper) return;
    const paperText = `Title: ${generatedPaper.title}\n\nAbstract: ${generatedPaper.abstract}\n\nIntroduction: ${generatedPaper.introduction}\n\nMethodology: ${generatedPaper.methodology}\n\nResults: ${generatedPaper.results}\n\nConclusion: ${generatedPaper.conclusion}`;
    navigator.clipboard.writeText(paperText)
      .then(() => toast({ title: "Copied to clipboard!" }))
      .catch(() => toast({ title: "Failed to copy", variant: "destructive" }));
  };
  
  const handleDownloadTxt = () => {
    if (!generatedPaper) return;
    const paperText = `Title: ${generatedPaper.title}\n\nAbstract: ${generatedPaper.abstract}\n\nIntroduction: ${generatedPaper.introduction}\n\nMethodology: ${generatedPaper.methodology}\n\nResults: ${generatedPaper.results}\n\nConclusion: ${generatedPaper.conclusion}`;
    const blob = new Blob([paperText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPaper.title.replace(/\s+/g, '_') || 'research_paper'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded as TXT" });
  };

  const handleDownloadPdf = () => {
    if (!generatedPaper) return;
    // This will open the browser's print dialog, where users can choose "Save as PDF"
    // For more sophisticated PDF generation, a library like jsPDF or pdfmake would be needed.
    
    // Temporarily hide buttons and other non-content elements for printing
    const originalDisplayValues: { element: HTMLElement; display: string }[] = [];
    const elementsToHide = document.querySelectorAll('.no-print, .actions-bar, form, header, nav, aside'); // Add more selectors as needed
    
    elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        originalDisplayValues.push({ element: htmlEl, display: htmlEl.style.display });
        htmlEl.style.display = 'none';
    });

    // Create a printable version (optional, but good for complex layouts)
    // For now, we'll just print the existing content. A more robust solution
    // might involve rendering specific content to an iframe for printing.
    
    window.print();

    // Restore hidden elements
    elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        const original = originalDisplayValues.find(item => item.element === htmlEl);
        if (original) {
            htmlEl.style.display = original.display;
        }
    });

    toast({ title: "Print to PDF", description: "Use your browser's print dialog to save as PDF." });
  };


  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 no-print">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Research Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., The impact of AI on climate change" {...field} className="text-base"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numPages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Desired Number of Pages</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 5" {...field} className="text-base"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full text-lg py-6">
            {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileTextIcon className="mr-2 h-5 w-5" />}
            Generate Paper
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="text-center py-8 no-print">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Generating your paper, please wait...</p>
        </div>
      )}

      {generatedPaper && (
        <Card className="mt-8 shadow-lg">
          <CardHeader className="actions-bar no-print">
            <CardTitle className="text-2xl text-primary">{generatedPaper.title}</CardTitle>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}><Copy className="mr-2 h-4 w-4" /> Copy All</Button>
              <Button variant="outline" size="sm" onClick={handleDownloadTxt}><Download className="mr-2 h-4 w-4" /> Download TXT</Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPdf}><Printer className="mr-2 h-4 w-4" /> Download PDF</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Abstract", content: generatedPaper.abstract },
              { label: "Introduction", content: generatedPaper.introduction },
              { label: "Methodology", content: generatedPaper.methodology },
              { label: "Results", content: generatedPaper.results },
              { label: "Conclusion", content: generatedPaper.conclusion },
            ].map((section) => (
              section.content && (
                <div key={section.label}>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{section.label}</h3>
                  <Textarea readOnly value={section.content} className="min-h-[150px] bg-muted/30 text-base leading-relaxed" rows={Math.max(5, section.content.split('\n').length)} />
                </div>
              )
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

