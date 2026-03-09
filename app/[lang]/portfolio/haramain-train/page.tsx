import type { Metadata } from "next";
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isAr = params.lang === 'ar';
    return {
        title: isAr ? 'محطات قطار الحرمين — دراسة حالة | نجار أناليتيكس' : 'Haramain Train Stations — Case Study | Naggar Analytics',
        description: isAr
            ? 'تحليل إحصائي شامل للظروف المناخية عبر محطات قطار الحرمين عالي السرعة في مكة المكرمة.'
            : 'Comprehensive statistical analysis of climatic conditions across Haramain high-speed railway stations in Mecca.',
    };
}

import HaramainTrainPage from './PageContent';
export default HaramainTrainPage;
