"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { FaPlus, FaStar } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { PiBooks, PiClockFill } from "react-icons/pi";
import { IoPlayCircle } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";

export default function DetailCoursePage() {
  return (
    <div className="mx-auto md:px-8 lg:px-12 xl:px-20 py-2 sm:py-6">
      <Link
        href={"/kursus"}
        className="flex items-center gap-4 font-semibold mb-6"
      >
        <LuArrowLeft className="text-lg" />
        Kelas lainnya
      </Link>
      <div className="flex md:gap-8 lg:gap-12 xl:gap-20 sm:px-4">
        <div className="w-full sm:w-3/5">
          <video
            src="https://ik.imagekit.io/96gmelvyq/Video-1707701184851_RYYLnoRAx.mp4?updatedAt=1707701186680"
            className="w-full rounded-[32px] shadow-lg"
            autoPlay
            controls
          ></video>
          <div className="bg-white rounded-[32px] px-8 py-8 mt-8 shadow-lg">
            <div className="mb-4">
              <div className="flex justify-between items-center  mb-2">
                <h2 className="text-xl font-bold text-primary-01">
                  UI/UX Design
                </h2>
                <div className="flex items-center gap-1">
                  <FaStar className="text-alert-attention text-lg" />
                  <p className="text-sm font-semibold">
                    5.0 <span className="text-neutral-04">(81)</span>
                  </p>
                </div>
              </div>
              <h2 className="text-lg font-bold">
                Intro to Basic of User Interaction Design
              </h2>
              <h4 className="text-sm">By John Doe</h4>
              <div className="flex items-center mt-2 justify-between md:justify-start md:gap-4 lg:gap-8 text-xs font-medium">
                <div className="flex items-center gap-1">
                  <RiShieldStarLine className="text-alert-success text-base" />
                  <p className="font-semibold text-primary-01">
                    Level Beginner
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PiBooks className="text-alert-success text-base" />
                  <p>5 Modul</p>
                </div>
                <div className="flex items-center justify-center">
                  <PiClockFill className="text-alert-success text-base" />
                  <p className=" ml-1">45 Menit</p>
                </div>
              </div>

              <button className="flex items-center justify-between mt-4 bg-primary-01 hover:bg-primary-04 py-1 px-6 rounded-2xl text-white font-semibold text-sm shadow-md">
                <FaPlus className="mr-1" />
                Ikuti Kursus
              </button>
            </div>
            <hr />
            <div className="mt-4">
              <h3 className="font-bold text-xl mb-2">Tentang Kelas</h3>
              <p className="text-sm ps-2">
                Design system adalah kumpulan komponen design, code, ataupun
                dokumentasi yang dapat digunakan sebagai panduan utama yang
                memunginkan designer serta developer memiliki lebih banyak
                kontrol atas berbagai platform. Dengan hadirnya design system,
                dapat menjaga konsistensi tampilan user interface dan
                meningkatkan user experience menjadi lebih baik. Disisi bisnis,
                design system sangat berguna dalam menghemat waktu dan biaya
                ketika mengembangkan suatu produk. Bersama mentor XXX, kita akan
                mempelajari design system dari mulai manfaat, alur kerja
                pembuatannya, tools yang digunakan, hingga pada akhirnya, kita
                akan membuat MVP dari design system. Selain itu, mentor juga
                akan menjelaskan berbagai resource yang dibutuhkan untuk mencari
                inspirasi mengenai design system. Kelas ini sesuai untuk Anda
                yang ingin memahami apa itu design system. Tidak hanya ditujukan
                untuk UI/UX Designer ataupun Developer, kelas ini sangat sesuai
                untuk stakeholder lain agar dapat memudahkan tim dalam bekerja
                sama. Yuk segera daftar dan kami tunggu di kelas ya!
              </p>
              <h3 className="font-bold text-xl mt-4 mb-2">
                Keuntungan Mengikuti Kelas Ini
              </h3>
              <div className="text-sm px-2">
                <p>1. Kelas ini sesuai untuk UI/UX Designer</p>
                <p>2. Kelas ini sesuai untuk Developer</p>
                <p>3. Kelas ini sesuai untuk stakeholder lain</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 hidden md:block">
          <div className="bg-white p-6 rounded-3xl h-fit mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Materi Belajar</h2>
              <div class="w-40 bg-neutral-07 rounded-full ">
                <div
                  class="bg-primary-01 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full h-4 px-3 flex items-center"
                  style={{ width: "45%" }}
                >
                  {" "}
                  <p className="absolute font-semibold">45% Diselesaikan</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm mb-4 gap-2">
              <div className="flex items-center">
                <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                  0
                </h5>
                <p className="font-medium">Preview</p>
              </div>
              <button>
                <IoPlayCircle className="text-3xl text-alert-success" />
              </button>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-center text-sm font-extrabold ">
                <h4 className="text-primary-01 ">Chapter 1 - Pendahuluan</h4>
                <p>60 Menit</p>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <div className="flex items-center ">
                  <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                    1
                  </h5>
                  <p className="font-medium">
                    Tujuan Mengikuti Kelas Design System
                  </p>
                </div>
                <button>
                  <IoPlayCircle className="text-3xl text-alert-success" />
                </button>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <div className="flex items-center ">
                  <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                    2
                  </h5>
                  <p className="font-medium">Pengenalan Design System</p>
                </div>
                <button>
                  <IoPlayCircle className="text-3xl text-alert-success" />
                </button>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <div className="flex items-center ">
                  <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                    3
                  </h5>
                  <p className="font-medium">
                    Contoh Dalam Membangun Design System
                  </p>
                </div>
                <button>
                  <IoPlayCircle className="text-3xl text-primary-01" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-center text-sm font-extrabold ">
                <h4 className="text-primary-01 ">Chapter 2 - Memulai Desain</h4>
                <p>60 Menit</p>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <div className="flex items-center ">
                  <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                    1
                  </h5>
                  <p className="font-medium">
                    Tujuan Mengikuti Kelas Design System
                  </p>
                </div>
                <button>
                  <IoPlayCircle className="text-3xl text-primary-01" />
                </button>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <div className="flex items-center ">
                  <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                    2
                  </h5>
                  <p className="font-medium">Pengenalan Design System</p>
                </div>
                <button>
                  <IoIosLock className="text-3xl text-neutral-07" />
                </button>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <div className="flex items-center ">
                  <h5 className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-02 mr-2 font-bold text-xs">
                    3
                  </h5>
                  <p className="font-medium">
                    Contoh Dalam Membangun Design System
                  </p>
                </div>
                <button>
                  <IoIosLock className="text-3xl text-neutral-07" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl h-fit mb-6 shadow-lg">
            <div>
              <h2 className="font-bold text-xl mb-2">Beri Ulasan</h2>
              <div className="flex flex-col gap-3 text-sm">
                <label
                  className="text-primary-01 font-extrabold"
                  htmlFor="rating"
                >
                  Rating
                </label>
                <div>{/* Stars Rating */}</div>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <label
                  htmlFor="comment"
                  className="text-primary-01 font-extrabold"
                >
                  Komentar
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  className="border rounded-xl p-2 outline-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
