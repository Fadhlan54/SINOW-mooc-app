import { currencyFormatterIDR, dateFormatter } from "@/lib/formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { IoDiamondSharp, IoGiftSharp } from "react-icons/io5";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { RiShieldStarLine } from "react-icons/ri";

export default function CourseCard({ course }) {
  const { push } = useRouter();
  return (
    <div className="rounded-3xl bg-white shadow-lg ">
      <Image
        src={
          course.imageUrl ||
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={320}
        height={80}
        className="h-32 w-full rounded-t-3xl object-cover"
        alt={course.name}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-sm font-bold text-primary-01">
            {course.category?.name}
          </h1>
          <div className="flex ">
            <FaStar className="text-alert-attention" />
            <p className="ml-1 text-sm font-semibold">{course.rating}</p>
          </div>
        </div>
        <h2 className="mt-1 truncate text-sm font-bold">{course.name}</h2>
        <div className="mt-1 flex justify-between text-xs">
          <p className="">{course.courseBy}</p>

          <p className="text-[0.65rem] font-semibold text-primary-01">
            {dateFormatter(course.createdAt).split(",")[0]}
          </p>
        </div>

        <p className="mt-1 text-[0.65rem]">
          <span className="font-semibold text-primary-01">
            {course.totalUser}
          </span>{" "}
          Pengguna mengikuti kursus ini
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <RiShieldStarLine className="text-alert-success" />
            <p className="ml-1 text-[0.65rem] font-semibold text-primary-01">
              Level{" "}
              {course.level?.charAt(0).toUpperCase() + course.level.slice(1)}
            </p>
          </div>
          <div className="flex items-center">
            <PiBooks className="text-alert-success" />
            <p className="ml-1 text-[0.65rem]">{course.totalModule} Modul</p>
          </div>
          <div className="flex items-center justify-center">
            <PiClockFill className="text-alert-success" />
            <p className="ml-1 text-[0.65rem]">{course.totalDuration} Menit</p>
          </div>
        </div>

        <button
          onClick={() => {
            push(`/kursus/${course.id}`);
          }}
          className="mt-2 flex items-center justify-between rounded-2xl bg-primary-01 px-4 py-1 text-xs font-semibold text-white hover:bg-primary-04"
        >
          {course.type === "premium" ? (
            <>
              <IoDiamondSharp className="mr-1 inline-block text-base" />
              <span>{currencyFormatterIDR(course.price)}</span>
            </>
          ) : (
            <p className=" flex w-20 items-center justify-center">
              <span>
                <IoGiftSharp className="mr-1 text-base " />
              </span>
              Gratis
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
