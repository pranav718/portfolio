import Link from "next/link";

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen" style={{ background: "var(--cream)" }}>
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl text-[#2C2418] hover:text-[#8B7355] transition-colors"
                        style={{ fontFamily: "var(--font-caveat)", fontWeight: 600 }}
                    >
                        Pranav Ray
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { href: "/portfolio", label: "Home" },
                            { href: "/portfolio/projects", label: "Projects" },
                            { href: "/portfolio/about", label: "About" },
                            { href: "/portfolio/experience", label: "Experience" },
                            { href: "/portfolio/blog", label: "Blog" },
                            { href: "/portfolio/contact", label: "Contact" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-[#6B5D4D] hover:text-[#2C2418] transition-colors"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button className="md:hidden text-[#2C2418]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            <main className="pt-20">
                {children}
            </main>

            <footer className="py-12 px-6 border-t border-[#F5EDE4]">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[#9C8D7D]" style={{ fontFamily: "var(--font-inter)" }}>
                        © 2024 Pranav Ray. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/pranav718"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6B5D4D] hover:text-[#2C2418] transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6B5D4D] hover:text-[#2C2418] transition-colors"
                        >
                            LinkedIn
                        </a>
                        <Link
                            href="/"
                            className="text-[#8B7355] hover:text-[#2C2418] transition-colors"
                            style={{ fontFamily: "var(--font-caveat)" }}
                        >
                             Take the journey
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
