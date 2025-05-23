import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      
      if (isMobile && isOpen && sidebar && 
          !sidebar.contains(event.target as Node) && 
          sidebarToggle && !sidebarToggle.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar, isMobile]);

  const menuItems = [
    { path: '/', icon: <HomeIcon />, label: 'Dashboard' },
    { path: '/aulas', icon: <BookIcon />, label: 'Aulas' },
    { path: '/calendario', icon: <CalendarIcon />, label: 'Calendário' },
    { path: '/presenca', icon: <CheckCircleIcon />, label: 'Presença' },
    { path: '/materiais', icon: <FileIcon />, label: 'Materiais' },
    { path: '/certificado', icon: <CertificateIcon />, label: 'Certificado' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="mobile-menu-overlay" onClick={toggleSidebar} />
      )}
      
      {/* Sidebar */}
      <div 
        id="sidebar" 
        className={`sidebar gradient-bg text-white ${isOpen ? 'w-64' : isMobile ? 'w-0' : 'w-[70px]'}`}
      >
        <div className="p-4">
          <div className={`flex items-center justify-center mb-8 ${!isOpen && !isMobile ? 'justify-center' : ''}`}>
            {isOpen ? (
              <h1 className="text-2xl font-bold">ESCALI</h1>
            ) : !isMobile && (
              <h1 className="text-2xl font-bold">E</h1>
            )}
          </div>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavItem 
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
                isCollapsed={!isOpen && !isMobile}
                onClick={isMobile ? toggleSidebar : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, isCollapsed, onClick }: NavItemProps) => {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`sidebar-link flex items-center p-3 rounded-lg ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`}
    >
      <span className="h-5 w-5 mr-3">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

// Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
  </svg>
);

const CertificateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
);
