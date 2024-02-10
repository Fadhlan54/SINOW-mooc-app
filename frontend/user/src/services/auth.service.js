export const login = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const checkToken = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/check-token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const register = async (name, email, phoneNumber, password) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          password,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyEmail = async (token, otpCode) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          otpCode,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resendOtp = async (email) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const reqResetPassword = async (email) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/request-reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
