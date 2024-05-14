"use client";

import Link from "next/link";
import {
  LuPencilLine,
  LuSettings,
  LuLogOut,
  LuShoppingCart,
  LuArrowLeft,
} from "react-icons/lu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Profile from "@/components/profile-content/Profile";
import ChangePassword from "@/components/profile-content/ChangePassword";
import PaymentHistory from "@/components/profile-content/PaymentHistory";

export default function ProfilePage() {
  const { push } = useRouter();
  const [content, setContent] = useState("profil");

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    push("/auth/login");
  };

  return (
    <>
      <div className="hidden sm:flex flex-col items-center ">
        <div className="flex flex-col w-full sm:w-11/12 md:w-4/5 lg:w-3/4 items-center  rounded-2xl  ">
          <div className="w-full py-2 mt-2">
            <Link href={"/"} className="text-primary-01 hover:text-primary-02">
              <LuArrowLeft className="inline-block text-xl mr-1" />
              Kembali ke beranda
            </Link>
          </div>
          <div className="w-full rounded-2xl shadow-md-blue border border-primary-01 ">
            <div className="bg-primary-01 text-white font-bold text-xl w-full text-center rounded-t-2xl py-2 ">
              <p>Akun</p>
            </div>
            <div className="flex w-full h-[71vh]">
              <div className="w-1/2 py-3 font-medium  border-r border-primary-01 min-h-fit">
                <div
                  className="px-6 py-3 hover:border-l-4 border-primary-01 hover:text-primary-01 hover:bg-primary-01-transparent "
                  onClick={() => setContent("profil")}
                >
                  <LuPencilLine className="inline-block text-2xl mr-2" /> Profil
                  Saya
                </div>
                <div
                  className="px-6 py-3 hover:border-l-4 border-primary-01 hover:text-primary-01 hover:bg-primary-01-transparent"
                  onClick={() => setContent("ubahPassword")}
                >
                  <LuSettings className="inline-block text-2xl mr-2" /> Ubah
                  Password
                </div>
                <div
                  className="px-6 py-3 hover:border-l-4 border-primary-01 hover:text-primary-01 hover:bg-primary-01-transparent"
                  onClick={() => setContent("paymentHistory")}
                >
                  <LuShoppingCart className="inline-block text-2xl mr-2" />{" "}
                  Riwayat Pembayaran
                </div>
                <div className="hover:border-l-4 border-alert-danger text-alert-danger hover:bg-alert-danger-transparent px-6 py-3">
                  <button onClick={(e) => handleLogout(e)}>
                    <LuLogOut className="inline-block text-2xl mr-2" /> Keluar
                  </button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-center p-4 overflow-auto">
                {content === "profil" ? (
                  <Profile />
                ) : content === "ubahPassword" ? (
                  <ChangePassword />
                ) : (
                  <PaymentHistory />
                )}
              </div>
            </div>
          </div>
          <p className="text-neutral-300 mt-4">Versi 0.1.0</p>
        </div>
      </div>
      <div className="sm:hidden p-4  bg-neutral-02 min-h-screen">
        <Link href={"/"}>
          <LuArrowLeft className="text-2xl" />
        </Link>
        <h1 className="font-bold text-2xl mt-5 mb-2 p-2">Akun</h1>
        <div className="bg-white pt-4 pb-4 rounded-2xl text-sm">
          <div className="p-4 border-b   ">
            <button>
              <LuPencilLine className="inline-block text-xl mr-2 text-primary-01" />{" "}
              Profil Saya
            </button>
          </div>
          <div className="p-4 border-b ">
            <button>
              <LuSettings className="inline-block text-xl mr-2 text-primary-01" />{" "}
              Ubah Password
            </button>
          </div>
          <div className="p-4 border-b">
            <button>
              <LuShoppingCart className="inline-block text-xl mr-2 text-primary-01" />{" "}
              Riwayat Pembayaran
            </button>
          </div>
          <div className="p-4 border-b text-alert-danger mb-8">
            <button onClick={(e) => handleLogout(e)}>
              <LuLogOut className="inline-block text-xl mr-2" /> Keluar
            </button>
          </div>
        </div>
        <p className="text-xs text-neutral-04 mt-2 text-center">Versi 0.1.0</p>
      </div>
    </>
  );
}
