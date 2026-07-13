import { motion } from 'framer-motion';
import type { Planet } from '../types';

interface Props { planet: Planet; size?: number; animate?: boolean; className?: string }

function seededValues(seed: number, count: number) {
  let state = seed;
  return Array.from({ length: count }, () => { state = Math.imul(state ^ (state >>> 15), 1 | state); return ((state ^ (state >>> 13)) >>> 0) / 4294967296; });
}

export function PlanetRenderer({ planet, size = 220, animate = true, className = '' }: Props) {
  const { traits } = planet;
  const v = seededValues(planet.seed, 40);
  const gid = `p${String(planet.seed).replace('-', 'n')}`;
  const radius = 62;
  const texture = traits.pattern === 'bands'
    ? Array.from({ length: 5 }, (_, i) => <path key={i} d={`M35 ${55 + i * 13} Q100 ${45 + i * 15 + v[i] * 10} 165 ${57 + i * 12}`} fill="none" stroke={traits.palette[(i + 1) % 3]} strokeWidth={5 + v[i] * 7} opacity=".42" />)
    : traits.pattern === 'craters'
      ? Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={48 + v[i] * 100} cy={48 + v[i + 8] * 102} rx={4 + v[i + 16] * 8} ry={3 + v[i + 20] * 5} fill="#070918" opacity=".22" />)
      : traits.pattern === 'spots'
        ? Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={42 + v[i] * 115} cy={42 + v[i + 10] * 115} rx={3 + v[i + 19] * 9} ry={3 + v[i + 25] * 6} fill={traits.palette[(i + 1) % 3]} opacity=".44" />)
        : Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${38 + v[i] * 90} ${42 + v[i + 5] * 80} q${12 + v[i + 10] * 15} ${-9 + v[i + 15] * 20} ${20 + v[i + 20] * 15} ${5 + v[i + 25] * 14} q-8 16-27 13z`} fill={traits.palette[(i + 1) % 3]} opacity=".38" />);
  return (
    <motion.div className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }} initial={animate ? { scale: .8, opacity: 0 } : false} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, type: 'spring' }}>
      <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={`${planet.name}, a ${planet.rarity.toLowerCase()} planet`}>
        <defs>
          <radialGradient id={`${gid}-surface`} cx="32%" cy="27%">
            <stop offset="0" stopColor={traits.palette[2]} /><stop offset=".48" stopColor={traits.palette[1]} /><stop offset="1" stopColor={traits.palette[0]} />
          </radialGradient>
          <radialGradient id={`${gid}-shine`} cx="38%" cy="30%"><stop offset="0" stopColor="white" stopOpacity=".46" /><stop offset=".42" stopColor="white" stopOpacity="0" /></radialGradient>
          <clipPath id={`${gid}-clip`}><circle cx="100" cy="100" r={radius} /></clipPath>
          <filter id={`${gid}-glow`}><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        {traits.atmosphere && <circle cx="100" cy="100" r="69" fill={traits.palette[2]} opacity=".19" filter={`url(#${gid}-glow)`} />}
        {traits.rings && <g transform={`rotate(${-16 + v[32] * 28} 100 100)`}><ellipse cx="100" cy="100" rx="91" ry="24" fill="none" stroke={traits.palette[2]} strokeWidth="8" opacity=".3" /><ellipse cx="100" cy="100" rx="91" ry="24" fill="none" stroke="#fff" strokeWidth="2" opacity=".36" /></g>}
        <g clipPath={`url(#${gid}-clip)`}>
          <motion.g animate={animate ? { rotate: 360 } : undefined} transition={{ duration: traits.rotationSpeed * 4, ease: 'linear', repeat: Infinity }} style={{ transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r={radius} fill={`url(#${gid}-surface)`} />{texture}
            {traits.vegetation && <path d="M42 92q18-23 35-7t29 2q18-17 51 4v22q-26-8-44 8t-36-1q-14-14-34 1z" fill="#80c78d" opacity=".35" />}
            {traits.aurora && <path d="M47 82q52-36 106 4" fill="none" stroke="#baffed" strokeWidth="5" opacity=".58" />}
          </motion.g>
          <circle cx="100" cy="100" r={radius} fill={`url(#${gid}-shine)`} />
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#fff" opacity=".12" strokeWidth="2" />
        </g>
        {Array.from({ length: traits.moons }, (_, i) => { const x = i ? 166 : 35; const y = i ? 58 : 145; return <g key={i}><circle cx={x} cy={y} r={5 + i * 2} fill={traits.palette[2]} /><circle cx={x - 1.5} cy={y - 1.5} r="1.5" fill="white" opacity=".5" /></g>; })}
      </svg>
    </motion.div>
  );
}
