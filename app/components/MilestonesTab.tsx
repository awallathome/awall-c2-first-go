'use client';

import { Connection, Milestone } from '../types';
import { getConnectionsAfterMilestone } from '../utils/data';
import ConnectionCard from './ConnectionCard';
import MilestoneCard from './MilestoneCard';

interface MilestonesTabProps {
  connections: Connection[];
  milestones: Milestone[];
  birthDate: Date;
}

export default function MilestonesTab({ connections, milestones, birthDate }: MilestonesTabProps) {
  return (
    <div className="space-y-6">
      {milestones.map((milestone, idx) => {
        const nextMilestone = milestones[idx + 1];
        const connectionsAfter = getConnectionsAfterMilestone(
          connections,
          milestone,
          nextMilestone
        );
        
        return (
          <div 
            key={milestone.description}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* Milestone Header */}
            <div 
              className="px-6 py-5 border-b border-gray-200"
              style={{ 
                borderLeftWidth: '6px',
                borderLeftColor: milestone.color
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <MilestoneCard milestone={milestone} birthDate={birthDate} />
                  <div className="text-sm text-gray-600 mt-2">
                    {milestone.milestoneType}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {connectionsAfter.length} connection{connectionsAfter.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {nextMilestone 
                      ? `Until ${nextMilestone.description}`
                      : 'To present'
                    }
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connections List */}
            {connectionsAfter.length > 0 ? (
              <div className="bg-gray-50 divide-y divide-gray-100">
                {connectionsAfter.map((connection, connIdx) => (
                  <ConnectionCard key={connIdx} connection={connection} />
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                No connections made during this period
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

