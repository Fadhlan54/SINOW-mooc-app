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
        className="h-32 w-full rounded-t-3xl object-cover"
        alt={courseUser.Course.name}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-sm font-bold text-primary-01">
            {courseUser.Course.category?.name}
          </h1>
          <div className="flex ">
            <FaStar className="text-alert-attention" />
            <p className="ml-1 text-sm font-semibold">
              {courseUser.Course.rating}
            </p>
          </div>
        </div>
        <h2 className="mt-1 truncate text-sm font-bold">
          {courseUser.Course.name}
        </h2>
        <p className="mt-1 text-xs">{courseUser.Course.courseBy}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <RiShieldStarLine className="text-alert-success" />
            <p className="ml-1 text-[0.65rem] font-semibold text-primary-01">
              Level{" "}
              {courseUser.Course.level?.charAt(0).toUpperCase() +
                courseUser.Course.level.slice(1)}
            </p>
          </div>
          <div className="flex items-center">
            <PiBooks className="text-alert-success" />
            <p className="ml-1 text-[0.65rem]">
              {courseUser.Course.totalModule} Modul
            </p>
          </div>
          <div className="flex items-center justify-center">
            <PiClockFill className="text-alert-success" />
            <p className="ml-1 text-[0.65rem]">
              {courseUser.Course.totalDuration} Menit
            </p>
          </div>
        </div>
        <div className="relative mt-2 w-6/12 rounded-full bg-neutral-07 text-center text-[0.65rem] font-medium text-white">
          <div
            className="absolute min-h-full  rounded-full bg-primary-01 "
            style={{
              width: courseUser.progressPercentage + "%",
              minWidth: 11 + "%",
            }}
          ></div>
          <p className="relative z-10 min-w-max font-semibold">
            {courseUser.progressPercentage}% Diselesaikan
          </p>
        </div>
      </div>
    </Link>
  );
}
