import "../styles/globals.css";
import { Navbar, NavItem } from "../components/navbar";
import { Search } from "../components/search";

function MyApp({ Component, pageProps }) {
  return <>
      <Navbar>
        
        <NavItem content="About" link="/about" />
        <NavItem content="Github" link="https://github.com/CleanCheatSheet/sheets" />
      </Navbar>
      <Component {...pageProps} />
    </>
}

export default MyApp;
