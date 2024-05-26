import Image from "next/image";
import Link from "next/link";

export function TransactionNotFound() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <div className="mx-4 flex max-w-sm flex-col items-center rounded-xl border bg-white p-6 shadow-md">
        <h1 className="mb-3 text-center text-xl font-bold">
          Transaksi tidak ditemukan!
        </h1>
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927"
          }
          width={183}
          height={147}
          alt="Sinow Mascot onboarding"
          priority
        />

        <div className="w-full text-sm">
          <Link
            href={"/"}
            className="mt-4 block w-full text-center font-bold text-primary-01 underline hover:text-primary-02"
          >
            Pergi ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
