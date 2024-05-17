"use client";

import { useEffect } from "react";
import { fetchCheckToken } from "@/services/auth.service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/loading-animation/Loading";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function CheckTokenPage() {
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
        const res = await fetchCheckToken(token);
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
          Cookies.set("token", token, { expires: 30 });
          push("/");
          return;
        }
      }
    };

    handleCheckToken();
  }, [token, push]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loading text={"Mendapatkan informasi akun"} />
    </div>
  );
}

export default function OauthSuccessPage() {
  return (
    <Suspense>
      <CheckTokenPage />
    </Suspense>
  );
}
