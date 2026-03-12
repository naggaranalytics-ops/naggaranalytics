"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageProvider";
import { useTheme } from "@/context/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function SignupPage() {
    const { t, dir, lang } = useLanguage();
    const { theme } = useTheme();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Redirect to Kinde's signup endpoint with custom parameters
            const signupUrl = new URL(`${process.env.NEXT_PUBLIC_KINDE_ISSUER_URL}/oauth2/auth`);
            signupUrl.searchParams.append("client_id", process.env.NEXT_PUBLIC_KINDE_CLIENT_ID || "");
            signupUrl.searchParams.append("redirect_uri", `${process.env.NEXT_PUBLIC_KINDE_REDIRECT_URL}`);
            signupUrl.searchParams.append("response_type", "code");
            signupUrl.searchParams.append("scope", "openid profile email offline");
            signupUrl.searchParams.append("screen_hint", "signup");
            signupUrl.searchParams.append("login_hint", formData.email || "");

            window.location.href = signupUrl.toString();
        } catch (err) {
            setError("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 mt-20">
                <div className="w-full max-w-md">
                    <div className={`text-center mb-12 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <h1 className="text-4xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                            {t("nav.register")}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {t("contact.inquiryDesc")}
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/10">
                                <p className="text-sm text-red-500">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {t("careers.fullName")}
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                                    style={{
                                        backgroundColor: 'var(--input-bg)',
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-bold mb-2 opacity-0">
                                    Last
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                                    style={{
                                        backgroundColor: 'var(--input-bg)',
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                                style={{
                                    backgroundColor: 'var(--input-bg)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-[#16a085] hover:bg-[#149174] text-white font-bold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Loading..." : t("nav.getStarted")}
                            {!isLoading && (dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />)}
                        </button>
                    </form>

                    <div className="mt-8 p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                            {t("faq.q1")}{" "}
                            <LocaleLink href="/auth/login" className="font-bold text-[#16a085] hover:underline">
                                {t("nav.signIn")}
                            </LocaleLink>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
