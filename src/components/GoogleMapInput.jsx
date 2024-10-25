import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

// Your Google Maps API key
const API_KEY = 'AIzaSyC_t-7fYyvbcvALqHYzn3om1Q1386Fa6PE';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523,
};

function LocationInput() {
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const autocompleteRef = useRef(null);

    // Function to handle place selection from autocomplete input
    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const location = place.geometry.location;
            setMapCenter({
                lat: location.lat(),
                lng: location.lng(),
            });
            setMarkerPosition({
                lat: location.lat(),
                lng: location.lng(),
            });
        }
    };

    // Function to handle map click
    const onMapClick = useCallback((event) => {
        setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }, []);

    return (
        <div>
            {/* Autocomplete input for entering the location */}
            <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
                <Autocomplete onPlaceChanged={onPlaceChanged} ref={autocompleteRef}>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        style={{
                            width: '100%',
                            height: '40px',
                            padding: '10px',
                            boxSizing: 'border-box',
                            marginBottom: '10px',
                        }}
                    />
                </Autocomplete>

                {/* Map to show the location */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={12}
                    onClick={onMapClick}
                >
                    {/* Marker at the selected location */}
                    <Marker position={markerPosition} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default LocationInput;
