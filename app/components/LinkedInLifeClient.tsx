'use client';

import { useState } from 'react';
import { Connection, Milestone } from '../types';
import ConnectionsTab from './ConnectionsTab';
import MilestonesTab from './MilestonesTab';

interface LinkedInLifeClientProps {
  connections: Connection[];
  milestones: Milestone[];
}

export default function LinkedInLifeClient({ connections, milestones }: LinkedInLifeClientProps) {
  const [activeTab, setActiveTab] = useState<'connections' | 'milestones'>('connections');
  
  const birthDate = new Date(1980, 4, 5); // May 5, 1980
  
  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">No data available</div>
          <div className="text-sm text-gray-400">Please check that CSV files are properly loaded</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            LinkedIn Life
          </h1>
          <p className="text-gray-600 mt-1">
            Explore your connections through life's journey
          </p>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[88px] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('connections')}
              className={`py-4 px-2 font-medium text-sm transition-colors relative ${
                activeTab === 'connections'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Connections
              {activeTab === 'connections' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`py-4 px-2 font-medium text-sm transition-colors relative ${
                activeTab === 'milestones'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Milestones
              {activeTab === 'milestones' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'connections' && (
          <ConnectionsTab 
            connections={connections}
            milestones={milestones}
            birthDate={birthDate}
          />
        )}
        {activeTab === 'milestones' && (
          <MilestonesTab 
            connections={connections}
            milestones={milestones}
            birthDate={birthDate}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
          <p>{connections.length} connections • {milestones.length} milestones</p>
        </div>
      </footer>
    </div>
  );
}

