import { mapStore } from "@/app/_stores/mapStore";
import { weatherStore } from "@/app/_stores/weatherStore";
import { WeatherDataType } from "@/app/_types";
import axios from "axios";
import { LatLng } from "@/app/_types";

export const getLocationName = async ({ lat, lng }: LatLng) => {
  const response = await axios.get("http://localhost:3000/api/location", {
    params: {
      lat: lat,
      lng: lng,
    },
  });
  const data = response.data.response.location[0];
  const locationName = `${data.prefecture}${data.city}${data.town}`;
  mapStore.getState().setLocationName(locationName);
};

export const getTargetLocationWeather = async ({ lat, lng }: LatLng) => {
  try {
    const result = await axios.get(`http://localhost:3000/api/weather`, {
      params: { lat: lat, lng: lng },
    });

    const data = result.data;

    const weatherData: WeatherDataType = {
      coords: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      placeName: data.name,
      weather: data.weather[0].main,
      windSpeed: data.wind.speed,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      temp: data.main.temp,
    };

    weatherStore.setState({ weatherData });
  } catch (error) {
    console.error("API call failed:", error);
  }
};

export const handleAddLocation = async (
  locationName: string,
  lat: number,
  lng: number,
  email: string
) => {
  const reqData = {
    locationName: locationName,
    lat: lat,
    lng: lng,
    owner: email,
  };
  const response = await axios.post(
    "http://localhost:3000/api/favorites/addData",
    reqData
  );
  const data = response.data;
  return data;
};
