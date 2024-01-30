import axios from "axios";
import { weatherStore } from "@/app/_stores/weatherStore";
import { WeatherDataType } from "@/app/_types";
import { weatherBoxStore } from "@/app/_stores/weatherBoxStore";

export const getCurrentLocationInfo = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      getCurrentLocationWeather,
      handleGeolocationError
    );
  }
};

const getCurrentLocationWeather = async (position: GeolocationPosition) => {
  try {
    const { latitude, longitude } = position.coords;
    const result = await axios.get(`http://localhost:3000/api/weather`, {
      params: { lat: latitude, lng: longitude },
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

const handleGeolocationError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    default:
      console.log("An unknown error occurred.");
      break;
  }
};
