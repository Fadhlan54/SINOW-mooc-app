"use client";

import { Montserrat } from "next/font/google";
import Button from "@/components/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "@/services/auth.service";
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
      const res = await register(
        e.target.name.value,
        e.target.email.value,
        e.target.phoneNumber.value,
        e.target.password.value
      );

      if (res.status === "Success") {
        push(`/verify-email?token=${res.token}`);
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
      className="w-full lg:w-3/4 max-w-[452px] mt-4 pt-10"
      onSubmit={(e) => handleSubmit(e)}
    >
      {errorMessage && (
        <div className="absolute top-10 bg-alert-danger rounded-lg ps-4 pe-2 py-2 text-white justify-self-end self-end right-0 text flex opacity-80">
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
        className={`text-primary-01 font-bold text text-2xl mb-6 ${montserrat.className}`}
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
          className="block border border-neutral-03 rounded-2xl py-3 px-4 w-full text-sm mt-1"
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
          className="block border border-neutral-03 rounded-2xl py-3 px-4 w-full text-sm mt-1"
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
          className="block border border-neutral-03 rounded-2xl py-3 px-4 w-full text-sm mt-1
              [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none focus:outline-none"
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
      <Button
        additionalClass={"w-full mt-4 hover:bg-primary-02"}
        type={"submit"}
      >
        Daftar
      </Button>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google`}
        className={
          "w-full mt-4 border bg-white hover:bg-gray-200 p-2 rounded-2xl block text-center text-sm"
        }
      >
        <FcGoogle className="inline-block mr-1 w-6 h-6" /> Masuk dengan Google
      </Link>
      <div className="text-center text-sm mt-6 mb-5">
        <p>
          Sudah punya akun?{" "}
          <Link
            href={"/login"}
            className="font-semibold text-primary-01 hover:text-primary-02"
          >
            Login disini
          </Link>
        </p>
      </div>
    </form>
  );
}
