import { selectSearchFilter } from "@/store/slices/filterSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { GoBell, GoPerson } from "react-icons/go";
import { useSelector } from "react-redux";

export default function MobileNavbar({ isLogin, handleSearch, disableSearch }) {
  const searchFilter = useSelector(selectSearchFilter);
  const [searchValue, setSearchValue] = useState(searchFilter);
  return (
    <div className="px-3 py-2 sm:hidden ">
      <div className="flex items-center justify-between p-2">
        <Link href={"/"} className={`flex items-center gap-2 font-bold`}>
          <Image
            src="https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo_sinow_bg_no_shadow.png?updatedAt=1707497045815"
            width={36}
            height={36}
            alt="sinow logo dark"
          />
          <h2 className="hidden text-xl min-[300px]:block">SINOW</h2>
        </Link>
        <div className="flex gap-3 text-2xl text-neutral-04">
          {isLogin ? (
            <>
              <Link
                href={"/notifikasi"}
                className="rounded-full p-1.5 hover:bg-primary-01 hover:text-white"
              >
                <GoBell />
              </Link>
              <Link
                href={"/profil"}
                className="rounded-full p-1.5 hover:bg-primary-01 hover:text-white"
              >
                <GoPerson />
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/auth/login"}
                className="flex items-center gap-2 rounded-2xl  text-sm font-semibold"
              >
                <FiLogIn className="text-lg" /> Masuk
              </Link>
            </>
          )}
        </div>
      </div>

      {!disableSearch && (
        <div className="relative flex items-center ">
          <input
            type="text"
            name="search"
            placeholder="Cari kursus"
            className="w-full rounded-xl px-6 py-3 text-sm text-neutral-04 shadow-md focus:outline-none"
            id="search-2"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyDown={(e) => handleSearch(e, searchValue)}
          />
          <button
            className="absolute right-2 rounded-xl bg-primary-01 p-1"
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
      )}
    </div>
  );
}
