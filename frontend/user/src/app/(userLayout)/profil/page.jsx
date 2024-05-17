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
import { useState } from "react";
import Profile from "@/components/profile-content/Profile";
import ChangePassword from "@/components/profile-content/ChangePassword";
import PaymentHistory from "@/components/profile-content/PaymentHistory";

export default function ProfilePage() {
  const { push } = useRouter();
  const [content, setContent] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    push("/auth/login");
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden flex-col items-center sm:flex ">
        <div className="flex w-full flex-col items-center rounded-2xl sm:w-11/12 md:w-4/5  lg:w-3/4  ">
          <div className="mt-2 w-full py-2">
            <Link href={"/"} className="text-primary-01 hover:text-primary-02">
              <LuArrowLeft className="mr-1 inline-block text-xl" />
              Kembali ke beranda
            </Link>
          </div>
          <div className="w-full rounded-2xl border border-primary-01 shadow-md-blue ">
            <div className="w-full rounded-t-2xl bg-primary-01 py-2 text-center text-xl font-bold text-white ">
              <p>Akun</p>
            </div>
            <div className="flex h-[71vh] w-full">
              <div className="min-h-fit w-1/2 border-r  border-primary-01 py-3 font-medium">
                <div
                  className={`border-primary-01 px-6 py-3 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${(content === "profil" || content === "") && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
                  onClick={() => setContent("profil")}
                >
                  <LuPencilLine className="mr-2 inline-block text-2xl" /> Profil
                  Saya
                </div>
                <div
                  className={`border-primary-01 px-6 py-3 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${content === "ubahPassword" && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
                  onClick={() => setContent("ubahPassword")}
                >
                  <LuSettings className="mr-2 inline-block text-2xl" /> Ubah
                  Password
                </div>
                <div
                  className={`border-primary-01 px-6 py-3 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${content === "riwayatPembayaran" && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
                  onClick={() => setContent("riwayatPembayaran")}
                >
                  <LuShoppingCart className="mr-2 inline-block text-2xl" />{" "}
                  Riwayat Pembayaran
                </div>
                <div className="border-alert-danger px-6 py-3 text-alert-danger hover:border-l-4 hover:bg-alert-danger-transparent">
                  <button onClick={(e) => handleLogout(e)}>
                    <LuLogOut className="mr-2 inline-block text-2xl" /> Keluar
                  </button>
                </div>
              </div>
              <div className="flex w-1/2 flex-col items-center overflow-auto p-4">
                {content === "profil" || content === "" ? (
                  <Profile />
                ) : content === "ubahPassword" ? (
                  <ChangePassword />
                ) : (
                  content === "riwayatPembayaran" && <PaymentHistory />
                )}
              </div>
            </div>
          </div>
          <p className="mt-4 text-neutral-300">Versi 0.1.0</p>
        </div>
      </div>

      {/* Mobile */}
      {content === "" && (
        <div className="min-h-screen bg-neutral-02  p-4 sm:hidden">
          <Link href={"/"}>
            <LuArrowLeft className="text-2xl" />
          </Link>
          <h1 className="mb-2 mt-5 p-2 text-2xl font-bold">Akun</h1>
          <div className="rounded-2xl bg-white pb-4 pt-4 text-sm">
            <div className="border-b p-4   ">
              <button onClick={() => setContent("profil")}>
                <LuPencilLine className="mr-2 inline-block text-xl text-primary-01" />{" "}
                Profil Saya
              </button>
            </div>
            <div className="border-b p-4 ">
              <button onClick={() => setContent("ubahPassword")}>
                <LuSettings className="mr-2 inline-block text-xl text-primary-01" />{" "}
                Ubah Password
              </button>
            </div>
            <div className="border-b p-4">
              <button onClick={() => setContent("riwayatPembayaran")}>
                <LuShoppingCart className="mr-2 inline-block text-xl text-primary-01" />{" "}
                Riwayat Pembayaran
              </button>
            </div>
            <div className="mb-8 border-b p-4 text-alert-danger">
              <button onClick={(e) => handleLogout(e)}>
                <LuLogOut className="mr-2 inline-block text-xl" /> Keluar
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-neutral-04">
            Versi 0.1.0
          </p>
        </div>
      )}
      <div className="min-h-screen bg-neutral-02 p-4 sm:hidden">
        <button
          className="mb-4 text-primary-01 hover:text-primary-02"
          onClick={() => setContent("")}
        >
          <LuArrowLeft className="mr-1 inline-block text-xl" />
          Kembali
        </button>
        {content === "profil" ? (
          <Profile />
        ) : content === "ubahPassword" ? (
          <ChangePassword />
        ) : (
          content === "riwayatPembayaran" && <PaymentHistory />
        )}
      </div>
    </>
  );
}
