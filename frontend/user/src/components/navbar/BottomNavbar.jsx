import Link from "next/link";
import { useEffect, useState } from "react";
import { GoBook, GoHome, GoVideo } from "react-icons/go";

export default function BottomNavbar() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <>
      <div className="w-full h-4 sm:hidden"></div>
      <div
        className={`fixed z-40 sm:hidden bottom-0 left-0 bg-primary-01 w-full flex justify-evenly pt-2 rounded-t-[2rem] text-2xl text-white 
transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"} `}
      >
        <Link
          href={"/beranda"}
          className="py-2.5 px-4  hover:bg-primary-03 rounded-t-2xl"
        >
          <GoHome className="icon" />
        </Link>
        <Link
          href={"/kursus-berjalan"}
          className="py-2.5 px-4  hover:bg-primary-03 rounded-t-2xl"
        >
          <GoVideo className="icon" />
        </Link>
        <Link
          href={"/kursus"}
          className="py-2.5 px-4 hover:bg-primary-03 rounded-t-2xl"
        >
          <GoBook className="icon" />
        </Link>
      </div>
    </>
  );
}
