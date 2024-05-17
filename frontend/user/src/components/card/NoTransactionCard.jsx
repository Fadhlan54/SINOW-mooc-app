import Image from "next/image";

export default function NoTransactionCard() {
  return (
    <div className="flex justify-center">
      <div className="flex max-w-72 flex-col items-center rounded-xl border bg-white p-6 shadow-md md:mt-6">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927"
          }
          width={188}
          height={150}
          alt="Sinow Mascot onboarding"
          priority
        />
        <h1 className="mt-4 text-center font-bold text-primary-01">
          Tidak ada riwayat pembayaran
        </h1>
      </div>
    </div>
  );
}
