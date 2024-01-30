import { Button, ButtonProps } from "@mantine/core";
import React from "react";

interface CustomTopButtonProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomTopButton: React.FC<CustomTopButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      className="h-8 w-24 bg-blue-500 hover:bg-blue-400 text-xs px-2"
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomTopButton;
