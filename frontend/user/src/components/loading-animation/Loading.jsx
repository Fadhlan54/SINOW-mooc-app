import Lottie from "lottie-react";
import loadingIcon from "./loading_state_sinow.json";
import "./typing.css";
export default function Loading({ text }) {
  return (
    <>
      <div className=" z-10 mt-5 border-red-500">
        <div className="w-full">
          <div className="flex h-full w-full items-center justify-center">
            <Lottie
              className="w-[70px]"
              animationData={loadingIcon}
              loop={true}
            />
          </div>
        </div>

        <h1
          aria-label="Loading ..."
          className="w-full text-center text-lg font-bold text-primary-01"
        >
          {text || "Memuat"}&nbsp;<span className="typewriter"></span>
        </h1>
      </div>
    </>
  );
}
