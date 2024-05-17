import Lottie from "lottie-react";
import loadingIcon from "./loading_state_sinow.json";
import "./typing.css";

export default function LoadingScreen() {
  return (
    <>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden">
        <div className="absolute z-[1000] mb-24 w-full">
          <div className="flex h-screen items-center justify-center">
            <Lottie
              className="w-[100px]"
              animationData={loadingIcon}
              loop={true}
            />
          </div>
        </div>
        <h1
          aria-label="Loading ..."
          className="z-[1000] mt-10 flex h-screen w-full items-center justify-center text-2xl font-bold text-[#3cc1ff]"
        >
          Loading&nbsp;<span className="typewriter"></span>
        </h1>
        <div className="fixed inset-0 bg-black opacity-40"></div>
      </div>
    </>
  );
}
