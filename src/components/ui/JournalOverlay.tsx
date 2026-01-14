'use client';

import { about, contact, experience, skills } from '@/content';
import { projects } from '@/content/projects';

interface JournalOverlayProps {
    isOpen: boolean;
    currentPage: number;
    onClose: () => void;
    onPageChange: (page: number) => void;
}

export default function JournalOverlay({
    isOpen,
    currentPage,
    onClose,
    onPageChange,
}: JournalOverlayProps) {
    if (!isOpen) return null;

    const totalPages = 8;

    const renderPageContent = () => {
        switch (currentPage) {
            case 0:
                return (
                    <div className="text-center">
                        <h1 className="text-4xl font-serif text-[#3E2723] mb-6">
                            My Journal
                        </h1>
                        <p className="text-[#5D4037] italic">
                            A collection of thoughts, projects, and experiences
                        </p>
                        <div className="mt-8 text-sm text-[#8D6E63]">
                            — Pranav Ray —
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-serif text-[#3E2723] mb-4 border-b border-[#D7CCC8] pb-2">
                            About Me
                        </h2>
                        <p className="text-[#5D4037] leading-relaxed mb-4">
                            {about.intro}
                        </p>
                        <p className="text-[#5D4037] leading-relaxed mb-4">
                            {about.passion}
                        </p>
                        <p className="text-[#6D4C41] text-sm italic">
                            {about.currentFocus}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {about.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="px-3 py-1 bg-[#EFEBE9] text-[#5D4037] text-xs rounded-full"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                );

            case 2:
            case 3:
            case 4: {
                const projectIndex = currentPage - 2;
                const project = projects[projectIndex];
                if (!project) {
                    return (
                        <div className="text-center text-[#8D6E63]">
                            More projects coming soon...
                        </div>
                    );
                }
                return (
                    <div>
                        <h2 className="text-2xl font-serif text-[#3E2723] mb-2">
                            {project.title}
                        </h2>
                        <p className="text-xs text-[#8D6E63] mb-4">{project.category}</p>
                        <p className="text-[#5D4037] leading-relaxed mb-4">
                            {project.longDescription}
                        </p>
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-[#4E342E] mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-[#D7CCC8] text-[#3E2723] text-xs rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#6D4C41] text-sm underline hover:text-[#3E2723]"
                            >
                                View on GitHub →
                            </a>
                        )}
                    </div>
                );
            }

            case 5: {
                const groupedSkills = skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                }, {} as Record<string, typeof skills>);

                return (
                    <div>
                        <h2 className="text-2xl font-serif text-[#3E2723] mb-4 border-b border-[#D7CCC8] pb-2">
                            Skills
                        </h2>
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} className="mb-4">
                                <h4 className="text-sm font-medium text-[#6D4C41] capitalize mb-2">
                                    {category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {categorySkills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="px-3 py-1 bg-[#EFEBE9] text-[#5D4037] text-xs rounded-full"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }

            case 6:
                return (
                    <div>
                        <h2 className="text-2xl font-serif text-[#3E2723] mb-4 border-b border-[#D7CCC8] pb-2">
                            Experience
                        </h2>
                        {experience.map((exp) => (
                            <div key={exp.id} className="mb-6">
                                <h3 className="text-lg font-medium text-[#4E342E]">
                                    {exp.role}
                                </h3>
                                <p className="text-sm text-[#8D6E63]">
                                    {exp.company} • {exp.duration}
                                </p>
                                <p className="text-[#5D4037] text-sm mt-2">
                                    {exp.description}
                                </p>
                                <ul className="mt-2 text-xs text-[#6D4C41] list-disc list-inside">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );

            case 7:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-serif text-[#3E2723] mb-6">
                            Let&apos;s Connect
                        </h2>
                        <p className="text-[#5D4037] mb-6">
                            I&apos;m always open to new opportunities and collaborations.
                        </p>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${contact.email}`}
                                className="block text-[#6D4C41] hover:text-[#3E2723]"
                            >
                                ✉️ {contact.email}
                            </a>
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#6D4C41] hover:text-[#3E2723]"
                            >
                                GitHub →
                            </a>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#6D4C41] hover:text-[#3E2723]"
                            >
                                LinkedIn →
                            </a>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
                className="w-[500px] h-[600px] bg-[#FFF8E7] rounded-lg shadow-2xl p-8 pointer-events-auto overflow-auto"
                style={{
                    backgroundImage: 'url(/paper-texture.png)',
                    backgroundBlendMode: 'soft-light',
                    animation: 'fadeIn 0.5s ease-out forwards',
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#3E2723] transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="h-full flex flex-col justify-between">
                    <div className="flex-1 overflow-auto">
                        {renderPageContent()}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#D7CCC8] mt-4">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="px-4 py-2 text-sm text-[#6D4C41] hover:text-[#3E2723] disabled:text-[#BCAAA4] disabled:cursor-not-allowed transition-colors"
                        >
                            ← Previous
                        </button>
                        <span className="text-sm text-[#8D6E63]">
                            {currentPage + 1} / {totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 text-sm text-[#6D4C41] hover:text-[#3E2723] disabled:text-[#BCAAA4] disabled:cursor-not-allowed transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
