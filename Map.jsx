
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: "https://cdn.jsdelivr.net/npm/leaflet-extra-markers@1.2.1/dist/img/markers/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
});

const Map = ({ 
  center = [-26.2041, 28.0473], // Default to Johannesburg
  zoom = 13,
  markers = [],
  deliveryRoute = null,
  height = "400px"
}) => {
  useEffect(() => {
    // This is needed to force a map redraw when the container size changes
    window.dispatchEvent(new Event('resize'));
  }, [height]);

  return (
    <div style={{ height, width: "100%" }} className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position}
            icon={marker.type === 'truck' ? truckIcon : new L.Icon.Default()}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{marker.title}</h3>
                <p>{marker.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
