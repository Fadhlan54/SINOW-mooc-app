"use client";

import CourseCard from "@/components/card/CourseCard";
import CourseLayout from "@/components/CourseLayout";
import Loading from "@/components/loading-animation/Loading";
import { fetchCourses } from "@/services/course.service";
import { Suspense, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectSearchFilter } from "@/store/slices/filterSlice";
import { fetchCategories } from "@/services/category.service";

function Course() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState("semua");
  const [isLoading, setIsLoading] = useState([]);
  const filterRef = useRef(null);
  const searchFilter = useSelector(selectSearchFilter);

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
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const res = await fetchCourses({
          search: searchFilter,
          type: filterType,
          categoryId: filterForm.categoryId,
          level: filterForm.level,
          sortBy: filterForm.sortBy,
        });
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
  }, [searchFilter, filterForm, filterType]);

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
    <CourseLayout>
      <div className="py-2 px-4 min-[420px]:px-8 min-[480px]:px-10 sm:px-4 md:p-6 lg:px-20 xl:px-10 mx-auto max-w-7xl">
        <div className="flex items-center mb-3 justify-between">
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
          <div className="hidden lg:flex justify-center pt-4 pb-6 bg-white rounded-2xl shadow-md w-1/5 h-fit">
            <form onChange={(e) => handleFilterForm(e)}>
              <h2 className="text-xl font-bold text-primary-01">Filter</h2>
              <h3 className="text-lg font-semibold mb-1">Urutkan</h3>
              <ul className="text-xs">
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="radio"
                      id="terbaru"
                      value={"terbaru"}
                      name="sortBy"
                      checked={filterForm.sortBy === "terbaru"}
                    />
                    <label htmlFor="terbaru ml-4">Terbaru</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="radio"
                      id="terpopuler"
                      value={"terpopuler"}
                      name="sortBy"
                      checked={filterForm.sortBy === "terpopuler"}
                    />
                    <label htmlFor="terpopuler">Paling Populer</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="radio"
                      id="rating"
                      value={"rating"}
                      name="sortBy"
                      checked={filterForm.sortBy === "rating"}
                    />
                    <label htmlFor="rating">Rating Tertinggi</label>
                  </div>
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-1 mt-3">Kategori</h3>
              <ul className="text-xs">
                {categories.map((category) => (
                  <li>
                    <div className="flex items-center gap-1 my-1">
                      <input
                        type="checkbox"
                        name="categoryId"
                        id={category.id}
                        value={category.id}
                        checked={filterForm.categoryId.includes(category.id)}
                      />
                      <label htmlFor={category.id}>{category.name}</label>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-1 mt-3">
                Level Kesulitan
              </h3>
              <ul className="text-xs">
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="checkbox"
                      name="level"
                      id="pemula"
                      value={"pemula"}
                      checked={filterForm.level.includes("pemula")}
                    />
                    <label htmlFor="pemula">Pemula</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="checkbox"
                      name="level"
                      id="menengah"
                      value={"menengah"}
                      checked={filterForm.level.includes("menengah")}
                    />
                    <label htmlFor="menengah">Menengah</label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-1 my-1">
                    <input
                      type="checkbox"
                      name="level"
                      id="mahir"
                      value={"mahir"}
                      checked={filterForm.level.includes("mahir")}
                    />
                    <label htmlFor="mahir">Mahir</label>
                  </div>
                </li>
              </ul>
              <button
                className="w-full mt-3 text-center text-sm font-semibold text-alert-danger"
                onClick={(e) => handleResetFilter(e)}
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
                Semua
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
                <div className="col-span-full ">
                  <Loading />
                </div>
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
                  <div className="flex justify-between mb-2">
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
                    <h3 className="text-lg font-semibold mb-1">Urutkan</h3>
                    <ul className="text-xs">
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="radio"
                            id="terbaru-mobile"
                            value={"terbaru"}
                            name="sortBy"
                            checked={filterForm.sortBy === "terbaru"}
                          />
                          <label htmlFor="terbaru-mobile">Terbaru</label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="radio"
                            id="terpopuler-mobile"
                            value={"terpopuler"}
                            name="sortBy"
                            checked={filterForm.sortBy === "terpopuler"}
                          />
                          <label htmlFor="terpopuler-mobile">
                            Paling Populer
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="radio"
                            id="rating-mobile"
                            value={"rating"}
                            name="sortBy"
                            checked={filterForm.sortBy === "rating"}
                          />
                          <label htmlFor="rating-mobile">
                            Rating Tertinggi
                          </label>
                        </div>
                      </li>
                    </ul>
                    <h3 className="text-lg font-semibold mb-1 mt-3">
                      Kategori
                    </h3>
                    <ul className="text-xs">
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => (
                          <li>
                            <div className="flex items-center gap-1 my-1">
                              <input
                                type="checkbox"
                                name="categoryId"
                                id={`${category.id}-mobile`}
                                value={category.id}
                                checked={filterForm.categoryId.includes(
                                  category.id
                                )}
                              />
                              <label htmlFor={`${category.id}-mobile`}>
                                {category.name}
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-semibold mb-1 mt-3">
                      Level Kesulitan
                    </h3>
                    <ul className="text-xs">
                      <li>
                        <div className="flex items-center gap-1 my-1">
                          <input
                            type="checkbox"
                            name="level"
                            id="pemula-mobile"
                            value={"pemula"}
                            checked={filterForm.level.includes("pemula")}
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
                            value={"menengah"}
                            checked={filterForm.level.includes("menengah")}
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
                            value={"mahir"}
                            checked={filterForm.level.includes("mahir")}
                          />
                          <label htmlFor="mahir-mobile">Mahir</label>
                        </div>
                      </li>
                    </ul>
                    <div className="flex flex-col items-center mt-4">
                      <button
                        className="w-3/4 py-2 bg-primary-01 text-white rounded-3xl"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMobileFilterVisible(false);
                        }}
                      >
                        Terapkan Filter
                      </button>
                      <button
                        type="reset"
                        className="w-full mt-3 text-sm font-semibold text-alert-danger"
                        onClick={(e) => {
                          handleResetFilter(e);
                        }}
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

export default function CoursePage() {
  return (
    <Suspense>
      <Course />
    </Suspense>
  );
}
