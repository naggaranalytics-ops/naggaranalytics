'use client';

import { useLanguage } from '@/context/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyContent() {
    const { dir } = useLanguage();
    const isAr = dir === 'rtl';

    const lastUpdated = '2026-03-15';

    return (
        <>
            <Navbar />
            <main dir={dir} className="min-h-screen pt-28 pb-16 px-4 bg-[var(--bg-primary)] text-[var(--text-primary)]">
                <div className="max-w-3xl mx-auto">
                    <h1 className={`text-4xl font-bold mb-2 font-${isAr ? 'arabic' : 'sans'}`}>
                        {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </h1>
                    <p className="text-sm mb-10 text-[var(--text-muted)]">
                        {isAr ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
                    </p>

                    <div className={`space-y-8 leading-relaxed text-[15px] text-[var(--text-secondary)] font-${isAr ? 'arabic' : 'sans'}`}>

                        <Section title={isAr ? '1. المقدمة' : '1. Introduction'}>
                            {isAr
                                ? 'تلتزم شركة نجار أناليتيكس ("نحن" أو "الشركة") بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا.'
                                : 'Naggar Analytics ("we", "our", or "the Company") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services.'}
                        </Section>

                        <Section title={isAr ? '2. البيانات التي نجمعها' : '2. Information We Collect'}>
                            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-2`}>
                                <li>{isAr ? 'معلومات الحساب: الاسم والبريد الإلكتروني والمؤسسة.' : 'Account information: name, email address, and institution.'}</li>
                                <li>{isAr ? 'بيانات المشاريع: مجموعات البيانات والملفات والأوصاف التي تقدمها لتحليلها.' : 'Project data: datasets, files, and descriptions you submit for analysis.'}</li>
                                <li>{isAr ? 'بيانات الاتصال: الرسائل المرسلة عبر نظام المحادثة الخاص بنا.' : 'Communication data: messages sent through our chat system.'}</li>
                                <li>{isAr ? 'بيانات الاستخدام: معلومات عامة عن كيفية تفاعلك مع منصتنا.' : 'Usage data: general information about how you interact with our platform.'}</li>
                            </ul>
                        </Section>

                        <Section title={isAr ? '3. كيف نستخدم بياناتك' : '3. How We Use Your Data'}>
                            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-2`}>
                                <li>{isAr ? 'تقديم وتحسين خدمات التحليل الإحصائي.' : 'To provide and improve our statistical analysis services.'}</li>
                                <li>{isAr ? 'التواصل معك بشأن مشاريعك.' : 'To communicate with you regarding your projects.'}</li>
                                <li>{isAr ? 'معالجة المدفوعات وإدارة حسابك.' : 'To process payments and manage your account.'}</li>
                                <li>{isAr ? 'الامتثال للالتزامات القانونية.' : 'To comply with legal obligations.'}</li>
                            </ul>
                        </Section>

                        <Section title={isAr ? '4. حماية البيانات والسرية' : '4. Data Protection & Confidentiality'}>
                            {isAr
                                ? 'نتعامل مع جميع بيانات العملاء بسرية تامة. نوقع اتفاقيات عدم إفشاء (NDA) صارمة لكل مشروع. تُشفر بياناتك أثناء النقل وفي حالة التخزين. لا نشارك بياناتك أو مجموعات بياناتك مع أي طرف ثالث. يتم حذف ملفات المشاريع بعد الانتهاء ما لم يُتفق على خلاف ذلك.'
                                : 'All client data is treated with strict confidentiality. We sign Non-Disclosure Agreements (NDAs) for every project. Your data is encrypted in transit and at rest. We do not share your data or datasets with any third parties. Project files are deleted after completion unless otherwise agreed upon.'}
                        </Section>

                        <Section title={isAr ? '5. خدمات الطرف الثالث' : '5. Third-Party Services'}>
                            {isAr
                                ? 'نستخدم خدمات طرف ثالث موثوقة لتشغيل منصتنا، بما في ذلك Appwrite (المصادقة والتخزين) وCloudflare (الاستضافة). تخضع هذه الخدمات لسياسات خصوصية خاصة بها.'
                                : 'We use trusted third-party services to operate our platform, including Appwrite (authentication and storage) and Cloudflare (hosting). These services are governed by their own privacy policies.'}
                        </Section>

                        <Section title={isAr ? '6. ملفات تعريف الارتباط' : '6. Cookies'}>
                            {isAr
                                ? 'نستخدم ملفات تعريف الارتباط الأساسية فقط للمصادقة وإدارة الجلسات. لا نستخدم ملفات تعريف ارتباط تتبع أو إعلانية.'
                                : 'We use only essential cookies for authentication and session management. We do not use tracking or advertising cookies.'}
                        </Section>

                        <Section title={isAr ? '7. حقوقك' : '7. Your Rights'}>
                            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-2`}>
                                <li>{isAr ? 'طلب الوصول إلى بياناتك الشخصية.' : 'Request access to your personal data.'}</li>
                                <li>{isAr ? 'طلب تصحيح أو حذف بياناتك.' : 'Request correction or deletion of your data.'}</li>
                                <li>{isAr ? 'سحب موافقتك على معالجة البيانات.' : 'Withdraw consent for data processing.'}</li>
                                <li>{isAr ? 'طلب نسخة محمولة من بياناتك.' : 'Request a portable copy of your data.'}</li>
                            </ul>
                        </Section>

                        <Section title={isAr ? '8. التواصل' : '8. Contact Us'}>
                            {isAr
                                ? <>لأي استفسارات تتعلق بالخصوصية، تواصل معنا عبر البريد الإلكتروني: <a href="mailto:privacy@naggaranalytics.com" className="text-[#16a085] hover:underline">privacy@naggaranalytics.com</a></>
                                : <>For any privacy-related inquiries, contact us at: <a href="mailto:privacy@naggaranalytics.com" className="text-[#16a085] hover:underline">privacy@naggaranalytics.com</a></>}
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
            <h2 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{title}</h2>
            <div>{children}</div>
        </section>
    );
}
