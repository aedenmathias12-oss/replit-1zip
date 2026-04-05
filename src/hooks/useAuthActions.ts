import { useState, useCallback } from 'react';
import { useAuth } from '../lib/AuthContext';
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  resetPassword,
  supabaseSignOut,
} from '../lib/supabaseAuth';
import toast from 'react-hot-toast';

function mapAuthError(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  if (msg.includes('Invalid login credentials')) return 'Identifiants invalides';
  if (msg.includes('Email not confirmed')) return 'Vérifiez votre email avant de vous connecter';
  if (msg.includes('User already registered')) return 'Cet email est déjà utilisé';
  if (msg.includes('Password should be at least')) return 'Mot de passe trop court (6 caractères minimum)';
  if (msg.includes('Unable to validate email address')) return 'Adresse email invalide';
  if (msg.includes('Email rate limit exceeded')) return 'Trop de tentatives. Réessayez plus tard.';
  return 'Une erreur est survenue';
}

export function useAuthActions() {
  const { user, profile, loading, isAuthenticated, isConfigured, refreshProfile } = useAuth();
  const [actionLoading, setActionLoading] = useState(false);

  const handleGoogleSignIn = useCallback(async () => {
    if (!isConfigured) {
      toast.error('Supabase non configuré. Contactez l\'administrateur.');
      return;
    }
    setActionLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error('Erreur lors de la connexion Google');
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [isConfigured]);

  const handleEmailSignIn = useCallback(async (email: string, password: string) => {
    if (!isConfigured) {
      toast.error('Supabase non configuré. Contactez l\'administrateur.');
      return;
    }
    setActionLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success('Connexion réussie !');
    } catch (error) {
      toast.error(mapAuthError(error));
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [isConfigured]);

  const handleRegister = useCallback(async (email: string, password: string, displayName: string) => {
    if (!isConfigured) {
      toast.error('Supabase non configuré. Contactez l\'administrateur.');
      return;
    }
    setActionLoading(true);
    try {
      await registerWithEmail(email, password, displayName);
      toast.success('Compte créé ! Vérifiez votre email pour confirmer.');
    } catch (error) {
      toast.error(mapAuthError(error));
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [isConfigured]);

  const handleResetPassword = useCallback(async (email: string) => {
    if (!isConfigured) {
      toast.error('Supabase non configuré. Contactez l\'administrateur.');
      return;
    }
    setActionLoading(true);
    try {
      await resetPassword(email);
      toast.success('Email de réinitialisation envoyé !');
    } catch {
      toast.error("Erreur lors de l'envoi du mail");
    } finally {
      setActionLoading(false);
    }
  }, [isConfigured]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabaseSignOut();
      toast.success('Déconnexion réussie');
    } catch {
      toast.error('Erreur lors de la déconnexion');
    }
  }, []);

  return {
    user,
    profile,
    loading: loading || actionLoading,
    actionLoading,
    isAuthenticated,
    isConfigured,
    refreshProfile,
    signInWithGoogle: handleGoogleSignIn,
    signInWithEmail: handleEmailSignIn,
    register: handleRegister,
    resetPassword: handleResetPassword,
    signOut: handleSignOut,
  };
}
