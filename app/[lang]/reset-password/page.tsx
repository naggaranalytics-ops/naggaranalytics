'use client';

import { useState } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const lang = (params?.lang as string) ?? 'en';
    const isAr = lang === 'ar';

    const userId = searchParams?.get('userId') ?? '';
    const secret = searchParams?.get('secret') ?? '';

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const txt = {
        title: isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Your Password',
        subtitle: isAr ? 'أدخل كلمة المرور الجديدة' : 'Enter your new password',
        password: isAr ? 'كلمة المرور الجديدة' : 'New Password',
        confirm: isAr ? 'تأكيد كلمة المرور' : 'Confirm Password',
        submit: isAr ? 'تعيين كلمة المرور' : 'Set Password',
        loading: isAr ? 'جاري التعيين…' : 'Setting…',
        mismatch: isAr ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        minChars: isAr ? '8 أحرف كحد أدنى' : 'Min. 8 characters',
        successTitle: isAr ? 'تم تعيين كلمة المرور بنجاح!' : 'Password Reset Successfully!',
        successMsg: isAr ? 'يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.' : 'You can now sign in with your new password.',
        goToLogin: isAr ? 'تسجيل الدخول' : 'Sign In',
        invalidLink: isAr ? 'رابط غير صالح. اطلب رابط إعادة تعيين جديد.' : 'Invalid link. Please request a new recovery link.',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) { setError(txt.mismatch); return; }
        if (password.length < 8) return;

        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/recovery/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, secret, password }),
            });
            const data = await res.json();
            if (!res.ok) setError(data.error || 'Something went wrong.');
            else setSuccess(true);
        } catch {
            setError(isAr ? 'خطأ في الاتصال' : 'Network error');
        } finally {
            setLoading(false);
        }
    };

    if (!userId || !secret) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(145deg, #060a10 0%, #0a1018 50%, #0d1520 100%)' }}>
                <div className="text-center">
                    <p className="text-red-400 text-sm mb-4">{txt.invalidLink}</p>
                    <a href={`/${lang}/login`} className="text-[#16a085] hover:underline text-sm">{txt.goToLogin}</a>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" dir={isAr ? 'rtl' : 'ltr'} style={{ background: 'linear-gradient(145deg, #060a10 0%, #0a1018 50%, #0d1520 100%)' }}>
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto w-20 h-20 rounded-full bg-[#16a085]/10 border border-[#16a085]/20 flex items-center justify-center mb-6">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{txt.successTitle}</h2>
                    <p className="text-slate-400 text-sm mb-6">{txt.successMsg}</p>
                    <button
                        onClick={() => router.push(`/${lang}/login`)}
                        className="bg-[#16a085] hover:bg-[#149174] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#16a085]/20"
                    >
                        {txt.goToLogin}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4" dir={isAr ? 'rtl' : 'ltr'} style={{ background: 'linear-gradient(145deg, #060a10 0%, #0a1018 50%, #0d1520 100%)' }}>
            <div className="w-full max-w-md">
                <div className={`mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                    <h2 className="text-2xl font-bold text-white mb-1.5">{txt.title}</h2>
                    <p className="text-slate-500 text-sm">{txt.subtitle}</p>
                </div>

                {error && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/[0.06] border border-red-500/[0.1] rounded-xl px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">{txt.password}</label>
                        <input
                            type="password" value={password} onChange={e => setPassword(e.target.value)}
                            required minLength={8} dir="ltr"
                            className={`w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#16a085]/50 rounded-xl py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#16a085]/20 transition-all ${isAr ? 'pr-4 pl-4' : 'pl-4 pr-4'}`}
                            placeholder="••••••••"
                        />
                        <p className="text-slate-600 text-xs mt-1">{txt.minChars}</p>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">{txt.confirm}</label>
                        <input
                            type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                            required minLength={8} dir="ltr"
                            className={`w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#16a085]/50 rounded-xl py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#16a085]/20 transition-all ${isAr ? 'pr-4 pl-4' : 'pl-4 pr-4'}`}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-[#16a085] hover:bg-[#1abc9c] disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 transition-all shadow-lg shadow-[#16a085]/20 text-sm">
                        {loading ? txt.loading : txt.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}
