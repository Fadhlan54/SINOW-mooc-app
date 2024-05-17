"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { FaCartPlus, FaCheck, FaPlus, FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { IoPlayCircle } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import {
  followCourse,
  fetchCourseUserById,
  fetchCourseById,
  openModuleUser,
  unfollowCourse,
} from "@/services/course.service";
import Image from "next/image";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";
import { currencyFormatterIDR } from "@/lib/formatter";

export default function DetailCoursePage({ params }) {
  const [shiftContent, setShiftContent] = useState(false);
  const [course, setCourse] = useState();
  const [courseUser, setCourseUser] = useState();
  const [chaptersUser, setchaptersUser] = useState([]);
  const [videoContentURL, setVideoContentURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [error, setError] = useState(undefined);
  const { push } = useRouter();
  const token = Cookies.get("token");
  const id = params.id || "";

  useEffect(() => {
    const fetchCoursesById = async () => {
      setIsLoading(true);
      setError(undefined);
      const res = await fetchCourseById(id);

      if (res?.data?.status === "Success") {
        setCourse(res.data?.data);
        setVideoContentURL(res?.data?.data?.videoPreviewUrl);
      } else {
        setError({ status: res.status, message: res.data.message });
      }
      setIsLoading(false);
    };

    const fetchCourseUser = async () => {
      setError(undefined);
      const res = await fetchCourseUserById(id, token);
      if (res?.data?.status === "Success") {
        setCourseUser(res.data?.data?.myCourse);
        setchaptersUser(res.data?.data?.chapters);
      } else {
        setError({ status: res.status, message: res.data.message });
        if (res.status === 401 && res.data.message === "Token tidak valid") {
          Swal.fire({
            title: "Oopps!",
            text: "Data login tidak valid, silahkan login kembali",
            imageUrl:
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/must_login.png?updatedAt=1708540672288",
            imageHeight: 143,
            imageWidth: 188,
            showDenyButton: true,
            confirmButtonText: "Login",
            confirmButtonColor: "#00CCF4",
            denyButtonText: `Batal`,
            denyButtonColor: "#FF0000",
          }).then((result) => {
            if (result.isConfirmed) {
              Cookies.remove("token");
              push("/auth/login");
            }
          });
        }
      }
    };

    if (token) {
      fetchCourseUser();
    }
    fetchCoursesById();
  }, []);

  const handleFollowCourse = async () => {
    if (!token) {
      Swal.fire({
        title: "Oopps!",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/must_login.png?updatedAt=1708540672288",
        imageHeight: 143,
        imageWidth: 188,
        text: "Anda harus login terlebih dahulu",
        showDenyButton: true,
        confirmButtonText: "Login",
        denyButtonText: `Batal`,
      }).then((result) => {
        if (result.isConfirmed) {
          push("/auth/login");
        }
      });
    } else {
      try {
        const res = await followCourse(id, token);
        if (res?.data?.status === "Success") {
          const res = await fetchCourseUserById(id, token);
          if (res.data.status === "Success") {
            setCourseUser(res.data?.data?.myCourse);
            setchaptersUser(res.data?.data?.chapters);
          } else {
            setError({ status: res.status, message: res.data.message });
          }
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Berhasil mengikuti course ini",
            confirmButtonText: "Ok",
            confirmButtonColor: "#00CCF4",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUnfollowCourse = async () => {
    if (!token) {
      Swal.fire({
        title: "Oopps!",
        text: "Anda harus login terlebih dahulu",
        showDenyButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#00CCF4",
        denyButtonText: `Batal`,
        denyButtonColor: "#FF0000",
      }).then((result) => {
        if (result.isConfirmed) {
          push("/auth/login");
        }
      });
    } else {
      try {
        const res = await unfollowCourse(id, token);
        if (res?.data?.status === "Success") {
          const res = await fetchCourseUserById(id, token);
          if (res?.data?.status === "Success") {
            setCourseUser(res.data?.data?.myCourse);
            setShiftContent(false);
          } else {
            setError({ status: res.status, message: res.data.message });
          }
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Berhasil berhenti mengikuti course ini",
            confirmButtonText: "Ok",
            confirmButtonColor: "#00CCF4",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFollowModal = async () => {
    if (!token) {
      Swal.fire({
        title: "Oopps!",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/no_course.png?updatedAt=1708543690154",
        imageWidth: 188,
        imageHeight: 143,
        text: "Anda harus login terlebih dahulu",
        showDenyButton: true,
        confirmButtonText: "Login",
        denyButtonText: `Batal`,
        confirmButtonColor: "#00CCF4",
        denyButtonColor: "#FF0000",
      }).then((result) => {
        if (result.isConfirmed) {
          push("/auth/login");
        }
      });
    } else {
      Swal.fire({
        title: "Ikuti kursus",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/onboarding.png?updatedAt=1707366179905",
        imageWidth: 188,
        imageHeight: 143,
        text: "Yakin ingin mengikuti kursus ini?",
        showDenyButton: true,
        confirmButtonText: "Ikuti",
        confirmButtonColor: "#00CCF4",
        denyButtonColor: "#FF0000",
        denyButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleFollowCourse();
        }
      });
    }
  };

  const handleUnfollowModal = async () => {
    if (!token) {
      Swal.fire({
        title: "Oopps!",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/must_login.png?updatedAt=1708540672288",
        imageWidth: 188,
        imageHeight: 150,
        text: "Anda harus login terlebih dahulu",
        showDenyButton: true,
        confirmButtonText: "Login",
        denyButtonText: `Batal`,
        confirmButtonColor: "#00CCF4",
        denyButtonColor: "#FF0000",
      }).then((result) => {
        if (result.isConfirmed) {
          push("/auth/login");
        }
      });
    } else {
      Swal.fire({
        title: "Berhenti mengikuti kursus",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/onboarding.png?updatedAt=1707366179905",
        imageWidth: 188,
        imageHeight: 143,
        html: "<p>Yakin ingin berhenti mengikuti kursus ini?</p> <p style='color: #00CCF4; font-size: 14px'>Note: data pembelian dan kemajuan akan tetap disimpan </p>",
        showDenyButton: true,
        confirmButtonText: "Ya",
        confirmButtonColor: "#00CCF4",
        denyButtonColor: "#FF0000",
        denyButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleUnfollowCourse();
        }
      });
    }
  };

  const handleOpenModule = async (moduleId, status) => {
    if (!token) {
      Swal.fire({
        title: "Oopps!",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/must_login.png?updatedAt=1708540672288",
        imageWidth: 188,
        imageHeight: 150,
        text: "Anda harus login terlebih dahulu",
        showDenyButton: true,
        confirmButtonText: "Login",
        denyButtonText: `Batal`,
        confirmButtonColor: "#00CCF4",
        denyButtonColor: "#FF0000",
      }).then((result) => {
        if (result.isConfirmed) {
          push("/auth/login");
        }
      });
      return;
    }

    if (status === "terkunci") {
      Swal.fire({
        title: "Oopps!",
        imageUrl:
          "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/no_course.png?updatedAt=1708543690154",
        imageWidth: 188,
        imageHeight: 143,
        text: "Modul ini masih terkunci, untuk membuka pelajari modul yang terbuka dulu",
        confirmButtonText: "Ok",
        confirmButtonColor: "#00CCF4",
      });
      return;
    }
    try {
      setLoadingScreen(true);
      const res = await openModuleUser(id, moduleId, token);
      if (res?.data?.status === "Success") {
        setVideoContentURL(res.data?.data?.module?.videoUrl);
        const courseUser = await fetchCourseUserById(id, token);
        if (courseUser?.data?.status === "Success") {
          setCourseUser(courseUser.data?.data?.myCourse);
          setchaptersUser(courseUser.data?.data?.chapters);
        } else {
          setError({
            status: courseUser.status,
            message: courseUser.data.message,
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingScreen(false);
    }
  };

  return (
    <MainLayout disableMobileNavbar>
      {loadingScreen ? (
        <LoadingScreen />
      ) : error ? (
        <div className="mt-20 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center rounded-xl border p-6 shadow-md">
            <div className="flex flex-col items-center justify-center">
              <div className="absolute z-10">
                <Image
                  src={
                    "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927"
                  }
                  width={188}
                  height={150}
                  alt="Sinow Mascot onboarding"
                  className=""
                />
              </div>
              <div className="relative z-20 h-full">
                <h1 className="text-9xl font-bold text-primary-01 opacity-35">
                  {error.status}
                </h1>
              </div>
            </div>
            <h1 className="mt-4">{error.message}</h1>
            <p>
              Pergi ke halaman{" "}
              <Link href="/kursus" className="font-bold text-primary-01">
                kursus
              </Link>
            </p>
          </div>
        </div>
      ) : (
        course && (
          <div className="mx-auto w-fit max-w-7xl px-3 pb-4 pt-3 md:px-4 lg:mx-auto lg:px-10 ">
            <div className="">
              <Link
                href={"/kursus"}
                className="mb-2 flex w-fit items-center gap-4 font-semibold "
              >
                <LuArrowLeft className="text-lg" />
                Kursus lainnya
              </Link>
            </div>

            <div className="flex md:gap-5 lg:gap-10">
              <div className={`mx-auto  w-full max-w-3xl`}>
                <video
                  src={videoContentURL}
                  className="w-full rounded-[32px] shadow-lg"
                  controls
                ></video>
                <div className="relative mt-8 rounded-[32px] bg-white px-4 py-8 shadow-lg sm:px-6">
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between">
                      <h2 className="text-lg font-bold text-primary-01 sm:text-xl">
                        {course.category?.name}
                      </h2>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-lg text-alert-attention" />
                        <p className="text-sm font-semibold">
                          {course.rating}{" "}
                          <span className="text-neutral-04">(81)</span>
                        </p>
                      </div>
                    </div>
                    <h2 className="font-bold sm:text-lg">{course.name}</h2>
                    <h4 className="text-sm"> {course.courseBy}</h4>
                    <div className="mt-1 flex items-center justify-between text-xs font-medium md:justify-start md:gap-4 lg:gap-8">
                      <div className="flex items-center gap-1">
                        <RiShieldStarLine className="text-base text-alert-success" />
                        <p className="font-semibold text-primary-01">
                          Level {course.level}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <PiBooks className="text-base text-alert-success" />
                        <p>{course.totalModule} Modul</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <PiClockFill className="text-base text-alert-success" />
                        <p className=" ml-1">{course.totalDuration} Menit</p>
                      </div>
                    </div>

                    {courseUser &&
                      courseUser.isFollowing &&
                      courseUser.isAccessible && (
                        <button
                          className="mt-4 flex items-center justify-between rounded-2xl bg-primary-01 px-6 py-1 text-xs font-semibold text-white shadow-md hover:bg-primary-04 sm:text-sm"
                          onClick={() => handleUnfollowModal()}
                        >
                          <FaCheck className="mr-1" />
                          Diikuti
                        </button>
                      )}

                    {courseUser &&
                      !courseUser.isFollowing &&
                      !courseUser.isAccessible && (
                        <>
                          {course.promoDiscountPercentage > 0 ? (
                            <div className="flex items-center">
                              <p className="mb-1 mr-2 mt-1 text-sm font-bold  sm:text-base">
                                {currencyFormatterIDR(
                                  course.price -
                                    (course.price *
                                      course.promoDiscountPercentage) /
                                      100,
                                )}
                              </p>
                              <p className="mr-1 text-xs font-semibold text-neutral-04 line-through">
                                {currencyFormatterIDR(course.price)}
                              </p>
                              <p className="text-xs text-neutral-04">
                                Diskon {course.promoDiscountPercentage}%
                              </p>
                            </div>
                          ) : (
                            <p className="mb-1 mt-2 font-bold sm:text-lg">
                              {currencyFormatterIDR(course.price)}
                            </p>
                          )}

                          <Link
                            href={`/pembayaran/${course.id}`}
                            className="flex w-fit items-center  justify-between  rounded-2xl bg-alert-success px-6 py-1 text-xs font-semibold text-white shadow-md hover:bg-alert-success-hover sm:text-sm"
                          >
                            <FaCartPlus className="mr-1" />
                            Beli Kursus
                          </Link>
                        </>
                      )}

                    {((courseUser &&
                      !courseUser.isFollowing &&
                      courseUser.isAccessible) ||
                      !token) && (
                      <button
                        className="mt-4 flex items-center justify-between rounded-2xl bg-primary-01 px-6 py-1 text-xs font-semibold text-white shadow-md hover:bg-primary-04 sm:text-sm"
                        onClick={() => handleFollowModal()}
                      >
                        <FaPlus className="mr-1" />
                        Ikuti Kursus
                      </button>
                    )}
                    {courseUser &&
                      courseUser.isFollowing &&
                      courseUser.isAccessible && (
                        <>
                          <div className="absolute left-0 mt-4 grid w-full grid-cols-2 md:hidden">
                            <button
                              className={`${!shiftContent ? "bg-primary-01 text-white" : "bg-neutral-02 text-primary-01"}  py-4 font-bold`}
                              onClick={() => setShiftContent(false)}
                            >
                              Tentang
                            </button>
                            <button
                              className={`${!shiftContent ? "border bg-neutral-02 text-primary-01" : "bg-primary-01 text-white"}  py-4 font-bold`}
                              onClick={() => setShiftContent(true)}
                            >
                              Materi
                            </button>
                          </div>
                          <div className="h-14 md:hidden"></div>
                        </>
                      )}
                  </div>
                  <hr />
                  {shiftContent ? (
                    courseUser &&
                    courseUser.isFollowing &&
                    courseUser.isAccessible && (
                      <div className="mt-4 md:hidden">
                        <div className="mb-4 flex items-center justify-between">
                          <h2 className="text-xl font-bold">Materi Belajar</h2>
                          <div className="w-40 rounded-full bg-neutral-07 ">
                            <div
                              className="flex h-4 items-center rounded-full bg-primary-01 p-0.5 px-3 text-center text-xs font-medium leading-none text-white"
                              style={{
                                width: courseUser.progressPercentage + "%",
                              }}
                            >
                              {" "}
                              <p className="absolute font-semibold">
                                {courseUser.progressPercentage}% Diselesaikan
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 flex justify-between gap-2 text-sm">
                          <div className="flex items-center">
                            <h5 className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-02 text-xs font-bold">
                              0
                            </h5>
                            <p className="font-medium">Preview</p>
                          </div>
                          <button>
                            <IoPlayCircle
                              className="text-3xl text-alert-success"
                              onClick={() => {
                                setVideoContentURL(course.videoPreviewUrl);
                              }}
                            />
                          </button>
                        </div>
                        <div className="mb-4 flex flex-col gap-4">
                          {chaptersUser.length > 0 &&
                            chaptersUser.map((chapter) => (
                              <>
                                <div className="flex items-start justify-between gap-3 text-sm font-extrabold">
                                  <h4 className="text-primary-01 ">
                                    Chapter {chapter.no} - {chapter.name}
                                  </h4>
                                  <p className="min-w-fit text-right ">
                                    {chapter.totalDuration} Menit
                                  </p>
                                </div>
                                {chapter.myModules?.length > 0 &&
                                  chapter.myModules.map((module) => (
                                    <div className="flex justify-between gap-2 text-sm">
                                      <div className="flex items-center ">
                                        <h5 className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-02 text-xs font-bold">
                                          {module.moduleData?.no}
                                        </h5>
                                        <p className="font-medium">
                                          {module.moduleData?.name}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() =>
                                          handleOpenModule(
                                            module.id,
                                            module.status,
                                          )
                                        }
                                      >
                                        {module.status === "terbuka" ? (
                                          <IoPlayCircle className="text-3xl text-primary-01" />
                                        ) : module.status === "dipelajari" ? (
                                          <IoPlayCircle className="text-3xl text-alert-success" />
                                        ) : (
                                          <IoIosLock className="text-3xl text-neutral-07" />
                                        )}
                                      </button>
                                    </div>
                                  ))}
                              </>
                            ))}
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="mt-4 md:hidden">
                      <h3 className="mb-2 text-xl font-bold">Tentang Kelas</h3>
                      {course.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index} className="mb-4 text-clip text-sm">
                            {paragraph}
                          </p>
                        ))}
                      <h3 className="mb-2 mt-4 text-xl font-bold">
                        Keuntungan Mengikuti Kelas Ini
                      </h3>
                      <div className="px-2 text-sm">
                        {course.benefits.map((benefit) => (
                          <div className="flex gap-2">
                            <p>{benefit.no}.</p>
                            <p>{benefit.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-4 hidden md:block">
                    <h3 className="mb-2 text-xl font-bold">Tentang Kelas</h3>
                    <div className="px-1">
                      {course.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index} className="mb-4 text-clip text-sm">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                    <h3 className="mt-4 text-xl font-bold">
                      Keuntungan Mengikuti Kelas Ini
                    </h3>
                    <div className="px-1 text-sm">
                      {course.benefits.map((benefit) => (
                        <div className="my-1 flex gap-2">
                          <p>{benefit.no}.</p>
                          <p>{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {courseUser &&
                courseUser.isFollowing &&
                courseUser.isAccessible && (
                  <div className="hidden w-2/5 md:block">
                    <div className="mb-6 h-fit rounded-3xl bg-white p-6 shadow-lg">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Materi Belajar</h2>
                        <div className="w-40 rounded-full bg-neutral-07 ">
                          <div
                            className="flex h-4 items-center rounded-full bg-primary-01 p-0.5 px-3 text-center text-xs font-medium leading-none text-white"
                            style={{
                              width: courseUser.progressPercentage + "%",
                            }}
                          >
                            {" "}
                            <p className="absolute font-semibold">
                              {courseUser.progressPercentage}% Diselesaikan
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 flex justify-between gap-2 text-sm">
                        <div className="flex items-center">
                          <h5 className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-02 text-xs font-bold">
                            0
                          </h5>
                          <p className="font-medium">Preview</p>
                        </div>
                        <button>
                          <IoPlayCircle
                            className="text-3xl text-alert-success"
                            onClick={() => {
                              setVideoContentURL(course.videoPreviewUrl);
                            }}
                          />
                        </button>
                      </div>
                      <div className="mb-4 flex flex-col gap-4">
                        {chaptersUser.length > 0 &&
                          chaptersUser.map((chapter) => (
                            <>
                              <div className="flex items-start justify-between gap-3 text-sm font-extrabold">
                                <h4 className="text-primary-01 ">
                                  Chapter {chapter.no} - {chapter.name}
                                </h4>
                                <p className="min-w-fit text-right">
                                  {chapter.totalDuration} Menit
                                </p>
                              </div>
                              {chapter.myModules?.length > 0 &&
                                chapter.myModules.map((module) => (
                                  <div className="flex justify-between gap-2 text-sm">
                                    <div className="flex items-center ">
                                      <h5 className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-02 text-xs font-bold">
                                        {module.moduleData?.no}
                                      </h5>
                                      <p className="font-medium">
                                        {module.moduleData?.name}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleOpenModule(
                                          module.id,
                                          module.status,
                                        )
                                      }
                                    >
                                      {module.status === "terbuka" ? (
                                        <IoPlayCircle className="text-3xl text-primary-01" />
                                      ) : module.status === "dipelajari" ? (
                                        <IoPlayCircle className="text-3xl text-alert-success" />
                                      ) : (
                                        <IoIosLock className="text-3xl text-neutral-07" />
                                      )}
                                    </button>
                                  </div>
                                ))}
                            </>
                          ))}
                      </div>
                    </div>
                    {/* <div className="bg-white p-6 rounded-3xl h-fit mb-6 shadow-lg">
                      <div>
                        <h2 className="font-bold text-xl mb-2">Beri Ulasan</h2>
                        <div className="flex flex-col gap-3 text-sm">
                          <label
                            className="text-primary-01 font-extrabold"
                            htmlFor="rating"
                          >
                            Rating
                          </label>
                          <div>Stars Rating</div>
                        </div>
                        <div className="flex flex-col gap-3 text-sm">
                          <label
                            htmlFor="comment"
                            className="text-primary-01 font-extrabold"
                          >
                            Komentar
                          </label>
                          <textarea
                            id="comment"
                            name="comment"
                            className="border rounded-xl p-2 outline-1"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}
            </div>
          </div>
        )
      )}
    </MainLayout>
  );
}
