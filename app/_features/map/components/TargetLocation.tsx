"use client";

import { Button, Text } from "@mantine/core";
import { mapStore } from "@/app/_stores/mapStore";
import { FaRegStar } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";
import { getTargetLocationWeather, handleAddLocation } from "../utils";
import { weatherBoxStore } from "@/app/_stores/weatherBoxStore";
import { userStore } from "@/app/_stores/userStore";
import { useEffect, useState } from "react";
import { removeFavorite } from "../../menuBar/utils";

const TargetLocation = () => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const { map, isPopupOpen, locationName, location } = mapStore((state) => ({
    map: state.map,
    isPopupOpen: state.isPopupOpen,
    locationName: state.locationName,
    location: state.location,
  }));
  const { user, favorites } = userStore((state) => ({
    user: state.user,
    favorites: state.favorites,
  }));

  const addFavorite = async () => {
    const lat = location?.lat;
    const lng = location?.lng;
    const email = user?.email;
    if (lat && lng && email) {
      const data = await handleAddLocation(locationName, lat, lng, email);
      if (data) {
        userStore.getState().addFavorites(data.data);
        console.log(favorites);
      }
    }
  };
  const handleFavClick = async (
    locationName: string,
    owner: string | undefined
  ) => {
    if (isInFavorites) {
      setIsInFavorites(false);
      if (owner) {
        const response = await removeFavorite(locationName, owner);
        if (response) userStore.getState().removeFavorites(locationName, owner);
      }
    } else {
      setIsInFavorites(true);
      await addFavorite();
    }
  };

  const handleLocationSearchButton = () => {
    weatherBoxStore.getState().setIsBoxOpen(true);
    const center = map?.getCenter();
    if (center) {
      try {
        getTargetLocationWeather({ lat: center.lat, lng: center.lng });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (locationName && favorites) {
      setIsInFavorites(
        favorites?.some((item) => item.locationName === locationName)
      );
    }
  }, [locationName, favorites]);

  return (
    isPopupOpen && (
      <div className="absolute top-48 left-[32rem] h-24 w-40 bg-gray-100 rounded-2xl">
        <div className="h-full gap-y-2 flex flex-col items-center justify-center">
          <Text className="text-gray-800" size="xs">
            {locationName}
          </Text>
          <div className="flex items-center justify-center">
            <Button
              onClick={() => handleFavClick(locationName, user?.email)}
              className="text-gray-800 hover:text-gray-600 text-xl p-2"
            >
              <FaRegStar
                className={`${isInFavorites ? "text-yellow-500" : ""}`}
              />
            </Button>
            <Button
              onClick={handleLocationSearchButton}
              className="h-8 w-20 bg-blue-500 hover:bg-blue-400 text-xs px-2"
            >
              ここを検索
            </Button>
          </div>
        </div>
        <div className="absolute top-[5.3rem]">
          <TbTriangleInverted
            className="h-12 w-40 text-gray-100"
            fill="rgb(243 244 246)"
          />
        </div>
      </div>
    )
  );
};

export default TargetLocation;
