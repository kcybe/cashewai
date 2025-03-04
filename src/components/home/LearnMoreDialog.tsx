"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React from "react";

export default function LearnMoreDialog() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">About Piggy AI</DialogTitle>
            <DialogDescription className="text-lg pt-4">
              Simplify your money management with Piggy AI
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <h3 className="text-xl font-medium">How it works</h3>
            <p>
              Our AI assistant makes it simple for you to track and manage your
              income and expenses. Simply upload your receipts or provide a
              natural language description of your transactions, and our AI will
              automatically categorize them and provide you with a transaction
              link for Cashew app.
            </p>

            <h3 className="text-xl font-medium">Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automatic receipt scanning and processing</li>
              <li>Natural language transaction descriptions</li>
              <li>AI-based categorization of expenses</li>
              <li>
                Simple integration with Cashew App through utilization of built
                in app links
              </li>
              <li>Track your spending habits in a snap</li>
            </ul>

            <h3 className="text-xl font-medium">Get Started</h3>
            <p>
              Click on &quot;Get Started&quot; to begin taking advantage of
              Piggy AI in managing your finances. It&apos;s that simple!
            </p>

            <div className="pt-4 justify-center flex">
              <Button onClick={() => setIsOpen(false)} asChild>
                <Link href="/piggy">Try Piggy AI Now</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
