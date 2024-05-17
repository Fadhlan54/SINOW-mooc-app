"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import { fetchResetPassword } from "@/services/auth.service";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function ResetPasswordPage(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = props.params;
  const { push } = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmedPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmedPassword = e.target.confirmPassword.value;

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Kata sandi minimal 8 karakter",
      });
      return;
    }
    if (password !== confirmedPassword) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Kata sandi tidak cocok",
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetchResetPassword(token, password);
      if (res.status === "Success") {
        const result = await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Kata sandi telah diubah",
          showConfirmButton: true,
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          push("/auth/login");
          return;
        }
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
    <div className={`flex min-h-screen ${poppins.className}`}>
      {isLoading && <LoadingScreen />}
      <div className="mx-6 flex w-full flex-col items-center justify-center lg:w-1/2">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/reset-password.png?updatedAt=1706606384684"
          }
          alt="sinow logo dark with text dark"
          width={214}
          height={164}
          className="mb-8 mt-14 sm:mt-0"
        />
        <form
          className="w-full max-w-[452px] lg:w-3/4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3
            className={`text mb-4 text-2xl font-bold text-primary-01 ${montserrat.className}`}
          >
            Setel ulang kata sandi
          </h3>
          <div className="mb-4">
            <label htmlFor="password" className="text-xs">
              Kata Sandi
            </label>

            <div className="flex items-end">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Masukkan kata sandi"
                className="mt-1 block w-full rounded-l-2xl border border-r-0 border-neutral-03 px-4 py-3 text-sm focus:outline-none"
              />
              <div
                className="cursor-pointer rounded-r-2xl  border border-l-0 border-neutral-03 px-4 py-3 text-xl"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <FiEyeOff className="hover:text-primary-01" />
                ) : (
                  <FiEye className="hover:text-primary-01" />
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-xs">
              Konfirmasi Kata Sandi
            </label>

            <div className="flex items-end">
              <input
                type={showConfirmedPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Konfirmasi kata sandi"
                className="mt-1 block w-full rounded-l-2xl border border-r-0 border-neutral-03 px-4 py-3 text-sm focus:outline-none"
              />
              <div
                className="cursor-pointer rounded-r-2xl  border border-l-0 border-neutral-03 px-4 py-3 text-xl"
                onClick={toggleShowConfirmedPassword}
              >
                {showConfirmedPassword ? (
                  <FiEyeOff className="hover:text-primary-01" />
                ) : (
                  <FiEye className="hover:text-primary-01" />
                )}
              </div>
            </div>
          </div>
          <Button
            additionalClass={"w-full mt-4 hover:bg-primary-02"}
            type={"submit"}
          >
            reset kata sandi
          </Button>
          <div className="mt-6 text-center text-sm">
            <p>
              Belum punya akun?{" "}
              <Link
                href={"/register"}
                className="font-semibold text-primary-01 hover:text-primary-02"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden  w-1/2 flex-col items-center justify-center bg-primary-01 lg:flex">
        <div className="mb-6 flex w-full flex-col items-center text-center">
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo-sinow-bg-text.png?updatedAt=1706583375728"
            }
            alt="sinow logo dark with text"
            width={120}
            height={120}
          />
        </div>
        <div>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/everywhere%201.png?updatedAt=1706575980008"
            }
            alt="sinow mascot"
            height={537}
            width={490}
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
}
