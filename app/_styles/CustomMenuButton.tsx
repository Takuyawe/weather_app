import { Button, ButtonProps } from "@mantine/core";
import React from "react";

interface CustomMenuButtonProps extends ButtonProps {
  onClick?: () => void;
}

const CustomMenuButton: React.FC<CustomMenuButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <Button
      className="p-0 h-6 w-6 bg-gray-300 text-white hover:text-gray-500"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomMenuButton;
