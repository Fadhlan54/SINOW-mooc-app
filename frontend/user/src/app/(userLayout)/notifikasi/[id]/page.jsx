"use client";

import MainLayout from "@/components/MainLayout";
import Loading from "@/components/loading-animation/Loading";
import { dateFormatter } from "@/lib/formatter";
import { fetchNotificationDetail } from "@/services/notification.service";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuArrowLeft, LuTrash2 } from "react-icons/lu";
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
      push("/beranda");
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
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-1 mb-3 md:pb-6">
        <Link
          href={"/notifikasi"}
          className="flex items-center gap-2 font-semibold my-3 w-fit "
        >
          <LuArrowLeft className="sm:text-lg" />
          <p className="text-sm sm:text-base">Kembali ke halaman notifikasi</p>
        </Link>
        <div className="w-full">
          <div className="bg-primary-01 text-white font-bold text-xl w-full text-center rounded-t-2xl py-2">
            <h1>Detail Notifikasi</h1>
          </div>

          {isLoading ? (
            <Loading />
          ) : !notification ? (
            <div className="w-full flex flex-col justify-center items-center p-6 bg-white rounded-b-2xl border border-primary-01">
              <Image
                src={
                  "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/notify_null.png?updatedAt=1709088271424"
                }
                alt="notify null"
                width={190}
                height={160}
              />
              <p className="text-primary-01 font-bold mt-2 text-xl">
                Notifikasi tidak ditemukan
              </p>
            </div>
          ) : (
            <div className="px-4 md:px-8 pt-2 pb-8 bg-white rounded-b-2xl border border-primary-01">
              <h1 className="text-primary-01 font-semibold md:text-lg mt-1">
                {notification.type}
              </h1>
              <h3 className="font-bold text-lg md:text-2xl">
                {notification.title}
              </h3>
              <hr className="mb-2" />

              {notification.content?.split("\n\n").map((line) => (
                <div className="text-neutral-04 text-xs md:text-sm mb-2">
                  {line.split("\n").map((text) => {
                    if (linkRegex.test(text)) {
                      return (
                        <Link
                          href={text}
                          className="my-1 text-primary-01 underline hover:text-primary-02 inline-block break-all"
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
