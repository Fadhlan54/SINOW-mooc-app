"use client";

import CourseCard from "@/components/CourseCard";
import CourseLayout from "@/components/CourseLayout";
import Loading from "@/components/loading-animation/Loading";
import { getCourse } from "@/services/course.service";
import { Suspense, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

function Course() {
  const [courses, setCourses] = useState([]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState("semua");
  const [isLoading, setIsLoading] = useState([]);
  const filterRef = useRef(null);
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("cari");

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        console.log(filterType);
        const res = await getCourse({ type: filterType });
        console.log(res);
        setCourses(res.data);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, [filterType]);

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const res = await getCourse({ search: searchFilter });
        console.log(res);
        setCourses(res.data);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, [searchFilter]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        setIsMobileFilterVisible(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isMobileFilterVisible) {
      // Disable scrolling when filter is visible
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when filter is hidden
      document.body.style.overflow = "auto";
    }
  }, [isMobileFilterVisible]);

  useEffect(() => {
    // Fungsi untuk menutup filter ketika klik dilakukan di luar area filter
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsMobileFilterVisible(false);
      }
    };

    // Menambahkan event listener ke document ketika filter visible
    if (isMobileFilterVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    // Membersihkan event listener ketika komponen dilepas
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileFilterVisible]);

  return (
    <CourseLayout>
      <div className="py-6 px-4 min-[420px]:px-8 min-[480px]:px-10 sm:px-4 md:px-6 lg:px-20 xl:px-10 mx-auto max-w-7xl">
        <div className="flex items-center mb-6 justify-between">
          <h1 className="font-bold text-2xl">Topik Kelas</h1>
          <button
            className="text-lg font-bold text-primary-01 lg:hidden"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileFilterVisible(true);
            }}
          >
            Filter
          </button>
        </div>
        <div className="flex justify-between lg:gap-10 xl:gap-8">
          <div className="hidden lg:flex justify-center py-6 bg-white rounded-2xl shadow-md w-1/5   h-fit">
            <form>
              <h2 className="text-xl font-bold mb-3 text-primary-01">Filter</h2>
              <h3 className="text-lg font-semibold mb-1">Urutkan</h3>
              <ul className="text-xs">
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="radio"
                      id="paling-terbaru"
                      value={"paling-terbaru"}
                      name="filter"
                    />
                    <label htmlFor="paling-terbaru ml-4">Paling Terbaru</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="radio"
                      id="paling-populer"
                      value={"paling-populer"}
                      name="filter"
                    />
                    <label htmlFor="paling-populer">Paling Populer</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="radio"
                      id="rating-tertinggi"
                      value={"rating-tertinggi"}
                      name="filter"
                    />
                    <label htmlFor="rating-tertinggi">Rating Tertinggi</label>
                  </div>
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-1 mt-3">Kategori</h3>
              <ul className="text-xs">
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="kategori" id="uiux" />
                    <label htmlFor="uiux">UI/UX Design</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="checkbox"
                      name="kategori"
                      id="product-management"
                    />
                    <label htmlFor="product-management">
                      Product Management
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="kategori" id="web-dev" />
                    <label htmlFor="web-dev">Web Development</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="kategori" id="android-dev" />
                    <label htmlFor="android-dev">Android Development</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="kategori" id="ios-dev" />
                    <label htmlFor="ios-dev">iOS Development</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="kategori" id="data-science" />
                    <label htmlFor="data-science">Data Science</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="checkbox"
                      name="kategori"
                      id="business-intelligence"
                    />
                    <label htmlFor="business-intelligence">
                      Business Intelligence
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="checkbox"
                      name="kategori"
                      id="digital-marketing"
                    />
                    <label htmlFor="digital-marketing">Digital Marketing</label>
                  </div>
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-1 mt-3">
                Level Kesulitan
              </h3>
              <ul className="text-xs">
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="level" id="pemula" />
                    <label htmlFor="pemula">Pemula</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="level" id="menengah" />
                    <label htmlFor="menengah">Menengah</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input type="checkbox" name="level" id="mahir" />
                    <label htmlFor="mahir">Mahir</label>
                  </div>
                </li>
              </ul>
              <button
                type="reset"
                className="w-full mt-3 text-center text-sm font-semibold text-alert-danger"
              >
                Hapus Filter
              </button>
            </form>
          </div>
          <div className="w-full lg:w-4/5">
            <div className="flex gap-3 sm:gap-6 md:gap-8">
              <button
                className={`text-xs px-4 min-[390px]:text-sm sm:text-base sm:px-8 md:px-12 py-2 rounded-3xl font-bold hover:bg-primary-01 hover:text-white shadow-sm ${filterType === "semua" ? "bg-primary-01 text-white" : "bg-white text-neutral-04"}`}
                onClick={() => setFilterType("semua")}
              >
                All
              </button>
              <button
                className={`text-xs px-4 min-[390px]:text-sm sm:text-base sm:px-8 md:px-12 py-2 rounded-3xl font-bold hover:bg-primary-01 hover:text-white shadow-sm ${filterType === "premium" ? "bg-primary-01 text-white" : "bg-white text-neutral-04"}`}
                onClick={() => setFilterType("premium")}
              >
                Kursus Berbayar
              </button>
              <button
                className={`text-xs px-4 min-[390px]:text-sm sm:text-base sm:px-8 md:px-12 py-2 rounded-3xl font-bold  hover:bg-primary-01 hover:text-white shadow-sm ${filterType === "gratis" ? "bg-primary-01 text-white" : "bg-white text-neutral-04"}`}
                onClick={() => setFilterType("gratis")}
              >
                Kursus Gratis
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {isLoading ? (
                <Loading className="col-span-full" />
              ) : (
                courses &&
                courses.length > 0 &&
                courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>

            {/* filter for mobile */}
            {isMobileFilterVisible && (
              <div className="fixed h-full w-full left-0 bottom-0 z-50 bg-black-transparent sm:hidden">
                <div
                  ref={filterRef}
                  className="fixed bottom-0 w-full bg-white rounded-t-3xl p-6 overflow-y-auto"
                  style={{ maxHeight: "92vh" }}
                >
                  <div className="flex justify-end">
                    <button
                      className="text-3xl text-primary-01 fixed"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileFilterVisible(false);
                      }}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                  <form className="mt-6">
                    <h3 className="text-xl font-semibold mb-1">Filter</h3>
                    <ul className="text-sm">
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="radio"
                            id="paling-terbaru-mobile"
                            value={"paling-terbaru"}
                            name="filter"
                          />
                          <label htmlFor="paling-terbaru-mobile">
                            Paling Terbaru
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="radio"
                            id="paling-populer-mobile"
                            value={"paling-populer"}
                            name="filter"
                          />
                          <label htmlFor="paling-populer-mobile">
                            Paling Populer
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="radio"
                            id="rating-tertinggi-mobile"
                            value={"rating-tertinggi"}
                            name="filter"
                          />
                          <label htmlFor="rating-tertinggi-mobile">
                            Rating Tertinggi
                          </label>
                        </div>
                      </li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-1 mt-3">
                      Kategori
                    </h3>
                    <ul className="text-sm">
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="uiux-mobile"
                          />
                          <label htmlFor="uiux-mobile">UI/UX Design</label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="product-management-mobile"
                          />
                          <label htmlFor="product-management-mobile">
                            Product Management
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="web-dev-mobile"
                          />
                          <label htmlFor="web-dev-mobile">
                            Web Development
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="android-dev-mobile"
                          />
                          <label htmlFor="android-dev-mobile">
                            Android Development
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="ios-dev-mobile"
                          />
                          <label htmlFor="ios-dev-mobile">
                            iOS Development
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="data-science-mobile"
                          />
                          <label htmlFor="data-science-mobile">
                            Data Science
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="business-intelligence-mobile"
                          />
                          <label htmlFor="business-intelligence-mobile">
                            Business Intelligence
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="kategori"
                            id="digital-marketing-mobile"
                          />
                          <label htmlFor="digital-marketing-mobile">
                            Digital Marketing
                          </label>
                        </div>
                      </li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-1 mt-3">
                      Level Kesulitan
                    </h3>
                    <ul className="text-sm">
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="level"
                            id="pemula-mobile"
                          />
                          <label htmlFor="pemula-mobile">Pemula</label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="level"
                            id="menengah-mobile"
                          />
                          <label htmlFor="menengah-mobile">Menengah</label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="level"
                            id="mahir-mobile"
                          />
                          <label htmlFor="mahir-mobile">Mahir</label>
                        </div>
                      </li>
                    </ul>
                    <div className="flex flex-col items-center mt-4">
                      <button className="w-3/4 py-2 bg-primary-01 text-white rounded-3xl">
                        Terapkan Filter
                      </button>
                      <button
                        type="reset"
                        className="w-full mt-3 text-sm font-semibold text-alert-danger"
                      >
                        Hapus Filter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CourseLayout>
  );
}

export default function MyCoursePage() {
  return (
    <Suspense>
      <Course />
    </Suspense>
  );
}
