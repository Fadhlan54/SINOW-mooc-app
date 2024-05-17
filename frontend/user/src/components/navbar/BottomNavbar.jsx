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
      <div className="h-4 w-full sm:hidden"></div>
      <div
        className={`fixed bottom-0 left-0 z-40 flex w-full justify-evenly rounded-t-[2rem] bg-primary-01 pt-2 text-2xl text-white transition-transform 
duration-300 sm:hidden ${visible ? "translate-y-0" : "translate-y-full"} `}
      >
        <Link
          href={"/"}
          className="rounded-t-2xl px-4  py-2.5 hover:bg-primary-03"
        >
          <GoHome className="icon" />
        </Link>
        <Link
          href={"/kursus-berjalan"}
          className="rounded-t-2xl px-4  py-2.5 hover:bg-primary-03"
        >
          <GoVideo className="icon" />
        </Link>
        <Link
          href={"/kursus"}
          className="rounded-t-2xl px-4 py-2.5 hover:bg-primary-03"
        >
          <GoBook className="icon" />
        </Link>
      </div>
    </>
  );
}
