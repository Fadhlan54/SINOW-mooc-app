"use client";

import MainLayout from "@/components/MainLayout";
import { fetchGetTrxUserById } from "@/services/transaction.service";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessfulPayment() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userId = Cookies.get("token");

  useEffect(() => {
    const getTransactionUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetchGetTrxUserById({ userId, trxId: orderId });
        console.log(res);
        if (res?.data?.status === "Success") {
          setCourseName(res.data?.data?.course?.name);
          setCourseId(res.data?.data?.course?.id);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getTransactionUser();
  }, []);
  return (
    <MainLayout>
      {isLoading && <LoadingScreen />}
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="mx-4 flex max-w-sm flex-col items-center rounded-xl border bg-white p-6 shadow-md">
          <h1 className="mb-3 text-2xl font-bold">Pembayaran Berhasil!</h1>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/premium_asset.png?updatedAt=1710768286085"
            }
            width={183}
            height={147}
            alt="Sinow Mascot onboarding"
            priority
          />
          <div className="mt-4 w-full text-sm">
            <p>Kamu sekarang kamu sudah memiliki akses ke kursus:</p>
            <p className="mt-1 font-bold">{courseName}</p>
          </div>
          <div className="mt-2 w-full text-sm">
            <Link
              href={`/kursus/${courseId}`}
              className="block w-full rounded-full bg-primary-01 py-1 text-center font-bold text-white hover:bg-primary-02  "
            >
              Lihat kursus
            </Link>
            <Link
              href={"/"}
              className="mt-1 block w-full text-center font-bold text-primary-01 underline hover:text-primary-02"
            >
              Pergi ke beranda
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SuccessfullPaymentPage() {
  return (
    <Suspense>
      <SuccessfulPayment />
    </Suspense>
  );
}
