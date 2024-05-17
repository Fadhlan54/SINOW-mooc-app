"use client";

import { Montserrat } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";
import { fetchLogin } from "@/services/auth.service";
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
    const res = await fetchLogin(e.target.email.value, e.target.password.value);

    try {
      if (res.status === "Success") {
        Cookies.set("token", res.data.token, { expires: 30 });
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
      className="w-full max-w-[452px] lg:w-3/4"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
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
          className="mt-1 block w-full rounded-2xl border border-neutral-03 px-4 py-3 text-sm focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <div className="flex h-5 justify-between text-xs">
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
      <Button additionalClass={"w-full mt-4 hover:bg-primary-02"} type="submit">
        Masuk
      </Button>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google`}
        className={
          "mt-4 block w-full rounded-2xl border bg-white p-2 text-center text-sm hover:bg-gray-200"
        }
      >
        <FcGoogle className="mr-1 inline-block h-6 w-6" /> Masuk dengan Google
      </Link>
      <div className="mt-6 text-center text-sm">
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
