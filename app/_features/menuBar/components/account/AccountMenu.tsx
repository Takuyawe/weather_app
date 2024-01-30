import { userStore } from "@/app/_stores/userStore";
import { Button, Text } from "@mantine/core";
import { handleSignOut } from "../../utils";

const AccountMenu = () => {
  const user = userStore((state) => state.user);

  const handleSignOutClick = () => {
    handleSignOut();
    userStore.getState().setUser(null);
    userStore.getState().setIsSignedIn(false);
  };

  return (
    <div className="flex flex-col gap-y-4 items-center justify-start h-1/5 mt-4">
      <Text className="text-gray-800" size="xs">
        ユーザー名: {user?.email}
      </Text>
      <Button
        onClick={handleSignOutClick}
        className="h-6 w-28 bg-blue-500 hover:bg-blue-400 text-xs px-2"
      >
        サインアウト
      </Button>
    </div>
  );
};

export default AccountMenu;
