export const runtime = 'edge';

import type { Metadata } from "next";
import PrivacyContent from './PrivacyContent';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'سياسة الخصوصية | نجار أناليتيكس' : 'Privacy Policy | Naggar Analytics',
        description: isAr
            ? 'سياسة الخصوصية لشركة نجار أناليتيكس — كيف نحمي بياناتك ونتعامل معها.'
            : 'Privacy Policy for Naggar Analytics — how we protect and handle your data.',
    };
}

export default PrivacyContent;
