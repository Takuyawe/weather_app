import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment, useState } from "react";
import AuthenticationBox from "./account/AuthenticationBox";

const DisplaySignInButton = () => {
  const [isAuthBoxOpen, setIsAuthBoxOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenAuthBox = () => {
    open();
    setIsAuthBoxOpen(true);
  };

  return (
    <Fragment>
      <div className="w-full h-1/6 flex justify-center items-center">
        <Button
          onClick={handleOpenAuthBox}
          className="h-8 w-36 bg-blue-500 hover:bg-blue-400 text-xs px-2"
        >
          サインインしてください
        </Button>
      </div>
      {isAuthBoxOpen && (
        <Modal
          opened={opened}
          onClose={close}
          overlayProps={{
            backgroundOpacity: 0.2,
            blur: 3,
          }}
          title="サインイン"
          className="text-gray-500"
          size="sm"
          transitionProps={{ transition: "fade", duration: 1000 }}
          centered
        >
          <AuthenticationBox close={close} />
        </Modal>
      )}
    </Fragment>
  );
};

export default DisplaySignInButton;
