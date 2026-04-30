import "./components/Header.css";
import "./components/Footer.css";

import Header from "./components/Header";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";

export { Header, Header2, Footer };
export { MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN } from "./constants/cdn";

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
export const MYBHARAT_COMMON_FRONTEND_VERSION = __MYBHARAT_PKG_VERSION__;

export default { Header, Header2, Footer };