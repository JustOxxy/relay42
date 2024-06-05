import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Layout } from './layouts';
import { Mission, MissionDetails } from './pages';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <NextThemesProvider attribute="class">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Mission />} />
            <Route path="/new-mission" element={<MissionDetails />} />
            <Route path="/mission/:missionId" element={<MissionDetails />} />
          </Route>
        </Routes>
      </NextThemesProvider>
    </NextUIProvider>
  );
};
