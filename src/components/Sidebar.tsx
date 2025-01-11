import styles from './Sidebar.module.scss';
import Image from 'next/image';
import { FC, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleButton} onClick={onToggle}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
      <div className={styles.header}>
        <div className={styles.userSection}>
          <div className={styles.userAvatar}>👤</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>User Name</div>
            <div className={styles.userStatus}>Online</div>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>ประวัติการสนทนา</div>
          <div className={styles.chatHistory}>
            {[
              { id: 1, title: 'การตลาดดิจิทัล', date: '2023-10-15' },
              { id: 2, title: 'การออกแบบ UI/UX', date: '2023-10-14' },
              { id: 3, title: 'การเขียนโค้ด React', date: '2023-10-13' }
            ].map(chat => (
              <div key={chat.id} className={styles.chatItem}>
                <div className={styles.chatTitle}>{chat.title}</div>
                <div className={styles.chatDate}>{chat.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>AI Tools</div>
          {[
            { icon: '🖼️', label: 'สร้างภาพจากข้อความ', key: 'text-to-image' },
            { icon: '🔍', label: 'ค้นหาข้อมูล', key: 'search' },
            { icon: '🌐', label: 'ค้นหาข้อมูลบนเว็บ', key: 'web-search' },
            { icon: '🎨', label: 'Canvas', key: 'canvas' },
            { icon: '😊', label: 'วิเคราะห์ความรู้สึก', key: 'sentiment' },
            { icon: '💡', label: 'ระดมความคิด', key: 'brainstorm' }
          ].map(item => (
            <div key={item.key} className={styles.menuItem}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>


        <div className={styles.section}>
          <div className={styles.sectionTitle}>Collaboration</div>
          {[
            { icon: '👥', label: 'ทำงานร่วมกัน', key: 'collaborate' }
          ].map(item => (
            <div key={item.key} className={styles.menuItem}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
