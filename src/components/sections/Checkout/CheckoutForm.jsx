export default function CheckoutForm() {
    return (
        <div className="w-full flex flex-col gap-10">

            {/* Contact Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-foreground mb-4">1. Contact</h2>
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground placeholder:text-gray-400 outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                    />
                </div>
            </section>

            {/* Shipping Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-foreground mb-4">2. Shipping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground md:col-span-2"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                    />
                    <input
                        type="text"
                        placeholder="Postal Code"
                        className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                    />
                </div>
            </section>

            {/* Payment Section (UI Only) */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-foreground mb-4">3. Payment</h2>
                <div className="bg-card p-4 rounded-sm border border-gray-200">
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="MM / YY"
                                className="w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                className="w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Name on Card"
                            className="w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}