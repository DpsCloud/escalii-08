
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import StatusCards from '@/components/StatusCards';
import AdminStatusCards from '@/components/AdminStatusCards';
import UpcomingClasses from '@/components/UpcomingClasses';
import RecentMaterials from '@/components/RecentMaterials';
import AttendanceForm from '@/components/AttendanceForm';
import Notifications from '@/components/Notifications';
import CourseProgress from '@/components/CourseProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? 'w-full' : sidebarOpen ? 'ml-64' : 'ml-[70px]'
        }`}
      >
        {/* Top Navigation */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">
              {isAdmin ? 'Painel Administrativo' : 'Olá, João!'}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {isAdmin 
                ? 'Gerencie e acompanhe o progresso de todos os alunos e cursos'
                : 'Bem-vindo ao seu dashboard do curso ESCALI Capacitação de Líderes - Turma 2025.1'
              }
            </p>
          </div>

          {/* Status Cards - Different for admin and user */}
          {isAdmin ? <AdminStatusCards /> : <StatusCards />}

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <UpcomingClasses />
              <RecentMaterials />
            </div>

            {/* Right Column */}
            <div className="space-y-3 sm:space-y-4">
              {!isAdmin && <AttendanceForm />}
              <CourseProgress />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
