import Image from "next/image";
import Link from "next/link";

export default function NoRunningCourseCard() {
  return (
    <div className="flex justify-center">
      <div className="mt-3 flex max-w-72 flex-col items-center rounded-xl border bg-white p-6 shadow-md md:mt-6">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927"
          }
          width={188}
          height={150}
          alt="Sinow Mascot onboarding"
          priority
        />
        <h1 className="mt-2 text-center font-bold text-primary-01">
          Tidak ada kursus yang sedang diikuti.
        </h1>
        <h1 className="mt-1 text-center text-sm">
          Pergi ke halaman{" "}
          <Link href={"/kursus"} className=" font-bold">
            Kursus
          </Link>
        </h1>
      </div>
    </div>
  );
}
