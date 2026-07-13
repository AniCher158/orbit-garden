import { Calendar, Clock, Save, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PlanetRenderer } from './PlanetRenderer';
import type { FocusSession } from '../types';

export function PlanetDetails({ session, demo, onClose, onDelete, onSaveNote }: { session: FocusSession; demo?: boolean; onClose: () => void; onDelete?: () => void; onSaveNote?: (note: string) => void }) {
  const [note, setNote] = useState(session.planet.note ?? '');
  return <motion.div className="fixed inset-0 z-[70] flex justify-end bg-ink/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
    <motion.aside className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0c1023] p-6 shadow-2xl" initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: 'spring', damping: 28 }} onClick={(e) => e.stopPropagation()} aria-label={`${session.planet.name} details`}>
      <div className="flex items-center justify-between"><span className="eyebrow">Planet record</span><button onClick={onClose} className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Close planet details"><X /></button></div>
      <div className="mt-3 flex justify-center"><PlanetRenderer planet={session.planet} size={260} /></div>
      <h2 className="font-display text-3xl font-bold">{session.planet.name}</h2><div className="mt-3 flex items-center gap-2"><span className={`rarity rarity-${session.planet.rarity.toLowerCase()}`}>{session.planet.rarity}</span><span className="text-sm text-slate-500">{session.category}</span></div>
      <div className="mt-7 rounded-2xl border border-white/10 bg-white/[.03] p-5"><span className="text-xs uppercase tracking-widest text-slate-500">Mission completed</span><p className="mt-2 text-lg font-semibold">{session.taskName}</p><div className="mt-4 flex gap-5 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><Clock size={15} />{demo ? 'Sample' : `${session.durationMinutes} min`}</span><span className="inline-flex items-center gap-2"><Calendar size={15} />{new Date(session.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></div></div>
      <div className="mt-6"><h3 className="font-semibold">Planet traits</h3><div className="mt-3 flex flex-wrap gap-2">{[session.planet.traits.pattern, session.planet.traits.rings && 'rings', session.planet.traits.atmosphere && 'glowing atmosphere', session.planet.traits.aurora && 'aurora', session.planet.traits.vegetation && 'vegetation', `${session.planet.traits.moons} moon${session.planet.traits.moons === 1 ? '' : 's'}`].filter(Boolean).map((trait) => <span className="trait" key={String(trait)}>{trait}</span>)}</div></div>
      {!demo && <div className="mt-7"><label htmlFor="planet-note" className="field-label">Memory note</label><textarea id="planet-note" className="input mt-2 min-h-24 resize-none" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What made this session meaningful?" maxLength={240} /><button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-mint hover:text-white" onClick={() => onSaveNote?.(note)}><Save size={15} />Save note</button></div>}
      {onDelete && <button className="mt-10 inline-flex items-center gap-2 text-sm text-coral hover:text-red-300" onClick={() => { if (window.confirm(`Remove ${session.planet.name} from your garden? This cannot be undone.`)) onDelete(); }}><Trash2 size={16} />Delete planet & session</button>}
    </motion.aside>
  </motion.div>;
}
