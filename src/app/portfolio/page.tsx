import Link from 'next/link';

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-serif mb-8">Portfolio</h1>
                <p className="text-white/70 mb-8">
                    under construction
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                    back to experience
                </Link>
            </div>
        </main>
    );
}
