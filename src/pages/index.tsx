import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import ChatContainer from '../components/ChatContainer';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.scss';
import { Theme, Feature, ErrorState } from '../types';

interface HomeState {
  isSidebarOpen: boolean;
  selectedFeature: Feature | null;
  theme: Theme;
  error: ErrorState;
}

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onSidebarToggle: () => void;
}

const Home: NextPage = () => {
  const [state, setState] = useState<HomeState>({
    isSidebarOpen: true,
    selectedFeature: null,
    theme: {
      isDarkMode: false,
      primaryColor: '#1a1a1a',
      secondaryColor: '#ffffff',
      fontSize: '16px'
    },
    error: { hasError: false }
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', state.theme.isDarkMode);
  }, [state.theme.isDarkMode]);

  const handleSelectFeature = (feature: string) => {
    setState(prevState => ({ ...prevState, selectedFeature: feature }));
  };

  return (
    <div className={`${styles.container} ${state.theme.isDarkMode ? styles.darkMode : ''}`}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.sidebarToggle}
            onClick={() => setState(prevState => ({ ...prevState, isSidebarOpen: !prevState.isSidebarOpen }))}
          >
            ☰
          </button>
          <h1>Chat AI</h1>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.themeToggle}
            onClick={() => setState(prevState => ({ ...prevState, theme: { ...prevState.theme, isDarkMode: !prevState.theme.isDarkMode } }))}
          >
            {state.theme.isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </header>
      
      <Sidebar 
        isOpen={state.isSidebarOpen} 
        onToggle={() => setState(prevState => ({ ...prevState, isSidebarOpen: !prevState.isSidebarOpen }))}
        isDarkMode={state.theme.isDarkMode}
      />
      
      <main className={styles.mainContent}>
        <ChatContainer chatId={null} isDarkMode={state.theme.isDarkMode} />
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.disclaimer}>
          Free Research Preview. May produce inaccurate information.
        </div>
      </footer>
    </div>
  );
};

export default Home;
