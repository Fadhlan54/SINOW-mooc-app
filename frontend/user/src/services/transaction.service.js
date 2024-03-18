export const fetchCreateTrx = async ({ userId, courseId }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ courseId }),
      }
    );
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    return err;
  }
};

export const fetchGetTrxUserById = async ({ userId, trxId }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/transaction/${trxId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {}
};
