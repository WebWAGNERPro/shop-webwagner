import React, { useState, useEffect } from 'react';
import ScriptCard from './ScriptCard';
import { Filter, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Datas from '@/lib/datas';
import { Script } from '@/types';

interface ScriptCatalogProps {
  onScriptClick: (script: Script) => void;
}

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
  'Admin Tools',
  'Base'
];

const ScriptCatalog: React.FC<ScriptCatalogProps> = ({ onScriptClick }) => {
  const { scripts }: { scripts: Script[] } = Datas();
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [paginationRange, setPaginationRange] = useState<number[]>([]);

  // Filter scripts based on active category and search term
  const getFilteredScripts = () => {
    let filtered = scripts;

    // Apply category filter
    if (activeCategory !== 'All Categories') {
      filtered = filtered.filter(script => script.category === activeCategory);
    }

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(script =>
        script.title.toLowerCase().includes(term) ||
        script.description?.toLowerCase().includes(term)
      );
    }

    // Apply price filter
    filtered = filtered.filter(script =>
      script.price >= priceRange[0] && script.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return filtered;
  };

  const filteredScripts = getFilteredScripts();

  // Calculate pagination
  const totalPages = Math.ceil(filteredScripts.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredScripts.slice(indexOfFirstItem, indexOfLastItem);

  // Update pagination range when page or total pages changes
  useEffect(() => {
    // Reset to page 1 if current page is out of bounds
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      return;
    }

    const createPaginationRange = () => {
      const delta = 1; // Number of pages to show before and after current page
      const range: number[] = [];

      // Always show first page
      range.push(1);

      // Calculate range around current page
      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      // Always show last page if there is more than one page
      if (totalPages > 1) {
        range.push(totalPages);
      }

      // Add ellipsis indicators (using the number -1 to represent them)
      const finalRange: number[] = [];
      let prev = 0;

      for (const page of range) {
        if (prev && page - prev > 1) {
          finalRange.push(-1); // Ellipsis indicator
        }
        finalRange.push(page);
        prev = page;
      }

      return finalRange;
    };

    setPaginationRange(createPaginationRange());
  }, [currentPage, totalPages]);

  // Page change handler
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of grid
      window.scrollTo({ top: document.getElementById('scripts-grid')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

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
                        onClick={() => {
                          setActiveCategory(category);
                          setCurrentPage(1); // Reset to first page on category change
                        }}
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
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                      setCurrentPage(1); // Reset to first page on price change
                    }}
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
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1); // Reset to first page on sort change
                  }}
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="hidden md:flex items-center gap-3 text-sm text-gray-400">
                <span>Affichage {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredScripts.length)} sur {filteredScripts.length} scripts</span>
                <span className="h-4 border-r border-gray-600"></span>
                <div className="flex items-center">
                  Trier:
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1); // Reset to first page on sort change
                    }}
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
            <div id="scripts-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.length > 0 ? (
                currentItems.map(script => (
                  <ScriptCard key={script.id} script={script} onScriptClick={onScriptClick} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-gray-400 text-lg">Aucun script ne correspond à vos critères de recherche.</p>
                </div>
              )}
            </div>

            {/* Improved Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center space-x-2">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-3 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label="Page précédente"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="ml-1 hidden sm:inline">Précédent</span>
                  </button>

                  {/* Page numbers */}
                  <div className="flex space-x-1">
                    {paginationRange.map((page, index) => (
                      page === -1 ? (
                        // Ellipsis
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        // Page number
                        <button
                          key={`page-${page}`}
                          onClick={() => handlePageChange(page)}
                          className={`flex items-center justify-center min-w-10 h-10 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-3 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label="Page suivante"
                  >
                    <span className="mr-1 hidden sm:inline">Suivant</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}

            {/* Items per page selector */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center text-sm text-gray-400">
                <label className="flex items-center">
                  Scripts par page:
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page when changing items per page
                    }}
                    className="ml-2 bg-gray-800 text-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="9">9</option>
                    <option value="18">18</option>
                    <option value="27">27</option>
                    <option value="36">36</option>
                  </select>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScriptCatalog;
