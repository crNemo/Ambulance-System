import { Inter,Montserrat } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';


const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "YDH Ambulance",
  description: "Created by YDH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /  >
        {children}
      </body>
    </html>
  );
}
