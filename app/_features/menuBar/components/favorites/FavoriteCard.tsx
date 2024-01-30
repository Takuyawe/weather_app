import { userStore } from "@/app/_stores/userStore";
import { Button, Card, Text } from "@mantine/core";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { removeFavorite } from "../../utils";
import { weatherBoxStore } from "@/app/_stores/weatherBoxStore";
import { mapStore } from "@/app/_stores/mapStore";
import { getTargetLocationWeather } from "@/app/_features/map/utils";

const FavoriteCard = () => {
  const favorites = userStore((state) => state.favorites);

  const handleRemoveClick = async (locationName: string, owner: string) => {
    const response = await removeFavorite(locationName, owner);
    if (response) userStore.getState().removeFavorites(locationName, owner);
  };

  const handleLocationSearchButton = (
    locationName: string,
    lat: number,
    lng: number
  ) => {
    weatherBoxStore.getState().setIsBoxOpen(true);
    mapStore.getState().jumpTo(lat, lng);
    mapStore.getState().setIsPopupOpen(true);
    mapStore.getState().setLocation({ lat, lng });
    mapStore.getState().setLocationName(locationName);
    try {
      getTargetLocationWeather({ lat: lat, lng: lng });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full mt-4 px-2 overflow-y-auto">
      {favorites?.map((item) => (
        <Card
          className="flex flex-col gap-y-4 mb-2"
          radius="md"
          shadow="sm"
          padding="lg"
          key={item.id}
        >
          <div className="flex justify-between items-center">
            <Text className="text-gray-800" size="xs">
              {item.locationName}
            </Text>
            <button
              onClick={() => handleRemoveClick(item.locationName, item.owner)}
            >
              <IoMdRemoveCircleOutline className="h-4 w-4 hover:text-gray-500" />
            </button>
          </div>
          <Button
            onClick={() =>
              handleLocationSearchButton(
                item.locationName,
                item.latitude,
                item.longitude
              )
            }
            className="self-center h-6 w-40 bg-blue-500 hover:bg-blue-400 text-xs px-2"
          >
            ここを検索
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default FavoriteCard;
