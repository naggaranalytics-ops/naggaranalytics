import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#050a10] border-t border-white/5 py-12 relative z-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="text-white font-bold text-xl tracking-tighter mb-4 block">
                        NAGGAR<span className="text-[#16a085]">ANALYTICS</span>
                    </Link>
                    <p className="text-slate-400 text-sm max-w-sm">
                        Providing defensible, high-accuracy statistical analysis for researchers, students, and institutions.
                    </p>
                </div>

                <div>
                    <h5 className="text-white font-bold mb-4">Quick Links</h5>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/services" className="hover:text-[#16a085]">Services</Link></li>
                        <li><Link href="/portfolio" className="hover:text-[#16a085]">Portfolio</Link></li>
                        <li><Link href="/about" className="hover:text-[#16a085]">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-[#16a085]">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold mb-4">Legal</h5>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="#" className="hover:text-[#16a085]">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-[#16a085]">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-center text-slate-500 text-xs font-mono">
                &copy; 2024 Naggar Analytics. All rights reserved.
            </div>
        </footer>
    );
}
