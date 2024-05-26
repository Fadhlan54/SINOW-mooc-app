"use client";

import MainLayout from "@/components/MainLayout";
import CourseCard from "@/components/card/CourseCard";
import NoCourseCard from "@/components/card/NoCourseCard";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";
import { currencyFormatterIDR } from "@/lib/formatter";
import { fetchCourseById, fetchOtherCourses } from "@/services/course.service";
import { fetchCreateTrx } from "@/services/transaction.service";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Pembayaran({ params }) {
  const [course, setCourse] = useState({});
  const [otherCourses, setOtherCourses] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);
  const [detailPrice, setDetailPrice] = useState({
    price: 0,
    discountPercentage: 0,
    discountPrice: 0,
    taxPrice: 0,
    total: 0,
  });
  const id = params.id;

  useEffect(() => {
    const getCourseById = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const res = await fetchCourseById(id);

        if (res?.data?.status === "Success") {
          if (res.data?.data?.type !== "premium") {
            setError("Kursus ini bukan premium");
          } else {
            setCourse(res.data?.data);
            const price = res.data?.data?.price;
            const discountPercentage = res.data?.data?.promoDiscountPercentage;
            const discountPrice = price * (discountPercentage / 100);
            const taxPrice = (price - discountPrice) * 0.11;
            const total = price - discountPrice + taxPrice;
            setDetailPrice({
              price,
              discountPercentage,
              discountPrice,
              taxPrice,
              total,
            });
          }
        } else {
          setError({ status: res.status, message: res.data.message });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCourseById();

    const getOtherCourses = async () => {
      try {
        setIsLoading(true);
        const res = await fetchOtherCourses(id);
        if (res?.data?.status === "Success") {
          setOtherCourses(res.data?.data);
        } else {
          setError({ status: res.status, message: res.data.message });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getOtherCourses();
  }, []);

  useEffect(() => {
    const snapMidtransScriptURL =
      "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = snapMidtransScriptURL;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCreateTransaction = async () => {
    const res = await fetchCreateTrx({
      userId: Cookies.get("token"),
      courseId: id,
    });
    window.snap.pay(res.data?.data?.paymentDetail?.paymentToken);
  };

  return (
    <MainLayout disableSearch>
      <div className="border-t-2 p-4 md:px-10">
        {isLoading ? (
          <LoadingScreen />
        ) : course ? (
          <div className="w-full gap-4">
            <div className="mx-auto h-fit w-fit max-w-7xl rounded-3xl border border-primary-01 shadow-lg">
              <div className="flex items-center justify-center rounded-t-3xl bg-primary-01 p-2 text-white">
                <h1 className="text-xl font-bold">Pembayaran Kursus</h1>
              </div>

              <div className="flex-wrap gap-4 p-4 sm:flex">
                <div className="w-full rounded-3xl shadow-md sm:max-w-80">
                  <Image
                    width={320}
                    height={96}
                    src={course.imageUrl}
                    className="h-24 w-full rounded-t-3xl object-cover"
                  />
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-bold text-primary-01">
                      {course.category?.name}
                    </h3>
                    <h2 className="text-sm font-bold">{course.name}</h2>
                    <p className="mt-1 text-xs md:mt-2">
                      Oleh {course.courseBy}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-sm sm:mt-0">
                  <h2 className="text-lg font-bold text-primary-01">
                    Rincian Harga
                  </h2>
                  <h4 className="font-bold">Harga</h4>
                  <div className="flex items-center">
                    <p className="mr-1">
                      {detailPrice.discountPercentage > 0
                        ? currencyFormatterIDR(
                            detailPrice.price - detailPrice.discountPrice,
                          )
                        : currencyFormatterIDR(detailPrice.price)}
                    </p>
                    {course.promoDiscountPercentage > 0 && (
                      <>
                        <p className="mr-1 font-semibold text-neutral-04 line-through">
                          {currencyFormatterIDR(detailPrice.price)}
                        </p>
                        <p className="text-xs text-neutral-04">
                          Diskon {detailPrice.discountPercentage}%
                        </p>
                      </>
                    )}
                  </div>
                  <h4 className="text-sm font-bold">PPN 11%</h4>
                  <p>{currencyFormatterIDR(detailPrice.taxPrice)}</p>
                  <h4 className="text-sm font-bold">Total Bayar</h4>
                  <p className="font-extrabold text-primary-01">
                    {currencyFormatterIDR(detailPrice.total)}
                  </p>
                  <button
                    className="mt-2 block rounded-full bg-primary-01 px-5 py-2 text-xs font-bold text-white hover:bg-primary-04 sm:w-full"
                    onClick={handleCreateTransaction}
                  >
                    Bayar dan akses kursus selamanya
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <h1 className="mb-1 text-lg font-bold">Rekomendasi Kursus</h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {otherCourses &&
                  otherCourses.length > 0 &&
                  otherCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <NoCourseCard />
        )}
      </div>
    </MainLayout>
  );
}
