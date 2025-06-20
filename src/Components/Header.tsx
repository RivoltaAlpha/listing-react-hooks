import React from 'react';
import type { FilterCategory, HeaderProps } from '../types/types';

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilters,
  removeFilter,
  clearAllFilters
}) => {
  // Get all active filters as flat array
  const getAllActiveFilters = (): Array<{ tag: string; category: FilterCategory }> => {
    const activeFilters: Array<{ tag: string; category: FilterCategory }> = [];
    
    Object.entries(selectedFilters).forEach(([category, tags]) => {
    (tags as string[]).forEach((tag: string): void => {
      activeFilters.push({ tag, category: category as FilterCategory });
    });
    });
    
    return activeFilters;
  };

  const hasActiveFilters = (): boolean => {
    return Object.values(selectedFilters).some(filters => filters.length > 0) || searchTerm !== '';
  };

  return (
    <header 
      className="bg-teal-500 text-center py-5 px-5 mx-1 mt-1 rounded-sm relative overflow-hidden header-bg"
    >
      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-black mb-4">Job Listings</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role or language..."
            className="px-5 py-5 border border-blue-600 rounded-lg w-full md:w-80 mb-4 md:mb-0"
          />
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        {/* Active Filters */}
        {getAllActiveFilters().length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {getAllActiveFilters().map(({ tag, category }) => (
              <div key={`${category}-${tag}`} className="flex items-center bg-white rounded-md overflow-hidden">
                <span className="px-3 py-1 text-teal-600 font-medium">{tag}</span>
                <button
                  onClick={() => removeFilter(tag, category)}
                  className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;