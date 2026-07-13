import { Check, Orbit, Play, Sparkles, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlanetRenderer } from '../components/PlanetRenderer';
import { demoSessions } from '../data/demo';

export function HomePage() {
  return <>
    <section className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-8 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <div className="eyebrow"><Sparkles size={14} /> A focus timer that grows with you</div>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.045em] sm:text-6xl lg:text-7xl">Grow a universe, <span className="text-gradient">one focused moment</span> at a time.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Finish a real-life focus session and discover a one-of-a-kind planet. No pressure, no leaderboard—just a tiny galaxy made of things you’re proud you finished.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link className="button" to="/focus"><Play size={17} fill="currentColor" />Start focusing</Link><Link className="button button-secondary" to="/demo"><Orbit size={18} />Explore demo galaxy</Link></div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><Check size={15} className="text-mint" />Free & private</span><span className="inline-flex items-center gap-2"><Check size={15} className="text-mint" />Works offline after loading</span><span className="inline-flex items-center gap-2"><Check size={15} className="text-mint" />No account needed</span></div>
      </motion.div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit-line orbit-line-one" /><div className="orbit-line orbit-line-two" /><PlanetRenderer planet={demoSessions[3].planet} size={330} /><div className="floating-chip chip-one"><Timer size={15} />25 min focused</div><div className="floating-chip chip-two"><Sparkles size={15} />Rare world</div></div>
    </section>
    <section className="relative border-y border-white/10 bg-white/[.025] px-5 py-24">
      <div className="mx-auto max-w-6xl"><p className="eyebrow mx-auto w-fit">How it works</p><h2 className="section-title mx-auto mt-5 max-w-2xl text-center">A calmer way to see your progress</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">{[
          ['01', 'Choose your mission', 'Name what you want to do, pick a category, and set a comfortable focus length.'],
          ['02', 'Give it your attention', 'A simple timer and gentle orbit animation keep you company without getting in the way.'],
          ['03', 'Discover a new world', 'Your time and task shape a persistent, procedurally generated planet in your garden.'],
        ].map(([n, title, copy]) => <article key={n} className="glass-card p-7"><span className="text-sm font-bold text-mint">{n}</span><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-400">{copy}</p></article>)}</div>
      </div>
    </section>
    <footer className="relative px-5 py-10 text-center text-sm text-slate-500">Made with patience, curiosity, and a lot of tiny stars.</footer>
  </>;
}
