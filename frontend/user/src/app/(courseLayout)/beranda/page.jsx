"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { IoDiamondSharp, IoGiftSharp } from "react-icons/io5";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "./style.css";
import { getCourse } from "@/services/course.service";
import { useEffect, useState } from "react";
import Loading from "@/components/loading-animation/Loading";
import { getCategories } from "@/services/category.service";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("semua");

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        console.log(res);
        if (res.status === "Success") {
          setCategories(res.data);
        } else {
          setCategories([]);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await getCourse({ categoryId: filterCategory });
        console.log(res.data);
        setCourses(res.data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [filterCategory]);

  return (
    <>
      <div className="bg-primary-01 pt-2 px-3 hidden sm:flex w-full">
        <div className="flex w-1/2 justify-center">
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/practitioner%202.png?updatedAt=1706928870170"
            }
            height={380}
            width={300}
            className="object-contain lg:w-[380px] md:w-80 sm:w-72"
            alt="sinow mascot practitioner"
          />
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div
            className={`flex flex-col items-start justify-center sm:text-xl md:text-2xl text-white font-bold ${montserrat.className}`}
          >
            <h1>Belajar</h1>
            <h1>dari Praktisi Terbaik!</h1>
            <Link
              href="/kursus"
              className="w-full bg-white hover:bg-neutral-02 text-center rounded-2xl sm:text-base md:text-lg mt-4 py-1 text-primary-01 "
            >
              Ikuti Kelas
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-4 sm:pt-6 sm:mb-1 lg:pt-8 lg:mb-3">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={20}
          className="mySwiper"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 50,
            },
          }}
        >
          <SwiperSlide>
            <Image
              src={
                "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Ads%20Banner/ads_sinow_learn.png?updatedAt=1707381013622"
              }
              width={544}
              height={306}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner learn sinow"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={
                "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Ads%20Banner/ads_sinow_promo.png?updatedAt=1707381013791"
              }
              width={544}
              height={306}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner promo sinow"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={
                "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Ads%20Banner/ads_sinow_tags.png?updatedAt=1707381013979"
              }
              width={544}
              height={306}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner tags sinow"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="px-8 pt-2 pb-8 md:px-0 md:w-4/5 mx-auto">
        <h1 className="font-bold text-2xl mb-4">Kategori</h1>
        {/* <div className="grid grid-cols-2 min-[300px]:grid-cols-3 min-[440px]:grid-cols-4   md:grid-cols-5 lg:grid-cols-8 gap-4  "> */}

        <div className="flex items-center justify-center gap-10 md:gap-10 lg:gap-11 min-[1200px]:gap-12  flex-wrap">
          {categories.map((category) => (
            <Link
              href={`/kursus?categoryId=${category.id}`}
              className="flex flex-col items-center text-center justify-between w-16 md:w-20"
            >
              <Image
                src={category.imageUrl}
                width={80}
                height={80}
                alt={`${category.name} icon`}
              />
              <p className="text-xs md:text-sm mt-1">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-8 pt-2 pb-8 md:px-0 md:w-4/5 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Kursus Populer</h1>
          <Link href={"/kursus"} className="font-bold text-sm text-primary-01">
            Lihat semua
          </Link>
        </div>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="category-swiper mySwiper mb-2"
          autoHeight={true}
        >
          <SwiperSlide className="category-slide">
            <button
              className="text-xs font-bold bg-primary-01 text-white px-4 py-1 rounded-2xl"
              onClick={() => setFilterCategory("semua")}
            >
              Semua
            </button>
          </SwiperSlide>
          {categories.map(
            (category) =>
              category.isPopular && (
                <SwiperSlide className="category-slide" key={category.id}>
                  <button
                    className="text-xs font-bold bg-primary-01 text-white px-4 py-1 rounded-2xl"
                    onClick={() => setFilterCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </SwiperSlide>
              )
          )}
        </Swiper>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {isLoading ? (
            <div className="col-span-full">
              <Loading />
            </div>
          ) : (
            courses &&
            courses.map((course) => (
              <div key={course.id} className="rounded-3xl bg-white shadow-lg ">
                <Image
                  src={
                    course.imageUrl ||
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  width={320}
                  height={80}
                  className="object-cover w-full h-32 rounded-t-3xl"
                  alt={course.name}
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h1 className="font-bold text-sm text-primary-01">
                      {course.category?.name}
                    </h1>
                    <div className="flex ">
                      <FaStar className="text-alert-attention" />
                      <p className="text-sm font-semibold ml-1">
                        {course.rating}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-sm truncate font-bold mt-1">
                    {course.name}
                  </h2>
                  <p className="text-xs mt-1">{course.courseBy}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <RiShieldStarLine className="text-alert-success" />
                      <p className="text-[0.65rem] ml-1 font-semibold text-primary-01">
                        Level{" "}
                        {course.level === "beginner"
                          ? "Pemula"
                          : course.level === "intermediate"
                            ? "Menengah"
                            : "Mahir"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <PiBooks className="text-alert-success" />
                      <p className="text-[0.65rem] ml-1">
                        {course.totalModule} Modul
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <PiClockFill className="text-alert-success" />
                      <p className="text-[0.65rem] ml-1">
                        {course.totalDuration} Menit
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center justify-between mt-4 bg-primary-01 hover:bg-primary-04 py-1 px-4 rounded-2xl text-white font-semibold text-xs">
                    {course.type === "premium" ? (
                      <>
                        <span className="flex mr-4">
                          <IoDiamondSharp className="mr-1 text-base inline-block" />
                          Beli
                        </span>
                        <span>Rp. {course.price}</span>
                      </>
                    ) : (
                      <p className=" w-20 flex items-center justify-center">
                        <span>
                          <IoGiftSharp className="mr-1 text-base " />
                        </span>
                        Gratis
                      </p>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
