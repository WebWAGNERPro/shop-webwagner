import React from 'react';
import { ChevronRight } from 'lucide-react';
import { featuredScripts } from '../data/scripts';
import ScriptCard from './ScriptCard';

// Define or import the Script type
import { Script } from '../types';
const FeaturedScripts = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Scripts en vedette</h2>
            <p className="text-gray-400 max-w-xl">
                Nos scripts les plus populaires et les mieux notés, sélectionnés avec soin par notre équipe.
            </p>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 inline-flex items-center text-blue-500 hover:text-blue-400 font-medium"
          >
            Voir tous les scripts
            <ChevronRight className="ml-1 h-5 w-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredScripts.map((script: Script) => (
            <ScriptCard key={script.id} script={script} featured />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedScripts;
