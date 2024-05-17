"use client";

import Button from "@/components/Button";
import { fetchResendOtp, fetchVerifyEmail } from "@/services/auth.service";
import { Montserrat, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useRef, useState, createRef, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Suspense } from "react";
import LoadingScreen from "@/components/loading-animation/LoadingScreen";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

function VerifyEmail() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [otpValues, setOtpValues] = useState(Array(4).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const [countdownTimer, setCountdownTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      push("/auth/login");
    }

    const decoded = jwtDecode(token);
    setDecodedToken(decoded);

    const intervalId = setInterval(() => {
      setCountdownTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        }
        clearInterval(intervalId);
        return 0;
      });
    }, 1000);

    // Hentikan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, [token, push]);

  const inputRefs = useRef([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length === 1 && index < otpValues.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = numericValue;
    setOtpValues(newOtpValues);
  };

  const handleInputPaste = (index, event) => {
    const pastedData = event.clipboardData.getData("text");

    const slicePastedData = pastedData.slice(0, 4 - index);

    const numericData = slicePastedData.replace(/\D/g, "");

    const newOtpValues = [...otpValues];

    for (let i = 0; i < numericData.length; i++) {
      newOtpValues[index + i] = numericData[i];
    }

    setOtpValues(newOtpValues);

    const lastIndex = index + numericData.length;

    // Move focus to the next input field
    if (lastIndex < otpValues.length) {
      inputRefs.current[index + numericData.length].current.focus();
    } else if (lastIndex === otpValues.length) {
      inputRefs.current[otpValues.length - 1].current.focus();
    }

    event.preventDefault();
  };

  const handleKeyDown = (index, event) => {
    const key = event.key;

    if (key === "Backspace" && index > 0 && otpValues[index] === "") {
      inputRefs.current[index - 1].current.focus();
    }

    if ((key === "ArrowLeft" || key === "ArrowDown") && index > 0) {
      const prevInput = inputRefs.current[index - 1].current;
      prevInput.focus();
    }

    if ((key === "ArrowRight" || key === "ArrowUp") && index < 3) {
      const nextInput = inputRefs.current[index + 1].current;
      nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 4) {
      setErrorMessage("Kode OTP harus 4 digit");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetchVerifyEmail(token, otp);
      if (res.status === "Success") {
        Cookies.set("token", res.data.token, { expires: 30 });
        push("/");
      }
      setErrorMessage(res.message);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const res = await fetchResendOtp(decodedToken.email);
      if (res.status === "Success") {
        setSuccessMessage(res.message);
        setCountdownTimer(60);
        push(`${pathname}?${createQueryString("token", res.token)}`);
        return;
      } else {
        setErrorMessage(res.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen ${poppins.className}`}>
      {isLoading && <LoadingScreen />}
      <div className="relative mx-6 flex w-full flex-col items-center justify-center lg:w-1/2 ">
        {(errorMessage || successMessage) && (
          <div className="absolute right-0   top-10 text-white opacity-80">
            {errorMessage && (
              <div className="mb-2 flex justify-between rounded-lg bg-alert-danger py-2 pe-2 ps-4 text-center">
                <p className="w-full text-sm">{errorMessage}</p>
                <button
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMessage("");
                  }}
                >
                  <IoMdClose />
                </button>
              </div>
            )}
            {successMessage && (
              <div className="flex justify-between rounded-lg bg-alert-success py-2 pe-2 ps-4 text-center">
                <p className="w-full text-sm">{successMessage}</p>
                <button
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setSuccessMessage("");
                  }}
                >
                  <IoMdClose />
                </button>
              </div>
            )}
          </div>
        )}
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/reset-password.png?updatedAt=1706606384684"
          }
          alt="sinow logo dark with text dark"
          width={214}
          height={164}
          className="mb-8 mt-14 sm:mt-0"
        />
        <form
          className="w-full max-w-[452px] text-center lg:w-3/4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3
            className={`text mb-4 text-2xl font-bold text-primary-01 ${montserrat.className}`}
          >
            Verifikasi email anda
          </h3>

          <div className="mb-6 flex items-center justify-center space-x-4 rounded-2xl bg-primary-01 py-8 font-semibold text-white shadow-xl">
            {otpValues.map((value, index) => (
              <div key={index} className="h-9 w-9">
                <input
                  ref={inputRefs.current[index]}
                  className="flex h-full w-full flex-col items-center justify-center border-b-4 border-white bg-primary-01 text-center  text-xl outline-none"
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e)}
                  onPaste={(e) => handleInputPaste(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  id={`otp-input-${index + 1}`}
                />
              </div>
            ))}
          </div>

          <Button
            additionalClass={"w-full mt-4 hover:bg-primary-02"}
            type="submit"
          >
            Verifikasi email
          </Button>
          {countdownTimer > 0 ? (
            <p className="mt-4 text-sm">
              Kirim ulang OTP dalam{" "}
              <span className="font-bold text-primary-01">
                {countdownTimer}
              </span>{" "}
              detik
            </p>
          ) : (
            <button
              type="button"
              onClick={() => handleResendOTP()}
              className="mt-4 text-sm text-primary-01 hover:text-primary-02"
            >
              Kirim Ulang OTP
            </button>
          )}

          <div className="mt-6 text-center text-sm">
            <p>
              Kembali ke halaman{" "}
              <Link
                href={"/register"}
                className="font-semibold text-primary-01 hover:text-primary-02"
              >
                Registrasi
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden  w-1/2 flex-col items-center justify-center bg-primary-01 lg:flex">
        <div className="mb-6 flex w-full flex-col items-center text-center">
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo-sinow-bg-text.png?updatedAt=1706583375728"
            }
            alt="sinow logo dark with text"
            width={120}
            height={120}
          />
        </div>
        <div>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/everywhere%201.png?updatedAt=1706575980008"
            }
            alt="sinow mascot everywhere"
            height={537}
            width={490}
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
}
