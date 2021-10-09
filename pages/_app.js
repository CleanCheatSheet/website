import "../styles/globals.css";
import { Navbar } from "../components/navbar";
import { Search } from "../components/search";
import { Footer } from "../components/footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
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
    </>
  );
}

export default MyApp;
