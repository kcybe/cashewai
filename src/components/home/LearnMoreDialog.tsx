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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">About Cashew AI</DialogTitle>
            <DialogDescription className="text-lg pt-4">
              Simplify your financial management with Cashew AI
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <h3 className="text-xl font-medium">How it works</h3>
            <p>
              Our AI-powered assistant makes it easy to track and manage your
              expenses and income. Simply upload your receipts or describe your
              transactions, and our AI will automatically categorize and provide
              you a transaction link for Cashew app.
            </p>

            <h3 className="text-xl font-medium">Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automatic receipt scanning and processing</li>
              <li>Natural language descriptions of transactions</li>
              <li>AI-powered categorization of expenses</li>
              <li>
                Simple integration with Cashew App by using built in app links
              </li>
              <li>Track your spending patterns effortlessly</li>
            </ul>

            <h3 className="text-xl font-medium">Get Started</h3>
            <p>
              Click the &quot;Get Started&quot; button to begin using Piggy AI
              for your financial management needs. No complex setup required!
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
