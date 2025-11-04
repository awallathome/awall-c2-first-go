import { readFileSync } from 'fs';
import { join } from 'path';
import { parseConnections, parseMilestones } from '../utils/data';
import { Connection, Milestone } from '../types';

export function loadConnections(): Connection[] {
  try {
    const filePath = join(process.cwd(), 'public', 'connections.csv');
    const fileContents = readFileSync(filePath, 'utf8');
    return parseConnections(fileContents);
  } catch (error) {
    console.error('Error loading connections:', error);
    return [];
  }
}

export function loadMilestones(): Milestone[] {
  try {
    const filePath = join(process.cwd(), 'public', 'life_milestones.csv');
    const fileContents = readFileSync(filePath, 'utf8');
    return parseMilestones(fileContents);
  } catch (error) {
    console.error('Error loading milestones:', error);
    return [];
  }
}

