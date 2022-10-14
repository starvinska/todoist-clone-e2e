import { Content } from '../components/layout/Content';
import { Header } from '../components/layout/Header';
import { useThemeMode } from '../hooks/useThemeMode/useThemeMode';

export const Home = () => {
  const { darkMode } = useThemeMode();

  return (
    <main data-testid="application" className={darkMode ? 'darkmode' : undefined}>
      <Header />
      <Content />
    </main>
  );
};
