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
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col items-center border p-6 rounded-xl shadow-md bg-white max-w-sm mx-4">
          <h1 className="font-bold text-2xl mb-3">Pembayaran Berhasil!</h1>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/premium_asset.png?updatedAt=1710768286085"
            }
            width={183}
            height={147}
            alt="Sinow Mascot onboarding"
            priority
          />
          <div className="w-full text-sm mt-4">
            <p>Kamu sekarang kamu sudah memiliki akses ke kursus:</p>
            <p className="font-bold mt-1">{courseName}</p>
          </div>
          <div className="w-full mt-2 text-sm">
            <Link
              href={`/kursus/${courseId}`}
              className="block w-full text-center bg-primary-01 text-white font-bold rounded-full py-1 hover:bg-primary-02  "
            >
              Lihat kursus
            </Link>
            <Link
              href={"/beranda"}
              className="block w-full text-center mt-1 text-primary-01 font-bold underline hover:text-primary-02"
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
