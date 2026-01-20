'use client';


export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    status: 'Live' | 'In Progress' | 'Open Source';
    githubUrl?: string;
    liveUrl?: string;
    gradient: string;
    hoverGlow: string;
}

interface ProjectCardProps {
    project: Project;
    compact?: boolean;
}

const statusStyles = {
    'Live': {
        bg: 'bg-green-500/90',
        pulse: true,
    },
    'In Progress': {
        bg: 'bg-blue-500/90',
        pulse: false,
    },
    'Open Source': {
        bg: 'bg-purple-500/90',
        pulse: false,
    },
};

const hoverColors = {
    'Live': 'group-hover:text-green-300',
    'In Progress': 'group-hover:text-blue-300',
    'Open Source': 'group-hover:text-purple-300',
};

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
    const statusStyle = statusStyles[project.status];
    const hoverColor = hoverColors[project.status];

    return (
        <div className={`group rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${project.hoverGlow}`}>
            <div className={`relative ${compact ? 'h-36' : 'h-40'} overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <span className="text-white/30 text-sm">Preview</span>
                </div>
                <span className={`absolute top-3 right-3 text-xs px-2 py-1 ${statusStyle.bg} text-white rounded font-medium flex items-center gap-1`}>
                    {statusStyle.pulse && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                    {project.status}
                </span>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium text-white ${hoverColor} transition-colors`}>{project.title}</p>
                    <div className="flex items-center gap-2">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        )}
                    </div>
                </div>
                <p className="text-sm text-white/50 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
