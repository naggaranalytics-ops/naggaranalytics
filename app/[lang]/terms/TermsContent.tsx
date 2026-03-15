'use client';

import { useLanguage } from '@/context/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsContent() {
    const { dir } = useLanguage();
    const isAr = dir === 'rtl';

    const lastUpdated = '2026-03-15';

    return (
        <>
            <Navbar />
            <main dir={dir} className="min-h-screen pt-28 pb-16 px-4" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <div className="max-w-3xl mx-auto">
                    <h1 className={`text-4xl font-bold mb-2 font-${isAr ? 'arabic' : 'sans'}`}>
                        {isAr ? 'شروط الخدمة' : 'Terms of Service'}
                    </h1>
                    <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
                        {isAr ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
                    </p>

                    <div className={`space-y-8 leading-relaxed text-[15px] font-${isAr ? 'arabic' : 'sans'}`} style={{ color: 'var(--text-secondary)' }}>

                        <Section title={isAr ? '1. قبول الشروط' : '1. Acceptance of Terms'}>
                            {isAr
                                ? 'باستخدامك لخدمات نجار أناليتيكس، فإنك توافق على الالتزام بهذه الشروط وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يُرجى عدم استخدام خدماتنا.'
                                : 'By using Naggar Analytics services, you agree to be bound by these terms and all applicable laws and regulations. If you do not agree with any of these terms, please do not use our services.'}
                        </Section>

                        <Section title={isAr ? '2. وصف الخدمة' : '2. Description of Service'}>
                            {isAr
                                ? 'تقدم نجار أناليتيكس خدمات التحليل الإحصائي الاحترافية للباحثين والمؤسسات الأكاديمية. تشمل خدماتنا تحليل البيانات، والنمذجة الإحصائية، وإعداد التقارير الجاهزة للنشر.'
                                : 'Naggar Analytics provides professional statistical analysis services for researchers and academic institutions. Our services include data analysis, statistical modeling, and publication-ready report preparation.'}
                        </Section>

                        <Section title={isAr ? '3. حسابات المستخدمين' : '3. User Accounts'}>
                            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-2`}>
                                <li>{isAr ? 'أنت مسؤول عن الحفاظ على سرية بيانات حسابك.' : 'You are responsible for maintaining the confidentiality of your account credentials.'}</li>
                                <li>{isAr ? 'يجب أن تكون المعلومات المقدمة دقيقة وكاملة.' : 'Information provided must be accurate and complete.'}</li>
                                <li>{isAr ? 'يجب إخطارنا فوراً في حالة أي استخدام غير مصرح به لحسابك.' : 'You must notify us immediately of any unauthorized use of your account.'}</li>
                            </ul>
                        </Section>

                        <Section title={isAr ? '4. تقديم المشاريع والتسليم' : '4. Project Submission & Delivery'}>
                            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-2`}>
                                <li>{isAr ? 'جميع المشاريع تخضع لتقييم أولي قبل تقديم عرض السعر.' : 'All projects are subject to an initial assessment before a quote is provided.'}</li>
                                <li>{isAr ? 'تعتمد مدة التسليم على نطاق المشروع وتعقيده.' : 'Delivery timelines depend on project scope and complexity.'}</li>
                                <li>{isAr ? 'نحتفظ بالحق في رفض المشاريع التي لا تتوافق مع قدراتنا أو معاييرنا الأخلاقية.' : 'We reserve the right to decline projects that do not align with our capabilities or ethical standards.'}</li>
                            </ul>
                        </Section>

                        <Section title={isAr ? '5. الملكية الفكرية' : '5. Intellectual Property'}>
                            {isAr
                                ? 'تظل جميع البيانات والمواد المقدمة من العميل ملكاً له. عند اكتمال المشروع والدفع الكامل، يحصل العميل على حقوق الملكية الكاملة للتحليل والتقارير المنتجة. لا يحق لنجار أناليتيكس استخدام بيانات العملاء لأي غرض آخر.'
                                : 'All data and materials submitted by the client remain their property. Upon project completion and full payment, the client receives full ownership rights to the analysis and reports produced. Naggar Analytics may not use client data for any other purpose.'}
                        </Section>

                        <Section title={isAr ? '6. السرية واتفاقيات عدم الإفشاء' : '6. Confidentiality & NDAs'}>
                            {isAr
                                ? 'نوقع اتفاقيات عدم إفشاء (NDA) لكل مشروع. جميع البيانات والنتائج والمراسلات تعامل بسرية تامة. لا نشارك أي معلومات مع أطراف ثالثة دون إذن كتابي صريح من العميل.'
                                : 'We sign Non-Disclosure Agreements (NDAs) for every project. All data, results, and communications are treated with strict confidentiality. We do not share any information with third parties without explicit written consent from the client.'}
                        </Section>

                        <Section title={isAr ? '7. الدفع والاسترداد' : '7. Payment & Refunds'}>
                            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-2`}>
                                <li>{isAr ? 'يتم تقديم عرض سعر مخصص لكل مشروع قبل بدء العمل.' : 'A custom quote is provided for each project before work begins.'}</li>
                                <li>{isAr ? 'يبدأ العمل بعد تأكيد الدفع.' : 'Work begins after payment confirmation.'}</li>
                                <li>{isAr ? 'يمكن طلب استرداد المبلغ قبل بدء التحليل. بعد البدء، يتم حساب الرسوم بناءً على العمل المنجز.' : 'Refunds may be requested before analysis begins. After work starts, fees are calculated based on work completed.'}</li>
                            </ul>
                        </Section>

                        <Section title={isAr ? '8. حدود المسؤولية' : '8. Limitation of Liability'}>
                            {isAr
                                ? 'نسعى لتقديم تحليلات دقيقة وعالية الجودة. ومع ذلك، لا تتحمل نجار أناليتيكس مسؤولية أي قرارات تتخذ بناءً على نتائج التحليل، ولا عن أي أضرار غير مباشرة ناتجة عن استخدام خدماتنا.'
                                : 'We strive to deliver accurate, high-quality analysis. However, Naggar Analytics is not liable for decisions made based on analysis results, nor for any indirect damages arising from the use of our services.'}
                        </Section>

                        <Section title={isAr ? '9. تعديل الشروط' : '9. Changes to Terms'}>
                            {isAr
                                ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال المنصة.'
                                : 'We reserve the right to modify these terms at any time. Users will be notified of any material changes via email or through the platform.'}
                        </Section>

                        <Section title={isAr ? '10. التواصل' : '10. Contact Us'}>
                            {isAr
                                ? <>لأي استفسارات تتعلق بشروط الخدمة، تواصل معنا عبر البريد الإلكتروني: <a href="mailto:legal@naggaranalytics.com" className="text-[#16a085] hover:underline">legal@naggaranalytics.com</a></>
                                : <>For any questions about these terms, contact us at: <a href="mailto:legal@naggaranalytics.com" className="text-[#16a085] hover:underline">legal@naggaranalytics.com</a></>}
                        </Section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
            <div>{children}</div>
        </section>
    );
}
