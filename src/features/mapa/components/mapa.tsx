import type { FC } from "react";
import { Map } from "@vis.gl/react-google-maps";

const mapOptions: google.maps.MapOptions = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    { featureType: "road", stylers: [{ visibility: "off" }] }, // Remove estradas para focar nas divisas
  ],
  disableDefaultUI: true,
};

export const Mapa: FC = () => {
  return (
    <Map
      style={{ width: "100vw", height: "100vh" }}
      defaultCenter={{ lat: -5, lng: -45 }}
      defaultZoom={6}
      gestureHandling="greedy"
      options={mapOptions}
    />
  );
};
