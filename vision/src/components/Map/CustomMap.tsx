"use client";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geopoint } from "../../../sanity.types";

type CustomMapPropst = { location: Geopoint };

const CustomMap: React.FC<CustomMapPropst> = ({ location }) => {
  if (!location.lat || !location.lng) return;

  return (
    <Map
      // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: location.lng,
        latitude: location.lat,
        zoom: 15,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={location.lng}
        latitude={location.lat}
        anchor="bottom"
      />
    </Map>
  );
};

export default CustomMap;
