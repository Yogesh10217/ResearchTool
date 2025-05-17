import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DetectorForm } from "./_components/detector-form";

export default function FakeNewsDetectorPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Fake News Detector</CardTitle>
          <CardDescription className="text-center text-lg">
            Analyze text to identify potentially misleading information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DetectorForm />
        </CardContent>
      </Card>
    </div>
  );
}
