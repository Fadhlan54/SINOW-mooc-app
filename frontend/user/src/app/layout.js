import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SINOW",
  description: "SINOW - Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${montserrat.className} scrollbar-thin scrollbar-webkit`}
        >
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
