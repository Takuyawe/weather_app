"use client";

import { weatherBoxStore } from "@/app/_stores/weatherBoxStore";
import { weatherStore } from "@/app/_stores/weatherStore";
import { MdSunny } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button, Text } from "@mantine/core";

const WeatherBox = () => {
  const isBoxOpen = weatherBoxStore((state) => state.isBoxOpen);
  const weatherData = weatherStore((state) => state.weatherData);

  const closeWeatherBox = () => weatherBoxStore.setState({ isBoxOpen: false });

  return (
    isBoxOpen && (
      <div className="absolute bottom-0 h-36 w-full bg-gray-100">
        <div className="absolute top-1 right-1">
          <Button
            className="text-gray-800 hover:text-gray-600 text-2xl"
            onClick={closeWeatherBox}
          >
            <IoIosCloseCircleOutline />
          </Button>
        </div>
        <div className="flex h-full w-full gap-x-10 items-center justify-center">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <Text className="text-gray-800" size="md" tt={"capitalize"}>
              {weatherData?.placeName}
            </Text>
            <MdSunny className="h-12 w-12 bg-orange-500" />
            <Text className="text-gray-800" size="md">
              {weatherData?.temp}°C
            </Text>
          </div>
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div className="flex gap-x-2">
              <Text className="text-blue-700" size="md">
                {weatherData?.tempMin}°C
              </Text>
              <Text className="text-gray-800">|</Text>
              <Text className="text-red-500" size="md">
                {weatherData?.tempMax}°C
              </Text>
            </div>
            <div className="flex gap-x-2">
              <FaWind className="h-6 w-6 text-gray-800" />
              <Text className="text-gray-800" size="md">
                {weatherData?.windSpeed}m/s
              </Text>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WeatherBox;
