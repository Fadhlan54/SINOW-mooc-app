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
      <div className="w-full max-w-4xl mx-auto px-4  md:px-6 py-1 mb-3 md:pb-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 font-semibold my-3 w-fit"
        >
          <LuArrowLeft className="sm:text-lg" />
          <p className="text-sm sm:text-base">Pergi ke beranda</p>
        </Link>
        <div className="w-full shadow-md rounded-2xl">
          <div className="bg-primary-01 text-white font-bold text-xl w-full text-center rounded-t-2xl py-2">
            <h1>Notifikasi</h1>
          </div>

          {isLoading ? (
            <Loading />
          ) : notifications.length < 1 ? (
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
                Tidak ada notifikasi
              </p>
            </div>
          ) : (
            <div className="pb-8 bg-white rounded-b-2xl border border-primary-01">
              <div className="flex items-center justify-end px-2 md:px-4 gap-2 sm:gap-4 py-3 ">
                <button className="text-xs md:text-sm font-bold text-primary-01 text-start">
                  Tandai semua sebagai dibaca
                </button>
                <button className="text-xs md:text-sm font-bold text-primary-01 text-start">
                  Hapus semua
                </button>
              </div>

              {notifications.length > 0 &&
                notifications.map((notification) => (
                  <Link
                    href={`/notifikasi/${notification.id}`}
                    className={`flex items-center justify-between py-3 px-4 md:px-8 border gap-1 hover:bg-neutral-200 ${!notification.isRead && "bg-neutral-100"} `}
                    key={notification.id}
                  >
                    <div className="flex gap-4 items-center w-full ">
                      <div className="bg-primary-01 p-2 rounded-full">
                        <FaBell className="text-lg text-white" />
                      </div>
                      <div className=" w-full flex flex-col ">
                        <div className="flex justify-between items-start gap-1">
                          <p className="text-primary-01 text-sm font-bold">
                            {notification.type || "notifikasi"}
                          </p>
                          <p className="text-xs text-neutral-04 font-semibold block text-end">
                            {dateFormatter(notification.createdAt)}
                          </p>
                        </div>
                        <p className="font-semibold text-sm ">
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
