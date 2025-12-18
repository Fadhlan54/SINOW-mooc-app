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
      <div className="hidden w-full bg-primary-01 px-3 pt-2 sm:flex">
        <div className="flex w-1/2 justify-center">
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/practitioner%202.png?updatedAt=1706928870170"
            }
            height={380}
            width={300}
            className="object-contain sm:w-72 md:w-80 lg:w-[380px]"
            alt="sinow mascot practitioner"
          />
        </div>
        <div className="flex w-1/2 items-center justify-center">
          <div
            className={`flex flex-col items-start justify-center font-bold text-white sm:text-xl md:text-2xl ${montserrat.className}`}
          >
            <h1>Belajar</h1>
            <h1>dari Praktisi Terbaik!</h1>
            <Link
              href="/kursus"
              className="mt-4 w-full rounded-2xl bg-white py-1 text-center text-primary-01 hover:bg-neutral-02 sm:text-base md:text-lg "
            >
              Ikuti Kelas
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-7xl">
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
                "https://ik.imagekit.io/96gmelvyq/SINOW%20Banner/ads_sinow_tags%201.png?updatedAt=1766035743797"
              }
              width={540}
              height={300}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner learn sinow"
              priority
            />
          </SwiperSlide>
          <SwiperSlide className="banner-slide">
            <Image
              src={
                "https://ik.imagekit.io/96gmelvyq/SINOW%20Banner/ads_sinow_learn%201.png?updatedAt=1766035743594"
              }
              width={540}
              height={300}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner promo sinow"
              priority
            />
          </SwiperSlide>
          <SwiperSlide className="banner-slide">
            <Image
              src={
                "https://ik.imagekit.io/96gmelvyq/SINOW%20Banner/ads_sinow_promo%201.jpg?updatedAt=1766035743562"
              }
              width={540}
              height={300}
              className="rounded-3xl object-cover shadow-md"
              alt="ads banner tags sinow"
              priority
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="max-w-7xl px-4 pb-6 md:px-6 lg:mx-auto lg:w-11/12">
        <div className="mx-auto pt-2">
          <h1 className="mb-2 text-2xl font-bold">Kategori</h1>
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
                className="cat-slide min-h-full rounded-lg bg-primary-01 shadow-md hover:bg-primary-04"
                key={category.id}
              >
                <Link
                  href={`/kursus?categoryId=${category.id}`}
                  className="flex w-24 flex-col items-center justify-between px-3  pb-2 pt-3 text-center  "
                >
                  <Image
                    src={category.imageUrl}
                    width={80}
                    height={80}
                    alt={`${category.name} icon`}
                  />
                  <p className="mt-2 text-[0.66rem] font-bold text-white">
                    {category.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Kursus Populer</h1>
            <Link
              href={"/kursus"}
              className="text-sm font-bold text-primary-01"
            >
              Lihat semua
            </Link>
          </div>

          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode]}
            className="pop-category-swiper mySwiper mb-4 mt-1"
            autoHeight={true}
          >
            <SwiperSlide className="cat-slide">
              <button
                className="rounded-2xl bg-primary-01 px-4 py-1 text-xs font-bold text-white hover:bg-primary-04"
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
                      className="rounded-2xl bg-primary-01 px-4 py-1 text-xs font-bold text-white hover:bg-primary-04"
                      onClick={() => setFilterCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </SwiperSlide>
                ),
            )}
          </Swiper>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
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
