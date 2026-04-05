import { useState } from 'react';
import { X, Mail, Eye, EyeOff, User, Loader2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions';
import { registerSchema, type RegisterInput } from '../../lib/validators/auth';
import SocialButton from './SocialButton';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { signInWithGoogle, register, actionLoading } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterInput>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false as any,
    acceptAge: false as any,
  });

  if (!isOpen) return null;

  const passwordStrength = (pw: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { score, label: 'Faible', color: 'bg-red-400' };
    if (score <= 3) return { score, label: 'Moyen', color: 'bg-amber-400' };
    if (score <= 4) return { score, label: 'Fort', color: 'bg-[#6b8f5e]' };
    return { score, label: 'Très fort', color: 'bg-emerald-500' };
  };

  const strength = passwordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.displayName);
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

  const inputClass = (field: string) =>
    `w-full rounded-xl border ${
      errors[field] ? 'border-red-300' : 'border-[#e8efe4]/60'
    } bg-[#f7f3ec]/50 py-3 px-4 text-sm text-[#2c2520] placeholder-[#7a7267]/50 transition-colors focus:border-[#6b8f5e] focus:outline-none focus:ring-1 focus:ring-[#6b8f5e]/20`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#2c2520]/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 my-8 w-full max-w-md overflow-hidden rounded-2xl border border-[#e8efe4]/50 bg-white shadow-2xl shadow-[#6b8f5e]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6b8f5e] to-transparent" />

        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-[#7a7267] transition-colors hover:text-[#2c2520]">
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <h2 className="mb-1 font-['Cormorant_Garamond'] text-2xl font-bold text-[#2c2520] italic">Créer un compte</h2>
          <p className="mb-6 text-sm text-[#7a7267] font-light">Rejoignez l'expérience CannaZen</p>

          <div className="mb-6">
            <SocialButton provider="google" onClick={handleGoogleClick} loading={actionLoading} label="S'inscrire avec Google" />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e8efe4]" /></div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs uppercase tracking-widest text-[#7a7267]/50">ou par email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a7267]">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a7267]/50" />
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className={`${inputClass('displayName')} pl-10`}
                  placeholder="Jean Dupont"
                />
              </div>
              {errors.displayName && <p className="mt-1 text-xs text-red-500">{errors.displayName}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a7267]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a7267]/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${inputClass('email')} pl-10`}
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
                  className={`${inputClass('password')} pr-10`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7267]/50 hover:text-[#7a7267]">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="mb-1 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength.score ? strength.color : 'bg-[#e8efe4]'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength.score <= 2 ? 'text-red-500' : strength.score <= 3 ? 'text-amber-600' : 'text-[#6b8f5e]'}`}>
                    {strength.label}
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a7267]">Confirmer le mot de passe</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={inputClass('confirmPassword')}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex cursor-pointer items-start gap-3">
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${formData.acceptAge ? 'border-[#6b8f5e] bg-[#6b8f5e]' : 'border-[#e8efe4] bg-white'} transition-colors`}>
                  {formData.acceptAge && <Check className="h-3 w-3 text-white" />}
                </div>
                <input type="checkbox" className="sr-only" checked={formData.acceptAge as boolean} onChange={(e) => setFormData({ ...formData, acceptAge: e.target.checked as any })} />
                <span className="text-sm text-[#7a7267] font-light">Je confirme avoir <span className="font-semibold text-[#2c2520]">18 ans ou plus</span></span>
              </label>
              {errors.acceptAge && <p className="ml-8 text-xs text-red-500">{errors.acceptAge}</p>}

              <label className="flex cursor-pointer items-start gap-3">
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${formData.acceptTerms ? 'border-[#6b8f5e] bg-[#6b8f5e]' : 'border-[#e8efe4] bg-white'} transition-colors`}>
                  {formData.acceptTerms && <Check className="h-3 w-3 text-white" />}
                </div>
                <input type="checkbox" className="sr-only" checked={formData.acceptTerms as boolean} onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked as any })} />
                <span className="text-sm text-[#7a7267] font-light">
                  J'accepte les{' '}
                  <Link to="/cgv" className="text-[#6b8f5e] underline" target="_blank">CGV</Link>{' '}
                  et la{' '}
                  <Link to="/politique-de-confidentialite" className="text-[#6b8f5e] underline" target="_blank">politique de confidentialité</Link>
                </span>
              </label>
              {errors.acceptTerms && <p className="ml-8 text-xs text-red-500">{errors.acceptTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="w-full rounded-xl bg-[#6b8f5e] py-3 text-sm font-semibold text-white shadow-md shadow-[#6b8f5e]/20 transition-all hover:bg-[#4a6741] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Créer mon compte'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#7a7267] font-light">
            Déjà un compte ?{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-[#6b8f5e] hover:text-[#4a6741]">Se connecter</button>
          </p>
        </div>
      </div>
    </div>
  );
}
