"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "When will my order ship?",
        answer: "Orders are typically processed and shipped within 1-2 business days. You will receive a confirmation email with tracking information once your order has dispatched.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship worldwide. International shipping times and costs vary depending on the destination and are calculated at checkout.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original condition with tags attached.",
      },
      {
        question: "How do I initiate an exchange?",
        answer: "To start an exchange, please visit our returns portal with your order number. Exchanges are free of charge for domestic orders.",
      },
    ],
  },
  {
    category: "Sizing Guide",
    items: [
      {
        question: "How do I find my size?",
        answer: "Each product page includes a detailed sizing chart. We recommend comparing these measurements against a similar item you already own.",
      },
      {
        question: "Does your clothing run true to size?",
        answer: "Generally, yes. However, since we curate vintage and thrifted pieces, sizing can vary. We provide specific measurements for every unique piece in the product description.",
      },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(`${faqData[0].category}-0`);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 text-foreground">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Help & FAQ</h1>
            <p className="text-muted-foreground text-lg mb-12">
              Everything you need to know about shopping with Thrifty.
            </p>

            <div className="space-y-12">
              {faqData.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h2 className="text-2xl font-semibold mb-6 tracking-tight">{section.category}</h2>
                  <div className="space-y-4">
                    {section.items.map((faq, itemIdx) => {
                      const currentIndex = `${section.category}-${itemIdx}`;
                      const isOpen = openIndex === currentIndex;

                      return (
                        <div
                          key={itemIdx}
                          className="border border-border rounded-xl overflow-hidden bg-muted/30 transition-colors"
                        >
                          <button
                            onClick={() => toggleAccordion(currentIndex)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                          >
                            <span className="font-medium text-lg">{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </button>
                          
                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
