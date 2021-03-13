import React, { useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const MapContainer = (props) => {
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    }

    const onMapClicked = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    return (
        <Map google={props.google}
            onClick={onMapClicked}>
            <Marker onClick={onMarkerClick}
                name={'Current location'} />

            <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}>
                <div>
                    <h1>{selectedPlace.name}</h1>
                </div>
            </InfoWindow>
        </Map>
    )
};

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)