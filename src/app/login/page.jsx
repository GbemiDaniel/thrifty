"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Helper function to fetch role and route correctly
        const routeUserByRole = async (userId) => {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();
            
            if (profile?.role === 'admin') {
                router.push("/admin");
            } else {
                router.push("/");
            }
        };

        if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                setLoading(false);
            } else if (data?.user) {
                await routeUserByRole(data.user.id);
            }
        } else {
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                setLoading(false);
                return;
            }
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { first_name: firstName, last_name: lastName }
                }
            });
            if (error) {
                setError(error.message);
                setLoading(false);
            } else if (data?.user) {
                await routeUserByRole(data.user.id);
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            
            {/* LEFT SIDE: Editorial Brand Visual (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden">
                <Image 
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
                    alt="Thrifty Editorial" 
                    fill 
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                />
                
                {/* Deep, even dimming layer */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Creative Typographic Lockup (Perfectly Centered) */}
                <div className="absolute inset-0 flex items-center justify-center p-12 z-10">
                    <div className="w-full max-w-xl">
                        
                        {/* Decorative Badge */}
                        <div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                            <div className="h-px w-12 bg-white/60"></div>
                            <span className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase">
                                Thrifty Exclusives
                            </span>
                        </div>

                        {/* Uncrushable Block Heading */}
                        <h2 className="text-5xl xl:text-7xl font-extrabold tracking-tighter uppercase mb-8">
                            <span className="block text-white">Elevate</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Your</span>
                            <span className="block text-white">Everyday.</span>
                        </h2>

                        {/* Structured Paragraph */}
                        <p className="text-white/80 text-lg leading-relaxed max-w-sm font-medium border-l-2 border-white/20 pl-6">
                            Join Thrifty to unlock exclusive collections, save your favorite fits, and check out seamlessly.
                        </p>
                        
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: The Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-4 sm:p-8">
                
                {/* THE EXACT EXISTING FORM CARD */}
                <div className="w-full max-w-[400px] bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-foreground">
                        {isLogin ? "Welcome Back!" : "Let's get started"}
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        {isLogin ? "Please enter your details" : "Please fill in your details"}
                    </p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Conditional Name Fields */}
                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-foreground">First Name</label>
                                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-foreground text-sm" placeholder="First Name" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-foreground">Last Name</label>
                                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-foreground text-sm" placeholder="Last Name" />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-foreground">Email</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-foreground text-sm" placeholder="Enter your email" />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-foreground">Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-foreground text-sm" placeholder={isLogin ? "Password" : "Create new password"} />
                    </div>

                    {/* Conditional Confirm Password */}
                    {!isLogin && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-foreground">Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-foreground text-sm" placeholder="Confirm password" />
                        </div>
                    )}

                    {/* Forgot Password Link */}
                    {isLogin && (
                        <div className="flex justify-start">
                            <button type="button" className="text-xs font-medium text-slate-500 hover:text-foreground transition-colors">Forgot password?</button>
                        </div>
                    )}

                    {/* Primary Button */}
                    <button type="submit" disabled={loading} className="w-full bg-foreground text-background font-medium py-3.5 rounded-xl mt-2 hover:bg-foreground/90 transition-all disabled:opacity-70">
                        {loading ? "Authenticating..." : (isLogin ? "Login" : "Sign up")}
                    </button>

                    {/* Google Button */}
                    <button type="button" onClick={() => console.log("Google Auth coming soon")} className="w-full bg-white border border-slate-200 text-foreground font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all mt-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        {isLogin ? "Sign in with Google" : "Sign up with Google"}
                    </button>
                </form>

                {/* Toggle Login/Signup */}
                <div className="mt-8 text-center">
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-xs text-slate-500 hover:text-foreground transition-colors">
                        {isLogin ? (
                            <>Don't have an account? <span className="font-bold underline underline-offset-2">Signup for free</span></>
                        ) : (
                            <>Already have an account? <span className="font-bold underline underline-offset-2">Login here</span></>
                        )}
                    </button>
                </div>
                
                </div>
            </div>
        </div>
    );
}
