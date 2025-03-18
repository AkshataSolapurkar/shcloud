"use client"; // Ensure it works with Next.js App Router
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon fix for Leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationPickerModal = ({ setLatitude, setLongitude, onClose }:any) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  // Handle map clicks
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position ? <Marker position={position} icon={markerIcon} /> : null;
  }

  // Save location to parent state
  const handleSave = () => {
    if (position) {
      setLatitude(position[0].toString());
      setLongitude(position[1].toString());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-4">
        <h2 className="text-lg font-semibold mb-2">Pick Location</h2>
        <MapContainer center={[18.5204, 73.8567]} zoom={13} className="h-64 w-full rounded-md">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md mr-2">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#e01e5a] text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;
