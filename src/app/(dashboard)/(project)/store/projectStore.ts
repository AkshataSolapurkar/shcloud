import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  code: string;
  completion: number;
  type?: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [
    { id: '1', name: 'Serenity Heights', code: 'SH7625AE4', completion: 81 },
    { id: '2', name: 'Urban Oasis Towers', code: 'UO123F67', completion: 45 },
    { id: '3', name: 'Riverside Residences', code: 'RR567D89', completion: 92 },
    { id: '4', name: 'Golden Valley Estates', code: 'GV890E12', completion: 32 },
    { id: '5', name: 'Skyline Apartments', code: 'SA456F78', completion: 67 },
  ],
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  getProject: (id) => get().projects.find(p => p.id === id),
}));