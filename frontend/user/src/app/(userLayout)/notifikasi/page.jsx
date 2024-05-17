"use client";

import MainLayout from "@/components/MainLayout";
import Loading from "@/components/loading-animation/Loading";
import { dateFormatter } from "@/lib/formatter";
import { fetchNotifications } from "@/services/notification.service";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { LuArrowLeft } from "react-icons/lu";
import Swal from "sweetalert2";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (!token) {
      push("/");
    }
    const getNotifications = async () => {
      try {
        setIsLoading(true);
        const res = await fetchNotifications(token);
        if (res.data.status === "Success") {
          setNotifications(res.data.data);
        } else if (res.statusCode === 401) {
          Swal.fire({
            title: "Oopps!",
            text: "Data login tidak valid, silahkan login kembali",
            imageUrl:
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/must_login.png?updatedAt=1708540672288",
            imageHeight: 143,
            imageWidth: 188,
            showDenyButton: true,
            confirmButtonText: "Login",
            confirmButtonColor: "#00CCF4",
            denyButtonText: `Batal`,
            denyButtonColor: "#FF0000",
          }).then((result) => {
            if (result.isConfirmed) {
              Cookies.remove("token");
              push("/auth/login");
            }
          });
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    getNotifications();
  }, []);

  return (
    <MainLayout disableMobileNavbar>
      <div className="mx-auto mb-3 w-full max-w-4xl  px-4 py-1 md:px-6 md:pb-6">
        <Link
          href={"/"}
          className="my-3 flex w-fit items-center gap-2 font-semibold"
        >
          <LuArrowLeft className="sm:text-lg" />
          <p className="text-sm sm:text-base">Pergi ke beranda</p>
        </Link>
        <div className="w-full rounded-2xl shadow-md">
          <div className="w-full rounded-t-2xl bg-primary-01 py-2 text-center text-xl font-bold text-white">
            <h1>Notifikasi</h1>
          </div>

          {isLoading ? (
            <Loading />
          ) : notifications.length < 1 ? (
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
                Tidak ada notifikasi
              </p>
            </div>
          ) : (
            <div className="rounded-b-2xl border border-primary-01 bg-white pb-8">
              <div className="flex items-center justify-end gap-2 px-2 py-3 sm:gap-4 md:px-4 ">
                <button className="text-start text-xs font-bold text-primary-01 md:text-sm">
                  Tandai semua sebagai dibaca
                </button>
                <button className="text-start text-xs font-bold text-primary-01 md:text-sm">
                  Hapus semua
                </button>
              </div>

              {notifications.length > 0 &&
                notifications.map((notification) => (
                  <Link
                    href={`/notifikasi/${notification.id}`}
                    className={`flex items-center justify-between gap-1 border px-4 py-3 hover:bg-neutral-200 md:px-8 ${!notification.isRead && "bg-neutral-100"} `}
                    key={notification.id}
                  >
                    <div className="flex w-full items-center gap-4 ">
                      <div className="rounded-full bg-primary-01 p-2">
                        <FaBell className="text-lg text-white" />
                      </div>
                      <div className=" flex w-full flex-col ">
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-sm font-bold text-primary-01">
                            {notification.type || "notifikasi"}
                          </p>
                          <p className="block text-end text-xs font-semibold text-neutral-04">
                            {dateFormatter(notification.createdAt)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold ">
                          {notification.title}
                        </p>
                        {notification.type === "Promosi" && (
                          <p className="text-xs text-neutral-04">
                            Syarat dan ketentuan berlaku
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
