import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { demoSessions } from './data/demo';
import { useGarden } from './hooks/useGarden';
import { DashboardPage } from './pages/DashboardPage';
import { FocusPage } from './pages/FocusPage';
import { GalaxyPage } from './pages/GalaxyPage';
import { HomePage } from './pages/HomePage';

export default function App() {
  const garden = useGarden();
  return <Layout><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/focus" element={<FocusPage onComplete={garden.addSession} />} />
    <Route path="/galaxy" element={<GalaxyPage sessions={garden.sessions} onDelete={garden.deleteSession} onSaveNote={garden.updateNote} />} />
    <Route path="/demo" element={<GalaxyPage sessions={demoSessions} demo />} />
    <Route path="/dashboard" element={<DashboardPage sessions={garden.sessions} />} />
    <Route path="*" element={<HomePage />} />
  </Routes></Layout>;
}
