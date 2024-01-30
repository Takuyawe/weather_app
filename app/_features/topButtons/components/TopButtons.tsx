"use client";

import CustomTopButton from "@/app/_styles/CustomTopButton";
import { getCurrentLocationInfo } from "../utils";
import { weatherBoxStore } from "@/app/_stores/weatherBoxStore";

const handleTopButtonClick = () => {
  weatherBoxStore.getState().setIsBoxOpen(true);
  getCurrentLocationInfo();
};

const topButtons = () => {
  return (
    <div>
      <CustomTopButton onClick={handleTopButtonClick}>
        現在地の天気
      </CustomTopButton>
    </div>
  );
};

export default topButtons;
