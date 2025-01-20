import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background p-4">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      <Card className="max-w-4xl mx-auto bg-black/70 backdrop-blur">
        <CardContent className="prose prose-invert p-6">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to Evil Conspiracy Oracle. This Privacy Policy explains how we collect,
              use, and protect your personal information when you use our service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
              <li>Chat interactions with our AI celebrities</li>
              <li>Usage data and analytics</li>
              <li>Technical information about your device and browser</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Maintain the security of our platform</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information
              from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us
              through our GitHub repository.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}