"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, Smartphone } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <Badge variant="outline" className="mb-4">
            <Smartphone className="h-3 w-3 mr-1" />
            Get Started Today
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore Sri Lanka?</h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of Sri Lanka with Compass LK. Start planning your
            perfect adventure today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" asChild>
              <Link href="/auth/register">
                Create Free Account
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/destinations">
                <Download className="h-4 w-4 mr-2" />
                Browse Destinations
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-sm text-muted-foreground">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary mb-1">Free</div>
              <div>Account Creation</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div>AI Support</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div>Verified Places</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
