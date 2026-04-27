export default function CheckoutSummary() {
    return (
        <div className="w-full border border-gray-200 rounded-md p-6 bg-white shadow-sm">

            <h3 className="text-lg font-bold text-black mb-6 uppercase">Order Review</h3>

            {/* Micro Item List */}
            <div className="flex flex-col gap-4 mb-6 border-b border-gray-200 pb-6">
                {[1, 2].map((item) => (
                    <div key={item} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-[#dcdcdc] rounded-sm flex-shrink-0" />
                        <div className="flex flex-col flex-grow">
                            <span className="text-sm font-bold text-black">Gradient Graphic T-shirt</span>
                            <span className="text-xs text-gray-500">Size: L | Qty: 1</span>
                        </div>
                        <span className="text-sm font-bold text-black">$145</span>
                    </div>
                ))}
            </div>

            {/* Math Recap */}
            <div className="flex flex-col gap-3 text-sm mb-6">
                <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-black">$290</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-black">$15</span>
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Final Total */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-base text-gray-500 uppercase tracking-wide">Total</span>
                <span className="text-3xl font-bold text-black">$305</span>
            </div>

            {/* The Money Button */}
            <button className="w-full bg-black text-white h-14 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Pay Now
            </button>

        </div>
    );
}