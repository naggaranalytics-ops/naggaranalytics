export const runtime = 'edge';

import AdminCareersTab from '../AdminCareersTab';

export default function AdminCareersPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto" dir="rtl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-arabic text-white mb-2">طلبات التوظيف</h1>
                <p className="text-slate-400 font-arabic">استعرض طلبات الانضمام للفريق والسير الذاتية.</p>
            </header>
            <AdminCareersTab />
        </div>
    );
}
