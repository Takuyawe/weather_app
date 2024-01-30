"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { mapStore } from "@/app/_stores/mapStore";
import { getLocationName } from "../utils";
import { userStore } from "@/app/_stores/userStore";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center: L.LatLngExpression = [35.6764, 139.65];

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = L.map(mapRef.current).setView(center, 10);

      map.zoomControl.setPosition("bottomright");

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        mapStore.getState().jumpTo(lat, lng);
        mapStore.getState().setIsPopupOpen(true);
        mapStore.getState().setLocation({ lat, lng });
        getLocationName({ lat, lng });
      });

      mapStore.getState().setMap(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      return () => {
        if (map) {
          mapStore.setState({ map: null });
          map.remove();
        }
      };
    }
  }, []);

  return <div className="z-0" id="map" ref={mapRef} style={containerStyle} />;
};

export default MapComponent;
