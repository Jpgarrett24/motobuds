import React, { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const MapContainer = (props) => {
    const { setFrom } = props;
    const [address, setAddress] = useState("Circuit of the Americas, Austin, TX");
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [mapCenter, setMapCenter] = useState({
        lat: 30.1346,
        lng: -97.6359
    });

    const containerStyle = {
        display: 'inline-block',
        height: '65vh',
        position: 'relative',
        margin: '15px 0 50px 0',
        width: '80%',
        zIndex: 0,
    };

    useEffect(() => {
        setFrom({ location: { coordinates: [-97.6359, 30.1346], type: "Point" }, city: "Circuit of the Americas, Austin, TX" })
    }, [setFrom])

    const handleChange = (address) => {
        setAddress(address);
    }

    const handleSelect = (selected) => {
        geocodeByAddress(selected)
            .then((res) => getLatLng(res[0]))
            .then((latlng) => {
                setAddress(selected);
                setMapCenter(latlng);
                setFrom({
                    location: {
                        coordinates: [latlng.lng, latlng.lat],
                        type: "Point"
                    },
                    city: selected
                });
            })
            .catch((err) => console.error('Error', err));
    }

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
            <PlacesAutocomplete
                value={address}
                onChange={(address) => handleChange(address)}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, idx) => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                        key={idx}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <Map
                center={mapCenter}
                containerStyle={containerStyle}
                google={props.google}
                initialCenter={mapCenter}
                onClick={onMapClicked}
            >
                <Marker
                    position={mapCenter}
                    name={address}
                    onClick={onMarkerClick}
                />
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}>
                    <div>
                        <h1>{selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)