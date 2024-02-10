"use client";

import Link from "next/link";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "./style.css";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border p-6 rounded-xl shadow-md">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/onboarding.png?updatedAt=1707366179905"
          }
          width={188}
          height={143}
          alt="Sinow Mascot onboarding"
        />
        <h1 className="mt-4">Landing page sedang dibuat heheh...</h1>
        <p>
          Pergi ke{" "}
          <Link href="/beranda" className="text-primary-01 font-bold">
            Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
