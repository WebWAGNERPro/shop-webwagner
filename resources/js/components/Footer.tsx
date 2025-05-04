import React from 'react';
import { GithubIcon, TwitterIcon, InstagramIcon, FacebookIcon, Mail, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Restez à jour</h3>
            <p className="text-gray-300 mb-6">
                Abonnez-vous à notre newsletter pour recevoir des mises à jour sur les nouveaux scripts, les remises et les conseils de développement FiveM.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 bg-gray-800/70 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* About column */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">
              <span className="text-blue-500">Web</span>WAGNER-Shop
            </h4>
            <p className="text-gray-400 mb-4">
                Scripts FiveM premium pour améliorer votre expérience serveur. Qualité, performances et support garantis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Scripts</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Support</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Conditions d'utilisation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Politique de confidentialité</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Catégories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Emplois et économie</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Roleplay</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Police & EMS</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">UI/HUD</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Véhicules et armes</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Outils d'administration</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contactez-nous</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <a href="mailto:support@webwagner-shop.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                  support@webwagner-shop.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <span className="text-gray-400">+33 6 06 06 06 06</span>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <div className="text-gray-400">Assistance par chat en direct</div>
                  <div className="text-xs text-gray-500">Disponible de 9h à 21h</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 WebWAGNER-Shop. Tous droits réservés.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Termes</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Confidentialité</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookies</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Licence</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
