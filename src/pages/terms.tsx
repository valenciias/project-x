import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background p-4">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      <Card className="max-w-4xl mx-auto bg-black/70 backdrop-blur">
        <CardContent className="prose prose-invert p-6">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using Evil Conspiracy Oracle, you accept and agree to be
              bound by the terms and conditions of this agreement.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p>
              This is a fun, entertainment-focused service. All content generated
              is fictional and should not be taken as financial advice or factual
              information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
            <ul>
              <li>All AI responses are generated for entertainment purposes only</li>
              <li>We are not responsible for user-shared content on social media</li>
              <li>Service availability and features may change without notice</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p>
              You may not use our service for any illegal or unauthorized purpose.
              You must not transmit any worms, viruses, or any code of a destructive
              nature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to update or change our Terms of Service at any
              time. Continued use of the service following any changes constitutes
              acceptance of those changes.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}