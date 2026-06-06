import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
    return (
        <main className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 text-center">
            <div className="w-full max-w-[500px] mx-auto">
                <CheckCircle className="w-20 h-20 text-green-500 mb-6 mx-auto block" />
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">
                    Order Confirmed
                </h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Thank you for your purchase. We've received your order and will send a confirmation email with tracking details shortly.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-colors"
                >
                    Back to Shopping
                </Link>
            </div>
        </main>
    );
}