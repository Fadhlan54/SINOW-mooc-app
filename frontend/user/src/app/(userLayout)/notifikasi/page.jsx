import Image from "next/image";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border p-6 rounded-xl shadow-md">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/onboarding.png?updatedAt=1707366179905"
          }
          width={188}
          height={143}
          alt="Sinow Mascot onboarding"
        />
        <h1 className="font-bold text-2xl mt-4 mb-2">Notifikasi</h1>
        <h3>Halaman ini sedang dibuat heheh...</h3>
        <p>
          Pergi ke{" "}
          <Link href="/beranda" className="text-primary-01">
            Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
