
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot-password';

const Login = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      {currentView === 'login' && (
        <LoginForm
          onForgotPassword={() => setCurrentView('forgot-password')}
          onRegister={() => setCurrentView('register')}
        />
      )}
      
      {currentView === 'register' && (
        <RegisterForm
          onBack={() => setCurrentView('login')}
        />
      )}
      
      {currentView === 'forgot-password' && (
        <ForgotPasswordForm
          onBack={() => setCurrentView('login')}
        />
      )}
    </div>
  );
};

export default Login;
