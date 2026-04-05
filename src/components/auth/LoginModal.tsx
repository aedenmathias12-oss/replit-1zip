import { useState } from 'react';
import { X, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthActions } from '../../hooks/useAuthActions';
import { loginSchema, type LoginInput } from '../../lib/validators/auth';
import SocialButton from './SocialButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToReset: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister, onSwitchToReset }: LoginModalProps) {
  const { signInWithGoogle, signInWithEmail, actionLoading } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LoginInput>({ email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await signInWithEmail(formData.email, formData.password);
      onClose();
    } catch {
    }
  };

  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch {
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c2520]/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-[#e8efe4]/50 bg-white shadow-2xl shadow-[#6b8f5e]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6b8f5e] to-transparent" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#7a7267] transition-colors hover:text-[#2c2520]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <h2 className="mb-1 font-['Cormorant_Garamond'] text-2xl font-bold text-[#2c2520] italic">Connexion</h2>
          <p className="mb-6 text-sm text-[#7a7267] font-light">Accédez à votre espace CannaZen</p>

          <div className="mb-6">
            <SocialButton provider="google" onClick={handleGoogleClick} loading={actionLoading} />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e8efe4]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs uppercase tracking-widest text-[#7a7267]/50">ou</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a7267]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a7267]/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-[#e8efe4]/60 bg-[#f7f3ec]/50 py-3 pl-10 pr-4 text-sm text-[#2c2520] placeholder-[#7a7267]/50 transition-colors focus:border-[#6b8f5e] focus:outline-none focus:ring-1 focus:ring-[#6b8f5e]/20"
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a7267]">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-[#e8efe4]/60 bg-[#f7f3ec]/50 py-3 pl-4 pr-10 text-sm text-[#2c2520] placeholder-[#7a7267]/50 transition-colors focus:border-[#6b8f5e] focus:outline-none focus:ring-1 focus:ring-[#6b8f5e]/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7267]/50 hover:text-[#7a7267]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={onSwitchToReset} className="text-xs text-[#6b8f5e] hover:text-[#4a6741] font-medium">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="w-full rounded-xl bg-[#6b8f5e] py-3 text-sm font-semibold text-white shadow-md shadow-[#6b8f5e]/20 transition-all hover:bg-[#4a6741] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Se connecter'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#7a7267] font-light">
            Pas encore de compte ?{' '}
            <button onClick={onSwitchToRegister} className="font-medium text-[#6b8f5e] hover:text-[#4a6741]">
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
