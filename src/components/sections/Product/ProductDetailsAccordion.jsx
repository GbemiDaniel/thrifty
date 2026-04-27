"use client";
import { useState } from "react";

export default function ProductDetailsAccordion() {
    const [isOpen, setIsOpen] = useState(true); // Open by default matching the design

    return (
        <div className="w-full border border-gray-200 bg-white mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none"
            >
                <span className="text-sm font-medium text-black">Product Details</span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* The Collapsible Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 md:px-6 pb-6 text-xs text-gray-500 space-y-4">
                    <p>Ready for pickup between 10th Feb and 06 March if you order within the next 24hrs</p>
                    <p>Ready for pickup between 10th Feb and 06 March if you order within the next 24hrs</p>
                </div>
            </div>
        </div>
    );
}