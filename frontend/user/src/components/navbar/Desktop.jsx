import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { selectSearchFilter } from "@/store/slices/filterSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export default function DesktopNavbar({
  isLogin,
  handleSearch,
  disableSearch,
}) {
  const searchFilter = useSelector(selectSearchFilter);
  const [searchValue, setSearchValue] = useState(searchFilter);

  const [isMenuActive, setIsMenuActive] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();

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
      {!disableSearch && (
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
            className="absolute right-2 bg-primary-01 hover:bg-primary-03 p-1 rounded-xl"
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
      )}

      <div className="flex items-center gap-2 text-white">
        <button
          className={`hover:bg-primary-03 p-2 rounded-xl  ${isMenuActive && "bg-primary-03"} `}
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          <RiMenuLine className="text-2xl" />
        </button>
        <div
          className={`absolute right-4 top-16 flex flex-col bg-white text-neutral-05 py-3    font-semibold rounded-2xl text-sm shadow-md ${isMenuActive ? "block" : "hidden"} ${isLogin ? "w-40" : "w-[136px]"} `}
        >
          <Link
            href={"/"}
            className={`px-4 py-1 hover:bg-primary-01-transparent hover:border-l-4 border-primary-01 hover:text-primary-01 ${pathname === "/" && "border-l-4 text-primary-01 bg-primary-01-transparent"}`}
          >
            Beranda
          </Link>
          <Link
            href={"/kursus"}
            className={`px-4 py-1 hover:bg-primary-01-transparent hover:border-l-4 border-primary-01 hover:text-primary-01 ${pathname === "/kursus" && "border-l-4 text-primary-01 bg-primary-01-transparent"}`}
          >
            Kursus
          </Link>
          {isLogin && (
            <>
              <Link
                href={"/kursus-berjalan"}
                className={`px-4 py-1 hover:bg-primary-01-transparent hover:border-l-4 border-primary-01 hover:text-primary-01 ${pathname === "/kursus-berjalan" && "border-l-4 text-primary-01 bg-primary-01-transparent"}`}
              >
                Kursus Berjalan
              </Link>
              <Link
                href={"/notifikasi"}
                className={`px-4 py-1 hover:bg-primary-01-transparent hover:border-l-4 border-primary-01 hover:text-primary-01 ${pathname === "/notifikasi" && "border-l-4 text-primary-01 bg-primary-01-transparent"}`}
              >
                Notifikasi
              </Link>
              <Link
                href={"/profil"}
                className="px-4 py-1  hover:bg-primary-01-transparent hover:border-l-4 hover:border-primary-01 hover:text-primary-01"
              >
                Profil
              </Link>
            </>
          )}

          <hr className="my-1" />
          {isLogin ? (
            <button
              onClick={() => {
                Cookies.remove("token");
                push("/auth/login");
              }}
              className="px-4 py-1 text-start text-alert-danger  font-bold hover:bg-alert-danger-transparent hover:border-l-4 border-alert-danger-transparent "
            >
              Keluar
            </button>
          ) : (
            <Link
              href={"/auth/login"}
              className="px-4 py-1 text-start text-primary-01  font-bold hover:bg-primary-01-transparent hover:border-l-4 border-primary-01 "
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
