"use client"
import React, { useState } from 'react';
import { LayoutGrid, ListIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Breadcrumb from './projectCom/breadcrum';
import ProjectCard from './projectCom/projectCard';
import ImageUpload from './projectCom/UploadImage';
import LocationSection from './projectCom/location';
import { useProjectStore } from './store/projectStore';

// Sample projects data
// First, update the project interface
interface Project {
  id: string;
  name: string;
  code: string;
  completion: number;
  type?: string;
}

// Update the projects array with proper typing
// Helper function to get next ID
const getNextId = (currentProjects: Project[]): string => {
  const maxId = Math.max(...currentProjects.map(p => parseInt(p.id)));
  return (maxId + 1).toString();
};

const projects: Project[] = [
  { id: '1', name: 'Serenity Heights', code: 'SH7625AE4', completion: 81 },
  { id: '2', name: 'Urban Oasis Towers', code: 'UO123F67', completion: 45 },
  { id: '3', name: 'Riverside Residences', code: 'RR567D89', completion: 92 },
  { id: '4', name: 'Golden Valley Estates', code: 'GV890E12', completion: 32 },
  { id: '5', name: 'Skyline Apartments', code: 'SA456F78', completion: 67 },
];

const ProjectList: React.FC = () => {
  const { projects, addProject } = useProjectStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    code: '',
    completion: 0,
    type: ''
  });

  const handleEdit = (id: string) => {
    const project = projectsList.find(p => p.id === id);
    if (project) {
      router.push(`/edit/${id}`);
    }
  };

  const handleAddProject = () => {
    const nextId = getNextId(projects);
    
    const newProjectWithId: Project = {
      id: nextId,
      ...newProject
    };
  
    addProject(newProjectWithId);
    setIsModalOpen(false);
    setNewProject({
      name: '',
      code: '',
      completion: 0,
      type: ''
    });
  };

  <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Add New Project</DialogTitle>
    </DialogHeader>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <Input
            value={newProject.name}
            onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter project name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Project Code</label>
          <Input
            value={newProject.code}
            onChange={(e) => setNewProject(prev => ({ ...prev, code: e.target.value }))}
            placeholder="Enter project code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Project Type</label>
          <select
            value={newProject.name}
            onChange={(e) => setNewProject(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#e01e5a] focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed Use</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button 
          className="bg-brandRed hover:bg-brandRed/90"
          onClick={() => handleAddProject()}
        >
          Add Project
        </Button>
      </div>
    </div>
  </DialogContent>

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Projects', current: true }]} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <div className="flex items-center gap-4">
          <div className="relative md:flex hidden">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search projects..." className="pl-10 w-64" />
          </div>
          <div className="md:flex border hidden rounded-md">
            <Button variant="ghost" size="icon" className="rounded-r-none border-r">
              <ListIcon size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-l-none">
              <LayoutGrid size={18} />
            </Button>
          </div>
          <Button 
            className="bg-brandRed hover:bg-brandRed/90"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon size={16} className="mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsList.map(project => (
          <ProjectCard 
            key={project.id}
            {...project}
            onEdit={() => handleEdit(project.id)}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <Input
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Code</label>
              <Input
                value={newProject.code}
                onChange={(e) => setNewProject(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Enter project code"
              />
            </div>
            

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-brandRed hover:bg-brandRed/90"
                onClick={handleAddProject}
              >
                Add Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectList;
