// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
    return (
        <MapContainer center={[16.05191091704362, 108.16976534443344]} zoom={90} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[16.05191091704362, 108.16976534443344]}>
                <Popup>SUN Spa</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
