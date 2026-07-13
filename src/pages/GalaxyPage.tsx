import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Eye, Orbit, Plus, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlanetDetails } from '../components/PlanetDetails';
import { PlanetRenderer } from '../components/PlanetRenderer';
import type { FocusSession } from '../types';

export function GalaxyPage({ sessions, demo = false, onDelete, onSaveNote }: { sessions: FocusSession[]; demo?: boolean; onDelete?: (id: string) => void; onSaveNote?: (id: string, note: string) => void }) {
  const [selected, setSelected] = useState<FocusSession | null>(null);
  const visible = sessions.slice(0, 12);
  const orbits = useMemo(() => visible.map((session, index) => ({ session, radius: 115 + (index % 6) * 58, duration: 35 + index * 7, angle: (index * 137.5) % 360, size: Math.min(76, 42 + session.planet.traits.size * .18) })), [visible]);
  if (!sessions.length) return <section className="page-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-14"><div className="glass-card max-w-xl p-10 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-dashed border-mint/40 bg-mint/5"><Orbit className="text-mint" size={34} /></div><h1 className="mt-6 font-display text-3xl font-bold">Your sky is waiting</h1><p className="mt-3 leading-7 text-slate-400">Complete a focus session and your first planet will appear here. Every world keeps the memory of what you accomplished.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/focus" className="button"><Plus size={17} />Create first planet</Link><Link to="/demo" className="button button-secondary"><Eye size={17} />Explore demo</Link></div></div></section>;
  return <section className="page-shell min-h-[calc(100vh-72px)] py-10">
    <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{demo ? 'Sample universe' : 'Your living universe'}</p><h1 className="section-title mt-3">{demo ? 'The demo galaxy' : 'My orbit garden'}</h1><p className="mt-2 text-slate-400">{sessions.length} {sessions.length === 1 ? 'world' : 'worlds'} in orbit · select any planet to revisit its story</p></div>{demo ? <Link className="button button-secondary" to="/galaxy">Return to my garden <ArrowRight size={17} /></Link> : <Link className="button" to="/focus"><Plus size={17} />Grow another world</Link>}</div>
      {demo && <div className="mt-7 flex items-start gap-3 rounded-2xl border border-violet/20 bg-violet/10 px-5 py-4 text-sm text-[#dedaff]"><Sparkles className="mt-0.5 shrink-0" size={17} /><p>This is a prebuilt sample galaxy. Explore freely—nothing here changes your personal garden.</p></div>}
      <div className="galaxy-stage mt-8 hidden min-h-[690px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#050712]/70 lg:block">
        <div className="galaxy-center"><div className="sun"><span /></div>{orbits.map(({ session, radius, duration, angle, size }) => <motion.div key={session.id} className="galaxy-orbit" style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }} initial={{ rotate: angle }} animate={{ rotate: angle + 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }}><button className="orbiting-planet focus-ring" style={{ width: size, height: size, marginLeft: -size / 2, top: -size / 2 }} onClick={() => setSelected(session)} aria-label={`Open ${session.planet.name}`}><motion.span className="block" initial={{ rotate: -angle }} animate={{ rotate: -(angle + 360) }} transition={{ duration, repeat: Infinity, ease: 'linear' }}><PlanetRenderer planet={session.planet} size={size} animate={false} /></motion.span></button></motion.div>)}</div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden sm:grid-cols-3">{sessions.map((session) => <button key={session.id} className="glass-card focus-ring flex flex-col items-center p-3 text-center" onClick={() => setSelected(session)}><PlanetRenderer planet={session.planet} size={120} /><strong className="mt-1 text-sm">{session.planet.name}</strong><span className="mt-1 text-xs text-slate-500">{session.planet.rarity}</span></button>)}</div>
      {sessions.length > 12 && <p className="mt-5 text-center text-sm text-slate-500">Showing your 12 newest worlds in orbit. All {sessions.length} remain saved in your history.</p>}
    </div>
    <AnimatePresence>{selected && <PlanetDetails session={selected} demo={demo} onClose={() => setSelected(null)} onDelete={!demo && onDelete ? () => { onDelete(selected.id); setSelected(null); } : undefined} onSaveNote={!demo && onSaveNote ? (note) => onSaveNote(selected.id, note) : undefined} />}</AnimatePresence>
  </section>;
}
