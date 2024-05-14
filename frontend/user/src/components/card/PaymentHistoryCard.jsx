import { dateFormatter } from "@/lib/formatter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaStar } from "react-icons/fa";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { RiShieldStarLine } from "react-icons/ri";
import { FaHourglassHalf, FaMoneyCheckDollar } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";

export default function PaymentHistoryCard({ transaction }) {
  return (
    <div className="w-80 shadow-xl rounded-xl border border-primary-01 mb-3">
      <Link href={`/kursus/${transaction.courseId}`}>
        <Image
          src={transaction.Course.imageUrl}
          width={200}
          height={100}
          className="w-full h-28 rounded-t-xl object-cover"
        />
      </Link>
      <div className="p-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-sm text-primary-01">
            {transaction.Course.category?.name}
          </h1>
          <div className="flex ">
            <FaStar className="text-alert-attention" />
            <p className="text-sm font-semibold ml-1">
              {transaction.Course.rating}
            </p>
          </div>
        </div>
        <h2 className="text-sm truncate font-bold mt-1">
          {transaction.Course.name}
        </h2>
        <p className="text-xs mt-1">{transaction.Course.courseBy}</p>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <RiShieldStarLine className="text-alert-success" />
            <p className="text-[0.65rem] ml-1 font-semibold text-primary-01">
              Level{" "}
              {transaction.Course.level?.charAt(0).toUpperCase() +
                transaction.Course.level.slice(1)}
            </p>
          </div>
          <div className="flex items-center">
            <PiBooks className="text-alert-success" />
            <p className="text-[0.65rem] ml-1">
              {transaction.Course.totalModule} Modul
            </p>
          </div>
          <div className="flex items-center justify-center">
            <PiClockFill className="text-alert-success" />
            <p className="text-[0.65rem] ml-1">
              {transaction.Course.totalDuration} Menit
            </p>
          </div>
        </div>
        {transaction.status === "BELUM_BAYAR" ? (
          <Link
            href={transaction.paymentUrl}
            target="_blank"
            className="bg-primary-01 hover:bg-primary-03 text-white rounded-xl text-xs font-bold flex items-center py-1 px-4 mt-2 mb-1  gap-2 w-fit"
          >
            <FaMoneyCheckDollar className="text-base" /> Bayar sekarang
          </Link>
        ) : transaction.status === "SUDAH_BAYAR" ? (
          <div className="bg-alert-success text-white rounded-xl text-xs font-bold flex items-center py-1 px-4 mt-2 mb-1  gap-2 w-fit">
            <IoDiamondSharp className="text-base" /> Sudah bayar
          </div>
        ) : transaction.status === "TERTUNDA" ? (
          <div className="bg-alert-attention text-white rounded-xl text-xs font-bold flex items-center py-1 px-4 mt-2 mb-1  gap-2 w-fit">
            <FaHourglassHalf className="text-base" /> Transaksi tertunda
          </div>
        ) : transaction.status === "KADALUARSA" ? (
          <div className="bg-alert-danger text-white rounded-xl text-xs font-bold flex items-center py-1 px-4 mt-2 mb-1  gap-2 w-fit">
            <FaExclamationTriangle className="text-base" /> Transaksi kadaluarsa
          </div>
        ) : (
          <div className="bg-alert-danger text-white rounded-xl text-xs font-bold flex items-center py-1 px-4 mt-2 mb-1  gap-2 w-fit">
            <FaExclamationTriangle className="text-base" /> Transaksi gagal
          </div>
        )}
      </div>
    </div>
  );
}
