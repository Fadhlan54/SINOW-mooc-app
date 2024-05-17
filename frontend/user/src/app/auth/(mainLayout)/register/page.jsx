"use client";

import { Montserrat } from "next/font/google";
import Button from "@/components/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { fetchRegister } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    if (
      !e.target.name?.value ||
      !e.target.email?.value ||
      !e.target.phoneNumber?.value ||
      !e.target.password?.value
    ) {
      setErrorMessage("Semua kolom wajib diisi");
      return;
    }

    if (e.target.password.value.length < 8) {
      setErrorMessage("Kata sandi minimal 8 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetchRegister(
        e.target.name.value,
        e.target.email.value,
        e.target.phoneNumber.value,
        e.target.password.value,
      );

      if (res.status === "Success") {
        push(`/auth/verify-email?token=${res.token}`);
        return;
      }

      setErrorMessage(res.message);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="mt-4 w-full max-w-[452px] pt-10 lg:w-3/4"
      onSubmit={(e) => handleSubmit(e)}
    >
      {isLoading && <LoadingScreen />}
      {errorMessage && (
        <div className="text absolute right-0 top-10 flex self-end justify-self-end rounded-lg bg-alert-danger py-2 pe-2 ps-4 text-white opacity-80">
          <p className="text-sm">{errorMessage}</p>
          <button
            className="ml-2"
            onClick={(e) => {
              e.preventDefault();
              setErrorMessage("");
            }}
          >
            <IoMdClose />
          </button>
        </div>
      )}
      <h3
        className={`text mb-6 text-2xl font-bold text-primary-01 ${montserrat.className}`}
      >
        Daftar
      </h3>
      <div className="mb-4">
        <label htmlFor="name" className="text-xs">
          Nama
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Masukkan nama lengkap"
          className="mt-1 block w-full rounded-2xl border border-neutral-03 px-4 py-3 text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="text-xs">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Masukkan email"
          className="mt-1 block w-full rounded-2xl border border-neutral-03 px-4 py-3 text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="text-xs">
          Nomor Telepon
        </label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Masukkan nomor telepon"
          className="mt-1 block w-full rounded-2xl border border-neutral-03 px-4 py-3 text-sm
              [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      <div className="mb-4 ">
        <label htmlFor="password" className="text-xs">
          Kata sandi
        </label>

        <div className="flex items-end ">
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
      <Button
        additionalClass={"w-full mt-4 hover:bg-primary-02"}
        type={"submit"}
      >
        Daftar
      </Button>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google`}
        className={
          "mt-4 block w-full rounded-2xl border bg-white p-2 text-center text-sm hover:bg-gray-200"
        }
      >
        <FcGoogle className="mr-1 inline-block h-6 w-6" /> Masuk dengan Google
      </Link>
      <div className="mb-5 mt-6 text-center text-sm">
        <p>
          Sudah punya akun?{" "}
          <Link
            href={"/auth/login"}
            className="font-semibold text-primary-01 hover:text-primary-02"
          >
            Login disini
          </Link>
        </p>
      </div>
    </form>
  );
}
