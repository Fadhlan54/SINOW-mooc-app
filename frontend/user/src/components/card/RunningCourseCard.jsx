import { currencyFormatterIDR } from "@/lib/formatter";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { IoDiamondSharp, IoGiftSharp } from "react-icons/io5";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { RiShieldStarLine } from "react-icons/ri";

export default function RunningCourseCard({ courseUser }) {
  return (
    <Link
      href={`/kursus/${courseUser.Course.id}`}
      className="rounded-3xl bg-white shadow-lg "
    >
      <Image
        src={
          courseUser.Course.imageUrl ||
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={320}
        height={80}
        className="object-cover w-full h-32 rounded-t-3xl"
        alt={courseUser.Course.name}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-sm text-primary-01">
            {courseUser.Course.category?.name}
          </h1>
          <div className="flex ">
            <FaStar className="text-alert-attention" />
            <p className="text-sm font-semibold ml-1">
              {courseUser.Course.rating}
            </p>
          </div>
        </div>
        <h2 className="text-sm truncate font-bold mt-1">
          {courseUser.Course.name}
        </h2>
        <p className="text-xs mt-1">{courseUser.Course.courseBy}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <RiShieldStarLine className="text-alert-success" />
            <p className="text-[0.65rem] ml-1 font-semibold text-primary-01">
              Level{" "}
              {courseUser.Course.level?.charAt(0).toUpperCase() +
                courseUser.Course.level.slice(1)}
            </p>
          </div>
          <div className="flex items-center">
            <PiBooks className="text-alert-success" />
            <p className="text-[0.65rem] ml-1">
              {courseUser.Course.totalModule} Modul
            </p>
          </div>
          <div className="flex items-center justify-center">
            <PiClockFill className="text-alert-success" />
            <p className="text-[0.65rem] ml-1">
              {courseUser.Course.totalDuration} Menit
            </p>
          </div>
        </div>
        <div className="w-6/12 bg-neutral-07 rounded-full mt-1.5 relative text-[0.65rem] font-medium text-white text-center">
          <div
            className="bg-primary-01 rounded-full  min-h-full absolute "
            style={{
              width: courseUser.progressPercentage + "%",
              minWidth: 11 + "%",
            }}
          ></div>
          <p className="min-w-max font-semibold relative z-10 ">
            {courseUser.progressPercentage}% Diselesaikan
          </p>
        </div>
      </div>
    </Link>
  );
}
