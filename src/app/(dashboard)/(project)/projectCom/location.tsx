import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Plus, X } from 'lucide-react';

// Add Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

interface Coordinates {
  lat: number;
  lng: number;
}

const LocationSection: React.FC = () => {
  const [landmark, setLandmark] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  const landmarks = ['Park', 'Mall', 'School', 'Hospital', 'Metro Station', 'Bus Stop', 'Airport'];

  useEffect(() => {
    if (showMapModal && mapRef.current) {
      const timer = setTimeout(() => {
        initMap();
      }, 100);
      
      return () => {
        clearTimeout(timer);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [showMapModal]);

  const initMap = () => {
    if (!window.L) return; // Guard clause for Leaflet

    const lat = latitude ? parseFloat(latitude) : 18.5204;
    const lng = longitude ? parseFloat(longitude) : 73.8567;
    
    const L = window.L;
    const map = L.map(mapRef.current).setView([lat, lng], 13);
    mapInstanceRef.current = map;
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    let marker = L.marker([lat, lng], { draggable: true }).addTo(map);
    markerRef.current = marker;
    
    marker.on('dragend', (e: any) => {
      const pos = e.target.getLatLng();
      updateCoordinatesFromMap(pos.lat, pos.lng);
    });
    
    map.on('click', (e: { latlng: Coordinates }) => {
      const pos = e.latlng;
      
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      
      marker = L.marker([pos.lat, pos.lng], { draggable: true }).addTo(map);
      markerRef.current = marker;
      
      updateCoordinatesFromMap(pos.lat, pos.lng);
      
      marker.on('dragend', (ev: any) => {
        const newPos = ev.target.getLatLng();
        updateCoordinatesFromMap(newPos.lat, newPos.lng);
      });
    });
  };

  const updateCoordinatesFromMap = (lat: number, lng: number) => {
    const latElement = document.getElementById('temp-latitude') as HTMLInputElement;
    const lngElement = document.getElementById('temp-longitude') as HTMLInputElement;
    
    if (latElement && lngElement) {
      latElement.value = lat.toFixed(6);
      lngElement.value = lng.toFixed(6);
    }
  };

  const handleMapClose = () => {
    setShowMapModal(false);
  };

  const handleMapSave = () => {
    const latElement = document.getElementById('temp-latitude') as HTMLInputElement;
    const lngElement = document.getElementById('temp-longitude') as HTMLInputElement;
    
    if (latElement && lngElement) {
      setLatitude(latElement.value);
      setLongitude(lngElement.value);
    }
    setShowMapModal(false);
  };

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
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
              onClick={() => setShowMapModal(true)}
            >
              <MapPin className="w-4 h-4 text-[#e01e5a]" />
            </button>
          </div>
        </div>
      </div>
      
      <button
        type="button"
        className="flex items-center text-sm text-gray-600 hover:text-[#e01e5a] transition-colors"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add connectivity item
      </button>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-4 m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Pick Location</h3>
              <button
                type="button"
                onClick={handleMapClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Map Container */}
            <div 
              ref={mapRef} 
              className="h-96 w-full border rounded-md mb-4"
            ></div>
            
            {/* Hidden inputs to store temporary values */}
            <div className="hidden">
              <input type="text" id="temp-latitude" defaultValue={latitude || '18.5204'} />
              <input type="text" id="temp-longitude" defaultValue={longitude || '73.8567'} />
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Click on the map to select a location or drag the marker to fine-tune position
              </div>
              <button
                type="button"
                onClick={handleMapSave}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: '#e01e5a' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSection;