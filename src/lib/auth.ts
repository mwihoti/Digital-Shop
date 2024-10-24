import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone?: string;
  avatar_url?: string;
  whatsapp?: string;
  store_name?: string;
  bio?: string;
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile as UserProfile | null;
};