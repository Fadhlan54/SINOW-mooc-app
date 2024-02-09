"use client";

import Image from "next/image";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { GoBell, GoHome, GoPerson, GoBook, GoVideo } from "react-icons/go";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MainLayout({ children }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    let timer;

    const handleScroll = () => {
      clearTimeout(timer);
      // Set timeout to detect when scrolling stops
      timer = setTimeout(() => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className="bg-neutral-02 min-h-screen">
      {/* Navbar for desktop */}
      <div className="hidden sm:flex items-center justify-between sticky top-0 left-0 bg-primary-01 w-full px-4 lg:px-8 py-4 z-50 shadow-md">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo_sinow_bg.png?updatedAt=1707395834962"
            width={36}
            height={36}
            alt="sinow logo bg"
            className="object-cover"
          />
          <h3 className="text-white font-bold text-2xl hidden min-[821px]:block">
            SINOW
          </h3>
        </Link>
        <div className="flex w-56 md:w-[360px] lg:w-[420px]  items-center relative ">
          <input
            type="text"
            placeholder="Cari kursus"
            className="w-full px-6 py-3 rounded-xl text-sm focus:outline-none text-neutral-04 shadow-md"
            id="search-1"
          />
          <button className="absolute right-2 bg-primary-01 hover:bg-primary-04 p-1 rounded-xl">
            <Image
              src="https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Icons/bx_search-alt.png?updatedAt=1706898652084"
              width={24}
              height={24}
              alt="search icon"
            />
          </button>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Link
            href={"/home"}
            className="p-1 hover:bg-primary-04 px-2 py-1  rounded-2xl"
          >
            <GoHome className="text-2xl" />
          </Link>
          <span className="h-6 border-r-2 border-white"></span>
          <Link
            href={"/course"}
            className="p-1 hover:bg-primary-04 px-2 py-1.5  rounded-2xl"
          >
            <GoBook className="text-2xl" />
          </Link>

          {isLogin ? (
            <>
              <span className="h-6 border-r-2 border-white"></span>
              <Link
                href={"/my-course"}
                className="p-1 hover:bg-primary-04 px-2 py-1  rounded-2xl"
              >
                <GoVideo className="text-2xl" />
              </Link>
              <span className="h-6 border-r-2 border-white"></span>
              <Link
                href={"/notifications"}
                className="p-1 hover:bg-primary-04 px-2 py-1  rounded-2xl"
              >
                <GoBell className="text-2xl" />
              </Link>
              <span className="h-6 border-r-2 border-white"></span>
              <Link
                href={"/profile"}
                className="p-1 hover:bg-primary-04 px-2 py-1 rounded-2xl"
              >
                <GoPerson className="text-2xl" />
              </Link>
            </>
          ) : (
            <>
              <hr className="h-6 bg-gray-300" />
              <Link
                href={"/auth/login"}
                className="flex items-center gap-2  font-semibold hover:bg-primary-04 px-4 py-1 rounded-2xl ml-2"
              >
                <FiLogIn className="text-xl" /> Masuk
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Navbar for mobile */}
      <div className="px-4 py-2 sm:hidden">
        <div className="flex justify-between items-center p-2 pb-4">
          <Link href={"/"} className={`flex items-center gap-2 font-bold`}>
            <Image
              src="https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo_sinow_bg_no_shadow.png?updatedAt=1707497045815"
              width={36}
              height={36}
              alt="sinow logo dark"
            />
            <h2 className="text-xl hidden min-[300px]:block">SINOW</h2>
          </Link>
          <div className="flex gap-3 text-2xl text-neutral-04">
            {isLogin ? (
              <>
                <Link
                  href={"/notifications"}
                  className="p-1.5 hover:bg-primary-01 hover:text-white rounded-full"
                >
                  <GoBell />
                </Link>
                <Link
                  href={"/profile"}
                  className="p-1.5 hover:bg-primary-01 hover:text-white rounded-full"
                >
                  <GoPerson />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/login"}
                  className="flex items-center gap-2 font-semibold  rounded-2xl text-sm"
                >
                  <FiLogIn className="text-lg" /> Masuk
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center relative ">
          <input
            type="text"
            placeholder="Cari kursus"
            className="w-full px-6 py-3 rounded-xl text-sm focus:outline-none text-neutral-04 shadow-md"
            id="search-2"
          />
          <button className="absolute right-2 bg-primary-01 p-1 rounded-xl">
            <Image
              src="https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Icons/bx_search-alt.png?updatedAt=1706898652084"
              width={24}
              height={24}
              alt="search icon"
            />
          </button>
        </div>
      </div>
      {children}
      {/* Bottom Navigation */}
      <div className="w-full h-12 sm:hidden"></div>
      <div
        className={`fixed z-50 sm:hidden bottom-0 left-0 bg-primary-01 w-full flex justify-evenly pt-2 rounded-t-[2rem] text-2xl text-white 
        transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"} `}
      >
        <Link
          href={"/home"}
          className="py-2.5 px-4  hover:bg-primary-03 rounded-t-2xl"
        >
          <GoHome className="icon" />
        </Link>
        <Link
          href={"/my-course"}
          className="py-2.5 px-4  hover:bg-primary-03 rounded-t-2xl"
        >
          <GoVideo className="icon" />
        </Link>
        <Link
          href={"/course"}
          className="py-2.5 px-4 hover:bg-primary-03 rounded-t-2xl"
        >
          <GoBook className="icon" />
        </Link>
      </div>
    </div>
  );
}
