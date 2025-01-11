import React from 'react';
import { FaFileUpload, FaSearch, FaGlobe, FaPaintBrush, FaCode } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectFeature: (feature: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onSelectFeature }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button onClick={onToggle}>Toggle Sidebar</button>
      <ul>
        <li onClick={() => onSelectFeature('attach-file')}>
          <FaFileUpload /> Attach File
        </li>
        <li onClick={() => onSelectFeature('create-image')}>
          <SiOpenai /> Use DALL-E: สร้างภาพจากข้อความ
        </li>
        <li onClick={() => onSelectFeature('search')}>
          <FaSearch /> Search: ค้นหาข้อมูล
        </li>
        <li onClick={() => onSelectFeature('find-on-web')}>
          <FaGlobe /> Find on the web: ค้นหาข้อมูลบนเว็บ
        </li>
        <li onClick={() => onSelectFeature('canvas')}>
          <FaPaintBrush /> Canvas: ออกแบบหรือสร้างสรรค์งาน
        </li>
        <li onClick={() => onSelectFeature('collaborate')}>
          <FaCode /> Collaborate on writing and code: ทำงานร่วมกันในการเขียนหรือเขียนโค้ด
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
