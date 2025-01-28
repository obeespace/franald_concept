import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { Outfit } from "next/font/google";
import Footer from "./components/Footer";
import { CartProvider } from './components/CartContext';


const outfit = Outfit({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Franald Foods",
  description: "take out barbeque order webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className} suppressHydrationWarning={true}
      >
       <CartProvider><Nav/> {children} <Footer/></CartProvider>
      </body>
    </html>
  );
}
