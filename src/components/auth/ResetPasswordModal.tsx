import { useState } from 'react';
import { X, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthActions } from '../../hooks/useAuthActions';
import { resetPasswordSchema } from '../../lib/validators/auth';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose, onSwitchToLogin }: ResetPasswordModalProps) {
  const { resetPassword, actionLoading } = useAuthActions();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = resetPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    try {
      await resetPassword(email);
      setSent(true);
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

        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-[#7a7267] transition-colors hover:text-[#2c2520]">
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8efe4]/50">
                <Mail className="h-8 w-8 text-[#6b8f5e]" />
              </div>
              <h2 className="mb-2 font-['Cormorant_Garamond'] text-2xl font-bold text-[#2c2520] italic">Email envoyé !</h2>
              <p className="mb-6 text-sm text-[#7a7267] font-light">
                Si un compte existe avec l'adresse <span className="font-medium text-[#2c2520]">{email}</span>, vous recevrez un email de réinitialisation.
              </p>
              <button
                onClick={onSwitchToLogin}
                className="w-full rounded-xl bg-[#6b8f5e] py-3 text-sm font-semibold text-white shadow-md shadow-[#6b8f5e]/20 transition-all hover:bg-[#4a6741]"
              >
                Retour à la connexion
              </button>
            </div>
          ) : (
            <>
              <button onClick={onSwitchToLogin} className="mb-4 flex items-center gap-1 text-sm text-[#7a7267] hover:text-[#2c2520] transition-colors">
                <ArrowLeft className="h-4 w-4" /> Retour
              </button>
              <h2 className="mb-1 font-['Cormorant_Garamond'] text-2xl font-bold text-[#2c2520] italic">Mot de passe oublié</h2>
              <p className="mb-6 text-sm text-[#7a7267] font-light">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a7267]">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a7267]/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-[#e8efe4]/60 bg-[#f7f3ec]/50 py-3 pl-10 pr-4 text-sm text-[#2c2520] placeholder-[#7a7267]/50 transition-colors focus:border-[#6b8f5e] focus:outline-none focus:ring-1 focus:ring-[#6b8f5e]/20"
                      placeholder="votre@email.com"
                      autoFocus
                    />
                  </div>
                  {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full rounded-xl bg-[#6b8f5e] py-3 text-sm font-semibold text-white shadow-md shadow-[#6b8f5e]/20 transition-all hover:bg-[#4a6741] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Envoyer le lien'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
