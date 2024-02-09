"use client";

import Button from "@/components/Button";
import { resendOtp, verifyEmail } from "@/services/auth.service";
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
      const res = await verifyEmail(token, otp);
      if (res.status === "Success") {
        Cookies.set("token", res.data.token);
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
    [searchParams]
  );

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const res = await resendOtp(decodedToken.email);
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
      <div className="flex items-center flex-col justify-center w-full lg:w-1/2 mx-6 relative ">
        {(errorMessage || successMessage) && (
          <div className="absolute top-10   text-white right-0 opacity-80">
            {errorMessage && (
              <div className="bg-alert-danger rounded-lg ps-4 pe-2 py-2 flex mb-2 justify-between text-center">
                <p className="text-sm w-full">{errorMessage}</p>
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
              <div className="bg-alert-success rounded-lg ps-4 pe-2 py-2 flex justify-between text-center">
                <p className="text-sm w-full">{successMessage}</p>
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
          className="mt-14 mb-8 sm:mt-0"
        />
        <form
          className="w-full lg:w-3/4 max-w-[452px] text-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3
            className={`text-primary-01 font-bold text text-2xl mb-4 ${montserrat.className}`}
          >
            Verifikasi email anda
          </h3>

          <div className="mb-6 flex space-x-4 justify-center items-center bg-primary-01 py-8 rounded-2xl text-white font-semibold shadow-xl">
            {otpValues.map((value, index) => (
              <div key={index} className="w-9 h-9">
                <input
                  ref={inputRefs.current[index]}
                  className="w-full h-full flex flex-col items-center justify-center text-center outline-none border-b-4 border-white  text-xl bg-primary-01"
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
            <p className="text-sm mt-4">
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
              className="text-sm text-primary-01 hover:text-primary-02 mt-4"
            >
              Kirim Ulang OTP
            </button>
          )}

          <div className="text-center text-sm mt-6">
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
      <div className="w-1/2  bg-primary-01 hidden lg:flex justify-center items-center flex-col">
        <div className="w-full flex flex-col items-center text-center mb-6">
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
