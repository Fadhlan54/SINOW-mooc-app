import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef(null);

  const [isMenuActive, setIsMenuActive] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="sticky left-0 top-0 z-50 hidden w-full items-center justify-between bg-primary-01 px-4 py-4 shadow-md sm:flex lg:px-8">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo_sinow_bg.png?updatedAt=1707395834962"
          width={36}
          height={36}
          alt="sinow logo bg"
          className="object-cover"
        />
        <h3 className="hidden text-2xl font-bold text-white min-[821px]:block">
          SINOW
        </h3>
      </Link>
      {!disableSearch && (
        <div className="relative flex w-56 items-center  md:w-[360px] lg:w-[420px] ">
          <input
            type="text"
            name="search"
            placeholder="Cari kursus"
            className="w-full rounded-xl px-6 py-3 text-sm text-neutral-04 shadow-md focus:outline-none"
            id="search-1"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyDown={(e) => handleSearch(e, searchValue)}
          />
          <button
            className="absolute right-2 rounded-xl bg-primary-01 p-1 hover:bg-primary-03"
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
          className={`rounded-xl p-2 hover:bg-primary-03  ${isMenuActive && "bg-primary-03"} `}
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          <RiMenuLine className="text-2xl" />
        </button>
        <div
          className={`absolute right-4 top-16 flex flex-col rounded-2xl border bg-white py-3    text-sm font-semibold text-neutral-05 shadow-md ${isMenuActive ? "block" : "hidden"} ${isLogin ? "w-40" : "w-[136px]"} `}
          ref={menuRef}
        >
          <Link
            href={"/"}
            className={`border-primary-01 px-4 py-1 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${pathname === "/" && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
          >
            Beranda
          </Link>
          <Link
            href={"/kursus"}
            className={`border-primary-01 px-4 py-1 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${pathname === "/kursus" && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
          >
            Kursus
          </Link>
          {isLogin && (
            <>
              <Link
                href={"/kursus-berjalan"}
                className={`border-primary-01 px-4 py-1 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${pathname === "/kursus-berjalan" && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
              >
                Kursus Berjalan
              </Link>
              <Link
                href={"/notifikasi"}
                className={`border-primary-01 px-4 py-1 hover:border-l-4 hover:bg-primary-01-transparent hover:text-primary-01 ${pathname === "/notifikasi" && "border-l-4 bg-primary-01-transparent text-primary-01"}`}
              >
                Notifikasi
              </Link>
              <Link
                href={"/profil"}
                className="px-4 py-1  hover:border-l-4 hover:border-primary-01 hover:bg-primary-01-transparent hover:text-primary-01"
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
              className="border-alert-danger-transparent px-4 py-1 text-start  font-bold text-alert-danger hover:border-l-4 hover:bg-alert-danger-transparent "
            >
              Keluar
            </button>
          ) : (
            <Link
              href={"/auth/login"}
              className="border-primary-01 px-4 py-1 text-start  font-bold text-primary-01 hover:border-l-4 hover:bg-primary-01-transparent "
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
