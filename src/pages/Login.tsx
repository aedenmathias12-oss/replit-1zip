import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import ResetPasswordModal from '../components/auth/ResetPasswordModal';

type ModalView = 'login' | 'register' | 'reset';

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<ModalView>('login');

  const redirectTo = searchParams.get('redirect') || '/compte';

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Connexion — CannaZen</title>
        <meta name="description" content="Connectez-vous ou créez votre compte CannaZen pour suivre vos commandes et accéder à votre espace personnel." />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <p className="text-[#7a7267] font-light">Chargement...</p>
        </div>
      </div>

      <LoginModal
        isOpen={view === 'login'}
        onClose={handleClose}
        onSwitchToRegister={() => setView('register')}
        onSwitchToReset={() => setView('reset')}
      />
      <RegisterModal
        isOpen={view === 'register'}
        onClose={handleClose}
        onSwitchToLogin={() => setView('login')}
      />
      <ResetPasswordModal
        isOpen={view === 'reset'}
        onClose={handleClose}
        onSwitchToLogin={() => setView('login')}
      />
    </>
  );
}
