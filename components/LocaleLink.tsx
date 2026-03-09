"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageProvider";
import { ComponentProps } from "react";

type LocaleLinkProps = ComponentProps<typeof Link>;

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
    const { lang } = useLanguage();

    const hrefStr = typeof href === "string" ? href : href.pathname || "";
    const isInternal = hrefStr.startsWith("/") && !hrefStr.startsWith("/api/");
    const alreadyPrefixed = /^\/(en|ar)(\/|$)/.test(hrefStr);

    const localizedHref = isInternal && !alreadyPrefixed ? `/${lang}${hrefStr}` : href;

    return <Link href={localizedHref} {...props} />;
}
