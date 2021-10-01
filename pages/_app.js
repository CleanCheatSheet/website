import "../styles/globals.css";
import { Navbar } from "../components/navbar";
import { Search } from "../components/search";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Search />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
