import React from "react";
import { MyMap } from "./components";
import { MapCSS } from "./styles";

const Map = () => {
  return (
    <MapCSS>
      <MyMap />
    </MapCSS>
  );
};

export default Map;