"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "./style.css";
import { fetchCourses } from "@/services/course.service";
import { useEffect, useState } from "react";
import Loading from "@/components/loading-animation/Loading";
import { fetchCategories } from "@/services/category.service";
import MainLayout from "@/components/MainLayout";
import CourseCard from "@/components/card/CourseCard";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("semua");

  useEffect(() => {
    const handleGetCategories = async () => {
      try {
        const res = await fetchCategories();
        if (res.status === "Success") {
          setCategories(res.data);
        } else {
          setCategories([]);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    handleGetCategories();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const res = await fetchCourses({ categoryId: filterCategory });
        if (res.status === "Success") {
          setCourses(res.data);
        } else {
          setCourses([]);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, [filterCategory]);

  return (
    <MainLayout>
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
      <div className="mt-4 max-w-7xl mx-auto">
        <Swiper
          slidesPerView={1.25}
          spaceBetween={20}
          className="mySwiper banner-swiper"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            300: {
              slidesPerView: 1.25,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2.25,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          <SwiperSlide className="banner-slide">
            <Image
              src={
                "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Ads%20Banner/ads_sinow_learn.png?updatedAt=1707381013622"
              }
              width={540}
              height={300}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner learn sinow"
            />
          </SwiperSlide>
          <SwiperSlide className="banner-slide">
            <Image
              src={
                "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Ads%20Banner/ads_sinow_promo.png?updatedAt=1707381013791"
              }
              width={540}
              height={300}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner promo sinow"
            />
          </SwiperSlide>
          <SwiperSlide className="banner-slide">
            <Image
              src={
                "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Ads%20Banner/ads_sinow_tags.png?updatedAt=1707381013979"
              }
              width={540}
              height={300}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner tags sinow"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="px-4 md:px-6 pb-6 lg:w-11/12 lg:mx-auto max-w-7xl">
        <div className="pt-2 mx-auto">
          <h1 className="font-bold text-2xl mb-2">Kategori</h1>
          <Swiper
            slidesPerView={"auto"}
            freeMode={true}
            modules={[FreeMode]}
            className="category-swiper mb-2 "
            autoHeight={true}
            breakpoints={{
              0: {
                slidesPerView: "auto",
                spaceBetween: 20,
              },
              640: {
                slidesPerView: "auto",
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 35,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide
                className="cat-slide min-h-full bg-primary-01 hover:bg-primary-04 shadow-md rounded-lg"
                key={category.id}
              >
                <Link
                  href={`/kursus?categoryId=${category.id}`}
                  className="flex flex-col items-center text-center justify-between w-24  px-3 pt-3 pb-2  "
                >
                  <Image
                    src={category.imageUrl}
                    width={80}
                    height={80}
                    alt={`${category.name} icon`}
                  />
                  <p className="text-[0.66rem] mt-2 font-bold text-white">
                    {category.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Kursus Populer</h1>
            <Link
              href={"/kursus"}
              className="font-bold text-sm text-primary-01"
            >
              Lihat semua
            </Link>
          </div>

          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode]}
            className="pop-category-swiper mySwiper mt-1 mb-4"
            autoHeight={true}
          >
            <SwiperSlide className="cat-slide">
              <button
                className="text-xs font-bold bg-primary-01 text-white px-4 py-1 rounded-2xl hover:bg-primary-04"
                onClick={() => setFilterCategory("semua")}
              >
                Semua
              </button>
            </SwiperSlide>
            {categories.map(
              (category) =>
                category.isPopular && (
                  <SwiperSlide className="cat-slide" key={category.id}>
                    <button
                      className="text-xs font-bold bg-primary-01 text-white px-4 py-1 rounded-2xl hover:bg-primary-04"
                      onClick={() => setFilterCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </SwiperSlide>
                )
            )}
          </Swiper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {isLoading ? (
              <div className="col-span-full">
                <Loading />
              </div>
            ) : (
              courses &&
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
