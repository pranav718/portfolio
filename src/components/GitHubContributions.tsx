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
    <div className="github-contributions">
      <div className="graph-container">
        <div className="graph-grid">
          {contributions.map((level, i) => (
            <motion.div
              key={i}
              className="contribution-cell"
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

      <div className="contribution-legend">
        <span>less</span>
        {contributionLevels.map((color, i) => (
          <div key={i} className="legend-cell" style={{ backgroundColor: color }} />
        ))}
        <span>more</span>
      </div>

      <style jsx>{`
        .github-contributions {
          padding: 1.5rem;
          border: 1px solid rgba(44, 36, 22, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.3);
          position: relative;
        }
        
        /* Sketchy border effect */
        .github-contributions::before {
          content: '';
          position: absolute;
          inset: -2px;
          border: 1px solid rgba(44, 36, 22, 0.1);
          border-radius: 9px;
          pointer-events: none;
          transform: rotate(0.5deg);
        }

        .graph-container {
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        .graph-grid {
          display: grid;
          grid-template-rows: repeat(7, 10px);
          grid-auto-flow: column;
          gap: 3px;
          width: fit-content;
        }

        .contribution-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid rgba(44, 36, 22, 0.1);
        }

        .contribution-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--color-text-dim);
          font-family: 'JetBrains Mono', monospace;
        }

        .legend-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid rgba(44, 36, 22, 0.1);
        }
      `}</style>
    </div>
  );
}
