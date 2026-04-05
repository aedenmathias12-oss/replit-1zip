export const SITE_NAME = 'CannaZen';
export const SITE_DESCRIPTION = 'Boutique en ligne de CBD premium — Fleurs, résines, huiles et vapes de qualité supérieure. THC < 0.3%, 100% légal en France.';
export const SITE_URL = 'https://canna-zen-eta.vercel.app';
export const SITE_CONTACT = 'contact@cannazen.space';
export const SITE_ADDRESS = '11 rue de Tourraine, 67100 Strasbourg';
export const SITE_OWNER = 'Benkiran Hatim';
export const OG_IMAGE = '/logo-cannazen.png';

export const ROUTES = {
  home: '/',
  shop: '/boutique',
  product: '/boutique/:slug',
  login: '/connexion',
  account: '/compte',
  orders: '/compte/commandes',
  checkout: '/checkout',
  confirmation: '/checkout/confirmation/:id',
  about: '/a-propos',
  cgv: '/cgv',
  legal: '/mentions-legales',
  privacy: '/politique-de-confidentialite',
} as const;

export const STORAGE_KEYS = {
  cart: 'cannazen-cart',
  orders: 'cannazen-orders',
  ageVerified: 'cannazen-age-verified',
} as const;

export const SHIPPING = {
  freeThreshold: 49,
  colissimo: 4.90,
  chronopost: 9.90,
  relayThreshold: 39,
  relay: 3.90,
} as const;
