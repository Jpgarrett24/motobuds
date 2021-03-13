import React, { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const MapContainer = (props) => {
    const [zoom, setZoom] = useState(1);
    const [initialCenter, setInitialCenter] = useState(null)
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    const containerStyle = {
        height: '60%',
        left: '10%',
        position: 'absolute',
        width: '80%',
    }

    // console.log({
    //     lat: {
    //         from: props.trip.from.location.coordinates[1],
    //         to: props.trip.to.location.coordinates[1]
    //     },
    //     lng: {
    //         from: props.trip.from.location.coordinates[0],
    //         to: props.trip.to.location.coordinates[0]
    //     }
    // });

    const calculateCenter = () => {
        function difference(from, to) {
            return Math.abs(from - to);
        };
        function hypotenuse(a, b) {
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        };

        let latDiff = difference(props.trip.from.location.coordinates[1], props.trip.to.location.coordinates[1])
        let lngDiff = difference(props.trip.from.location.coordinates[0], props.trip.to.location.coordinates[0])
        let zoomRef = hypotenuse(latDiff, lngDiff);
        let m = -2.74539734;
        let b = 14;
        let y = m * zoomRef + b;
        setZoom(Math.round(y * 10) / 10);

        const lat = (props.trip.from.location.coordinates[1] + props.trip.to.location.coordinates[1]) / 2;
        const lng = (props.trip.from.location.coordinates[0] + props.trip.to.location.coordinates[0]) / 2;
        setInitialCenter({
            lat,
            lng,
        });
    };

    useEffect(() => {
        calculateCenter();
    }, []);

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
                    />
                    <Marker
                        name={'End destination'}
                        onClick={onMarkerClick}
                        position={{
                            lat: props.trip.to.location.coordinates[1],
                            lng: props.trip.to.location.coordinates[0]
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
    )
};

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)