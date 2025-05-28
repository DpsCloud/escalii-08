
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
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { profile, isAdmin } = useAuth();

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard',
      admin: false,
      userOnly: false
    },
    { 
      icon: PlayCircle, 
      label: 'Aulas', 
      path: '/aulas-admin',
      admin: true,
      userOnly: false
    },
    { 
      icon: BookOpen, 
      label: 'Cursos', 
      path: '/cursos',
      admin: false,
      userOnly: false
    },
    { 
      icon: Users, 
      label: 'Alunos', 
      path: '/alunos',
      admin: true,
      userOnly: false
    },
    { 
      icon: Calendar, 
      label: 'Calendário', 
      path: '/calendario',
      admin: false,
      userOnly: true
    },
    { 
      icon: FileText, 
      label: 'Materiais', 
      path: '/materiais',
      admin: false,
      userOnly: true
    },
    { 
      icon: Award, 
      label: 'Certificados', 
      path: '/certificado',
      admin: false,
      userOnly: true
    },
    { 
      icon: BarChart3, 
      label: 'Relatórios', 
      path: '/relatorios',
      admin: true,
      userOnly: false
    },
    { 
      icon: Settings, 
      label: 'Usuários', 
      path: '/usuarios',
      admin: true,
      userOnly: false
    }
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.admin && !isAdmin) return false;
    if (item.userOnly && isAdmin) return false;
    return true;
  });

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
        fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-blue-600 to-blue-700 shadow-lg transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-[70px]'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-500">
            {isOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-bold text-white">ESCALI</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:bg-white/10"
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
                    group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-white/20 text-white shadow-lg border-l-4 border-white' 
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
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
          {isOpen && profile && (
            <div className="p-4 border-t border-blue-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {profile.nome?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {profile.nome}
                  </p>
                  <p className="text-xs text-blue-200 truncate">
                    {isAdmin ? 'Administrador' : 'Usuário'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button for Desktop */}
          <div className="hidden lg:block p-2 border-t border-blue-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="w-full justify-center text-white hover:bg-white/10"
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
