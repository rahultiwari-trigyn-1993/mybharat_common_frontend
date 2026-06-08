import './components/header/Header.common.css';
import './components/Header.css';
import './components/Footer.css';

import Header from './components/Header';
import Header2 from './components/Header2';
import Footer from './components/Footer';

export { Header, Header2, Footer };
export {
  openLoginWithOtpModal,
  openSignInPasswordModal,
  installHeaderLoginFlow,
  HEADER_LOGIN_SIGN_IN_SELECTORS,
} from './components/header/login/headerLoginFlow';
export { HeaderLoginShellPortal } from './components/header/login/useHeaderLoginShell';
export { DesktopMainNav } from './components/DesktopMainNav';
export { MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN } from './constants/cdn';
export { DEFAULT_HEADER_MAIN_NAV } from './navigation/headerMainNav.defaults';
export { DEFAULT_HEADER2_MAIN_NAV } from './navigation/header2MainNav.defaults';
export { isSafeNavHref } from './navigation/navHref';
export { normalizeNavTree, isNavLinkItem, isNavGroupItem } from './navigation/navTree';
export { navTreeItemKey } from './navigation/navTreeKeys';
export {
  normalizeApiMenuTree,
  normalizeHrefForNav,
} from './navigation/navApiNormalize';
export { filterUnsafeNavTree } from './navigation/filterUnsafeNavTree';
export { prepareMainNavItems } from './navigation/prepareMainNavItems';
export { unwrapMenuListFromPayload } from './navigation/unwrapMenuList';
export { useMainNavItems } from './navigation/useMainNavItems';
export type { NormalizeNavTreeOptions } from './navigation/navTree';
export type { NormalizeApiMenuTreeOptions } from './navigation/navApiNormalize';
export type { PrepareMainNavItemsOptions } from './navigation/prepareMainNavItems';
export type { UseMainNavItemsOptions } from './navigation/useMainNavItems';
export type { NavTreeItem, NavLinkItem, NavGroupItem } from './navigation/types';

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
export const MYBHARAT_COMMON_FRONTEND_VERSION = __MYBHARAT_PKG_VERSION__;

export default { Header, Header2, Footer };
