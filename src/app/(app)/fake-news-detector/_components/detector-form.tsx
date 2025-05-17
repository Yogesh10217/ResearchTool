"use client";

import type { DetectFakeNewsInput, DetectFakeNewsOutput } from "@/ai/flows/detect-fake-news";
import { detectFakeNews } from "@/ai/flows/detect-fake-news";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldAlert, ShieldCheck, SearchCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(20, "Text must be at least 20 characters long."),
});

type DetectorFormValues = z.infer<typeof formSchema>;

export function DetectorForm() {
  const [isPending, startTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<DetectFakeNewsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<DetectorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit: SubmitHandler<DetectorFormValues> = (data) => {
    startTransition(async () => {
      try {
        setAnalysisResult(null); // Clear previous results
        const input: DetectFakeNewsInput = { text: data.text };
        const result = await detectFakeNews(input);
        setAnalysisResult(result);
        toast({
          title: "Analysis Complete",
          description: "The text has been analyzed for fake news.",
        });
      } catch (error) {
        console.error("Error detecting fake news:", error);
        toast({
          title: "Error",
          description: "Failed to analyze text. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Text to Analyze</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the news article or text passage here..."
                    {...field}
                    rows={10}
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full text-lg py-6">
            {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <SearchCheck className="mr-2 h-5 w-5" />}
            Analyze Text
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Analyzing text, please wait...</p>
        </div>
      )}

      {analysisResult && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-center p-4 rounded-md ${analysisResult.isFakeNews ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-700'}`}>
              {analysisResult.isFakeNews ? <ShieldAlert className="mr-3 h-8 w-8" /> : <ShieldCheck className="mr-3 h-8 w-8" />}
              <span className="text-xl font-semibold">
                {analysisResult.isFakeNews ? "Likely Fake News" : "Likely Genuine"}
              </span>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Confidence Score: {Math.round(analysisResult.confidence * 100)}%</Label>
              <Progress value={analysisResult.confidence * 100} className="mt-1 h-3" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">Explanation:</h3>
              <p className="text-muted-foreground bg-muted/30 p-3 rounded-md leading-relaxed">{analysisResult.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
