import React from 'react';
import { PencilIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: string;
  name: string;
  code: string;
  completion: number;
  onEdit: () => void; // Add onEdit prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, code, completion, onEdit }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <button onClick={onEdit} className="text-gray-500 hover:text-gray-800">
          <PencilIcon size={18} />
        </button>
      </div>
      <p className="text-sm text-muted-foreground">{code}</p>
      <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
        <div 
          className={cn(
            "progress-bar-fill", 
            completion >= 80 ? "bg-green-500" : 
            completion >= 50 ? "bg-yellow-500" : 
            "bg-brandRed"
          )} 
          style={{ width: `${completion}%` }} 
        />
      </div>
    </div>
  );
};

export default ProjectCard;
