"use client";

import { useEffect } from "react";

export default function HtmlLangSetter({ lang }: { lang: string }) {
    useEffect(() => {
        const dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", dir);
    }, [lang]);

    return null;
}
