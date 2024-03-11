import Image from "next/image";
import Link from "next/link";
import { GoBell, GoBook, GoHome, GoPerson, GoVideo } from "react-icons/go";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function DesktopNavbar({ isLogin, handleSearch }) {
  const [searchValue, setSearchValue] = useState("");

  return (
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
          name="search"
          placeholder="Cari kursus"
          className="w-full px-6 py-3 rounded-xl text-sm focus:outline-none text-neutral-04 shadow-md"
          id="search-1"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={(e) => handleSearch(e, searchValue)}
        />
        <button
          className="absolute right-2 bg-primary-01 hover:bg-primary-04 p-1 rounded-xl"
          type="submit"
          onClick={(e) => {
            handleSearch(e, searchValue);
          }}
        >
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
          href={"/beranda"}
          className="p-1 hover:bg-primary-04 px-2 py-1  rounded-2xl"
        >
          <GoHome className="text-2xl" />
        </Link>
        <span className="h-6 border-r-2 border-white"></span>
        <Link
          href={"/kursus"}
          className="p-1 hover:bg-primary-04 px-2 py-1.5  rounded-2xl"
        >
          <GoBook className="text-2xl" />
        </Link>

        {isLogin ? (
          <>
            <span className="h-6 border-r-2 border-white"></span>
            <Link
              href={"/kursus-berjalan"}
              className="p-1 hover:bg-primary-04 px-2 py-1  rounded-2xl"
            >
              <GoVideo className="text-2xl" />
            </Link>
            <span className="h-6 border-r-2 border-white"></span>
            <Link
              href={"/notifikasi"}
              className="p-1 hover:bg-primary-04 px-2 py-1  rounded-2xl"
            >
              <GoBell className="text-2xl" />
            </Link>
            <span className="h-6 border-r-2 border-white"></span>
            <Link
              href={"/profil"}
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
  );
}
