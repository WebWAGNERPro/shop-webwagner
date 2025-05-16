import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const Header = () => {
  const { auth } = usePage<SharedData>().props;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const cartRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Ferme le panier si on clique en dehors
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }

      // Ferme le profil si on clique en dehors
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCartOpen(!isCartOpen);
    setIsProfileOpen(false); // Ferme l'autre popup
  };

  const toggleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    setIsCartOpen(false); // Ferme l'autre popup
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white mr-6">
              <span className="text-blue-500">Web</span>WAGNER-Shop
            </h1>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                    Scripts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Panier avec popup */}
            <div className="relative" ref={cartRef}>
              <button
                className="relative p-2 rounded-full hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  length
                </span>
              </button>

              {/* Popup du panier */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-2 px-3 text-sm text-gray-200 border border-gray-700 animate-fadeIn">
                  <div className="font-bold mb-2 pb-2 border-b border-gray-700">Votre panier (length)</div>

                  <div className="space-y-2 max-h-60 overflow-y-auto py-1">
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <div className="font-medium text-white">title</div>
                        <div className="text-xs text-gray-400">Quantité: quantity</div>
                      </div>
                      <div className="text-blue-400">Prix €</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 mt-2 pt-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>Total:</span>
                      <span>
                        Total €
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <Link href="/cart" className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm text-center transition-colors">
                        Voir le panier
                      </Link>
                      <Link href="/checkout" className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm text-center transition-colors">
                        Commander
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profil utilisateur avec popup */}
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                className="p-2 rounded-full hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={toggleProfile}
              >
                <User className="h-5 w-5 text-white" />
              </button>

              {/* Popup du profil */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-2 text-sm text-gray-200 border border-gray-700 animate-fadeIn">
                  {auth.user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-700">
                        <div className="font-bold text-white">{auth.user.name}</div>
                        <div className="text-xs text-gray-400">{auth.user.email}</div>
                      </div>

                      <ul>
                        <li>
                          <a href="/profile" className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                            Mon profil
                          </a>
                        </li>
                        <li>
                          <a href="/orders" className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                            Mes commandes
                          </a>
                        </li>
                        <li>
                          <a href="/downloads" className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                            Mes téléchargements
                          </a>
                        </li>
                        <li>
                          <a href="/settings" className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                            Paramètres
                          </a>
                        </li>
                      </ul>

                      <div className="border-t border-gray-700 mt-1">
                        <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors">
                          Déconnexion
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-gray-700">
                        <div className="font-bold text-white">Invité</div>
                        <div className="text-xs text-gray-400">Connectez-vous pour accéder à votre compte</div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/login" className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                            Se connecter
                          </Link>
                        </li>
                        <li>
                          <Link href="/register" className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                            S'inscrire
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md mt-3 py-4 px-4 animate-fadeIn">
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="/" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/scripts" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Scripts
                </a>
              </li>
              <li>
                <a href="/support" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="/documentation" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href={auth.user ? "/profile" : "/login"} className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Compte
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
