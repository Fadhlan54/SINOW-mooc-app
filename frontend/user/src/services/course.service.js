export const fetchCourses = async ({
  categoryId,
  type,
  search,
  sortBy,
  level,
} = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (type && type !== "semua") {
      queryParams.append("type", type);
    }

    if (search) {
      queryParams.append("search", search);
    }

    if (categoryId && categoryId !== "semua" && categoryId.length > 0) {
      if (Array.isArray(categoryId)) {
        categoryId.forEach((cat) => {
          queryParams.append("categoryId", cat);
        });
      } else {
        queryParams.append("categoryId", categoryId);
      }
      console.log(queryParams.toString());
    }

    if (level && level.length > 0) {
      console.log(level);
      if (Array.isArray(level)) {
        level.forEach((lvl) => {
          queryParams.append("level", lvl);
        });
      } else {
        queryParams.append("level", level);
      }
    }

    if (sortBy) {
      queryParams.append("sortBy", sortBy);
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

export const fetchCourseById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export const fetchOtherCourses = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/others/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export const fetchCoursesUser = async (
  token,
  { categoryId, progress, search, sortBy, level } = {}
) => {
  try {
    const queryParams = new URLSearchParams();

    if (progress && progress !== "semua") {
      queryParams.append("progress", progress);
    }

    if (search) {
      queryParams.append("search", search);
    }

    if (categoryId && categoryId !== "semua" && categoryId.length > 0) {
      if (Array.isArray(categoryId)) {
        categoryId.forEach((cat) => {
          queryParams.append("categoryId", cat);
        });
      } else {
        queryParams.append("categoryId", categoryId);
      }
      console.log(queryParams.toString());
    }

    if (level && level.length > 0) {
      console.log(level);
      if (Array.isArray(level)) {
        level.forEach((lvl) => {
          queryParams.append("level", lvl);
        });
      } else {
        queryParams.append("level", level);
      }
    }

    if (sortBy) {
      queryParams.append("sortBy", sortBy);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/my-courses?${queryParams.toString()}`,
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

export const fetchCourseUserById = async (id, token) => {
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
