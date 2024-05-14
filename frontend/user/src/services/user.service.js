export const fetchUserProfile = async (token) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    return {
      statusCode: res.status,
      data: await res.json(),
    };
  } catch (err) {
    return err;
  }
};

export const updateUserProfile = async (token, data, photoProfile) => {
  try {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (photoProfile) {
      formData.append("image", photoProfile);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return {
      statusCode: res.status,
      data: await res.json(),
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchChangePassword = async (token, data) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/change-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    return {
      statusCode: res.status,
      data: await res.json(),
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserTransactions = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/transaction`,
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
  } catch (e) {
    console.log(e);
  }
};
