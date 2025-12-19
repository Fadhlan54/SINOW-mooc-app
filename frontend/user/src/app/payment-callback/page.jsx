"use client";

import MainLayout from "@/components/MainLayout";
import { PaymentFailed } from "@/components/card/PaymentFailed";
import PaymentPending from "@/components/card/PaymentPending";
import PaymentSuccess from "@/components/card/PaymentSuccess";
import { TransactionNotFound } from "@/components/card/TransactionNotFound";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";
import { fetchGetTrxUserById } from "@/services/transaction.service";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PaymentCB() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userId = Cookies.get("token");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    const getTransactionUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetchGetTrxUserById({ userId, trxId: orderId });
        if (res?.data?.status === "Success") {
          setCourseName(res.data?.data?.course?.name);
          setCourseId(res.data?.data?.course?.id);
          setPaymentStatus(res.data?.data?.transaction?.status);
          setPaymentUrl(res.data?.data?.transaction?.paymentUrl);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getTransactionUser();
  }, [orderId, userId]);
  return (
    <MainLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : !paymentStatus ? (
        <TransactionNotFound />
      ) : paymentStatus === "SUDAH_BAYAR" ? (
        <PaymentSuccess courseName={courseName} courseId={courseId} />
      ) : paymentStatus === "TERTUNDA" ? (
        <PaymentPending courseName={courseName} paymentUrl={paymentUrl} />
      ) : (
        <PaymentFailed courseName={courseName} />
      )}
    </MainLayout>
  );
}

export default function SuccessfullPaymentPage() {
  return (
    <Suspense>
      <PaymentCB />
    </Suspense>
  );
}
