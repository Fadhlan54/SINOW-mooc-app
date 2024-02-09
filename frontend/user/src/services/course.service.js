export const getCourse = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
