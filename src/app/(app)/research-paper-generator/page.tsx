import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResearchForm } from "./_components/research-form";

export default function ResearchPaperGeneratorPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Research Paper Generator</CardTitle>
          <CardDescription className="text-center text-lg">
            Generate well-structured research papers on your topic of choice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResearchForm />
        </CardContent>
      </Card>
    </div>
  );
}
