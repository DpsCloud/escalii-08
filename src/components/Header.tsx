
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Menu, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

// Menu items compartilhados com o Sidebar
const adminMenuItems = [
  { path: "/dashboard", label: "Dashboard Admin" },
  { path: "/alunos", label: "Alunos" },
  { path: "/cursos", label: "Cursos" },
  { path: "/usuarios", label: "Usuários" },
  { path: "/relatorios", label: "Relatórios" },
];

const alunoMenuItems = [
  { path: "/", label: "Dashboard" },
  { path: "/aulas", label: "Aulas" },
  { path: "/calendario", label: "Calendário" },
  { path: "/presenca", label: "Presença" },
  { path: "/materiais", label: "Materiais" },
  { path: "/certificado", label: "Certificado" },
];

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  // Determina qual conjunto de itens do menu usar
  const menuItems = isAdmin ? adminMenuItems : alunoMenuItems;

  // Encontra o item atual do menu baseado na rota atual
  const currentMenuItem = menuItems.find(
    (item) =>
      location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path))
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b h-14 min-h-[56px] flex items-center px-4 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="mr-4 hover:bg-gray-100"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h1 className="text-xl font-semibold text-gray-800">
        {currentMenuItem?.label || "ESCALI"}
      </h1>

      <div className="flex-1" />

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <div className="flex items-center space-x-2">
          <div className="text-right mr-2">
            <p className="text-sm font-medium truncate max-w-[150px]">
              {user?.nome || "Usuário"}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {user?.email || "usuario@email.com"}
            </p>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.nome?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="hover:bg-gray-100"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
