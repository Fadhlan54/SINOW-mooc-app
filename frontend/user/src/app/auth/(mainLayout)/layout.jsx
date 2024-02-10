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
      <div className="flex items-center flex-col sm:justify-center  w-full lg:w-1/2 mx-6 relative">
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
      <div className="w-1/2  bg-primary-01 hidden lg:flex justify-center items-center flex-col">
        <div className="w-full flex flex-col items-center text-center mb-6">
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
