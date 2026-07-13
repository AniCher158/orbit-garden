import { BarChart3, Menu, Orbit, Sparkles, Timer, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Starfield } from './Starfield';

const links = [
  { to: '/focus', label: 'Focus', icon: Timer },
  { to: '/galaxy', label: 'My garden', icon: Orbit },
  { to: '/dashboard', label: 'Progress', icon: BarChart3 },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen overflow-hidden bg-ink text-cream"><Starfield />
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="focus-ring flex items-center gap-2 rounded-lg font-display font-bold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-full bg-mint text-ink"><Sparkles size={16} /></span>Orbit Garden</Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={16} />{label}</NavLink>)}</nav>
        <Link to="/focus" className="button button-small hidden sm:inline-flex">Start a session</Link>
        <button className="focus-ring rounded-xl p-2 md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-ink p-4 md:hidden">{links.map(({ to, label }) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5">{label}</NavLink>)}</nav>}
    </header>
    <main className="relative z-10 pt-[72px]">{children}</main>
  </div>;
}
