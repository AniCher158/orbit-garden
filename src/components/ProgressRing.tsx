export function ProgressRing({ progress, size = 280, children }: { progress: number; size?: number; children: React.ReactNode }) {
  const radius = 46; const circumference = 2 * Math.PI * radius;
  return <div className="relative grid place-items-center" style={{ width: size, height: size }}>
    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" /><circle cx="50" cy="50" r={radius} fill="none" stroke="url(#timer-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} /><defs><linearGradient id="timer-gradient"><stop stopColor="#8edbc7" /><stop offset="1" stopColor="#a89af9" /></linearGradient></defs></svg>
    {children}
  </div>;
}
