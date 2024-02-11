export const getCategories = async ({ name, isPopular } = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (name) {
      queryParams.append("name", name);
    }

    if (isPopular !== undefined) {
      queryParams.append("isPopular", isPopular);
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
