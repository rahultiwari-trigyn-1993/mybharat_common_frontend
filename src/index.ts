import './components/Header.css';
import './components/Footer.css';

import Header from './components/Header';
import Header2 from './components/Header2';
import Footer from './components/Footer';

export { Header, Header2, Footer };
export { DesktopMainNav } from './components/DesktopMainNav';
export { MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN } from './constants/cdn';
export { DEFAULT_HEADER_MAIN_NAV } from './navigation/headerMainNav.defaults';
export { DEFAULT_HEADER2_MAIN_NAV } from './navigation/header2MainNav.defaults';
export { isSafeNavHref } from './navigation/navHref';
export type { NavTreeItem, NavLinkItem, NavGroupItem } from './navigation/types';

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
export const MYBHARAT_COMMON_FRONTEND_VERSION = __MYBHARAT_PKG_VERSION__;

export default { Header, Header2, Footer };
