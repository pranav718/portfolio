'use client';

import { motion } from 'framer-motion';

const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 365; i++) {
    const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
    data.push(level);
  }
  return data;
};

const contributionLevels = [
  'transparent',
  'rgba(44, 36, 22, 0.1)',
  'rgba(44, 36, 22, 0.3)',
  'rgba(44, 36, 22, 0.5)',
  'rgba(44, 36, 22, 0.8)',
];

export default function GitHubContributions() {
  const contributions = generateMockData();

  return (
    <div className="p-6 border border-[#2c2416]/20 rounded-lg bg-white/30 relative before:content-[''] before:absolute before:-inset-[2px] before:border before:border-[#2c2416]/10 before:rounded-[9px] before:pointer-events-none before:rotate-[0.5deg]">
      <div className="overflow-x-auto mb-4">
        <div className="grid grid-rows-[repeat(7,10px)] grid-flow-col gap-[3px] w-fit">
          {contributions.map((level, i) => (
            <motion.div
              key={i}
              className="w-[10px] h-[10px] rounded-[2px] border border-[#2c2416]/10"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.002, duration: 0.2 }}
              style={{ backgroundColor: contributionLevels[level] }}
              whileHover={{ scale: 1.5, borderColor: 'var(--color-bulb-warm)' }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 text-xs text-text-dim font-mono">
        <span>less</span>
        {contributionLevels.map((color, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-[2px] border border-[#2c2416]/10" style={{ backgroundColor: color }} />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}
