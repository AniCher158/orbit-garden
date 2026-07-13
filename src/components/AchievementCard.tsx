import { Lock, Sparkles } from 'lucide-react';
import type { Achievement } from '../types';

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return <article className={`flex gap-4 rounded-2xl border p-4 ${achievement.unlocked ? 'border-mint/25 bg-mint/[.07]' : 'border-white/8 bg-white/[.02]'}`}><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${achievement.unlocked ? 'bg-mint text-ink' : 'bg-white/5 text-slate-600'}`}>{achievement.unlocked ? <Sparkles size={19} /> : <Lock size={18} />}</div><div><h3 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>{achievement.title}</h3><p className="mt-1 text-sm text-slate-500">{achievement.description}</p></div></article>;
}
