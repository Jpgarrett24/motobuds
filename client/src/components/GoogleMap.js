import React, { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

import useAuth from '../auth/useAuth';
import { GiMilleniumKey } from 'react-icons/gi';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const MapContainer = (props) => {
    console.log(props);
    const auth = useAuth();
    const [initialCenter, setInitialCenter] = useState(null)
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    const calculateCenter = () => {
        let lat = undefined;
        let lng = undefined;
        lat = (props.trip.from.location.coordinates[1] + props.trip.to.location.coordinates[1]) / 2;
        lng = (props.trip.from.location.coordinates[0] + props.trip.to.location.coordinates[0]) / 2;
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
                    google={props.google}
                    initialCenter={initialCenter}
                    onClick={onMapClicked}
                >
                    <Marker
                        onClick={onMarkerClick}
                        name={'Current location'}
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