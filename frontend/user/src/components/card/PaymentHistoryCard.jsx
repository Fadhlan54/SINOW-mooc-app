import { dateFormatter } from "@/lib/formatter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { RiShieldStarLine } from "react-icons/ri";

export default function PaymentHistoryCard({ coursePaymentHistory }) {
  return (
    <div>
      {/* <Image
        src={
          "https://ik.imagekit.io/vsecvavlp/Image-1715656907926_CfMY5hLrc.png?updatedAt=1715656911950"
        }
        width={200}
        height={100}
      />
      <div className="flex justify-between">
        <h1 className="font-bold text-sm text-primary-01">
          {course.category?.name}
        </h1>
        <div className="flex ">
          <FaStar className="text-alert-attention" />
          <p className="text-sm font-semibold ml-1">{course.rating}</p>
        </div>
      </div>
      <h2 className="text-sm truncate font-bold mt-1">{course.name}</h2>
      <div className="text-xs flex justify-between mt-1">
        <p className="">{course.courseBy}</p>

        <p className="text-primary-01 font-semibold text-[0.65rem]">
          {dateFormatter(course.createdAt).split(",")[0]}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <RiShieldStarLine className="text-alert-success" />
          <p className="text-[0.65rem] ml-1 font-semibold text-primary-01">
            Level{" "}
            {course.level?.charAt(0).toUpperCase() + course.level.slice(1)}
          </p>
        </div>
        <div className="flex items-center">
          <PiBooks className="text-alert-success" />
          <p className="text-[0.65rem] ml-1">{course.totalModule} Modul</p>
        </div>
        <div className="flex items-center justify-center">
          <PiClockFill className="text-alert-success" />
          <p className="text-[0.65rem] ml-1">{course.totalDuration} Menit</p>
        </div>
      </div> */}
    </div>
  );
}
