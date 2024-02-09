import Lottie from "lottie-react";
import loadingIcon from "./loading_state_sinow.json";
import "./typing.css";
export default function Loading({ text }) {
  return (
    <>
      <div className=" mt-5 z-10 border-red-500">
        <div className="w-full">
          <div className="flex justify-center items-center w-full h-full">
            <Lottie
              className="w-[70px]"
              animationData={loadingIcon}
              loop={true}
            />
          </div>
        </div>

        <h1
          aria-label="Loading ..."
          className="text-lg w-full font-bold text-primary-01 text-center"
        >
          {text || "Memuat"}&nbsp;<span className="typewriter"></span>
        </h1>
      </div>
    </>
  );
}
