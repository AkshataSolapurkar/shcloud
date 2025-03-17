import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';

const LocationSection: React.FC = () => {
  const [landmark, setLandmark] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const landmarks = ['Park', 'Mall', 'School', 'Hospital', 'Metro Station', 'Bus Stop', 'Airport'];
  
  return (
    <div className="space-y-6 border shadow-sm mt-5 border-gray-200 rounded-2xl p-4 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
          <select
            id="landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#e01e5a] focus:outline-none"
          >
            <option className='' value="" disabled>Select a landmark</option>
            {landmarks.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance</label>
          <input
            id="distance"
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance in km"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#e01e5a] focus:outline-none"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:border-[#e01e5a] focus:outline-none"
          placeholder="Enter location description"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="e.g. 28.7041"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#e01e5a] focus:outline-none"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
          <div className="relative">
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g. 77.1025"
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:border-[#e01e5a] focus:outline-none"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-housing-light rounded-full p-1 hover:bg-housing-light/80"
            >
              <MapPin className="w-4 h-4 text-housing-primary" />
            </button>
          </div>
        </div>
      </div>
      
      <button
        className="flex items-center text-sm text-gray-600 hover:text-housing-primary transition-colors"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add connectivity item
      </button>
    </div>
  );
};

export default LocationSection;
