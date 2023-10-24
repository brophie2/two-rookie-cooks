import { AppProps } from "next/app";
import "../styles/index.css";
import { Noto_Sans_Mono } from "next/font/google";

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-sans-mono",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notoSansMono.variable} font-mono`}>
      <Component {...pageProps} />
    </main>
  );
}
