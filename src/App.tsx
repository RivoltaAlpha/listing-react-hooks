import JobListings from './Components/JobListings';
import jobsData from './data.json';

const App: React.FC = () => {
  return <JobListings jobsData={jobsData} />;
};

export default App;