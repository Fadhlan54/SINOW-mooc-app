import Image from "next/image";

export default function NoCourseCard() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border mt-3 md:mt-6 p-6 rounded-xl shadow-md bg-white max-w-72">
        <Image
          src={
            "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/confuse.png?updatedAt=1708483330927"
          }
          width={188}
          height={150}
          alt="Sinow Mascot onboarding"
          priority
        />
        <h1 className="mt-4 font-bold text-primary-01 text-center">
          Tidak ada kursus yang ditemukan
        </h1>
      </div>
    </div>
  );
}
