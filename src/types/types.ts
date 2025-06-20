
// TypeScript interfaces
export type FilterCategory = 'role' | 'level' | 'languages' | 'tools';

export interface FilterState {
  role: string[];
  level: string[];
  languages: string[];
  tools: string[];
}

export interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilters: FilterState;
  removeFilter: (tag: string, category: FilterCategory) => void;
  clearAllFilters: () => void;
}