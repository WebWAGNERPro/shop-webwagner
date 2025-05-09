import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search scripts..."
                className="bg-gray-800/70 text-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            </div>

            <button className="relative p-2 rounded-full hover:bg-gray-800/50 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </button>

            <button className="hidden md:block p-2 rounded-full hover:bg-gray-800/50 transition-colors">
              <User className="h-5 w-5" />
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                <a href="#" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Scripts
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="block text-gray-300 hover:text-blue-500 transition-colors">
                  Account
                </a>
              </li>
            </ul>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search scripts..."
                className="bg-gray-800/70 text-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
