import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, Code } from 'lucide-react';
import { Script } from '@/types';

interface ScriptCardProps {
  script: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    image: string;
    isNew?: boolean;
    isFeatured?: boolean;
    isOnSale?: boolean;
    discount?: number;
  };
  featured?: boolean;
  onScriptClick?: (script: Script) => void;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script, featured = false, onScriptClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const originalPrice = script.price;
  const finalPrice = script.isOnSale ? originalPrice - (originalPrice * (script.discount || 0) / 100) : originalPrice;

  return (
    <div
      className={`group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden transition-all duration-300 h-full
        ${featured ? 'shadow-xl shadow-blue-900/20' : 'shadow-lg hover:shadow-xl hover:shadow-blue-900/10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={script.image}
          alt={script.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
          {script.category}
        </div>

        {/* New badge */}
        {script.isNew && (
          <div className="absolute top-3 right-3 bg-green-600/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded uppercase">
            nouveauté
          </div>
        )}

        {/* Sale badge */}
        {script.isOnSale && (
          <div className="absolute bottom-3 left-3 bg-red-600/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded flex items-center">
            <span className="font-bold mr-1">{script.discount}%</span> OFF
          </div>
        )}

        {/* Quick actions overlay - shows on hover */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
                onClick={() => onScriptClick?.(script)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full transition-transform hover:scale-110"
            >
                <Eye className="h-5 w-5" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-transform hover:scale-110">
                <ShoppingCart className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {script.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {script.description}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < script.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">({script.rating.toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Code className="w-4 h-4 text-blue-400 mr-1.5" />
            <span className="text-gray-400 text-xs">FiveM Compatible</span>
          </div>

          <div className="flex items-end">
            {script.isOnSale && (
              <span className="text-gray-500 line-through text-sm mr-2">${originalPrice}</span>
            )}
            <span className="text-white font-bold">${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Featured highlight */}
      {script.isFeatured && (
        <div className="absolute -right-12 top-6 bg-blue-600 text-white text-xs font-bold py-1 px-12 rotate-45 transform origin-bottom-right">
          FEATURED
        </div>
      )}
    </div>
  );
};

export default ScriptCard;
