import Link from "next/link";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-opacity-70 bg-[#111821] border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image src="/logo/logo.svg" alt="Naggar Analytics" width={400} height={400} className="w-auto h-12 md:h-12" priority />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link href="/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</Link>
                            <Link href="/portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</Link>
                            <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                            <Link href="/careers" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Careers</Link>
                            <Link href="/faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">FAQ</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <LoginLink className="text-sm font-medium hover:text-primary transition-colors text-white">Sign In</LoginLink>
                        <RegisterLink className="px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-all">
                            Register
                        </RegisterLink>
                    </div>

                    {/* Mobile menu button (Simplified for React) */}
                    <div className="-mr-2 flex md:hidden">
                        <LoginLink className="text-sm font-medium bg-primary/20 text-primary px-4 py-2 rounded-lg">Sign In</LoginLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
