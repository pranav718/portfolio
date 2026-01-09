import { Project } from '@/types';

export const projects: Project[] = [
    {
        id: 'portfolio-v2',
        title: 'Portfolio v2',
        description: 'Immersive 3D portfolio with interactive desk scene',
        longDescription: 'A unique portfolio experience featuring a 3D desk environment where visitors interact with a physical journal to explore my work. Built with Three.js, React Three Fiber, and Next.js.',
        problem: 'Traditional portfolios feel static and forgettable',
        solution: 'Created an immersive 3D experience that makes exploring a portfolio feel like discovering a personal journal',
        techStack: ['Next.js', 'Three.js', 'React Three Fiber', 'TypeScript', 'GSAP'],
        images: ['/images/projects/portfolio.png'],
        githubUrl: 'https://github.com/pranavray/portfolio',
        featured: true,
        category: 'Web Development',
        date: '2024-01',
        challenges: ['Rendering HTML content as 3D textures', 'Smooth page-turn animations', 'Performance optimization'],
        learnings: ['Advanced Three.js techniques', 'Post-processing effects', 'Audio integration']
    },
    {
        id: 'algo-visualizer',
        title: 'AlgoVisualizer',
        description: 'Interactive algorithm visualization tool',
        longDescription: 'A tool for visualizing sorting and pathfinding algorithms, helping students understand complex logic through animation.',
        problem: 'Algorithm concepts are hard to grasp from code alone',
        solution: 'Built an interactive visualizer that animates each step of algorithm execution',
        techStack: ['React', 'TypeScript', 'Algorithms'],
        images: ['/images/projects/algo-viz.png'],
        githubUrl: 'https://github.com/pranavray/algo-visualizer',
        liveUrl: 'https://algo-viz.demo',
        featured: true,
        category: 'Education',
        date: '2023-08',
        challenges: ['Animating recursive algorithms', 'Handling large datasets'],
        learnings: ['Algorithm optimization', 'React performance patterns']
    },
    {
        id: 'chess-engine',
        title: 'Chess Engine',
        description: 'Python chess engine with AI opponent',
        longDescription: 'A chess engine capable of playing at ~1500 ELO level using minimax algorithm with alpha-beta pruning.',
        problem: 'Wanted to understand game theory and AI decision making',
        solution: 'Implemented a chess engine from scratch with position evaluation and move optimization',
        techStack: ['Python', 'AI', 'Chess'],
        images: ['/images/projects/chess.png'],
        githubUrl: 'https://github.com/pranavray/chess-engine',
        featured: false,
        category: 'AI/Games',
        date: '2023-05'
    }
];
