export const getCourse = async ({ categoryId, type, search } = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (categoryId && categoryId !== "semua") {
      queryParams.append("categoryId", categoryId);
    }

    if (type && type !== "semua") {
      queryParams.append("type", type);
    }

    if (search) {
      queryParams.append("search", search);
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

export const getCouseById = async (id) => {
  try {
    console.log("getting data");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
  }
};

export const getCourseUser = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/my-courses/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const followCourse = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/my-courses/${id}/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const unfollowCourse = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/my-courses/${id}/unfollow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
  }
};

export const openModuleUser = async (courseId, moduleId, token) => {
  try {
    console.log(courseId);
    console.log(moduleId);
    console.log(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/my-courses/${courseId}/modules/${moduleId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    console.log(err);
  }
};
