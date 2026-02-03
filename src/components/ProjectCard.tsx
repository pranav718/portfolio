'use client';


export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    status: 'Live' | 'In Progress' | 'Open Source';
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    videoUrl?: string;
    postUrl?: string;
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


export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
    const statusStyle = statusStyles[project.status];
    const cardLink = `/portfolio/projects/${project.id}?from=${compact ? 'projects' : 'home'}`;

    return (
        <a href={cardLink} className="group block rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className={`relative ${compact ? 'h-36' : 'h-40'} overflow-hidden`}>
                {project.image ? (
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                        <span className="text-white/30 text-sm">Preview</span>
                    </div>
                )}
                <span className={`absolute top-3 right-3 text-xs px-2 py-1 ${statusStyle.bg} text-white rounded font-medium flex items-center gap-1`}>
                    {statusStyle.pulse && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                    {project.status}
                </span>
            </div>
            <div className="p-4">
                <div className="mb-2">
                    <p className="project-title font-medium text-white/90 group-hover:text-white">{project.title}</p>
                </div>
                <p className="text-sm text-white/50 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded border border-white/10">{tech}</span>
                    ))}
                </div>
            </div>
        </a>
    );
}
