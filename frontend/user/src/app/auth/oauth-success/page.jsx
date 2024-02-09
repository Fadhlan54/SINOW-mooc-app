"use client";

import { useEffect } from "react";
import { checkToken } from "@/services/auth.service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/loading-animation/Loading";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function CheckToken() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { push } = useRouter();

  useEffect(() => {
    const handleCheckToken = async () => {
      if (!token) {
        const result = await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Tidak ada token",
          showConfirmButton: true,
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          push("/auth/login");
          return;
        }
      } else {
        const res = await checkToken(token);
        if (res.status !== "Success") {
          const result = await Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message || "Token tidak valid",
            showConfirmButton: true,
            allowOutsideClick: false,
          });
          if (result.isConfirmed) {
            push("/auth/login");
            return;
          }
        } else {
          Cookies.set("token", token);
          push("/");
          return;
        }
      }
    };

    handleCheckToken();
  }, [token, push]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loading text={"Mendapatkan informasi akun"} />
    </div>
  );
}

export default function OauthSuccessPage() {
  return (
    <Suspense>
      <CheckToken />
    </Suspense>
  );
}
