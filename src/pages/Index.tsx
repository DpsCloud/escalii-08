
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import StatusCards from '@/components/StatusCards';
import UpcomingClasses from '@/components/UpcomingClasses';
import RecentMaterials from '@/components/RecentMaterials';
import AttendanceForm from '@/components/AttendanceForm';
import Notifications from '@/components/Notifications';
import CourseProgress from '@/components/CourseProgress';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        {/* Top Navigation */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Olá, João!</h1>
            <p className="text-sm sm:text-base text-gray-600">Bem-vindo ao seu dashboard do curso ESCALI Capacitação de Líderes - Turma 2025.1</p>
          </div>

          {/* Status Cards */}
          <StatusCards />

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <UpcomingClasses />
              <RecentMaterials />
            </div>

            {/* Right Column */}
            <div className="space-y-4 md:space-y-6">
              <AttendanceForm />
              <Notifications />
              <CourseProgress />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
