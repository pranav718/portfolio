'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  bannerGradient?: string;
  githubUrl?: string;
  liveUrl?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags = [],
  bannerGradient = 'linear-gradient(135deg, #fdfbf7, #e8e0cc)',
  githubUrl,
  liveUrl,
  index = 0
}: ProjectCardProps) {
  return (
    <motion.div
      className="bg-white/40 border border-[#2c2416]/15 rounded-lg overflow-hidden transition-all duration-300 relative hover:bg-white/80 hover:shadow-soft hover:border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="h-[140px] relative overflow-hidden border-b border-[#2c2416]/8" style={{ background: bannerGradient }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2c2416_1px,transparent_1px)] bg-[length:10px_10px]" />
      </div>

      <div className="p-5">
        <h3 className="font-mono text-[1.1rem] font-bold mb-2 text-text">{title}</h3>
        <p className="font-mono text-[0.85rem] text-text-dim leading-relaxed mb-4 line-clamp-3">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map(tag => (
              <span key={tag} className="text-[0.7rem] px-2 py-[2px] bg-[#2c2416]/5 rounded text-text-dim font-mono">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] px-3 py-[6px] rounded no-underline transition-all duration-200 font-mono bg-transparent text-text border border-[#2c2416]/20 hover:bg-[#2c2416]/5 hover:border-text"
            >
              github
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] px-3 py-[6px] rounded no-underline transition-all duration-200 font-mono bg-[#2c2416] text-[#0a0a0a] border border-text hover:bg-[#2c2416]/80 hover:shadow-sm"
            >
              live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
