export const getNotifications = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer`,
        },
        credentials: "include",
      }
    );

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
