
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addFabioUser } from '@/utils/addUser';
import { UserPlus } from 'lucide-react';

export const AddUserButton = () => {
  const { toast } = useToast();

  const handleAddUser = async () => {
    try {
      await addFabioUser();
      toast({
        title: "Usuário adicionado!",
        description: "O usuário fabiopersi@outlook.com foi criado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar usuário",
        description: error.message || "Ocorreu um erro ao criar o usuário.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleAddUser} className="flex items-center gap-2">
      <UserPlus className="h-4 w-4" />
      Adicionar Usuário Fábio
    </Button>
  );
};
