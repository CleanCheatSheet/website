import "../styles/globals.css";
import { Navbar, NavItem } from "../components/navbar";
import { Search } from "../components/search";
import { Footer } from "../components/footer"

function MyApp({ Component, pageProps }) {
  return <>
      <Navbar>
        
        <NavItem content="About" link="/about" />
        <NavItem content="Github" link="https://github.com/CleanCheatSheet/sheets" />
      </Navbar>
      <Footer>
      </Footer>
      <Component {...pageProps} />
    </>
}

export default MyApp;
