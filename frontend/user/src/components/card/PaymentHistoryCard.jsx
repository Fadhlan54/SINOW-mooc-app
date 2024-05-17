import Image from "next/image";
import Link from "next/link";
import { FaExclamationTriangle, FaStar } from "react-icons/fa";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { RiShieldStarLine } from "react-icons/ri";
import { FaHourglassHalf, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoDiamondSharp } from "react-icons/io5";

export default function PaymentHistoryCard({ transaction }) {
  return (
    <div className="mx-auto mb-3 w-11/12 max-w-80 rounded-xl border border-primary-01 shadow-xl">
      <Link href={`/kursus/${transaction.courseId}`}>
        <Image
          src={transaction.Course.imageUrl}
          width={200}
          height={100}
          className="h-28 w-full rounded-t-xl object-cover"
        />
      </Link>
      <div className="p-3">
        <div className="flex justify-between">
          <h1 className="text-sm font-bold text-primary-01">
            {transaction.Course.category?.name}
          </h1>
          <div className="flex ">
            <FaStar className="text-alert-attention" />
            <p className="ml-1 text-sm font-semibold">
              {transaction.Course.rating}
            </p>
          </div>
        </div>
        <h2 className="mt-1 truncate text-sm font-bold">
          {transaction.Course.name}
        </h2>
        <p className="mt-1 text-xs">{transaction.Course.courseBy}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <RiShieldStarLine className="text-alert-success" />
            <p className="ml-1 text-[0.65rem] font-semibold text-primary-01">
              Level{" "}
              {transaction.Course.level?.charAt(0).toUpperCase() +
                transaction.Course.level.slice(1)}
            </p>
          </div>
          <div className="flex items-center">
            <PiBooks className="text-alert-success" />
            <p className="ml-1 text-[0.65rem]">
              {transaction.Course.totalModule} Modul
            </p>
          </div>
          <div className="flex items-center justify-center">
            <PiClockFill className="text-alert-success" />
            <p className="ml-1 text-[0.65rem]">
              {transaction.Course.totalDuration} Menit
            </p>
          </div>
        </div>
        {transaction.status === "BELUM_BAYAR" ? (
          <Link
            href={transaction.paymentUrl}
            target="_blank"
            className="mb-1 mt-2 flex w-fit items-center gap-2 rounded-full bg-primary-01 px-5 py-1 text-xs font-bold  text-white hover:bg-primary-03"
          >
            <FaMoneyCheckDollar className="text-base" /> Bayar sekarang
          </Link>
        ) : transaction.status === "SUDAH_BAYAR" ? (
          <div className="mb-1 mt-2 flex w-fit items-center gap-2 rounded-full bg-alert-success px-5 py-1 text-xs  font-bold text-white">
            <IoDiamondSharp className="text-base" /> Sudah bayar
          </div>
        ) : transaction.status === "TERTUNDA" ? (
          <div className="mb-1 mt-2 flex w-fit items-center gap-2 rounded-full bg-alert-attention px-5 py-1 text-xs  font-bold text-white">
            <FaHourglassHalf className="text-base" /> Transaksi tertunda
          </div>
        ) : transaction.status === "KADALUARSA" ? (
          <div className="mb-1 mt-2 flex w-fit items-center gap-2 rounded-full bg-alert-danger px-5 py-1 text-xs  font-bold text-white">
            <FaExclamationTriangle className="text-base" /> Transaksi kadaluarsa
          </div>
        ) : (
          <div className="mb-1 mt-2 flex w-fit items-center gap-2 rounded-full bg-alert-danger px-5 py-1 text-xs  font-bold text-white">
            <FaExclamationTriangle className="text-base" /> Transaksi gagal
          </div>
        )}
      </div>
    </div>
  );
}
