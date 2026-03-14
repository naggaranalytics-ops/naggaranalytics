export const runtime = 'edge';

import AdminSubscribersTab from '../AdminSubscribersTab';

export default function AdminSubscribersPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto" dir="rtl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-arabic text-white mb-2">المشتركون بالبريد</h1>
                <p className="text-slate-400 font-arabic">استعرض القائمة البريدية لعملائك لتبدأ في مراسلتهم.</p>
            </header>
            <AdminSubscribersTab />
        </div>
    );
}
