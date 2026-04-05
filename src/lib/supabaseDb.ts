import { supabase, isSupabaseConfigured } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'google' | 'email' | 'anonymous';
  role: 'customer' | 'admin';
  ageVerified: boolean;
  ageVerifiedAt: string | null;
  phone: string | null;
  addresses: Address[];
  wishlist: string[];
  preferences: {
    newsletter: boolean;
    smsNotifications: boolean;
    language: 'fr' | 'en';
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    loyaltyPoints: number;
  };
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  complement?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight?: number;
}

function requireDb() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase non configuré');
  }
  return supabase;
}

function rowToProfile(row: Record<string, unknown>): UserProfile {
  return {
    id: row.id as string,
    email: row.email as string | null,
    displayName: row.display_name as string | null,
    photoURL: row.photo_url as string | null,
    provider: row.provider as UserProfile['provider'],
    role: row.role as UserProfile['role'],
    ageVerified: row.age_verified as boolean,
    ageVerifiedAt: row.age_verified_at as string | null,
    phone: row.phone as string | null,
    addresses: (row.addresses as Address[]) ?? [],
    wishlist: (row.wishlist as string[]) ?? [],
    preferences: (row.preferences as UserProfile['preferences']) ?? {
      newsletter: true,
      smsNotifications: false,
      language: 'fr',
    },
    stats: (row.stats as UserProfile['stats']) ?? {
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
    },
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    lastLoginAt: row.last_login_at as string,
  };
}

export async function createUserProfile(user: User, provider: 'google' | 'email' | 'anonymous'): Promise<void> {
  const client = requireDb();
  const now = new Date().toISOString();
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    null;
  const photoURL =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    null;

  const { error } = await client.from('profiles').insert({
    id: user.id,
    email: user.email ?? null,
    display_name: displayName,
    photo_url: photoURL,
    provider,
    role: 'customer',
    age_verified: false,
    age_verified_at: null,
    phone: null,
    addresses: [],
    wishlist: [],
    preferences: { newsletter: true, smsNotifications: false, language: 'fr' },
    stats: { totalOrders: 0, totalSpent: 0, loyaltyPoints: 0 },
    created_at: now,
    updated_at: now,
    last_login_at: now,
  });

  if (error) throw error;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const client = requireDb();
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', uid)
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw error;
  if (!data) return null;
  return rowToProfile(data);
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  const client = requireDb();
  const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
  if (updates.photoURL !== undefined) dbUpdates.photo_url = updates.photoURL;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.ageVerified !== undefined) dbUpdates.age_verified = updates.ageVerified;
  if (updates.ageVerifiedAt !== undefined) dbUpdates.age_verified_at = updates.ageVerifiedAt;
  if (updates.addresses !== undefined) dbUpdates.addresses = updates.addresses;
  if (updates.wishlist !== undefined) dbUpdates.wishlist = updates.wishlist;
  if (updates.preferences !== undefined) dbUpdates.preferences = updates.preferences;
  if (updates.stats !== undefined) dbUpdates.stats = updates.stats;

  const { error } = await client.from('profiles').update(dbUpdates).eq('id', uid);
  if (error) throw error;
}

export async function updateLastLogin(uid: string): Promise<void> {
  const client = requireDb();
  const { error } = await client
    .from('profiles')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', uid);
  if (error) throw error;
}

export async function addToWishlist(uid: string, productId: string): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error('Utilisateur introuvable');
  const wishlist = [...new Set([...profile.wishlist, productId])];
  await updateUserProfile(uid, { wishlist });
}

export async function removeFromWishlist(uid: string, productId: string): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error('Utilisateur introuvable');
  const wishlist = profile.wishlist.filter((id) => id !== productId);
  await updateUserProfile(uid, { wishlist });
}

export async function addAddress(uid: string, address: Address): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error('Utilisateur introuvable');
  const addresses = [...(profile.addresses ?? [])];
  if (address.isDefault) addresses.forEach((a) => (a.isDefault = false));
  if (addresses.length === 0) address.isDefault = true;
  addresses.push(address);
  await updateUserProfile(uid, { addresses });
}

export async function updateAddress(uid: string, addressId: string, data: Partial<Address>): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error('Utilisateur introuvable');
  const addresses = profile.addresses.map((a) => {
    if (a.id === addressId) return { ...a, ...data };
    if (data.isDefault) a.isDefault = false;
    return a;
  });
  await updateUserProfile(uid, { addresses });
}

export async function deleteAddress(uid: string, addressId: string): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error('Utilisateur introuvable');
  const addresses = profile.addresses.filter((a) => a.id !== addressId);
  if (addresses.length > 0 && !addresses.some((a) => a.isDefault)) {
    addresses[0].isDefault = true;
  }
  await updateUserProfile(uid, { addresses });
}

export async function getSupabaseCart(uid: string): Promise<CartItem[]> {
  const client = requireDb();
  const { data, error } = await client
    .from('carts')
    .select('items')
    .eq('user_id', uid)
    .single();

  if (error?.code === 'PGRST116') return [];
  if (error) throw error;
  return (data?.items as CartItem[]) ?? [];
}

export async function updateSupabaseCart(uid: string, items: CartItem[]): Promise<void> {
  const client = requireDb();
  const { error } = await client.from('carts').upsert(
    { user_id: uid, items, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) throw error;
}
