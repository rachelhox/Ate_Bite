import React, { useState, useEffect, useCallback, useRef } from "react";
import { LocatorCSS } from "./styles";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import compass from "../../../../static/icons/compass.svg";

export const Locator = ( {panTo} ) => {    
    const handleClick = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
    }


    return (
        <LocatorCSS>
        <button>
            <img src={compass} alt="locate me!" onClick={handleClick}></img>
        </button>
        </LocatorCSS>
    )
}

export default Locator;