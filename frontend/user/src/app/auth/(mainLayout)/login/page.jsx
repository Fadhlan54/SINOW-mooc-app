"use client";

import { Montserrat, Poppins } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function LoginPage() {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!e.target.email?.value || !e.target.password?.value) {
      setErrorMessage("Kolom email dan password wajib diisi");
      return;
    }

    if (e.target.password.value.length < 8) {
      setErrorMessage("Kata sandi minimal 8 karakter");
      return;
    }

    setIsLoading(true);
    const res = await login(e.target.email.value, e.target.password.value);

    try {
      if (res.status === "Success") {
        Cookies.set("token", res.data.token);
        push("/");
        return;
      } else {
        setErrorMessage(res.message);
        return;
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form
      className="w-full lg:w-3/4 max-w-[452px]"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {isLoading && <LoadingScreen />}
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
        Masuk
      </h3>
      <div className="mb-4">
        <label htmlFor="email" className="text-xs">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Masukkan email"
          className="block border border-neutral-03 rounded-2xl py-3 px-4 w-full text-sm mt-1 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs h-5">
          <label htmlFor="password">Kata sandi</label>
          <div>
            <p>
              Lupa kata sandi?{" "}
              <Link
                href={"/auth/reset-password"}
                className="font-semibold text-primary-01 hover:text-primary-02"
              >
                Klik disini
              </Link>
            </p>
          </div>
        </div>

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
      <Button additionalClass={"w-full mt-4 hover:bg-primary-02"} type="submit">
        Masuk
      </Button>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google`}
        className={
          "w-full mt-4 border bg-white hover:bg-gray-200 p-2 rounded-2xl block text-center text-sm"
        }
      >
        <FcGoogle className="inline-block mr-1 w-6 h-6" /> Masuk dengan Google
      </Link>
      <div className="text-center text-sm mt-6">
        <p>
          Belum punya akun?{" "}
          <Link
            href={"/auth/register"}
            className="font-semibold text-primary-01 hover:text-primary-02"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </form>
  );
}
