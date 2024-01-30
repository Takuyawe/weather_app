import { userStore } from "@/app/_stores/userStore";
import { Button, Card, Group, Text } from "@mantine/core";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { removeFavorite } from "../../utils";

const FavoriteCard = () => {
  const favorites = userStore((state) => state.favorites);

  const handleRemoveClick = async (locationName: string, owner: string) => {
    const response = await removeFavorite(locationName, owner);
    if (response) userStore.getState().removeFavorites(locationName, owner);
  };

  return (
    <div className="flex flex-col h-full w-full gap-y-1 mt-4">
      {favorites?.map((item) => (
        <Card
          className="flex flex-col gap-y-4"
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
          <Button className="self-center h-6 w-40 bg-blue-500 hover:bg-blue-400 text-xs px-2">
            ここを検索
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default FavoriteCard;
