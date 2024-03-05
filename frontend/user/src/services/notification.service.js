export const fetchNotifications = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/notifications`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      statusCode: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const fetchNotificationDetail = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/notifications/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      statusCode: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
