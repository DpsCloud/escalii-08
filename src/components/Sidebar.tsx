
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Award, 
  Settings, 
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard',
      admin: false
    },
    { 
      icon: PlayCircle, 
      label: 'Aulas', 
      path: '/aulas-admin',
      admin: true
    },
    { 
      icon: BookOpen, 
      label: 'Cursos', 
      path: '/cursos',
      admin: false
    },
    { 
      icon: Users, 
      label: 'Alunos', 
      path: '/alunos',
      admin: true
    },
    { 
      icon: Calendar, 
      label: 'Calendário', 
      path: '/calendario',
      admin: false
    },
    { 
      icon: FileText, 
      label: 'Materiais', 
      path: '/materiais',
      admin: false
    },
    { 
      icon: Award, 
      label: 'Certificados', 
      path: '/certificado',
      admin: false
    },
    { 
      icon: BarChart3, 
      label: 'Relatórios', 
      path: '/relatorios',
      admin: true
    },
    { 
      icon: Settings, 
      label: 'Usuários', 
      path: '/usuarios',
      admin: true
    }
  ];

  const filteredMenuItems = menuItems.filter(item => !item.admin || isAdmin);

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-[70px]'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {isOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-800">ESCALI</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${!isOpen ? 'justify-center' : ''}
                  `}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          {isOpen && user && (
            <div className="p-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {isAdmin ? 'Administrador' : 'Usuário'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button for Desktop */}
          <div className="hidden lg:block p-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="w-full justify-center"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
