"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
    // Replace this with the actual WhatsApp number
    const phoneNumber = "201000000000"; // Dummy number, update later
    const message = "مرحباً، أحتاج إلى مساعدة بخصوص مشروعي على Naggar Analytics.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 transition-all transform hover:scale-110 flex items-center justify-center group"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle size={32} />
            <span className="absolute right-16 bg-white text-slate-800 text-sm font-bold font-arabic px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-100 hidden md:block" dir="rtl">
                تواصل معنا مساعدة؟ 👋
            </span>
        </a>
    );
}
