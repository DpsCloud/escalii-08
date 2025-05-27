
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { toast } = useToast();
  const { user, logout, isAdmin } = useAuth();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Você tem 3 novas notificações",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button 
            id="sidebar-toggle" 
            onClick={toggleSidebar}
            className="toggle-button"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h2 className="text-xl font-semibold ml-2">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-muted transition-colors"
              onClick={handleNotificationClick}
              aria-label="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="notification-dot"></span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nome || '')}&background=3b82f6&color=fff`} 
                alt="Profile" 
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2 hidden sm:block">
                <span className="font-medium text-sm">{user?.nome}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isAdmin ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isAdmin ? 'Admin' : 'Aluno'}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-xs"
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
