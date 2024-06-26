import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function AuthLayout({ children }) {
  return (
    <div className={`flex min-h-screen ${poppins.className}`}>
      <div className="relative mx-6 flex w-full  flex-col items-center sm:justify-center lg:w-1/2">
        <Link href={"/"}>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo-sinow-bg-text-dark.png?updatedAt=1706583375417"
            }
            alt="sinow logo dark with text dark"
            width={120}
            height={120}
            className="mt-8 sm:mt-6 lg:mt-0 lg:hidden"
          />
        </Link>
        {children}
      </div>
      <div className="hidden  w-1/2 flex-col items-center justify-center bg-primary-01 lg:flex">
        <div className="mb-6 flex w-full flex-col items-center text-center">
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/LOGO/logo-sinow-bg-text.png?updatedAt=1706583375728"
            }
            alt="sinow logo dark with text"
            width={120}
            height={120}
          />
        </div>
        <div>
          <Image
            src={
              "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/MASCOT/practitioner.png?updatedAt=1706608557703"
            }
            alt="sinow mascot practitioner"
            height={537}
            width={490}
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
}
