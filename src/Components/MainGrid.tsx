import type { Job, MainGridProps } from '../types/types';

const MainGrid = ({filteredJobs, totalJobs, selectedFilters,handleTagClick}:MainGridProps ) => {
  return (
    <main className="flex justify-center p-5 mt-10">
      <div className="w-full max-w-6xl">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {totalJobs === 0 
                ? 'No jobs available.' 
                : 'No jobs match your search criteria.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredJobs.map((job: Job) => (
              <div
                key={job.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-5 border-l-4 h-40 ${
                  job.featured ? 'border-teal-400' : 'border-gray-200'
                } flex flex-col md:flex-row items-start md:items-center gap-4`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-teal-600 font-medium text-sm md:text-base">
                      {job.company}
                    </h3>
                    {job.new && (
                      <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        NEW!
                      </span>
                    )}
                    {job.featured && (
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-medium">
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-gray-800 text-lg md:text-xl font-semibold mb-2 hover:text-teal-600 cursor-pointer transition-colors">
                    {job.position}
                  </h2>
                  
                  <div className="text-gray-500 text-sm flex flex-wrap gap-1">
                    <span>{job.postedAt}</span>
                    <span>•</span>
                    <span>{job.contract}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>

                {/* buttons */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button
                    type='button'
                    onClick={() => handleTagClick(job.role, 'role')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedFilters.role.includes(job.role)
                        ? 'bg-teal-500 text-white'
                        : 'bg-teal-100 text-teal-600 hover:bg-teal-500 hover:text-white'
                    }`}
                    >
                    {job.role}
                  </button>
                  <button
                    type='button'
                    onClick={() => handleTagClick(job.level, 'level')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedFilters.level.includes(job.level)
                        ? 'bg-teal-500 text-white'
                        : 'bg-teal-100 text-teal-600 hover:bg-teal-500 hover:text-white'
                    }`}
                  >
                    {job.level}
                  </button>
                  {job.languages.map((lang: string) => (
                      <button
                      type='button'
                      key={lang}
                      onClick={() => handleTagClick(lang, 'languages')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedFilters.languages.includes(lang)
                          ? 'bg-teal-500 text-white'
                          : 'bg-teal-100 text-teal-600 hover:bg-teal-500 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                  {job.tools.map((tool: string) => (
                      <button
                      type='button'
                      key={tool}
                      onClick={() => handleTagClick(tool, 'tools')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedFilters.tools.includes(tool)
                          ? 'bg-teal-500 text-white'
                          : 'bg-teal-100 text-teal-600 hover:bg-teal-500 hover:text-white'
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MainGrid;