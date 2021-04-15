import React, { useCallback, useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

import greenMarker from '../assets/greenMarker.png';
import redMarker from '../assets/redMarker.png';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const MapContainer = (props) => {
    const [zoom, setZoom] = useState(1);
    const [initialCenter, setInitialCenter] = useState(null)
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    const containerStyle = {
        display: 'inline-block',
        height: '70vh',
        position: 'relative',
        width: '80%',
        zIndex: 0,
    }

    const calculateCenter = useCallback(() => {
        function difference(from, to) {
            return Math.abs(from - to);
        };
        function hypotenuse(a, b) {
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        };

        let latDiff = difference(props.trip.from.location.coordinates[1], props.trip.to.location.coordinates[1])
        let lngDiff = difference(props.trip.from.location.coordinates[0], props.trip.to.location.coordinates[0])
        let zoomRef = hypotenuse(latDiff, lngDiff);
        let a = 8.801757344;
        let b = -1.245242148;
        let y = a + b * Math.log(zoomRef);
        setZoom(Math.round(y * 10) / 10);

        const lat = (props.trip.from.location.coordinates[1] + props.trip.to.location.coordinates[1]) / 2;
        const lng = (props.trip.from.location.coordinates[0] + props.trip.to.location.coordinates[0]) / 2;
        setInitialCenter({
            lat,
            lng,
        });
    }, [props.trip.from.location.coordinates, props.trip.to.location.coordinates]);

    useEffect(() => {
        calculateCenter();
    }, [calculateCenter]);

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
        <>
            {initialCenter &&
                <Map
                    containerStyle={containerStyle}
                    google={props.google}
                    initialCenter={initialCenter}
                    onClick={onMapClicked}
                    zoom={zoom}
                >
                    <Marker
                        name={'Meet up location'}
                        onClick={onMarkerClick}
                        position={{
                            lat: props.trip.from.location.coordinates[1],
                            lng: props.trip.from.location.coordinates[0]
                        }}
                        icon={{
                            url: greenMarker, // url
                            scaledSize: new props.google.maps.Size(30, 45), // scaled size
                        }}
                    />
                    <Marker
                        name={'End destination'}
                        onClick={onMarkerClick}
                        position={{
                            lat: props.trip.to.location.coordinates[1],
                            lng: props.trip.to.location.coordinates[0]
                        }}
                        icon={{
                            url: redMarker, // url
                            scaledSize: new props.google.maps.Size(30, 43), // scaled size
                        }}
                    />
                    <InfoWindow
                        marker={activeMarker}
                        visible={showingInfoWindow}>
                        <div>
                            <h1>{selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            }
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)