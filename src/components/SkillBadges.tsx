'use client';

import {
    SiBun,
    SiCplusplus,
    SiDocker,
    SiExpress,
    SiFigma,
    SiFramer,
    SiGit,
    SiGithub,
    SiGreensock,
    SiJavascript,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiPython,
    SiReact,
    SiRedis,
    SiShadcnui,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si';

const skills = [
    { name: 'React', icon: SiReact },
    { name: 'Next', icon: SiNextdotjs },
    { name: 'Express', icon: SiExpress },
    { name: 'Node', icon: SiNodedotjs },
    { name: 'Bun', icon: SiBun },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Redis', icon: SiRedis },
    { name: 'Prisma', icon: SiPrisma },
    { name: 'Zustand', icon: SiReact }, 
    { name: 'Postman', icon: SiPostman },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'shadcn', icon: SiShadcnui },
    { name: 'Motion', icon: SiFramer },
    { name: 'GSAP', icon: SiGreensock },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Python', icon: SiPython },
    { name: 'C/C++', icon: SiCplusplus },
    { name: 'SQL', icon: SiMysql },
    { name: 'Git', icon: SiGit },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Figma', icon: SiFigma },
    { name: 'Docker', icon: SiDocker },
];

export default function SkillBadges() {
    return (
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                    <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors"
                    >
                        <Icon className="w-3 h-3" />
                        {skill.name}
                    </span>
                );
            })}
        </div>
    );
}
