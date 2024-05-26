import Image from "next/image";
import Link from "next/link";

export default function PaymentPending({ courseName, paymentUrl }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <div className="mx-4 flex max-w-sm flex-col items-center rounded-xl border bg-white p-6 shadow-md">
        <h1 className="mb-3 text-2xl font-bold">Menunggu Pembayaran</h1>
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927"
          }
          width={183}
          height={147}
          alt="Sinow Mascot onboarding"
          priority
        />
        <div className="mt-4 w-full text-sm">
          <p>Menunggu pembayaran untuk kursus:</p>
          <p className="mt-1 font-bold">{courseName}</p>
        </div>
        <div className="mt-2 w-full text-sm">
          <Link
            href={paymentUrl}
            className="block w-full rounded-full bg-primary-01 py-1 text-center font-bold text-white hover:bg-primary-02"
            target="_blank"
          >
            Bayar sekarang
          </Link>
          <Link
            href={"/"}
            className="mt-1 block w-full text-center font-bold text-primary-01 underline hover:text-primary-02"
          >
            Pergi ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
