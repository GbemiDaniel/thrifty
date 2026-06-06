import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/cartStore";

const checkoutSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters" }),
    phone: z.string().optional(),
    apartment: z.string().optional(),
    cardNumber: z.string().min(16, "Must be 16 digits").max(16, "Must be 16 digits"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY"),
    cvc: z.string().min(3, "Must be 3-4 digits").max(4, "Must be 3-4 digits"),
    nameOnCard: z.string().min(1, "Name on card is required"),
});

export default function CheckoutForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await new Promise(res => setTimeout(res, 2000));
            useCartStore.getState().clearCart();
            router.push("/checkout/success");
        } catch (error) {
            setIsSubmitting(false);
            console.error("Checkout failed:", error);
        }
    };

    return (
        <>
            {isSubmitting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-black uppercase tracking-widest">Processing Payment...</p>
                    </div>
                </div>
            )}
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">

            {/* Contact Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-foreground mb-4">1. Contact</h2>
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        className={`w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground placeholder:text-gray-400 outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                    )}
                </div>
            </section>

            {/* Shipping Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-foreground mb-4">2. Shipping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register("firstName")}
                            className={`w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Last Name"
                            {...register("lastName")}
                            className={`w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <input
                            type="text"
                            placeholder="Address"
                            {...register("address")}
                            className={`w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.address.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="City"
                            {...register("city")}
                            className={`w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.city.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Postal Code"
                            {...register("zipCode")}
                            className={`w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.zipCode ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.zipCode && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.zipCode.message}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Payment Section */}
            <section>
                <h2 className="text-xl font-bold uppercase tracking-wide text-foreground mb-4">3. Payment</h2>
                <div className="bg-card p-4 rounded-sm border border-gray-200">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Card Number"
                                {...register("cardNumber")}
                                className={`w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.cardNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.cardNumber.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    {...register("expiryDate")}
                                    className={`w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.expiryDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.expiryDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.expiryDate.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    {...register("cvc")}
                                    className={`w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.cvc ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.cvc && <p className="text-red-500 text-xs mt-1 font-medium">{errors.cvc.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Name on Card"
                                {...register("nameOnCard")}
                                className={`w-full h-12 px-4 border border-gray-300 bg-background rounded-sm text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground ${errors.nameOnCard ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.nameOnCard && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nameOnCard.message}</p>}
                        </div>
                    </div>
                </div>
            </section>

        </form>
        </>
    );
}