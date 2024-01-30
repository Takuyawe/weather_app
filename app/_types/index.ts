export type LatLng = {
  lat: number;
  lng: number;
};

export type WeatherDataType = {
  coords: {
    lat: number;
    lon: number;
  };
  placeName: string;
  weather: string;
  windSpeed: number;
  tempMax: number;
  tempMin: number;
  temp: number;
};

export type Favorites = {
  id?: number;
  locationName: string;
  latitude: number;
  longitude: number;
  createdAt?: string;
  owner: string;
};
