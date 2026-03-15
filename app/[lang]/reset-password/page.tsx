export const runtime = 'edge';

import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(145deg,#060a10_0%,#0a1018_50%,#0d1520_100%)]">
                <div className="w-8 h-8 rounded-full border-t-2 border-[#16a085] animate-spin" />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
