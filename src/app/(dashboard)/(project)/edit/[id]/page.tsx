'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Breadcrumb from '../../projectCom/breadcrum';
import AmenityList from '../../projectCom/Amenitylist';
import ImageUpload from '../../projectCom/UploadImage';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LocationSection from '../../projectCom/location';

// Demo projects data - would be fetched from API in real app
const projects = [
  { id: '1', name: 'Serenity Heights', completion: 81 },
  { id: '2', name: 'Urban Oasis Towers', completion: 45 },
  { id: '3', name: 'Riverside Residences', completion: 92 },
  { id: '4', name: 'Golden Valley Estates', completion: 32 },
  { id: '5', name: 'Skyline Apartments', completion: 67 },
];

const ProjectEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [project, setProject] = useState<{ id: string, name: string } | null>(null);
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        setProgress(foundProject.completion);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAmenityUpdate = (selectedCount: number, totalCount: number) => {
    const newProgress = Math.round((selectedCount / totalCount) * 100);
    setProgress(newProgress);
  };
  
  const handleImageUpload = (files: File[]) => {
    toast.success(`${files.length} images uploaded successfully`);
  };
  
  const handleSave = () => {
    toast.success('Project updated successfully');
    setTimeout(() => route.push('/'), 1500);
  };
  
  if (loading) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-full mt-6"></div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been removed
          </p>
          <Button onClick={() => route.push('/')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <Breadcrumb 
        items={[
          { label: 'Project', path: '/' },
          { label: 'Edit', current: true }
        ]}
        projectId={`6766f1eebe473572cfa630e7`}
      />
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Update Amenities</h1>
        <p className="text-muted-foreground">
          Fill out the amenities below about this new project
        </p>
        
        <div className="mt-4">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm mt-1">{progress}% Complete</div>
        </div>
      </div>
      
      <AmenityList onUpdate={handleAmenityUpdate} />
      
      <ImageUpload onUpload={handleImageUpload} />
      <LocationSection/>
      
      <div className="mt-10 flex justify-between">
        <Button 
          variant="outline" 
          className="mr-4"
          onClick={() => route.push('/')}
        >
            Previous
        </Button>
        <Button 
          onClick={handleSave}
          style={{ backgroundColor: '#e01e5a' }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProjectEdit;
