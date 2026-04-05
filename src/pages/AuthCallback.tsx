import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Connexion...');

  useEffect(() => {
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let subscription: { unsubscribe: () => void } | null = null;

    const done = (path: string) => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (subscription) subscription.unsubscribe();
      navigate(path, { replace: true });
    };

    const handle = async () => {
      const hash = new URLSearchParams(window.location.hash.substring(1));
      const query = new URLSearchParams(window.location.search);
      const accessToken = hash.get('access_token');
      const code = query.get('code');

      if (accessToken) {
        setStatus('Token détecté...');
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hash.get('refresh_token') || '',
        });
        if (!error) { done('/compte'); return; }
      }

      if (code) {
        setStatus('Code détecté...');
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) { done('/compte'); return; }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) { done('/compte'); return; }

      setStatus('En attente de confirmation...');
      const { data } = supabase.auth.onAuthStateChange((event, sess) => {
        if (event === 'SIGNED_IN' && sess) {
          done('/compte');
        }
      });
      subscription = data.subscription;

      fallbackTimer = setTimeout(() => {
        done('/');
      }, 5000);
    };

    handle();

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (subscription) subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '32px', height: '32px', border: '3px solid #d1fae5', borderTop: '3px solid #16a34a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>{status}</p>
    </div>
  );
}
