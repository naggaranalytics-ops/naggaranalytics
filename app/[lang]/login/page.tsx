'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const params = useParams();
    const lang   = (params?.lang as string) ?? 'ar';

    const [mode, setMode]     = useState<'login' | 'register'>('login');
    const [name, setName]     = useState('');
    const [email, setEmail]   = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState('');

    const isAr = lang === 'ar';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
        const body     = mode === 'login'
            ? { email, password }
            : { name, email, password };

        try {
            const res  = await fetch(endpoint, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(body),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong.');
            } else {
                router.push(`/${lang}/dashboard`);
                router.refresh();
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: 'var(--bg-primary, #0a0f16)' }}
            dir={isAr ? 'rtl' : 'ltr'}
        >
            <div className="w-full max-w-md">
                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-1">Naggar Analytics</h1>
                    <p className="text-slate-400 text-sm">
                        {mode === 'login'
                            ? (isAr ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account')
                            : (isAr ? 'إنشاء حساب جديد' : 'Create a new account')}
                    </p>
                </div>

                <div className="bg-[#111821] border border-white/10 rounded-2xl p-8">
                    {/* Tab switcher */}
                    <div className="flex rounded-xl overflow-hidden border border-white/10 mb-6">
                        <button
                            onClick={() => { setMode('login'); setError(''); }}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                                mode === 'login'
                                    ? 'bg-[#16a085] text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {isAr ? 'تسجيل الدخول' : 'Login'}
                        </button>
                        <button
                            onClick={() => { setMode('register'); setError(''); }}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                                mode === 'register'
                                    ? 'bg-[#16a085] text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {isAr ? 'إنشاء حساب' : 'Register'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div>
                                <label className="block text-sm text-slate-400 mb-1.5">
                                    {isAr ? 'الاسم الكامل' : 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085] transition-colors"
                                    placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">
                                {isAr ? 'البريد الإلكتروني' : 'Email'}
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085] transition-colors"
                                placeholder={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">
                                {isAr ? 'كلمة المرور' : 'Password'}
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full bg-[#0a0f16] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#16a085] transition-colors"
                                placeholder={isAr ? 'أدخل كلمة المرور (8 أحرف كحد أدنى)' : 'Min. 8 characters'}
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#16a085] hover:bg-[#1abc9c] disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition-colors mt-2"
                        >
                            {loading
                                ? (isAr ? 'جاري التحميل…' : 'Loading…')
                                : mode === 'login'
                                    ? (isAr ? 'تسجيل الدخول' : 'Sign In')
                                    : (isAr ? 'إنشاء الحساب' : 'Create Account')}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-600 text-xs mt-6">
                    Naggar Analytics © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
