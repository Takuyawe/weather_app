import dynamic from "next/dynamic";
import MenuBar from "../_features/menuBar/components/MenuBar";
import TopButtons from "../_features/topButtons/components/TopButtons";
import WeatherBox from "../_features/weatherBox/components/WeatherBox";

const MapComponent = dynamic(
  () => import("../_features/map/components/MapComponent"),
  {
    ssr: false,
  }
);

const TargetLocation = dynamic(
  () => import("../_features/map/components/TargetLocation"),
  {
    ssr: false,
  }
);

const Component = () => {
  return (
    <div className="relative">
      <MapComponent />
      <div className="">
        <TargetLocation />
      </div>
      <div className="fixed top-0 left-0 z-10">
        <MenuBar />
      </div>
      <div className="fixed right-4 top-2">
        <TopButtons />
      </div>
      <div className="relative">
        <WeatherBox />
      </div>
    </div>
  );
};

export default Component;
