export default function OrderSummary() {
    return (
        <div className="w-full border border-gray-200 rounded-md p-6 md:p-8">

            <h3 className="text-lg font-bold text-black mb-6">Order Summary</h3>

            {/* Math Breakdown */}
            <div className="flex flex-col gap-4 text-sm mb-6">
                <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-black">$565</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Discount (-20%)</span>
                    <span className="font-bold text-[#FF4D4D]">-$113</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-black">$15</span>
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Total */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-base text-gray-500">Total</span>
                <span className="text-2xl font-bold text-black">$467</span>
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2 mb-6">
                <div className="flex-1 flex items-center bg-[#f5f5f5] rounded-sm px-3 h-12">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Add promo code"
                        className="bg-transparent border-none outline-none text-xs w-full placeholder:text-gray-400 text-black"
                    />
                </div>
                <button className="bg-black text-white px-6 text-sm font-medium rounded-sm hover:bg-black/80 transition-colors">
                    Apply
                </button>
            </div>

            {/* Checkout CTA */}
            <button className="w-full bg-black text-white h-14 rounded-sm text-sm font-medium flex items-center justify-center gap-2 hover:bg-black/80 transition-colors">
                Go to Checkout <span>→</span>
            </button>

        </div>
    );
}