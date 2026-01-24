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
    SiSwift,
    SiTailwindcss,
    SiTypescript
} from 'react-icons/si';

const ZustandIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="7" cy="6" r="3" />
        <circle cx="17" cy="6" r="3" />
        <circle cx="12" cy="14" r="8" />
        <circle cx="9" cy="13" r="1.2" fill="white" />
        <circle cx="15" cy="13" r="1.2" fill="white" />
        <path d="M9 17q3 2 6 0" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

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
    { name: 'Zustand', icon: ZustandIcon },
    { name: 'Postman', icon: SiPostman },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'shadcn', icon: SiShadcnui },
    { name: 'Motion', icon: SiFramer },
    { name: 'GSAP', icon: SiGreensock },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Python', icon: SiPython },
    { name: 'Swift', icon: SiSwift },
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
