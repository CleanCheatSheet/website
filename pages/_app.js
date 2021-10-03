import "../styles/globals.css";
import { Navbar } from "../components/navbar";
import { Search } from "../components/search";
import { Footer } from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Search />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
