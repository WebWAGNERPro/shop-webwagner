import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>

      {/* Animated particles/lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              transform: `rotate(${i % 2 ? 1 : -1}deg)`,
              animation: `flow ${5 + i}s linear infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-blue-500">Scripts FiveM</span> Premium pour votre serveur
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Optimisez votre serveur FiveM avec des scripts optimisés et de haute qualité.
                Des tâches personnalisées aux systèmes avancés, nous avons tout ce qu'il vous faut.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-all hover:translate-y-[-2px] shadow-lg shadow-blue-600/25">
                    Parcourir les scripts
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:translate-y-[-2px]">
                    Notre processus
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-lg overflow-hidden border border-gray-700 shadow-2xl shadow-blue-900/20 transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg"
                  alt="FiveM Server"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              </div>

              {/* Floating badges/elements */}
              <div className="absolute -left-4 -bottom-4 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg shadow-lg transform -rotate-3 animate-pulse">
                <div className="text-white text-sm font-bold">Assistance 24h/24 et 7j/7</div>
              </div>

              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/50 animate-bounce">
                <div className="text-white text-sm uppercase">nouveauté</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats or trust indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-800 pt-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">200+</div>
            <div className="text-gray-400 text-sm">Scripts Premium</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">5,000+</div>
            <div className="text-gray-400 text-sm">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">99%</div>
            <div className="text-gray-400 text-sm">Temps de disponibilité</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Service client</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
