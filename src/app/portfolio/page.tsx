"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const featuredProjects = [
    {
        slug: "project-1",
        title: "Project One",
        description: "A brief description of this amazing project and what it does.",
        tags: ["React", "TypeScript", "Node.js"],
    },
    {
        slug: "project-2",
        title: "Project Two",
        description: "Another incredible project showcasing different skills.",
        tags: ["Next.js", "Tailwind", "PostgreSQL"],
    },
    {
        slug: "project-3",
        title: "Project Three",
        description: "Open source contribution that made an impact.",
        tags: ["Vue", "Python", "Docker"],
    },
];

export default function PortfolioHome() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24"
            >
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl ink-text mb-6 max-w-3xl"
                    style={{ fontFamily: "var(--font-crimson)", fontWeight: 600 }}
                >
                    Building thoughtful software & contributing to open source
                </h1>
                <p
                    className="text-lg text-[#6B5D4D] max-w-2xl"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    I&apos;m a developer passionate about creating elegant solutions and
                    giving back to the community through open source contributions.
                </p>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-24"
            >
                <div className="flex items-center justify-between mb-10">
                    <h2
                        className="text-2xl text-[#2C2418]"
                        style={{ fontFamily: "var(--font-crimson)", fontWeight: 600 }}
                    >
                        Featured Projects
                    </h2>
                    <Link
                        href="/portfolio/projects"
                        className="text-sm text-[#8B7355] hover:text-[#2C2418] transition-colors"
                    >
                        View all →
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                        >
                            <Link href={`/portfolio/projects/${project.slug}`}>
                                <div className="group p-6 rounded-lg border border-[#F5EDE4] hover:border-[#D4A574] bg-white/50 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
                                    <div className="w-full h-40 rounded-md bg-gradient-to-br from-[#F5EDE4] to-[#F7E7CE] mb-4 flex items-center justify-center">
                                        <span className="text-[#9C8D7D]" style={{ fontFamily: "var(--font-caveat)" }}>
                                            Project Preview
                                        </span>
                                    </div>

                                    <h3
                                        className="text-xl text-[#2C2418] mb-2 group-hover:text-[#8B7355] transition-colors"
                                        style={{ fontFamily: "var(--font-crimson)", fontWeight: 600 }}
                                    >
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-[#6B5D4D] mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 rounded-full bg-[#F5EDE4] text-[#6B5D4D]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center py-16 border-t border-[#F5EDE4]"
            >
                <h2
                    className="text-2xl text-[#2C2418] mb-4"
                    style={{ fontFamily: "var(--font-crimson)", fontWeight: 600 }}
                >
                    Want a more immersive experience?
                </h2>
                <p className="text-[#6B5D4D] mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                    Explore my portfolio through an interactive 3D desk and journal.
                </p>
                <Link
                    href="/journey"
                    className="inline-block px-6 py-3 text-lg text-[#2C2418] border-2 border-[#2C2418] rounded-lg hover:bg-[#2C2418] hover:text-[#FDF8F3] transition-all duration-300"
                    style={{ fontFamily: "var(--font-caveat)", fontWeight: 500 }}
                >
                     Take the journey
                </Link>
            </motion.section>
        </div>
    );
}
