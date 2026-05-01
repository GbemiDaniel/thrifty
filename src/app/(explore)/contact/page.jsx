"use client";

import Navbar from "@/components/shared/Navbar/Navbar";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 text-foreground">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Side: Contact Information */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
              <p className="text-muted-foreground text-lg mb-12 max-w-md leading-relaxed">
                Have a question about an order, sizing, or a specific piece? We're here to help. Reach out to our support team.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted/30 rounded-full border border-border">
                    <Mail className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <a href="mailto:support@thrifty.com" className="text-muted-foreground hover:text-foreground transition-colors">
                      support@thrifty.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted/30 rounded-full border border-border">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Vintage Avenue<br />
                      Creative District, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted/30 rounded-full border border-border">
                    <Clock className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Support Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9AM - 6PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="order" className="text-sm font-medium text-foreground">Order Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      id="order"
                      placeholder="#TRF-12345"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea 
                    id="message"
                    rows="5"
                    placeholder="How can we help you today?"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-foreground text-background font-medium rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
