"use client";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geopoint } from "../../../sanity.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import classes from "./CustomMap.module.css";
import { Loader } from "@mantine/core";

type CustomMapPropsT = {
  data: Geopoint | Geopoint[];
  zoomSingle?: number;
  zoomMulty?: number;
};

const isPointValid = (
  point: Geopoint | null | undefined
): point is Geopoint & { lat: number; lng: number } => {
  return (
    !!point && typeof point.lat === "number" && typeof point.lng === "number"
  );
};

const CustomMap: React.FC<CustomMapPropsT> = ({
  data,
  zoomSingle = 15,
  zoomMulty = 13,
}) => {
  const mapRef = useRef<MapRef>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const { ref: inViewRef, entry } = useIntersection({
    root: null,
    threshold: 0.1,
    rootMargin: "200px",
  });
  const lat = 17.995624666054777;
  const long = -92.94028108053223;

  const points = useMemo(() => {
    const array = Array.isArray(data) ? data : [data];

    return array.filter(isPointValid);
  }, [data]);

  const firstPoint = points[0];

  const shouldLoadMap = !!entry?.isIntersecting;

  const initialViewState = useMemo(
    () =>
      points.length > 1
        ? {
            longitude: long,
            latitude: lat,
            zoom: zoomMulty,
          }
        : {
            longitude: firstPoint.lng,
            latitude: firstPoint.lat,
            zoom: zoomSingle,
          },
    [points, firstPoint, zoomMulty, zoomSingle, long, lat]
  );

  useEffect(() => {
    if (!shouldLoadMap) return;

    const lastLoad = Number(sessionStorage.getItem("mapLastLoad") || 0);
    const now = Date.now();

    if (now - lastLoad > 4000) {
      setHasEntered(true);
      sessionStorage.setItem("mapLastLoad", now.toString());
    }
  }, [shouldLoadMap]);

  if (points.length === 0) {
    return null;
  }

  return (
    <div ref={inViewRef} className={classes.map_container}>
      {hasEntered ? (
        <Map
          ref={mapRef}
          // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={initialViewState}
          style={{ width: "100%", height: 400 }}
          reuseMaps={true}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          dragRotate={false}
          pitchWithRotate={false}
          cooperativeGestures
          attributionControl={false}
          minZoom={10}
          maxZoom={16}
          maxBounds={[
            [-93.15, 17.89],
            [-92.76, 18.13],
          ]}
        >
          {points.map((point, i) => {
            return (
              <Marker
                key={`${point.lat},${point.lng},${i}`}
                longitude={point.lng}
                latitude={point.lat}
                anchor="bottom"
              />
            );
          })}
          <NavigationControl />
        </Map>
      ) : (
        <div className={classes.loader_container}>
          <Loader color="red" />
        </div>
      )}
    </div>
  );
};

export default CustomMap;
