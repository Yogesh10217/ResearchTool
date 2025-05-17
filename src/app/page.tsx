
import { ArrowRight, FileText, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-card shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            Research Tool
          </Link>
          <div className="space-x-6">
            <Link href="/research-paper-generator" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Research
            </Link>
            <Link href="/fake-news-detector" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Fake News
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-3xl shadow-xl rounded-lg">
          <CardHeader className="items-center text-center p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className="px-2.5 py-1 text-xs font-semibold">Beta</Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Research Intelligence Suite</h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Advanced AI-powered tools for academic research and media verification. Our
              platform combines cutting-edge language models with rigorous analysis to
              support your research needs.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Card className="overflow-hidden rounded-lg border shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                  <FileText className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Research Paper Generator</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Create comprehensive research papers on any topic with AI assistance.
                  Perfect for students, researchers, and professionals.
                </p>
              </CardContent>
              <CardFooter className="bg-muted/30 py-3 px-6">
                <Button asChild variant="secondary" size="sm" className="ml-auto">
                  <Link href="/research-paper-generator">
                    Try Tool <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-lg border shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                  <ShieldAlert className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Fake News Detector</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Analyze news articles and social media posts for authenticity. Our system
                  evaluates content using multiple credibility indicators.
                </p>
              </CardContent>
              <CardFooter className="bg-muted/30 py-3 px-6">
                 <Button asChild variant="secondary" size="sm" className="ml-auto">
                  <Link href="/fake-news-detector">
                    Try Tool <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
