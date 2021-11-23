import "../styles/globals.css";

import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {router.pathname !== "/" && <Navbar />}
      <Component {...pageProps} />
      {router.pathname !== "/create" && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;
