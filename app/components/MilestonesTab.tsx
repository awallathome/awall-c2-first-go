'use client';

import { useState } from 'react';
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
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(
    new Set(milestones.map(m => m.description))
  );
  
  const toggleMilestone = (description: string) => {
    setExpandedMilestones(prev => {
      const newSet = new Set(prev);
      if (newSet.has(description)) {
        newSet.delete(description);
      } else {
        newSet.add(description);
      }
      return newSet;
    });
  };
  return (
    <div className="space-y-6">
      {milestones.map((milestone, idx) => {
        const nextMilestone = milestones[idx + 1];
        const connectionsAfter = getConnectionsAfterMilestone(
          connections,
          milestone,
          nextMilestone
        );
        const isExpanded = expandedMilestones.has(milestone.description);
        
        return (
          <div 
            key={milestone.description}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
          >
            {/* Milestone Header - Clickable */}
            <button
              onClick={() => toggleMilestone(milestone.description)}
              className="w-full px-6 py-5 border-b border-gray-200 text-left hover:bg-gray-50 transition-colors"
              style={{ 
                borderLeftWidth: '6px',
                borderLeftColor: milestone.color
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-1">
                    <MilestoneCard milestone={milestone} birthDate={birthDate} />
                    <div className="text-sm text-gray-600 mt-2">
                      {milestone.milestoneType}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
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
                    {/* Chevron Icon */}
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
            
            {/* Connections List - Collapsible */}
            <div 
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
              style={{
                overflow: 'hidden'
              }}
            >
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
          </div>
        );
      })}
    </div>
  );
}

