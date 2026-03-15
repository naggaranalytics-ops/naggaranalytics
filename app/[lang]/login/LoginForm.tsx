'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

/* ───────── types ───────── */
type AuthMode   = 'login' | 'register';
type AuthMethod = 'magic' | 'password';

/* ───────── i18n ───────── */
const i18n = (lang: string) => {
    const isAr = lang === 'ar';
    return {
        brandName:       'Naggar Analytics',
        welcomeBack:     isAr ? 'مرحباً بعودتك' : 'Welcome back',
        createAccount:   isAr ? 'إنشاء حساب جديد' : 'Create your account',
        welcomeSubLogin: isAr ? 'سجّل الدخول للمتابعة إلى لوحة التحكم' : 'Sign in to continue to your dashboard',
        welcomeSubReg:   isAr ? 'ابدأ مشروعك الإحصائي الأول' : 'Start your first statistical project',
        continueGoogle:  isAr ? 'المتابعة مع Google' : 'Continue with Google',
        orDivider:       isAr ? 'أو' : 'or',
        emailLink:       isAr ? 'رابط بالبريد الإلكتروني' : 'Email Link',
        emailPassword:   isAr ? 'بريد وكلمة مرور' : 'Email & Password',
        email:           isAr ? 'البريد الإلكتروني' : 'Email address',
        emailPlaceholder:'name@example.com',
        password:        isAr ? 'كلمة المرور' : 'Password',
        passwordPlc:     '••••••••',
        fullName:        isAr ? 'الاسم الكامل' : 'Full name',
        namePlaceholder: isAr ? 'أدخل اسمك' : 'Enter your name',
        signIn:          isAr ? 'تسجيل الدخول' : 'Sign In',
        signUp:          isAr ? 'إنشاء الحساب' : 'Create Account',
        sendLink:        isAr ? 'إرسال رابط الدخول' : 'Send Login Link',
        loading:         isAr ? 'جاري التحميل…' : 'Loading…',
        sending:         isAr ? 'جاري الإرسال…' : 'Sending…',
        noAccount:       isAr ? 'ليس لديك حساب؟' : "Don't have an account?",
        haveAccount:     isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?',
        register:        isAr ? 'سجّل الآن' : 'Sign up',
        login:           isAr ? 'سجّل دخولك' : 'Sign in',
        magicSent:       isAr ? 'تم إرسال الرابط!' : 'Link sent!',
        magicSentSub:    isAr ? 'تحقق من بريدك الإلكتروني' : 'Check your email',
        magicSentDesc:   isAr ? 'أرسلنا رابط تسجيل الدخول إلى بريدك. انقر عليه للدخول.' : "We've sent a login link to your inbox. Click it to sign in.",
        checkSpam:       isAr ? 'لم تجد الرسالة؟ تحقق من مجلد الرسائل غير المرغوبة' : "Can't find it? Check your spam folder",
        resend:          isAr ? 'إعادة الإرسال' : 'Resend',
        usePassword:     isAr ? 'استخدام كلمة المرور بدلاً من ذلك' : 'Use password instead',
        errorOAuth:      isAr ? 'فشل تسجيل الدخول. حاول مرة أخرى.' : 'Sign in failed. Please try again.',
        errorExpired:    isAr ? 'انتهت صلاحية الرابط. أرسل رابطاً جديداً.' : 'Link expired. Please request a new one.',
        errorNetwork:    isAr ? 'خطأ في الاتصال. حاول مرة أخرى.' : 'Network error. Please try again.',
        secureNote:      isAr ? 'بياناتك مشفرة ومحمية بالكامل' : 'Your data is encrypted and fully protected',
        copyright:       `© ${new Date().getFullYear()} Naggar Analytics`,
        minChars:        isAr ? '8 أحرف كحد أدنى' : 'Min. 8 characters',
        noPasswordNeeded:isAr ? 'سنرسل لك رابطاً آمناً للدخول بدون كلمة مرور' : "We'll send you a secure link — no password needed",
        forgotPassword:  isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?',
        forgotSent:      isAr ? 'تم إرسال رابط إعادة التعيين!' : 'Recovery link sent!',
        forgotSentDesc:  isAr ? 'تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور' : 'Check your email to reset your password',
        stat1:           '500+',
        stat1Label:      isAr ? 'مشروع مكتمل' : 'Projects Delivered',
        stat2:           '98%',
        stat2Label:      isAr ? 'رضا العملاء' : 'Client Satisfaction',
        stat3:           '10',
        stat3Label:      isAr ? 'أيام للتسليم' : 'Day Turnaround',
        heroLine1:       isAr ? 'من البيانات الخام' : 'From Raw Data to',
        heroLine2:       isAr ? 'إلى نتائج موثوقة' : 'Defensible Results',
        heroDesc:        isAr
            ? 'تحليل إحصائي احترافي للباحثين والمؤسسات. نحوّل بياناتك إلى نتائج جاهزة للنشر.'
            : 'Professional statistical analysis for researchers and institutions. We turn your data into publication-ready results.',
    };
};

/* ───────── CSS animation keyframes (injected once) ───────── */
const cssAnimations = `
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,-30px) scale(1.1); } }
@keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-10px,-20px) scale(1.05); } }
@keyframes float3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-15px) scale(1.08); } }
.anim-fade-up { animation: fadeInUp 0.5s ease-out both; }
.anim-fade-in { animation: fadeIn 0.6s ease-out both; }
.anim-fade-scale { animation: fadeInScale 0.4s ease-out both; }
.anim-slide-right { animation: slideInRight 0.4s ease-out both; }
.anim-slide-left { animation: slideInLeft 0.4s ease-out both; }
.anim-delay-1 { animation-delay: 0.1s; }
.anim-delay-2 { animation-delay: 0.2s; }
.anim-delay-3 { animation-delay: 0.35s; }
.anim-delay-4 { animation-delay: 0.5s; }
.anim-delay-5 { animation-delay: 0.65s; }
.anim-delay-6 { animation-delay: 1s; }
.particle { position: absolute; border-radius: 9999px; background: rgba(22,160,133,0.04); }
.particle-1 { width:60px;height:60px;left:10%;top:15%;animation:float1 7s ease-in-out infinite; }
.particle-2 { width:100px;height:100px;left:25%;top:40%;animation:float2 9s ease-in-out infinite 0.8s; }
.particle-3 { width:140px;height:140px;left:40%;top:65%;animation:float3 11s ease-in-out infinite 1.6s; }
.particle-4 { width:80px;height:80px;left:55%;top:20%;animation:float2 8s ease-in-out infinite 2.4s; }
.particle-5 { width:120px;height:120px;left:70%;top:50%;animation:float1 10s ease-in-out infinite 3.2s; }
.particle-6 { width:160px;height:160px;left:85%;top:30%;animation:float3 12s ease-in-out infinite 4s; }
`;

/* ───────── loading spinner ───────── */
function Spinner() {
    return (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    );
}

/* ───────── MAIN COMPONENT ───────── */
export default function LoginForm() {
    const router       = useRouter();
    const params       = useParams();
    const searchParams = useSearchParams();
    const lang         = (params?.lang as string) ?? 'ar';
    const isAr         = lang === 'ar';
    const txt          = i18n(lang);

    const [mode, setMode]                 = useState<AuthMode>('login');
    const [method, setMethod]             = useState<AuthMethod>('magic');
    const [name, setName]                 = useState('');
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading]           = useState(false);
    const [error, setError]               = useState('');
    const [magicSent, setMagicSent]       = useState(false);

    useEffect(() => {
        const err = searchParams?.get('error');
        if (!err) return;
        if (err === 'magic_link_expired' || err === 'invalid_link') setError(txt.errorExpired);
        else setError(txt.errorOAuth);
    }, [searchParams, txt.errorOAuth, txt.errorExpired]);

    const clearState = useCallback(() => { setError(''); setMagicSent(false); }, []);

    function handleOAuth() {
        window.location.href = `/api/auth/oauth?provider=google&lang=${lang}`;
    }

    async function handleMagicLink(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res  = await fetch('/api/auth/magic-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, lang }),
            });
            const data = await res.json();
            if (!res.ok) setError(data.error || 'Something went wrong.');
            else setMagicSent(true);
        } catch {
            setError(txt.errorNetwork);
        } finally {
            setLoading(false);
        }
    }

    async function handlePasswordAuth(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
        const body     = mode === 'login' ? { email, password } : { name, email, password };
        try {
            const res  = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) setError(data.error || 'Something went wrong.');
            else { router.push(`/${lang}/dashboard`); router.refresh(); }
        } catch {
            setError(txt.errorNetwork);
        } finally {
            setLoading(false);
        }
    }

    /* ═══════ Magic-link sent success screen ═══════ */
    if (magicSent) {
        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: cssAnimations }} />
                <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(145deg, #060a10 0%, #0a1018 50%, #0d1520 100%)' }} dir={isAr ? 'rtl' : 'ltr'}>
                    <div className="max-w-md w-full text-center anim-fade-scale">
                        <div className="mx-auto w-20 h-20 rounded-full bg-[#16a085]/10 border border-[#16a085]/20 flex items-center justify-center mb-6">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="3"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{txt.magicSent}</h2>
                        <p className="text-[#16a085] font-medium text-sm mb-2">{txt.magicSentSub}</p>
                        <p className="text-slate-400 text-sm mb-2">{txt.magicSentDesc}</p>
                        <p className="text-slate-600 text-xs mb-8">{txt.checkSpam}</p>
                        <div className="space-y-3">
                            <button onClick={() => { setMagicSent(false); handleMagicLink({ preventDefault: () => {} } as React.FormEvent); }} className="w-full py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                                {txt.resend}
                            </button>
                            <button onClick={() => { setMagicSent(false); setMethod('password'); }} className="w-full py-3 rounded-xl text-slate-500 hover:text-slate-300 transition-all text-xs">
                                {txt.usePassword}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ═══════ Main layout ═══════ */
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: cssAnimations }} />
            <div className="min-h-screen flex" style={{ background: 'linear-gradient(145deg, #060a10 0%, #0a1018 50%, #0d1520 100%)' }} dir={isAr ? 'rtl' : 'ltr'}>

                {/* ════════ LEFT PANEL — Branding (desktop only) ════════ */}
                <div className="hidden lg:flex lg:w-[45%] xl:w-[48%] relative flex-col justify-between p-12 overflow-hidden">
                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="particle particle-1" />
                        <div className="particle particle-2" />
                        <div className="particle particle-3" />
                        <div className="particle particle-4" />
                        <div className="particle particle-5" />
                        <div className="particle particle-6" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#16a085]/[0.04] via-transparent to-[#16a085]/[0.02]" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-3 anim-fade-up">
                        <div className="w-11 h-11 rounded-xl bg-[#16a085]/10 border border-[#16a085]/20 flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                            </svg>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">{txt.brandName}</span>
                    </div>

                    {/* Headline */}
                    <div className="relative z-10 anim-fade-up anim-delay-2">
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
                            {txt.heroLine1}<br/><span className="text-[#16a085]">{txt.heroLine2}</span>
                        </h1>
                        <p className="text-slate-400 text-base max-w-md leading-relaxed">{txt.heroDesc}</p>

                        <div className="flex gap-8 mt-10">
                            {[
                                { val: txt.stat1, label: txt.stat1Label },
                                { val: txt.stat2, label: txt.stat2Label },
                                { val: txt.stat3, label: txt.stat3Label },
                            ].map((s, i) => (
                                <div key={i} className={`anim-fade-up anim-delay-${i + 3}`}>
                                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Secure note */}
                    <div className="relative z-10 flex items-center gap-2 text-slate-600 text-xs anim-fade-in anim-delay-6">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        {txt.secureNote}
                    </div>
                </div>

                {/* ════════ RIGHT PANEL — Auth Form ════════ */}
                <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">
                    <div className={`w-full max-w-[420px] ${isAr ? 'anim-slide-left' : 'anim-slide-right'}`}>

                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-[#16a085]/10 border border-[#16a085]/20 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                                </svg>
                            </div>
                            <span className="text-white font-bold text-lg">{txt.brandName}</span>
                        </div>

                        {/* Header */}
                        <div className={`mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                            <h2 key={mode} className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
                                {mode === 'login' ? txt.welcomeBack : txt.createAccount}
                            </h2>
                            <p className="text-slate-500 text-sm">
                                {mode === 'login' ? txt.welcomeSubLogin : txt.welcomeSubReg}
                            </p>
                        </div>

                        {/* Google OAuth */}
                        <button onClick={handleOAuth} className="group w-full flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.15] text-white font-medium rounded-2xl py-3.5 px-4 transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-sm">{txt.continueGoogle}</span>
                        </button>

                        {/* Divider */}
                        <div className="relative my-7">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]"></div></div>
                            <div className="relative flex justify-center">
                                <span className="px-4 text-xs text-slate-600 uppercase tracking-widest" style={{ background: 'linear-gradient(145deg, #080d14, #0b1119)' }}>
                                    {txt.orDivider}
                                </span>
                            </div>
                        </div>

                        {/* Method toggle (Magic Link / Password) */}
                        <div className="flex rounded-xl bg-white/[0.03] border border-white/[0.06] p-1 mb-6">
                            {(['magic', 'password'] as AuthMethod[]).map((m) => (
                                <button key={m} onClick={() => { setMethod(m); clearState(); }} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${method === m ? 'bg-[#16a085] text-white shadow-lg shadow-[#16a085]/20' : 'text-slate-500 hover:text-slate-300'}`}>
                                    {m === 'magic' ? txt.emailLink : txt.emailPassword}
                                </button>
                            ))}
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-4 anim-fade-scale">
                                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/[0.06] border border-red-500/[0.1] rounded-xl px-4 py-3">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* ── Forms ── */}
                        {method === 'magic' ? (
                            /* ─── Magic Link Form ─── */
                            <form key="magic" onSubmit={handleMagicLink} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">{txt.email}</label>
                                    <div className="relative">
                                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-600 ${isAr ? 'right-4' : 'left-4'}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        </div>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr"
                                            className={`w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#16a085]/50 focus:bg-white/[0.05] rounded-xl py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#16a085]/20 transition-all ${isAr ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                                            placeholder={txt.emailPlaceholder}
                                        />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-[#16a085] hover:bg-[#1abc9c] disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 shadow-lg shadow-[#16a085]/20 hover:shadow-[#16a085]/30 text-sm">
                                    <span className="flex items-center justify-center gap-2">
                                        {loading ? <><Spinner />{txt.sending}</> : (
                                            <>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                                {txt.sendLink}
                                            </>
                                        )}
                                    </span>
                                </button>
                                <p className="text-center text-slate-600 text-xs pt-1">{txt.noPasswordNeeded}</p>
                            </form>
                        ) : (
                            /* ─── Password Form ─── */
                            <form key="password" onSubmit={handlePasswordAuth} className="space-y-4">

                                {/* Name (register) */}
                                {mode === 'register' && (
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-2">{txt.fullName}</label>
                                        <div className="relative">
                                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-600 ${isAr ? 'right-4' : 'left-4'}`}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                            </div>
                                            <input type="text" value={name} onChange={e => setName(e.target.value)} required
                                                className={`w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#16a085]/50 focus:bg-white/[0.05] rounded-xl py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#16a085]/20 transition-all ${isAr ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                                                placeholder={txt.namePlaceholder}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">{txt.email}</label>
                                    <div className="relative">
                                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-600 ${isAr ? 'right-4' : 'left-4'}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        </div>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr"
                                            className={`w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#16a085]/50 focus:bg-white/[0.05] rounded-xl py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#16a085]/20 transition-all ${isAr ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                                            placeholder={txt.emailPlaceholder}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">{txt.password}</label>
                                    <div className="relative">
                                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-600 ${isAr ? 'right-4' : 'left-4'}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                        </div>
                                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={8} dir="ltr"
                                            className={`w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#16a085]/50 focus:bg-white/[0.05] rounded-xl py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#16a085]/20 transition-all ${isAr ? 'pr-11 pl-12' : 'pl-11 pr-12'}`}
                                            placeholder={txt.passwordPlc}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors ${isAr ? 'left-4' : 'right-4'}`}>
                                            {showPassword ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            )}
                                        </button>
                                    </div>
                                    {mode === 'register' && <p className="text-slate-600 text-xs mt-1.5">{txt.minChars}</p>}
                                    {mode === 'login' && (
                                        <button type="button" onClick={async () => {
                                            if (!email) { setError(isAr ? 'أدخل بريدك الإلكتروني أولاً' : 'Enter your email first'); return; }
                                            setLoading(true); setError('');
                                            try {
                                                const res = await fetch('/api/auth/recovery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, lang }) });
                                                const data = await res.json();
                                                if (!res.ok) setError(data.error);
                                                else setError(txt.forgotSent + ' ' + txt.forgotSentDesc);
                                            } catch { setError(txt.errorNetwork); }
                                            finally { setLoading(false); }
                                        }} className="text-[#16a085] hover:text-[#1abc9c] text-xs mt-1.5 transition-colors">
                                            {txt.forgotPassword}
                                        </button>
                                    )}
                                </div>

                                {/* Submit */}
                                <button type="submit" disabled={loading} className="w-full bg-[#16a085] hover:bg-[#1abc9c] disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 shadow-lg shadow-[#16a085]/20 hover:shadow-[#16a085]/30 text-sm mt-1">
                                    <span className="flex items-center justify-center gap-2">
                                        {loading ? <><Spinner />{txt.loading}</> : mode === 'login' ? txt.signIn : txt.signUp}
                                    </span>
                                </button>
                            </form>
                        )}

                        {/* Mode toggle (Login ↔ Register) — only for password method */}
                        {method === 'password' && (
                            <p className="text-center text-sm text-slate-500 mt-6">
                                {mode === 'login' ? txt.noAccount : txt.haveAccount}{' '}
                                <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); clearState(); }} className="text-[#16a085] hover:text-[#1abc9c] font-medium transition-colors">
                                    {mode === 'login' ? txt.register : txt.login}
                                </button>
                            </p>
                        )}

                        {/* Footer */}
                        <p className="text-center text-slate-700 text-xs mt-8">{txt.copyright}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
