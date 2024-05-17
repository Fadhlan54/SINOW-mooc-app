"use client";

import MainLayout from "@/components/MainLayout";
import Loading from "@/components/loading-animation/Loading";
import { fetchNotificationDetail } from "@/services/notification.service";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import Swal from "sweetalert2";

export default function DetailNotificationPage({ params }) {
  const [notification, setNotification] = useState([]);
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const id = params.id;
  const linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

  const { push } = useRouter();

  useEffect(() => {
    if (!token) {
      push("/");
    }
    const getNotification = async () => {
      try {
        setIsLoading(true);
        const res = await fetchNotificationDetail(id, token);
        if (res.data.status === "Success") {
          setNotification(res.data.data);
        } else if (res.statusCode === 401) {
          Swal.fire({
            imageUrl:
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927",
            imageWidth: 188,
            imageHeight: 145,
            title: "Oopps!",
            text: `${res.data.message}\nSilahkan login ulang`,
            confirmButtonColor: "#00CCF4",
            confirmButtonText: "Login",
            showDenyButton: true,
            denyButtonText: `Batal`,
            denyButtonColor: "#FF0000",
            showCancelButton: true,
            cancelButtonColor: "#73CA5C",
          });
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    getNotification();
  }, []);

  return (
    <MainLayout disableMobileNavbar>
      <div className="mx-auto mb-3 w-full max-w-4xl px-4 py-1 md:px-6 md:pb-6">
        <Link
          href={"/notifikasi"}
          className="my-3 flex w-fit items-center gap-2 font-semibold "
        >
          <LuArrowLeft className="sm:text-lg" />
          <p className="text-sm sm:text-base">Kembali ke halaman notifikasi</p>
        </Link>
        <div className="w-full">
          <div className="w-full rounded-t-2xl bg-primary-01 py-2 text-center text-xl font-bold text-white">
            <h1>Detail Notifikasi</h1>
          </div>

          {isLoading ? (
            <Loading />
          ) : !notification ? (
            <div className="flex w-full flex-col items-center justify-center rounded-b-2xl border border-primary-01 bg-white p-6">
              <Image
                src={
                  "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/notify_null.png?updatedAt=1709088271424"
                }
                alt="notify null"
                width={190}
                height={160}
              />
              <p className="mt-2 text-xl font-bold text-primary-01">
                Notifikasi tidak ditemukan
              </p>
            </div>
          ) : (
            <div className="rounded-b-2xl border border-primary-01 bg-white px-4 pb-8 pt-2 md:px-8">
              <h1 className="mt-1 font-semibold text-primary-01 md:text-lg">
                {notification.type}
              </h1>
              <h3 className="text-lg font-bold md:text-2xl">
                {notification.title}
              </h3>
              <hr className="mb-2" />

              {notification.content?.split("\n\n").map((line) => (
                <div className="mb-2 text-xs text-neutral-04 md:text-sm">
                  {line.split("\n").map((text) => {
                    if (linkRegex.test(text)) {
                      return (
                        <Link
                          href={text}
                          className="my-1 inline-block break-all text-primary-01 underline hover:text-primary-02"
                          target="_blank"
                        >
                          {text}
                        </Link>
                      );
                    } else {
                      return <p className="my-1">{text}</p>;
                    }
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
