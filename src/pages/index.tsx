import type { NextPage } from 'next';
import { useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleSelectFeature = (feature: string) => {
    setSelectedFeature(feature);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.sidebarToggle}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <h1>Chat AI</h1>
      </header>
      
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={styles.mainContent}>
        <ChatContainer chatId={null} />
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
