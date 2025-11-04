import { readFileSync } from 'fs';
import { join } from 'path';
import { parseConnections, parseMilestones } from '../utils/data';
import { Connection, Milestone } from '../types';

export function loadConnections(): Connection[] {
  try {
    // Try multiple possible paths for Vercel deployment
    const possiblePaths = [
      join(process.cwd(), 'public', 'connections.csv'),
      join(process.cwd(), 'public', 'Connections.csv'), // Case sensitive
      join('.', 'public', 'connections.csv'),
    ];
    
    let fileContents = '';
    let loadedPath = '';
    
    for (const filePath of possiblePaths) {
      try {
        fileContents = readFileSync(filePath, 'utf8');
        loadedPath = filePath;
        console.log(`Successfully loaded connections from: ${filePath}`);
        break;
      } catch (err) {
        console.log(`Failed to load from ${filePath}:`, (err as Error).message);
      }
    }
    
    if (!fileContents) {
      console.error('Could not load connections.csv from any path');
      console.error('Current working directory:', process.cwd());
      return [];
    }
    
    const connections = parseConnections(fileContents);
    console.log(`Parsed ${connections.length} connections from ${loadedPath}`);
    return connections;
  } catch (error) {
    console.error('Error loading connections:', error);
    return [];
  }
}

export function loadMilestones(): Milestone[] {
  try {
    // Try multiple possible paths for Vercel deployment
    const possiblePaths = [
      join(process.cwd(), 'public', 'life_milestones.csv'),
      join('.', 'public', 'life_milestones.csv'),
    ];
    
    let fileContents = '';
    let loadedPath = '';
    
    for (const filePath of possiblePaths) {
      try {
        fileContents = readFileSync(filePath, 'utf8');
        loadedPath = filePath;
        console.log(`Successfully loaded milestones from: ${filePath}`);
        break;
      } catch (err) {
        console.log(`Failed to load from ${filePath}:`, (err as Error).message);
      }
    }
    
    if (!fileContents) {
      console.error('Could not load life_milestones.csv from any path');
      console.error('Current working directory:', process.cwd());
      return [];
    }
    
    const milestones = parseMilestones(fileContents);
    console.log(`Parsed ${milestones.length} milestones from ${loadedPath}`);
    return milestones;
  } catch (error) {
    console.error('Error loading milestones:', error);
    return [];
  }
}

