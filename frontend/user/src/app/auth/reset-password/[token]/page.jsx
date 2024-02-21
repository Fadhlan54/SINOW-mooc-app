"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import { resetPassword } from "@/services/auth.service";
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
      const res = await resetPassword(token, password);
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
      <div className="flex items-center flex-col justify-center w-full lg:w-1/2 mx-6">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/reset-password.png?updatedAt=1706606384684"
          }
          alt="sinow logo dark with text dark"
          width={214}
          height={164}
          className="mt-14 mb-8 sm:mt-0"
        />
        <form
          className="w-full lg:w-3/4 max-w-[452px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3
            className={`text-primary-01 font-bold text text-2xl mb-4 ${montserrat.className}`}
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
                className="block border border-r-0 border-neutral-03 rounded-l-2xl py-3 px-4 w-full text-sm mt-1 focus:outline-none"
              />
              <div
                className="border border-l-0  border-neutral-03 rounded-r-2xl py-3 px-4 text-xl cursor-pointer"
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
                className="block border border-r-0 border-neutral-03 rounded-l-2xl py-3 px-4 w-full text-sm mt-1 focus:outline-none"
              />
              <div
                className="border border-l-0  border-neutral-03 rounded-r-2xl py-3 px-4 text-xl cursor-pointer"
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
          <div className="text-center text-sm mt-6">
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
      <div className="w-1/2  bg-primary-01 hidden lg:flex justify-center items-center flex-col">
        <div className="w-full flex flex-col items-center text-center mb-6">
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
