import "../styles/globals.css";
import { Navbar, NavItem } from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return <>
      <Navbar>
        <NavItem content="Markdown" link="/markdown" />
        <NavItem content="CleanCheatSheet" link="/" css="logo"/>
        <NavItem content="Autonlp" link="/autonlp" />
      </Navbar>
      <Component {...pageProps} />
    </>
}

export default MyApp;
