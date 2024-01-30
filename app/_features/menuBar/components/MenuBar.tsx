"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FaRegUserCircle, FaHeart } from "react-icons/fa";
import CustomButton from "@/app/_styles/CustomMenuButton";
import { userStore } from "@/app/_stores/userStore";
import DisplaySignInButton from "./DisplaySignInButton";
import AccountMenu from "./account/AccountMenu";
import FavoriteMenu from "./favorites/FavoriteMenu";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuType, setMenuType] = useState("");

  const handleMenuButtonClick = (keyString: string) => {
    if (isOpen && menuType === keyString) {
      setIsOpen(false);
      setMenuType("");
    } else {
      setIsOpen(true);
      setMenuType(keyString);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className="h-full w-8">
        <ul className="flex flex-col pt-4 gap-y-4 items-center">
          <li>
            <CustomButton onClick={() => handleMenuButtonClick("account")}>
              <FaRegUserCircle className="h-5 w-5" />
            </CustomButton>
          </li>
          <li>
            <CustomButton onClick={() => handleMenuButtonClick("favorite")}>
              <FaHeart className="h-5 w-5" />
            </CustomButton>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {isOpen && <ModalMenu isOpen={isOpen} menuType={menuType} />}
      </AnimatePresence>
    </div>
  );
};

type ModalProps = {
  isOpen: boolean;
  menuType: string;
};

export const ModalMenu: FC<ModalProps> = (props: ModalProps) => {
  const isSignedIn = userStore((state) => state.isSignedIn);
  return (
    <motion.div
      key="modal"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 100, duration: 1.0 }}
      className="h-full w-64"
    >
      {!isSignedIn ? (
        <DisplaySignInButton />
      ) : props.menuType === "account" ? (
        <AccountMenu />
      ) : props.menuType === "favorite" ? (
        <FavoriteMenu />
      ) : null}
    </motion.div>
  );
};

export default MenuBar;
