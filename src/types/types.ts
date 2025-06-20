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
export interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}
export interface MainGridProps {
  filteredJobs: Job[];
  totalJobs: number;
  selectedFilters: FilterState;
  handleTagClick: (tag: string, category: FilterCategory) => void;
}