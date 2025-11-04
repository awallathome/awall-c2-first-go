import { loadConnections, loadMilestones } from './lib/loadData';
import LinkedInLifeClient from './components/LinkedInLifeClient';

export default function Home() {
  const connections = loadConnections();
  const milestones = loadMilestones();
  
  return (
    <LinkedInLifeClient 
      connections={connections}
      milestones={milestones}
    />
  );
}
