
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { materialsService } from '@/services/materialsService';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

const RecentMaterials = () => {
  const { profile } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await materialsService.getRecentMaterials(5);
        setMaterials(data);
      } catch (error) {
        console.error('Erro ao carregar materiais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (tipo) => {
    switch (tipo) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'image':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Materiais Recentes</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Materiais Recentes</h2>
        <FileText className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {materials.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum material disponível</p>
          </div>
        ) : (
          materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {getFileIcon(material.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 text-sm truncate">
                    {material.nome}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(material.created_at).toLocaleDateString('pt-BR')}</span>
                    <span>•</span>
                    <span>{formatFileSize(material.tamanho_arquivo)}</span>
                  </div>
                  {material.aulas && (
                    <p className="text-xs text-blue-600 mt-1">{material.aulas.titulo}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-2">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                  onClick={() => window.open(material.url, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {materials.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t">
          <button className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium py-2 transition-colors">
            Ver todos os materiais →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentMaterials;
