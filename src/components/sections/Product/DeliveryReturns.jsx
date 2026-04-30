export default function DeliveryReturns() {
    return (
        <div className="w-full border border-gray-200 bg-background p-4 md:p-6">

            {/* Header */}
            <h3 className="text-sm font-medium text-gray-500 mb-1">Delivery & Returns</h3>
            <h4 className="text-xl font-bold uppercase tracking-wide text-foreground mb-6">THRIFTY.COM</h4>

            {/* Location Selectors */}
            <div className="mb-8">
                <span className="block text-xs text-gray-500 mb-3">Choose Location</span>
                <div className="space-y-3">
                    <select className="w-full border border-gray-100 bg-background p-3 text-xs text-gray-700 outline-none focus:border-gray-300 appearance-none cursor-pointer">
                        <option value="">Select State</option>
                    </select>
                    <select className="w-full border border-gray-100 bg-background p-3 text-xs text-gray-700 outline-none focus:border-gray-300 appearance-none cursor-pointer">
                        <option value="">Select City / Area</option>
                    </select>
                </div>
            </div>

            {/* Logistics List */}
            <div className="space-y-6">

                {/* 1. Pickup Station */}
                <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 text-gray-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="text-sm font-medium text-foreground mb-0.5">Pickup station</h5>
                        <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Delivery Fees: $20</p>
                        <p className="text-xs text-gray-500 leading-relaxed">Ready for pickup between 10th Feb and 06 March if you order within the next 24hrs</p>
                    </div>
                </div>

                {/* 2. Door Delivery */}
                <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <div className="mt-1 flex-shrink-0 text-gray-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="text-sm font-medium text-foreground mb-0.5">Door Delivery</h5>
                        <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Delivery Fees: $50</p>
                        <p className="text-xs text-gray-500 leading-relaxed">Ready for pickup between 10th Feb and 06 March if you order within the next 24hrs</p>
                    </div>
                </div>

                {/* 3. Return Policy */}
                <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <div className="mt-1 flex-shrink-0 text-gray-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="text-sm font-medium text-foreground mb-0.5">Return Policy</h5>
                        <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Delivery Fees: $50</p>
                        <p className="text-xs text-gray-500 leading-relaxed">Ready for pickup between 10th Feb and 06 March if you order within the next 24hrs</p>
                    </div>
                </div>

            </div>
        </div>
    );
}