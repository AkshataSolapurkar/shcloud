"use client"
import React from 'react';
import { LayoutGrid, ListIcon, PlusIcon, SearchIcon, PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Breadcrumb from './projectCom/breadcrum';
import ProjectCard from './projectCom/projectCard';

// Sample projects data
const projects = [
  { id: '1', name: 'Serenity Heights', code: 'SH7625AE4', completion: 81 },
  { id: '2', name: 'Urban Oasis Towers', code: 'UO123F67', completion: 45 },
  { id: '3', name: 'Riverside Residences', code: 'RR567D89', completion: 92 },
  { id: '4', name: 'Golden Valley Estates', code: 'GV890E12', completion: 32 },
  { id: '5', name: 'Skyline Apartments', code: 'SA456F78', completion: 67 },
];

const ProjectList: React.FC = () => {
  const router = useRouter(); // Initialize router

  // Function to handle edit navigation
  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  return (
    <div className="p-6">
      <Breadcrumb 
        items={[
          { label: 'Projects', current: true }
        ]}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search projects..." 
              className="pl-10 w-64" 
            />
          </div>
          <div className="flex border rounded-md">
            <Button variant="ghost" size="icon" className="rounded-r-none border-r">
              <ListIcon size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-l-none">
              <LayoutGrid size={18} />
            </Button>
          </div>
          <Button>
            <PlusIcon size={16} className="mr-2" />
            Add Project
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <ProjectCard 
            key={project.id}
            id={project.id}
            name={project.name}
            code={project.code}
            completion={project.completion}
            onEdit={() => handleEdit(project.id)} // Pass handleEdit function
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
