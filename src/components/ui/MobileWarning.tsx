'use client';

export default function MobileWarning() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] p-8">
            <div className="text-center max-w-sm">
                
                <div className="mb-8">
                    <svg
                        className="w-16 h-16 mx-auto text-[#F4D03F]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                
                <h1 className="text-2xl font-serif text-[#FFF8E7] mb-4">
                    Desktop Experience
                </h1>

                <p className="text-[#c0c0c0] mb-6 leading-relaxed">
                    This interactive 3D portfolio is designed for desktop browsers.
                    Please visit on a computer for the full experience.
                </p>

                
                <div className="space-y-3">
                    <a
                        href="mailto:hello@pranav.dev"
                        className="block w-full py-3 px-4 bg-[#F4D03F] text-[#0a0a0a] 
                       font-medium rounded-lg hover:bg-[#FFB347] transition-colors
                       no-underline"
                    >
                        Contact me directly
                    </a>

                    <a
                        href="https://github.com/pranavray"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 border border-[#333] text-[#c0c0c0]
                       rounded-lg hover:border-[#555] hover:text-white transition-all
                       no-underline"
                    >
                        View GitHub Profile
                    </a>

                    <a
                        href="https://linkedin.com/in/pranavray"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 border border-[#333] text-[#c0c0c0]
                       rounded-lg hover:border-[#555] hover:text-white transition-all
                       no-underline"
                    >
                        Connect on LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
}
