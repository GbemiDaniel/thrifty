export default function CheckoutForm() {
    return (
        <div className="w-full flex flex-col gap-10">

            {/* Contact Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-black mb-4">1. Contact</h2>
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-black placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                </div>
            </section>

            {/* Shipping Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-black mb-4">2. Shipping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black md:col-span-2"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                    <input
                        type="text"
                        placeholder="Postal Code"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                </div>
            </section>

            {/* Payment Section (UI Only) */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-black mb-4">3. Payment</h2>
                <div className="bg-[#f5f5f5] p-4 rounded-sm border border-gray-200">
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full h-12 px-4 border border-gray-300 bg-white rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="MM / YY"
                                className="w-full h-12 px-4 border border-gray-300 bg-white rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                className="w-full h-12 px-4 border border-gray-300 bg-white rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Name on Card"
                            className="w-full h-12 px-4 border border-gray-300 bg-white rounded-sm text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}