import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";
import LearnMoreDialog from "@/components/home/LearnMoreDialog";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <PageTransition>
        {/* Hero Section */}
        <section className="w-full max-w-6xl px-4 py-24 mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Ease Your Use in Cashew App
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Let AI handle your receipts and transactions—saving has never been
            easier!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/piggy">Get Started</Link>
            </Button>
            <LearnMoreDialog />
          </div>
        </section>
      </PageTransition>
    </main>
  );
}
