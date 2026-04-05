import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),
  email: z.string().email('Adresse email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, { message: 'Vous devez accepter les CGV' }),
  acceptAge: z.literal(true, { message: 'Vous devez confirmer avoir 18 ans ou plus' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone français invalide').optional().or(z.literal('')),
  preferences: z.object({
    newsletter: z.boolean().optional(),
    smsNotifications: z.boolean().optional(),
    language: z.enum(['fr', 'en']).optional(),
  }).optional(),
});

export const addressSchema = z.object({
  label: z.string().min(1, 'Libellé requis').max(30),
  firstName: z.string().min(1, 'Prénom requis').max(50),
  lastName: z.string().min(1, 'Nom requis').max(50),
  street: z.string().min(1, 'Adresse requise').max(200),
  complement: z.string().max(200).optional(),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  city: z.string().min(1, 'Ville requise').max(100),
  country: z.string().default('France'),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone invalide'),
  isDefault: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
