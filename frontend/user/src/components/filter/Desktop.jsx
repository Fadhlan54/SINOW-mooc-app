import { fetchCategories } from "@/services/category.service";
import {
  selectCategoryFilter,
  selectLevelFilter,
  selectSortFilter,
} from "@/store/slices/filterSlice";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSort, setLevel } from "@/store/slices/filterSlice";

export default function DesktopFilter() {
  const sortFilter = useSelector(selectSortFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const levelFilter = useSelector(selectLevelFilter);
  const [filterForm, setFilterForm] = useState({
    sortBy: "",
    categoryId: [],
    level: [],
  });
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

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

    if (name === "sortBy") {
      dispatch(setSort(value));
    } else if (name === "categoryId") {
      let updatedValues;
      if (checked) {
        updatedValues = [...categoryFilter, value];
      } else {
        updatedValues = categoryFilter.filter((item) => item !== value);
      }
      setCategory(updatedValues);
    } else if (name === "level") {
      let updatedValues;
      if (checked) {
        updatedValues = [...levelFilter, value];
      } else {
        updatedValues = levelFilter.filter((item) => item !== value);
      }
      setLevel(updatedValues);
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
  return (
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
              checked={sortFilter === "terbaru"}
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
              checked={sortFilter === "terpopuler"}
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
              checked={sortFilter === "rating"}
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

      <h3 className="text-lg font-semibold mb-1 mt-3">Level Kesulitan</h3>
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
  );
}
