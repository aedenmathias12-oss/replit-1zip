import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './lib/CartContext';
import { AuthProvider } from './lib/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AgeGate from './components/layout/AgeGate';
import ChatWidget from './components/smokellier/ChatWidget';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ScrollToTopButton from './components/ui/ScrollToTopButton';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));
const Orders = lazy(() => import('./pages/Orders'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const About = lazy(() => import('./pages/About'));
const CGV = lazy(() => import('./pages/CGV'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AgeGate />
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/boutique" element={<Shop />} />
                <Route path="/boutique/:slug" element={<ProductDetail />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/compte" element={<Account />} />
                <Route path="/compte/commandes" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/confirmation/:id" element={<Confirmation />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/cgv" element={<CGV />} />
                <Route path="/mentions-legales" element={<Legal />} />
                <Route path="/politique-de-confidentialite" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <ScrollToTopButton />
        <ChatWidget />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#f7f3ec',
              color: '#2c2520',
              border: '1px solid rgba(232,239,228,0.5)',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              boxShadow: '0 4px 12px rgba(107,143,94,0.1)',
            },
            success: {
              iconTheme: { primary: '#6b8f5e', secondary: '#fff' },
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}
