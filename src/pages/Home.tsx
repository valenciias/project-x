import Hero from "@/components/sections/Hero";
import Tweets from "@/components/sections/Tweets";
import Community from "@/components/sections/Community";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,161,105,0.1)_0,rgba(0,0,0,0)_70%)]" />
      <Suspense fallback={null}>
        <Hero />
        <Tweets />
        <Community />
      </Suspense>
    </div>
  );
}