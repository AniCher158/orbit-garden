import { ArrowLeft, Check, ChevronDown, Pause, Play, RotateCcw, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanetRenderer } from '../components/PlanetRenderer';
import { ProgressRing } from '../components/ProgressRing';
import { generatePlanet } from '../lib/planetGenerator';
import { loadTimer, saveTimer } from '../lib/storage';
import { categories, type ActiveTimerState, type Category, type FocusSession, type Planet } from '../types';

const categoryCopy: Record<Category, string> = { School: 'Learn & study', Coding: 'Build & debug', Reading: 'Read & reflect', Creative: 'Make & imagine', Exercise: 'Move & recharge', Personal: 'Reset & tend' };
const presets = [5, 15, 25, 45, 60];

export function FocusPage({ onComplete }: { onComplete: (session: FocusSession) => void }) {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState<Category>('School');
  const [minutes, setMinutes] = useState(25);
  const [custom, setCustom] = useState('');
  const [timer, setTimer] = useState<ActiveTimerState | null>(() => loadTimer());
  const [revealed, setRevealed] = useState<{ session: FocusSession; planet: Planet } | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => saveTimer(timer), [timer]);
  useEffect(() => {
    if (!timer || timer.isPaused) return;
    const tick = () => setTimer((current) => {
      if (!current || current.isPaused || !current.endTime) return current;
      const remainingSeconds = Math.max(0, Math.ceil((current.endTime - Date.now()) / 1000));
      if (remainingSeconds > 0) return { ...current, remainingSeconds };
      const completedAt = new Date().toISOString();
      const sessionBase = { taskName: current.taskName, category: current.category, durationMinutes: current.durationMinutes, completedAt };
      const planet = generatePlanet(sessionBase);
      const session: FocusSession = { id: `session-${planet.seed}`, ...sessionBase, planet, demo: current.isDemo };
      setRevealed({ session, planet });
      return null;
    });
    tick(); const interval = window.setInterval(tick, 250); return () => window.clearInterval(interval);
  }, [timer]);

  const start = (demo = false) => {
    const chosenMinutes = custom ? Math.min(180, Math.max(1, Number(custom))) : minutes;
    const totalSeconds = demo ? 10 : chosenMinutes * 60;
    setTimer({ taskName: taskName.trim() || (demo ? 'Demo mission' : 'A quiet focus session'), category, durationMinutes: chosenMinutes, totalSeconds, remainingSeconds: totalSeconds, isPaused: false, endTime: Date.now() + totalSeconds * 1000, isDemo: demo });
  };
  const togglePause = () => setTimer((current) => current ? current.isPaused ? { ...current, isPaused: false, endTime: Date.now() + current.remainingSeconds * 1000 } : { ...current, isPaused: true, endTime: null } : current);
  const cancel = () => { if (window.confirm('Cancel this focus session? Your progress will not create a planet.')) setTimer(null); };
  const addPlanet = () => { if (revealed && !added) { onComplete(revealed.session); setAdded(true); } };
  const time = timer ? `${String(Math.floor(timer.remainingSeconds / 60)).padStart(2, '0')}:${String(timer.remainingSeconds % 60).padStart(2, '0')}` : '';
  const progress = timer ? 1 - timer.remainingSeconds / timer.totalSeconds : 0;

  if (revealed) return <section className="page-shell flex min-h-[calc(100vh-72px)] items-center py-12"><motion.div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="relative flex justify-center"><div className="reveal-rays" /><PlanetRenderer planet={revealed.planet} size={360} /></div>
    <div><p className="eyebrow"><Sparkles size={14} />New world discovered</p><h1 className="mt-4 font-display text-5xl font-bold tracking-tight">{revealed.planet.name}</h1><span className={`rarity rarity-${revealed.planet.rarity.toLowerCase()} mt-4 inline-flex`}>{revealed.planet.rarity}</span>
      <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">Your focus became a world with its own atmosphere and story. It will always look exactly this way.</p>
      <div className="mt-7 grid grid-cols-2 gap-3">{[['Mission', revealed.session.taskName], ['Time', revealed.session.demo ? '10 sec demo' : `${revealed.session.durationMinutes} minutes`], ['Surface', revealed.planet.traits.pattern], ['Special', [revealed.planet.traits.rings && 'rings', revealed.planet.traits.aurora && 'aurora', revealed.planet.traits.vegetation && 'flora', `${revealed.planet.traits.moons} moon${revealed.planet.traits.moons === 1 ? '' : 's'}`].filter(Boolean).join(' · ')]].map(([label, value]) => <div className="mini-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      {revealed.session.demo && <p className="mt-4 rounded-xl border border-violet/25 bg-violet/10 p-3 text-sm text-[#dedaff]">Demo planets are for practice and won’t change your real progress.</p>}
      <div className="mt-8 flex flex-wrap gap-3"><button className="button" onClick={addPlanet} disabled={added}>{added ? <><Check size={18} />Added to garden</> : 'Add to my galaxy'}</button><button className="button button-secondary" onClick={() => { addPlanet(); navigate('/galaxy'); }}>View solar system</button></div>
    </div>
  </motion.div></section>;

  if (timer) return <section className="page-shell flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-12 text-center">
    <button onClick={cancel} className="focus-ring absolute left-5 top-24 inline-flex items-center gap-2 rounded-xl p-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={17} />End session</button>
    <p className="eyebrow">{timer.isDemo ? 'Demo session' : 'Focus in progress'}</p><h1 className="mt-5 font-display text-2xl font-bold">{timer.taskName}</h1><p className="mt-2 text-sm text-slate-400">{timer.category} · {categoryCopy[timer.category]}</p>
    <div className="mt-8"><ProgressRing progress={progress}><div className="timer-planet"><div className="timer-planet-core" /><div className="timer-orbit"><i /></div></div><div className="absolute"><span className="font-display text-5xl font-bold tabular-nums tracking-tight sm:text-6xl">{time}</span><p className="mt-2 text-xs uppercase tracking-[.25em] text-slate-500">remaining</p></div></ProgressRing></div>
    <p className="mt-5 text-slate-400">{timer.isPaused ? 'Your orbit is resting. Resume whenever you’re ready.' : 'Stay with the moment. Your new world is taking shape.'}</p>
    <div className="mt-8 flex gap-3"><button className="button" onClick={togglePause}>{timer.isPaused ? <><Play size={18} fill="currentColor" />Resume</> : <><Pause size={18} fill="currentColor" />Pause</>}</button><button className="button button-secondary" onClick={cancel}><X size={18} />Cancel</button></div>
  </section>;

  return <section className="page-shell py-14"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="eyebrow mx-auto w-fit">Create your next world</p><h1 className="section-title mt-5">What will you focus on?</h1><p className="mt-3 text-slate-400">Choose a mission that feels achievable right now.</p></div>
    <div className="glass-card mt-10 p-5 sm:p-8">
      <label className="field-label" htmlFor="task">Your mission</label><input id="task" className="input mt-2" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="e.g. Finish science notes" maxLength={80} />
      <fieldset className="mt-7"><legend className="field-label">Category</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{categories.map((item) => <button type="button" key={item} className={`choice ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}><span>{item}</span><small>{categoryCopy[item]}</small></button>)}</div></fieldset>
      <fieldset className="mt-7"><legend className="field-label">Focus length</legend><div className="mt-3 grid grid-cols-5 gap-2">{presets.map((value) => <button type="button" key={value} className={`duration ${minutes === value && !custom ? 'selected' : ''}`} onClick={() => { setMinutes(value); setCustom(''); }}><strong>{value}</strong><small>min</small></button>)}</div>
        <label className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400">Custom <input aria-label="Custom duration in minutes" type="number" min="1" max="180" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="minutes" className="ml-auto w-24 bg-transparent text-right text-white outline-none" /><ChevronDown size={16} /></label>
      </fieldset>
      <button className="button mt-8 w-full justify-center py-4" onClick={() => start(false)}><Play size={18} fill="currentColor" />Begin focus session</button>
      <div className="relative my-6 text-center text-xs uppercase tracking-[.22em] text-slate-600 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[42%] before:bg-white/10 after:absolute after:right-0 after:top-1/2 after:h-px after:w-[42%] after:bg-white/10">or</div>
      <button className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-violet/30 bg-violet/10 px-4 py-3 font-semibold text-[#dedaff] transition hover:bg-violet/15" onClick={() => start(true)}><RotateCcw size={17} />Try a 10-second demo session</button>
    </div>
  </div></section>;
}
