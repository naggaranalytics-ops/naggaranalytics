export const runtime = 'edge';

import type { Metadata } from "next";
import TermsContent from './TermsContent';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'شروط الخدمة | نجار أناليتيكس' : 'Terms of Service | Naggar Analytics',
        description: isAr
            ? 'شروط الخدمة لشركة نجار أناليتيكس — الشروط والأحكام لاستخدام خدماتنا.'
            : 'Terms of Service for Naggar Analytics — terms and conditions for using our services.',
    };
}

export default TermsContent;
