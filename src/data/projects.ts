import { Project } from '@/components/ProjectCard';

export const projects: Project[] = [
    {
        id: 'portfolio-v2',
        title: 'Portfolio v2',
        description: 'An immersive 3D desk portfolio experience with interactive elements and transitions.',
        techStack: ['Next.js', 'Three.js', 'Framer Motion'],
        status: 'Live',
        githubUrl: 'https://github.com/pranav718/portfolio',
        liveUrl: '#',
        gradient: 'from-purple-600/30 via-blue-500/20 to-cyan-400/30',
        hoverGlow: 'hover:shadow-purple-500/10',
    },
    {
        id: 'algo-visualizer',
        title: 'AlgoVisualizer',
        description: 'Interactive visualization tool for popular algorithms and data structures.',
        techStack: ['React', 'TypeScript', 'Algorithms'],
        status: 'In Progress',
        githubUrl: 'https://github.com/pranav718',
        gradient: 'from-blue-600/30 via-indigo-500/20 to-violet-400/30',
        hoverGlow: 'hover:shadow-blue-500/10',
    },
    {
        id: 'chess-engine',
        title: 'Chess Engine',
        description: 'A chess engine with AI opponent using minimax algorithm with alpha-beta pruning.',
        techStack: ['Python', 'AI', 'Chess'],
        status: 'Open Source',
        githubUrl: 'https://github.com/pranav718/chess-engine',
        gradient: 'from-amber-600/30 via-orange-500/20 to-red-400/30',
        hoverGlow: 'hover:shadow-amber-500/10',
    },
];
