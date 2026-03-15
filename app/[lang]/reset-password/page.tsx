import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #060a10 0%, #0a1018 50%, #0d1520 100%)' }}>
                <div className="w-8 h-8 rounded-full border-t-2 border-[#16a085] animate-spin" />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
