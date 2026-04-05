import { supabase } from './supabase';
import { createUserProfile, getUserProfile } from './supabaseDb';

const SITE_URL = 'https://canna-zen-eta.vercel.app';

export async function signInWithGoogle(): Promise<void> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${SITE_URL}/auth/callback`,
    },
  });
  if (error) throw error;
  if (data?.url) window.location.href = data.url;
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<void> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: displayName },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });
  if (error) throw error;

  if (data.user) {
    const existing = await getUserProfile(data.user.id);
    if (!existing) {
      await createUserProfile(data.user, 'email');
    }
  }
}

export async function resetPassword(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/callback`,
  });
  if (error) throw error;
}

export async function supabaseSignOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
