import React, { useState, useEffect, useCallback, useRef } from "react";
import { Marker, InfoWindow, StandaloneSearchBox} from "@react-google-maps/api";

export const SearchBox = () => {
    const [selectedCenter, setSelectedCenter] = useState(null);

    const [places, setPlaces] = useState([]);

    const searchBox = useRef();

    const onLoad = ref => searchBox.current = ref;

    const onPlacesChanged = async () => {
        let allInfo = await searchBox.current.getPlaces();
        // console.log(allInfo);
        let allPlaces = await allInfo.map((place, i) => {
            return {
                name: place.name,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                id: i,
            }
        })
        console.log(allPlaces);
        setPlaces(allPlaces);
    };

    return (
        <div>
            <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={
                onPlacesChanged
            }
            // bounds={{ lat: 22.4445, lng: 114.0222 }}
            >
            <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
                }}
            />
            </StandaloneSearchBox>
            {places.map((place, i) => 
                (<Marker
                    key={i}
                    position={{ lat: place.lat, lng: place.lng }}
                    onClick={() => {
                        setSelectedCenter({
                            lat: place.lat,
                            lng: place.lng,
                            name: place.name
                        });
                        // console.log('clicked');
                     }}
                />))
            }
            {selectedCenter && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedCenter(null);
                    }}
                    position={{
                        lat: selectedCenter.lat,
                        lng: selectedCenter.lng
                    }}
                >
                    <div>{selectedCenter.name}</div>
                </InfoWindow>
            )}
            {/* {places.map((place, i) => 
                (<InfoWindow
                    key={i}
                    position={{ lat: place.lat, lng: place.lng }}
                >
                    <div>
                        {place.name}
                    </div>
                </InfoWindow>))
            } */}
        </div>
    )
}

export default SearchBox;