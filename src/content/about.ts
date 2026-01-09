import { AboutContent, ContactInfo, Experience, Skill } from '@/types';

export const about: AboutContent = {
    intro: "I'm Pranav, a 19-year-old fullstack developer passionate about building beautiful, interactive web experiences.",
    passion: "I love turning complex problems into elegant solutions, and I'm especially drawn to creative coding, 3D graphics, and building tools that make developers' lives easier.",
    currentFocus: "Currently pursuing Computer Science at MUJ while working on personal projects and contributing to open source.",
    interests: ['Algorithm design', 'Chess', 'Creative coding', '3D graphics', 'Open source'],
    photo: '/images/profile.jpg'
};

export const contact: ContactInfo = {
    email: 'hello@pranav.dev',
    linkedin: 'https://linkedin.com/in/pranavray',
    github: 'https://github.com/pranavray',
    twitter: 'https://twitter.com/pranavray'
};

export const skills: Skill[] = [
    { name: 'React', category: 'frontend', proficiency: 9 },
    { name: 'Next.js', category: 'frontend', proficiency: 8 },
    { name: 'TypeScript', category: 'frontend', proficiency: 8 },
    { name: 'Three.js', category: 'frontend', proficiency: 7 },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 9 },
    { name: 'Framer Motion', category: 'frontend', proficiency: 7 },

    { name: 'Node.js', category: 'backend', proficiency: 8 },
    { name: 'Python', category: 'backend', proficiency: 8 },
    { name: 'PostgreSQL', category: 'backend', proficiency: 7 },
    { name: 'MongoDB', category: 'backend', proficiency: 6 },

    { name: 'Git', category: 'tools', proficiency: 9 },
    { name: 'Docker', category: 'tools', proficiency: 6 },
    { name: 'Figma', category: 'tools', proficiency: 7 },
    { name: 'VS Code', category: 'tools', proficiency: 9 }
];

export const experience: Experience[] = [
    {
        id: 'exp-1',
        company: 'Open Source',
        role: 'Contributor',
        duration: '2023 - Present',
        startDate: '2023-01',
        endDate: 'Present',
        description: 'Contributing to various open source projects, focusing on frontend improvements and bug fixes.',
        achievements: [
            'Contributed to RUXAILAB project',
            'Fixed mobile navigation issues',
            'Added unit tests for controllers'
        ],
        technologies: ['Vue.js', 'JavaScript', 'Testing']
    }
];
