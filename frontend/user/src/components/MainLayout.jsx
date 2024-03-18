"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearch } from "@/store/slices/filterSlice";
import DesktopNavbar from "./navbar/Desktop";
import MobileNavbar from "./navbar/Mobile";
import BottomNavbar from "./navbar/BottomNavbar";

export default function MainLayout({
  children,
  disableDesktopNavbar = false,
  disableMobileNavbar = false,
  disableBottomNavbar = false,
  disableSearch = false,
}) {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleSearch = (e, searchValue) => {
    const key = e?.key;

    if (key) {
      if (key === "Enter") {
        if (searchValue) {
          dispatch(setSearch(searchValue));
        } else {
          dispatch(setSearch(""));
        }
        push("/kursus");
      }
    } else {
      if (searchValue) {
        dispatch(setSearch(searchValue));
      } else {
        dispatch(setSearch(""));
      }
      push("/kursus");
    }
  };

  return (
    <div className="bg-neutral-02 min-h-screen">
      {/* Navbar for desktop */}
      {!disableDesktopNavbar && (
        <>
          <DesktopNavbar
            isLogin={isLogin}
            handleSearch={handleSearch}
            disableSearch={disableSearch}
          />
        </>
      )}
      {/* Navbar for mobile */}
      {!disableMobileNavbar && (
        <MobileNavbar
          isLogin={isLogin}
          handleSearch={handleSearch}
          disableSearch={disableSearch}
        />
      )}
      {children}
      {/* Bottom Navigation */}
      {!disableBottomNavbar && <BottomNavbar />}
    </div>
  );
}
