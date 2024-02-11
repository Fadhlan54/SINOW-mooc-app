export const getCourse = async ({ categoryId, type } = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (categoryId && categoryId !== "semua") {
      queryParams.append("categoryId", categoryId);
    }

    if (type && type !== "semua") {
      queryParams.append("type", type);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
