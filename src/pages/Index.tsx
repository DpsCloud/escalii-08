
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, Award, ArrowRight, GraduationCap } from "lucide-react";
import { AddUserButton } from "@/components/AddUserButton";

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-900">ESCALI</h1>
              <p className="text-xl text-blue-600 font-medium">Escola de Capacitação de Líderes</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolva suas habilidades de liderança através de cursos especializados, 
            mentoria personalizada e uma comunidade ativa de líderes.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Cursos</CardTitle>
              <CardDescription>Acesse conteúdo especializado em liderança</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Comunidade</CardTitle>
              <CardDescription>Conecte-se com outros líderes</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Aulas</CardTitle>
              <CardDescription>Participe de aulas ao vivo</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Certificados</CardTitle>
              <CardDescription>Obtenha certificações reconhecidas</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          {isAuthenticated ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bem-vindo de volta, {user?.email}!
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" className="flex items-center gap-2">
                    Acessar Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <AddUserButton />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para começar sua jornada de liderança?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="flex items-center gap-2">
                    Entrar na Plataforma
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <AddUserButton />
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Conteúdo Especializado</h3>
            <p className="text-gray-600">
              Cursos desenvolvidos por especialistas em liderança e gestão
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mentoria Personalizada</h3>
            <p className="text-gray-600">
              Acompanhamento individual para acelerar seu desenvolvimento
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Certificação Reconhecida</h3>
            <p className="text-gray-600">
              Certificados validados pelo mercado e instituições parceiras
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
