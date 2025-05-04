import React, { useState } from 'react';
import { Star, ShoppingCart, Code, Download, MessageSquare, Heart, Share2, Shield, Zap, CheckCircle2, X } from 'lucide-react';

import { formatSales } from '@/lib/formatting';

interface ScriptDisplayProps {
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
    features?: string[];
    screenshots?: string[];
    version?: string;
    lastUpdate?: string;
    sales_count?: number;
    requirements?: string[];
    documentation?: string;
  };
  onClose: () => void;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script, onClose }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(script.image);

  const originalPrice = script.price;
  const finalPrice = script.isOnSale ? originalPrice - (originalPrice * (script.discount || 0) / 100) : originalPrice;

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-24 right-8 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors z-50"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-8">
        <button onClick={onClose} className="hover:text-blue-500">Home</button>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-blue-500">{script.category}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-300">{script.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={script.title}
              className="w-full h-full object-cover"
            />
            {script.isNew && (
              <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                NEW
              </div>
            )}
            {script.isOnSale && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {script.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedImage(script.image)}
              className={`aspect-video rounded-lg overflow-hidden border-2 ${
                selectedImage === script.image ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={script.image}
                alt="Main"
                className="w-full h-full object-cover"
              />
            </button>
            {script.screenshots?.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(screenshot)}
                className={`aspect-video rounded-lg overflow-hidden border-2 ${
                  selectedImage === screenshot ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Info */}
        <div>
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">{script.title}</h1>
              <div className="flex space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < script.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
                <span className="ml-2 text-gray-400">({script.rating.toFixed(1)})</span>
              </div>
                {(() => {
                if (script.sales_count && script.sales_count > 10) {
                    return (
                    <>
                        <span className="text-gray-400">|</span>
                        <div className="flex items-center ml-4">
                        <Download className="w-5 h-5 text-gray-400 mr-1" />
                        <span className="text-gray-400">{formatSales(script.sales_count)} downloads</span>
                        </div>
                    </>
                    );
                }
                return null;
                })()}
            </div>

            <div className="mb-8">
              <div className="flex items-baseline mb-4">
                {script.isOnSale && (
                  <span className="text-gray-400 line-through text-xl mr-3">${originalPrice}</span>
                )}
                <span className="text-4xl font-bold text-white">${finalPrice.toFixed(2)}</span>
                {script.isOnSale && (
                  <span className="ml-3 bg-red-600/20 text-red-400 text-sm font-medium px-3 py-1 rounded-full">
                    Save ${(originalPrice - finalPrice).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all hover:translate-y-[-2px]">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:translate-y-[-2px]">
                  Live Preview
                </button>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Secure & Optimized</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Zap className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Regular Updates</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Premium Support</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Clean Code</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">Compatible with your server</span>
                </div>
                <span className="text-sm text-gray-400">v{script.version}</span>
              </div>
              <div className="text-sm text-gray-400">
                Last updated: {script.lastUpdate}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex border-b border-gray-700">
              <button
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'requirements'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('requirements')}
              >
                Requirements
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'documentation'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('documentation')}
              >
                Documentation
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{script.description}</p>
                  <ul className="mt-4 space-y-2">
                    {script.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

                {activeTab === 'requirements' && (
                <div>
                    <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Shield className="h-5 w-5 text-blue-500 mr-2" />
                        Configuration requise
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {script.requirements?.map((req, index) => (
                        <div
                            key={index}
                            className="flex items-start bg-gray-900/60 p-3 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors"
                        >
                            <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{req}</span>
                        </div>
                        ))}
                    </div>

                    {/* Note optionnelle */}
                    <div className="mt-6 flex items-start text-sm text-gray-400 bg-gray-900/40 p-3 rounded-lg">
                        <div className="bg-blue-500/20 p-2 rounded-lg mr-3 flex-shrink-0">
                        <Zap className="h-4 w-4 text-blue-400" />
                        </div>
                        <p>
                        Ces exigences minimales sont recommandées pour une performance optimale.
                        Contactez-nous si vous avez des questions sur la compatibilité avec votre configuration.
                        </p>
                    </div>
                    </div>
                </div>
                )}

              {activeTab === 'documentation' && (
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: script.documentation || '' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptDisplay;
