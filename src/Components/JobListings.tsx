import React, { useState, useEffect } from 'react';
import MainGrid from './MainGrid';
import type { FilterCategory, FilterState, Job } from '../types/types';
import Header from './Header';

interface JobListingsProps {
  jobsData?: Job[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobsData = [] }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    role: [],
    level: [],
    languages: [],
    tools: []
  });

  // Filter jobs whenever search term, filters, or job data changes
  useEffect(() => {
    const filtered = jobsData.filter((job: Job) => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filters
      const matchesRole = selectedFilters.role.length === 0 || 
        selectedFilters.role.includes(job.role);
      
      const matchesLevel = selectedFilters.level.length === 0 || 
        selectedFilters.level.includes(job.level);
      
      const matchesLanguages = selectedFilters.languages.length === 0 || 
        selectedFilters.languages.some(lang => job.languages.includes(lang));
      
      const matchesTools = selectedFilters.tools.length === 0 || 
        selectedFilters.tools.some(tool => job.tools.includes(tool));

      return matchesSearch && matchesRole && matchesLevel && matchesLanguages && matchesTools;
    });

    setFilteredJobs(filtered);
  }, [jobsData, searchTerm, selectedFilters]);

  // Handle tag click for filtering
  const handleTagClick = (tag: string, category: FilterCategory): void => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category];
      if (categoryFilters.includes(tag)) {
        // Remove filter if already selected
        return {
          ...prev,
          [category]: categoryFilters.filter(item => item !== tag)
        };
      } else {
        // Add filter if not selected
        return {
          ...prev,
          [category]: [...categoryFilters, tag]
        };
      }
    });
  };

  // Remove specific filter
  const removeFilter = (tagToRemove: string, category: FilterCategory): void => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(tag => tag !== tagToRemove)
    }));
  };

  // Clear all filters
  const clearAllFilters = (): void => {
    setSelectedFilters({
      role: [],
      level: [],
      languages: [],
      tools: []
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
      />
      <MainGrid
        filteredJobs={filteredJobs}
        totalJobs={jobsData.length}
        selectedFilters={selectedFilters}
        handleTagClick={handleTagClick}
      />
    </div>
  );
};

export default JobListings;