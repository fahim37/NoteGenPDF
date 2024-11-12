"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const UpgradePlan = () => {
  const { user } = useUser();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.primaryEmailAddress?.emailAddress }),
    });

    if (response.ok) {
      const session = await response.json();
      if (session.sessionId) {
        stripe.redirectToCheckout({ sessionId: session.sessionId });
      } else {
        toast("Failed to retrieve session ID for checkout.");
      }
    } else {
      toast("Failed to create checkout session.");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Plans</h2>
      <p>Upgrade your plan to upload more PDFs</p>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-center">Free</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">0$</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>20 PDF Upload</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Unlimited Notes Taking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Email support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Help center access</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full rounded-full">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-center">Unlimited</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">9.99$</span>
                <span className="text-sm text-muted-foreground">/One Time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Unlimited PDF Upload</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Unlimited Notes Taking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Email support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Help center access</span>
                </li>
              </ul>
              <Button onClick={handleCheckout} className="w-full rounded-full">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
