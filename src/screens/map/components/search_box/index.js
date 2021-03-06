import React, { useState, useEffect, useCallback, useRef } from "react";
import { Marker, InfoWindow, StandaloneSearchBox} from "@react-google-maps/api";
import Button from '@material-ui/core/Button';
import useSendResto from './hooks/useSendResto';
import { WindowCSS } from './styles';

export const SearchBox = () => {

    // get data from url
    const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
    // get roomcode
    const roomcode = gettingParams[gettingParams.length-2];
    // get user id
    const userId = gettingParams[gettingParams.length-1];

    const [selectedCenter, setSelectedCenter] = useState(null);

    const [places, setPlaces] = useState([]);

    const { emitResto } = useSendResto(roomcode, userId);

    // setting up for google searchbox
    const searchBox = useRef();
    const onLoad = ref => searchBox.current = ref;

    const onPlacesChanged = async () => {
        let allInfo = await searchBox.current.getPlaces();
        // console.log(allInfo);
        let allPlaces = await allInfo.map((place, i) => {
            return {
                name: place.name,
                address: place.formatted_address,
                price: place.price_level,
                rating: place.rating,
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
                            name: place.name,
                            address: place.address
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
                    <WindowCSS>
                    <div className="window">
                        <p>{selectedCenter.name}</p>
                        <br />
                        <p>{selectedCenter.address}</p>
                        <form>
                            <Button
                                variant="contained"
                                onClick={() => emitResto(selectedCenter)}
                            >
                                I want this!
                            </Button>
                        </form>                       
                    </div>
                    </WindowCSS>
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