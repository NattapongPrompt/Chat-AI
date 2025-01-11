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
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onSelectFeature={handleSelectFeature} />
      <main className={styles.mainContent}>
        {selectedFeature === 'attach-file' && <div>Attach File Feature</div>}
        {selectedFeature === 'create-image' && <div>Create Image Feature</div>}
        {selectedFeature === 'search' && <div>Search Feature</div>}
        {selectedFeature === 'find-on-web' && <div>Find on the Web Feature</div>}
        {selectedFeature === 'canvas' && <div>Canvas Feature</div>}
        {selectedFeature === 'collaborate' && <div>Collaborate on Writing and Code Feature</div>}
        <ChatContainer chatId={null} />
      </main>
    </div>
  );
};

export default Home;
