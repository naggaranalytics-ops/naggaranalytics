import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'انضم إلينا | وظائف نجار أناليتيكس' : 'Careers | Join Naggar Analytics',
        description: isAr
            ? 'انضم إلى فريق نجار أناليتيكس. وظائف عن بُعد للمتخصصين في الإحصاء وتحليل البيانات.'
            : 'Join the Naggar Analytics team. Remote positions for statisticians and data analysts passionate about rigorous research.',
    };
}

import CareersPage from './PageContent';
export default CareersPage;
