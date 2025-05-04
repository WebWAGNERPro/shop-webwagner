import React, { useState } from 'react';
import ScriptCard from './ScriptCard';
import { scripts } from '../data/scripts';
import { Filter, ChevronDown, Search } from 'lucide-react';

const categories = [
  'All Categories',
  'Jobs & Economy',
  'Roleplay',
  'Racing',
  'Police',
  'EMS',
  'UI/HUD',
  'Vehicles',
  'Weapons',
  'Admin Tools'
];

const ScriptCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter scripts based on active category
  const filteredScripts = activeCategory === 'All Categories'
    ? scripts
    : scripts.filter(script => script.category === activeCategory);

  return (
    <section className="py-20 bg-gray-900/70">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Parcourir les scripts</h2>
            <p className="text-gray-400 mb-4 md:mb-0">
                Trouvez les scripts parfaits pour améliorer votre serveur FiveM
            </p>
          </div>

          <button
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - on mobile it's toggled */}
          <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Catégories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === category
                            ? 'bg-blue-600/20 text-blue-400 font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Gamme de prix</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm">${priceRange[0]}</span>
                    <span className="text-gray-400 text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Trier par</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-3 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Le plus récent</option>
                  <option value="popular">Les plus populaires</option>
                  <option value="price-low">Prix : du plus bas au plus élevé</option>
                  <option value="price-high">Prix : du plus élevé au plus bas</option>
                  <option value="rating">Les mieux notés</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Notation</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm text-gray-300"
                      >
                        {rating} Étoiles et plus
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Search and filter bar */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scripts..."
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="hidden md:flex items-center gap-3 text-sm text-gray-400">
                <span>Affichage des scripts {filteredScripts.length}</span>
                <span className="h-4 border-r border-gray-600"></span>
                <div className="flex items-center">
                    Trier:
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-2 bg-transparent text-gray-300 appearance-none cursor-pointer focus:outline-none focus:text-blue-500"
                  >
                    <option value="newest">Le plus récent</option>
                    <option value="popular">Populaire</option>
                    <option value="price-low">Prix : bas-élevé</option>
                    <option value="price-high">Prix : élevé-bas</option>
                  </select>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </div>
              </div>
            </div>

            {/* Scripts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScripts.map(script => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <nav className="flex space-x-2">
                <a href="#" className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700">
                    Précédent
                </a>
                {[1, 2, 3, 4, 5].map(page => (
                  <a
                    key={page}
                    href="#"
                    className={`px-4 py-2 rounded-lg ${
                      page === 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a href="#" className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700">
                  Suivant
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScriptCatalog;
