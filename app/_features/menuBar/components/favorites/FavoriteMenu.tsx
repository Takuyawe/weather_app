import { Text } from "@mantine/core";
import FavoriteCard from "./FavoriteCard";

const FavoriteMenu = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
      <Text className="text-gray-800 mt-4" size="xs">
        あなたのお気に入り都市
      </Text>
      <FavoriteCard />
    </div>
  );
};

export default FavoriteMenu;
