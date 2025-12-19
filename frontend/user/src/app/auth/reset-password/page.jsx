"use client";

import Button from "@/components/Button";
import { fetchReqResetPassword } from "@/services/auth.service";
import { Montserrat, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const email = e.target.email.value;
    const Swal = (await import("sweetalert2")).default;
    try {
      const res = await fetchReqResetPassword(email);
      if (res.status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Tautan reset password telah dikirim ke email Anda",
        });
        e.target.email.value = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`flex min-h-screen items-center justify-center border border-neutral-03 ${poppins.className}`}
    >
      {" "}
      {isLoading && <LoadingScreen />}
      <div className="mx-6 flex flex-col items-center justify-center rounded-lg border px-4 py-7 shadow-xl">
        <Link href={"/"}>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo-sinow-bg-text-dark.png?updatedAt=1706583375417"
            }
            alt="sinow logo dark with text dark"
            width={120}
            height={120}
            className="mb-8"
          />
        </Link>
        <form
          className="w-full max-w-[452px] px-6 lg:w-3/4 lg:px-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3
            className={`text mb-2 text-2xl font-bold text-primary-01 ${montserrat.className}`}
          >
            Setel ulang kata sandi
          </h3>
          <p className="mb-6 text-xs">
            Masukkan email yang terhubung dengan akun anda dan kami akan
            mengirimkan tautan untuk mengatur ulang kata sandi ke email anda
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Masukkan email"
              className="mt-1 block w-full rounded-2xl border border-neutral-03 px-4 py-3 text-sm focus:outline-none"
            />
          </div>

          <Button
            additionalClass={"w-full mt-4 hover:bg-primary-02"}
            type={"submit"}
          >
            Selanjutnya
          </Button>
          <div className="mt-6 text-center text-sm">
            <p>
              Kembali ke halaman{" "}
              <Link
                href={"/auth/login"}
                className="font-semibold text-primary-01 hover:text-primary-02"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
