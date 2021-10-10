import "../styles/globals.css";

import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Search } from "../components/search";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {router.asPath !== "/" &&
        router.pathname !== "/search" &&
        router.pathname !== "/create" && (
          <>
            <Navbar logoSize="64" />
            <Search />
          </>
        )}
      {(router.pathname === "/search" || router.pathname === "/create") && (
        <>
          <Navbar logoSize="64" />
        </>
      )}

      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
