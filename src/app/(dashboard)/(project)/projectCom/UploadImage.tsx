
import React, { useState } from 'react';
import { UploadIcon, PlusCircleIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  description: string;
  isPrimary: boolean;
}

interface ImageUploadProps {
  onUpload?: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>(['']);
  const [isReraRegistered, setIsReraRegistered] = useState<boolean | null>(null);
  const [reraNumbers, setReraNumbers] = useState<string[]>(['']);
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    
    // Process new files
    const newImages = filesArray.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      url: URL.createObjectURL(file),
      description: '',
      isPrimary: uploadedImages.length === 0 // First image is primary by default
    }));
    
    setUploadedImages(prev => [...prev, ...newImages]);
    
    if (onUpload) {
      onUpload(filesArray);
    }
  };
  
  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      
      // If we removed the primary image, make the first one primary
      if (prev.find(img => img.id === id)?.isPrimary && filtered.length > 0) {
        filtered[0].isPrimary = true;
      }
      
      return filtered;
    });
  };
  
  const handleDescriptionChange = (id: string, value: string) => {
    setUploadedImages(prev => 
      prev.map(img => img.id === id ? { ...img, description: value } : img)
    );
  };
  
  // Update the handlePrimaryChange function
  const handlePrimaryChange = (id: string, checked: boolean) => {
    if (checked) {
      // When checked, set the clicked image as primary and others to false.
      setUploadedImages(prev =>
        prev.map(img => ({
          ...img,
          isPrimary: img.id === id,
        }))
      );
    } else {
      // If you want to allow unchecking (i.e. no primary image), update accordingly.
      // For example, simply uncheck the clicked image:
      setUploadedImages(prev =>
        prev.map(img =>
          img.id === id ? { ...img, isPrimary: false } : img
        )
      );
      // Note: if your design always requires one primary image,
      // you might not want to allow unchecking.
    }
  };
  
  
  
  const addYoutubeUrl = () => {
    setYoutubeUrls(prev => [...prev, '']);
  };
  
  const handleYoutubeUrlChange = (index: number, value: string) => {
    setYoutubeUrls(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  const addReraNumber = () => {
    setReraNumbers(prev => [...prev, '']);
  };
  
  const handleReraNumberChange = (index: number, value: string) => {
    setReraNumbers(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Images</h2>
      
      {uploadedImages.length === 0 ? (
        <div 
          className={`image-upload-area ${isDragging ? 'border-brandRed bg-brandRed/5' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 mb-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
              <path d="M8 21H16C18.8284 21 20.2426 21 21.1213 20.1213C22 19.2426 22 17.8284 22 15V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V15C2 17.8284 2 19.2426 2.87868 20.1213C3.75736 21 5.17157 21 8 21Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M21.1213 7.87868C20.2426 7 18.8284 7 16 7H8C5.17157 7 3.75736 7 2.87868 7.87868M2.87868 16.1213C3.75736 17 5.17157 17 8 17H16C18.8284 17 20.2426 17 21.1213 16.1213" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">Click or drag images here to upload</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Support for JPG, PNG and GIF files
          </p>
          <label>
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="px-4 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors cursor-pointer inline-flex items-center gap-2">
              <UploadIcon size={16} />
              <span>Select Files</span>
            </div>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Uploaded Images</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uploadedImages.map(image => (
              <div key={image.id} className="border rounded-md overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={image.url} 
                    alt="Uploaded" 
                    className="w-full h-full object-contain"
                  />
                  <button 
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <XIcon size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Input 
                      value={image.description} 
                      onChange={(e) => handleDescriptionChange(image.id, e.target.value)}
                      placeholder="Enter description"
                      className="h-9 focus:border-[#e01e5a] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Set Primary</span>
                    {/* Update the Switch component styling */}
                    <Switch
                       checked={image.isPrimary}
                       onCheckedChange={(checked) => handlePrimaryChange(image.id, checked)}
                       className="data-[state=checked]:bg-[#e01e5a] data-[state=checked]:border-[#e01e5a] data-[state=unchecked]:bg-gray-200"
                       aria-label="Set as primary image"
                     />
                  </div>
                </div>
              </div>
            ))}
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-md h-48 flex flex-col items-center justify-center cursor-pointer hover:border-brandRed"
              onClick={() => document.getElementById('add-more-images')?.click()}
            >
              <PlusCircleIcon size={32} className="mb-2 text-muted-foreground" />
              <span className="text-sm font-medium">Add another image</span>
              <input 
                id="add-more-images"
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
          
          <div className="text-sm text-red-500 mt-2">
            Add atleast one media
          </div>
        </div>
      )}
       <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">YouTube URLs</h3>
            {youtubeUrls.map((url, index) => (
              <div key={index} className="mb-4">
                <Input
                  value={url}
                  onChange={(e) => handleYoutubeUrlChange(index, e.target.value)}
                  placeholder="youtube.com/"
                  className="mb-2 focus:border-[#e01e5a] focus:outline-none"
                />
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={addYoutubeUrl}
            >
              <PlusCircleIcon size={16} />
              Add another URL
            </Button>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Is the project RERA registered?</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="rera-yes"
                  name="rera-registered"
                  className="mr-2"
                  checked={isReraRegistered === true}
                  onChange={() => setIsReraRegistered(true)}
                />
                <Label htmlFor="rera-yes">Yes</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="rera-no"
                  name="rera-registered"
                  className="mr-2"
                  checked={isReraRegistered === false}
                  onChange={() => setIsReraRegistered(false)}
                />
                <Label htmlFor="rera-no">No</Label>
              </div>
            </div>
            
            {isReraRegistered && (
              <div>
                <h3 className="text-lg font-medium mb-4">RERA Number(s)</h3>
                {reraNumbers.map((number, index) => (
                  <div key={index} className="mb-4">
                    <Input
                      value={number}
                      onChange={(e) => handleReraNumberChange(index, e.target.value)}
                      placeholder="Enter RERA number"
                      className="mb-2"
                    />
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={addReraNumber}
                >
                  <PlusCircleIcon size={16} />
                  Add another RERA number
                </Button>
              </div>
            )}
          </div>
    </div>
  );
};

export default ImageUpload;
