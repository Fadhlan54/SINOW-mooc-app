"use client";

import MainLayout from "@/components/MainLayout";
import Loading from "@/components/loading-animation/Loading";
import { fetchCoursesUser } from "@/services/course.service";
import { Suspense, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectSearchFilter } from "@/store/slices/filterSlice";
import { fetchCategories } from "@/services/category.service";
import RunningCourseCard from "@/components/card/RunningCourseCard";
import Cookies from "js-cookie";
import NoRunningCourseCard from "@/components/card/NoRunningCourseCard";

function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [filterProgress, setFilterProgress] = useState("semua");
  const [isLoading, setIsLoading] = useState([]);
  const filterRef = useRef(null);
  const searchFilter = useSelector(selectSearchFilter);
  const token = Cookies.get("token");

  const [filterForm, setFilterForm] = useState({
    sortBy: "",
    categoryId: [],
    level: [],
  });

  useEffect(() => {
    const handleGetCategories = async () => {
      try {
        const res = await fetchCategories({ sortByName: true });
        if (res.status === "Success") {
          setCategories(res.data);
        } else {
          setCategories([]);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    handleGetCategories();
  }, []);

  useEffect(() => {
    const getCoursesUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetchCoursesUser(token, {
          search: searchFilter,
          progress: filterProgress,
          categoryId: filterForm.categoryId,
          level: filterForm.level,
          sortBy: filterForm.sortBy,
        });
        setCourses(res.data?.data);
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
    getCoursesUser();
  }, [searchFilter, filterForm, filterProgress]);

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

  const handleFilterForm = async (e) => {
    e.preventDefault();
    const { name, value, checked } = e.target;

    if (name === "sortBy") {
      setFilterForm({ ...filterForm, sortBy: value });
    } else if (name === "categoryId" || name === "level") {
      let updatedValues;
      if (checked) {
        updatedValues = [...filterForm[name], value];
      } else {
        updatedValues = filterForm[name].filter((item) => item !== value);
      }
      setFilterForm({ ...filterForm, [name]: updatedValues });
    }
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    setFilterForm({
      sortBy: "",
      categoryId: [],
      level: [],
    });
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-8 md:mt-2 md:px-12">
        <div className="mb-3 flex items-end justify-between">
          <h1 className="text-2xl font-bold">Kursus Berjalan</h1>
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
          <div className="hidden h-fit w-1/5 rounded-2xl bg-white px-6 py-4 shadow-md lg:block">
            <form onChange={(e) => handleFilterForm(e)}>
              <h2 className="text-xl font-bold text-primary-01 ">Filter</h2>
              <h3 className="text-sm font-semibold ">Urutkan</h3>
              <ul className="text-xs">
                <li>
                  <div className="mb-1 flex items-center gap-1.5">
                    <input
                      type="radio"
                      id="terbaru"
                      value={"terbaru"}
                      name="sortBy"
                      checked={filterForm.sortBy === "terbaru"}
                      className="h-3.5 w-3.5 appearance-none rounded-full border-2 border-[#E8F1FF] bg-[#E8F1FF] ring-1 ring-[#B4BDC4] checked:border-white checked:bg-primary-01 checked:ring-1 checked:ring-primary-01"
                    />
                    <label htmlFor="terbaru">Terbaru</label>
                  </div>
                </li>
                <li>
                  <div className="mb-1 flex items-center gap-1.5">
                    <input
                      type="radio"
                      id="terpopuler"
                      value={"terpopuler"}
                      name="sortBy"
                      checked={filterForm.sortBy === "terpopuler"}
                      className="h-3.5 w-3.5 appearance-none rounded-full border-2 border-[#E8F1FF] bg-[#E8F1FF] ring-1 ring-[#B4BDC4] checked:border-white checked:bg-primary-01 checked:ring-1 checked:ring-primary-01"
                    />
                    <label htmlFor="terpopuler">Paling Populer</label>
                  </div>
                </li>
                <li>
                  <div className="mb-1 flex items-center gap-1.5">
                    <input
                      type="radio"
                      id="rating"
                      value={"rating"}
                      name="sortBy"
                      checked={filterForm.sortBy === "rating"}
                      className="h-3.5 w-3.5 appearance-none rounded-full border-2 border-[#E8F1FF] bg-[#E8F1FF] ring-1 ring-[#B4BDC4] checked:border-white checked:bg-primary-01 checked:ring-1 checked:ring-primary-01"
                    />
                    <label htmlFor="rating">Rating Tertinggi</label>
                  </div>
                </li>
              </ul>
              <h3 className="text-sm font-semibold">Kategori</h3>
              <ul className="text-xs">
                {categories.map((category) => (
                  <li>
                    <div className="mb-1 flex items-center gap-1.5">
                      <div className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          name="categoryId"
                          id={category.id}
                          value={category.id}
                          checked={filterForm.categoryId.includes(category.id)}
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                        />
                        <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <label htmlFor={category.id}>{category.name}</label>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold">Level Kesulitan</h3>
              <ul className="text-xs">
                <li>
                  <div className="mb-1 flex items-center gap-1.5">
                    <div className="relative flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        name="level"
                        id={"pemula"}
                        value={"pemula"}
                        checked={filterForm.level.includes("pemula")}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                      />
                      <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <label htmlFor="pemula">Pemula</label>
                  </div>
                </li>
                <li>
                  <div className="my-1 flex items-center gap-1.5">
                    <div className="relative flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        name="level"
                        id={"menengah"}
                        value={"menengah"}
                        checked={filterForm.level.includes("menengah")}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                      />
                      <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <label htmlFor="menengah">Menengah</label>
                  </div>
                </li>
                <li>
                  <div className="my-1 flex items-center gap-1.5">
                    <div className="relative flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        name="level"
                        id={"mahir"}
                        value={"mahir"}
                        checked={filterForm.level.includes("mahir")}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                      />
                      <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <label htmlFor="mahir">Mahir</label>
                  </div>
                </li>
              </ul>
              <button
                className="mt-2 w-full text-center text-sm font-semibold text-alert-danger"
                onClick={(e) => handleResetFilter(e)}
              >
                Hapus Filter
              </button>
            </form>
          </div>
          <div className="w-full lg:w-4/5">
            <div className="flex gap-3 sm:gap-6 md:gap-8">
              <button
                className={`rounded-3xl px-4 py-2 text-xs font-bold shadow-sm hover:bg-primary-01 hover:text-white min-[390px]:text-sm sm:px-8 sm:text-base md:px-12 ${filterProgress === "semua" ? "bg-primary-01 text-white" : "bg-white text-neutral-04"}`}
                onClick={() => setFilterProgress("semua")}
              >
                Semua
              </button>
              <button
                className={`rounded-3xl px-4 py-2 text-xs font-bold shadow-sm hover:bg-primary-01 hover:text-white min-[390px]:text-sm sm:px-8 sm:text-base md:px-12 ${filterProgress === "inProgress" ? "bg-primary-01 text-white" : "bg-white text-neutral-04"}`}
                onClick={() => setFilterProgress("inProgress")}
              >
                Sedang berjalan
              </button>
              <button
                className={`rounded-3xl px-4 py-2 text-xs font-bold shadow-sm hover:bg-primary-01 hover:text-white min-[390px]:text-sm  sm:px-8 sm:text-base md:px-12 ${filterProgress === "completed" ? "bg-primary-01 text-white" : "bg-white text-neutral-04"}`}
                onClick={() => setFilterProgress("completed")}
              >
                Selesai
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full ">
                  <Loading />
                </div>
              ) : courses && courses.length > 0 ? (
                courses.map((course) => (
                  <RunningCourseCard key={course.id} courseUser={course} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 xl:col-span-3">
                  <NoRunningCourseCard />
                </div>
              )}
            </div>

            {/* filter for mobile */}
            {isMobileFilterVisible && (
              <div className="fixed bottom-0 left-0 z-50 h-full w-full bg-black-transparent sm:hidden">
                <div
                  ref={filterRef}
                  className="fixed bottom-0 w-full overflow-y-auto rounded-t-3xl bg-white p-6"
                  style={{ maxHeight: "92vh" }}
                >
                  <div className="mb-2 flex justify-between">
                    <h1 className="text-2xl font-bold text-primary-01">
                      Filter
                    </h1>
                    <button
                      className="text-3xl text-primary-01"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileFilterVisible(false);
                      }}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                  <form onChange={(e) => handleFilterForm(e)}>
                    <h3 className="text-lg font-semibold">Urutkan</h3>
                    <ul className="text-xs">
                      <li>
                        <div className="mb-1 flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="terbaru-mobile"
                            value={"terbaru"}
                            name="sortBy"
                            checked={filterForm.sortBy === "terbaru"}
                            className="h-3.5 w-3.5 appearance-none rounded-full border-2 border-[#E8F1FF] bg-[#E8F1FF] ring-1 ring-[#B4BDC4] checked:border-white checked:bg-primary-01 checked:ring-1 checked:ring-primary-01"
                          />
                          <label htmlFor="terbaru-mobile">Terbaru</label>
                        </div>
                      </li>
                      <li>
                        <div className="my-1 flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="terpopuler-mobile"
                            value={"terpopuler"}
                            name="sortBy"
                            checked={filterForm.sortBy === "terpopuler"}
                            className="h-3.5 w-3.5 appearance-none rounded-full border-2 border-[#E8F1FF] bg-[#E8F1FF] ring-1 ring-[#B4BDC4] checked:border-white checked:bg-primary-01 checked:ring-1 checked:ring-primary-01"
                          />
                          <label htmlFor="terpopuler-mobile">
                            Paling Populer
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="my-1 flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="rating-mobile"
                            value={"rating"}
                            name="sortBy"
                            checked={filterForm.sortBy === "rating"}
                            className="h-3.5 w-3.5 appearance-none rounded-full border-2 border-[#E8F1FF] bg-[#E8F1FF] ring-1 ring-[#B4BDC4] checked:border-white checked:bg-primary-01 checked:ring-1 checked:ring-primary-01"
                          />
                          <label htmlFor="rating-mobile">
                            Rating Tertinggi
                          </label>
                        </div>
                      </li>
                    </ul>
                    <h3 className="mt-1 text-lg font-semibold">Kategori</h3>
                    <ul className="text-xs">
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => (
                          <li>
                            <div className="mb-1 flex items-center gap-1.5">
                              <div className="relative flex cursor-pointer items-center">
                                <input
                                  type="checkbox"
                                  name="categoryId"
                                  id={`${category.id}-mobile`}
                                  value={category.id}
                                  checked={filterForm.categoryId.includes(
                                    category.id,
                                  )}
                                  className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                                />
                                <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="1"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </div>

                              <label htmlFor={`${category.id}-mobile`}>
                                {category.name}
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <h3 className="mt-1 text-lg font-semibold">
                      Level Kesulitan
                    </h3>
                    <ul className="text-xs">
                      <li>
                        <div className="mb-1 flex items-center gap-1.5">
                          <div className="relative flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              name="level"
                              id={"pemula-mobile"}
                              value={"pemula"}
                              checked={filterForm.level.includes("pemula")}
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                            />
                            <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <label htmlFor="pemula-mobile">Pemula</label>
                        </div>
                      </li>
                      <li>
                        <div className="my-1 flex items-center gap-1.5">
                          <div className="relative flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              name="level"
                              id={"menengah-mobile"}
                              value={"menengah"}
                              checked={filterForm.level.includes("menengah")}
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                            />
                            <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <label htmlFor="menengah-mobile">Menengah</label>
                        </div>
                      </li>
                      <li>
                        <div className="my-1 flex items-center gap-1.5">
                          <div className="relative flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              name="level"
                              id={"mahir-mobile"}
                              value={"mahir"}
                              checked={filterForm.level.includes("mahir")}
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-[#B4BDC4] bg-[#E8F1FF] transition-all checked:border-primary-01 checked:bg-primary-01"
                            />
                            <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <label htmlFor="mahir-mobile">Mahir</label>
                        </div>
                      </li>
                    </ul>
                    <div className="flex flex-col items-center ">
                      <button
                        className="mt-4 w-7/12 rounded-full bg-alert-danger py-2  text-sm font-semibold text-white"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setIsMobileFilterVisible(false);
                        // }}
                        onClick={(e) => {
                          handleResetFilter(e);
                        }}
                      >
                        Hapus Filter
                      </button>
                      {/* <button
                        type="reset"
                        className="w-full text-sm font-semibold text-alert-danger mt-1 mb-2"
                        onClick={(e) => {
                          handleResetFilter(e);
                        }}
                      >
                        Hapus Filter
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function MyCoursePage() {
  return (
    <Suspense>
      <MyCourse />
    </Suspense>
  );
}
