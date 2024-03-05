export const fetchCategories = async ({ name, isPopular, sortByName } = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (name) {
      queryParams.append("name", name);
    }

    if (isPopular !== undefined) {
      queryParams.append("isPopular", isPopular);
    }

    if (sortByName) {
      queryParams.append("sortByName", sortByName);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (err) {
    return err.message;
  }
};
