
import React, { useState } from 'react';
import { Check, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Amenity {
  id: string;
  label: string;
  selected: boolean;
}

const amenitiesData = [
  { id: '1', label: 'School in vicinity', selected: false },
  { id: '2', label: 'Adjoining Metro Station', selected: false },
  { id: '3', label: 'Peaceful vicinity', selected: false },
  { id: '4', label: 'Near City Center', selected: false },
  { id: '5', label: 'Safe & Secure Locality', selected: false },
  { id: '6', label: 'Desperate Sale', selected: false },
  { id: '7', label: 'Breakthrough Price', selected: false },
  { id: '8', label: 'Quick Deal', selected: false },
  { id: '9', label: 'Investment Opportunity', selected: true },
  { id: '10', label: 'High Rental Yield', selected: false },
  { id: '11', label: 'Affordable', selected: false },
  { id: '12', label: 'Reputed Builder', selected: false },
  { id: '13', label: 'Well Ventilated', selected: false },
  { id: '14', label: 'Fully Renovated', selected: false },
  { id: '15', label: 'Vastu Compliant', selected: false },
  { id: '16', label: 'Spacious', selected: false },
  { id: '17', label: 'Ample Parking', selected: false },
  { id: '18', label: 'Free Hold', selected: false },
  { id: '19', label: 'Gated Society', selected: false },
  { id: '20', label: 'Tasteful Interior', selected: false },
  { id: '21', label: 'Prime Location', selected: false },
  { id: '22', label: 'Luxury Lifestyle', selected: false },
  { id: '23', label: 'Well Maintained', selected: false },
  { id: '24', label: 'Plenty of Sunlight', selected: false },
  { id: '25', label: 'Newly Built', selected: false },
  { id: '26', label: 'Family', selected: false },
  { id: '27', label: 'Bachelors', selected: false },
  { id: '28', label: 'Females Only', selected: false },
];

interface AmenityListProps {
  onUpdate?: (selectedCount: number, totalCount: number) => void;
}

const AmenityList: React.FC<AmenityListProps> = ({ onUpdate }) => {
  const [amenities, setAmenities] = useState<Amenity[]>(amenitiesData);
  const [allSelected, setAllSelected] = useState(false);
  
  const toggleAmenity = (id: string) => {
    const updatedAmenities = amenities.map(amenity => 
      amenity.id === id ? { ...amenity, selected: !amenity.selected } : amenity
    );
    
    setAmenities(updatedAmenities);
    
    if (onUpdate) {
      const selectedCount = updatedAmenities.filter(a => a.selected).length;
      onUpdate(selectedCount, updatedAmenities.length);
    }
  };
  
  const toggleSelectAll = () => {
    const updatedAmenities = amenities.map(amenity => ({ ...amenity, selected: !allSelected }));
    setAmenities(updatedAmenities);
    setAllSelected(!allSelected);
    
    if (onUpdate) {
      onUpdate(allSelected ? 0 : updatedAmenities.length, updatedAmenities.length);
    }
  };
  
  // Calculate how many amenities should be in each column for a 3-column layout
  const itemsPerColumn = Math.ceil(amenities.length / 3);
  const firstColumn = amenities.slice(0, itemsPerColumn);
  const secondColumn = amenities.slice(itemsPerColumn, itemsPerColumn * 2);
  const thirdColumn = amenities.slice(itemsPerColumn * 2);
  
  const AmenityCheckbox: React.FC<{ amenity: Amenity }> = ({ amenity }) => (
    <div 
      className="flex items-center gap-3 mb-4 cursor-pointer"
      onClick={() => toggleAmenity(amenity.id)}
    >
      <div className={cn(
        "amenity-checkbox",
        amenity.selected && "checked"
      )}>
        {amenity.selected && <Check size={14} color="white" />}
      </div>
      <span className="text-sm">{amenity.label}</span>
    </div>
  );
  
  return (
    <div className="mt-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Amenities</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm flex items-center gap-1"
          onClick={toggleSelectAll}
        >
          <PlusIcon size={14} />
          {allSelected ? 'Unselect All' : 'Select All'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          {firstColumn.map(amenity => (
            <AmenityCheckbox key={amenity.id} amenity={amenity} />
          ))}
        </div>
        <div>
          {secondColumn.map(amenity => (
            <AmenityCheckbox key={amenity.id} amenity={amenity} />
          ))}
        </div>
        <div>
          {thirdColumn.map(amenity => (
            <AmenityCheckbox key={amenity.id} amenity={amenity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenityList;
