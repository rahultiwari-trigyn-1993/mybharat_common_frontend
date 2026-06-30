import React from 'react';
import { createPortal } from 'react-dom';
import { resolveCdnBase } from '../config/resolve';
import { DEFAULT_HEADER_MAIN_NAV } from '../navigation/headerMainNav.defaults';
import type { NavTreeItem } from '../navigation/types';
import { DesktopMainNav } from './DesktopMainNav';
import { HeaderBrandLogos } from './header/HeaderBrandLogos';
import { HeaderGovernmentStrip } from './header/HeaderGovernmentStrip';
import { HeaderMobileStrip } from './header/HeaderMobileStrip';
import { useMbHeaderBootstrapAndPortal } from './header/useMbHeaderBootstrapAndPortal';
import { MobileMenuModal } from './MobileMenuModal';
import { HeaderLoginShellPortal } from './header/login/useHeaderLoginShell';
import { useHeaderLoginConfig } from './header/login/useHeaderLoginConfig';
import { useHeaderAccessibilityFont } from './header/useHeaderAccessibilityFont';
import { useBhashiniWidgetPlacement } from '../hooks/useBhashiniWidgetPlacement';
import type { ClientEnvironment } from '../config/types';

import { HeaderAuthControls, isHeaderUserLoggedIn } from './header/HeaderAuthControls';
import type { HeaderUserSessionInput } from './header/headerUserSession';

export type HeaderProps = {
  /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
  title?: string;
  /** CDN origin (e.g. `https://cdn-prod.mybharats.in`) — assets load from `{cdnBase}/mybharat/...`. */
  cdnBase?: string;
  /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER_MAIN_NAV}. */
  mainNavItems?: readonly NavTreeItem[];
  /** Logged-in user (`data` object or full API envelope). Guest header when omitted. */
  userSession?: HeaderUserSessionInput;
  /** Cake webroot for profile / logout URLs (default `/`). */
  webroot?: string;
  /** Portal origin for header login redirects (`VITE_BASE_URL`). */
  baseUrl?: string;
  /** MY Bharat login API root — absolute URL when embedded on another app (not host `/api`). */
  apiBaseUrl?: string;
  /** Host environment (`local` | `dev` | `beta` | `prod`). */
  environment?: ClientEnvironment;
  /** Same-origin proxy for login fetch when apiBaseUrl is cross-origin (avoids OPTIONS preflight). */
  apiProxyBaseUrl?: string;
  /** RSA public key PEM (optional). Browser encrypts password/OTP — never pass private key as a prop. */
  loginPayloadPublicKey?: string;
  /** Optional client IP for OTP send when host cannot infer IP server-side. */
  ipAddress?: string;
  /** Public profile API base for post-login `getUserId`. */
  publicProfileApiBaseUrl?: string;
  /** Cookie domain for post-login token cookies. */
  cookieDomain?: string;
  /** Load Bhashini website translation plugin (default true). Set false if the host page loads the script. */
  bhashini?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  title = 'MyBharat',
  cdnBase,
  mainNavItems,
  userSession,
  webroot,
  baseUrl,
  apiBaseUrl,
  environment,
  apiProxyBaseUrl,
  loginPayloadPublicKey,
  ipAddress,
  publicProfileApiBaseUrl,
  cookieDomain,
  bhashini = true,
}) => {
  useHeaderLoginConfig({
    baseUrl,
    apiBaseUrl,
    environment,
    apiProxyBaseUrl,
    loginPayloadPublicKey,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain,
    cdnBase,
  });
  useHeaderAccessibilityFont();
  useBhashiniWidgetPlacement(bhashini);
  const cdn = resolveCdnBase({ cdnBase });
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER_MAIN_NAV;
  const loggedIn = isHeaderUserLoggedIn(userSession);

  return (
    <>
      <header id="mb-common-header-root" className="fixed-top shadow mb-common-header" aria-label={title}>
        <div
          id="bhashini-plugin-mount"
          className="bhashini-plugin-container mb-common-header__bhashini-mount"
          aria-hidden="true"
        />
        <HeaderGovernmentStrip cdn={cdn} />

        <div className="header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area">
          <div className="container">
            <div className="row align-items-center gx-2">
              {/* Mobile / tablet (<lg): same row as mybharat.gov.in — logos left, open middle, toll + Bhashini + menu right */}
              <HeaderMobileStrip cdn={cdn} variant="split" />

              {/* Legacy hook: quick nav lives in drawer on small screens; keep id for host scripts */}
              <nav className="d-none" id="mb-nav-mobile-quick" aria-hidden="true" />

              {/* Desktop: logos + main nav */}
              <div className="col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1">
                <HeaderBrandLogos cdn={cdn} layout="desktop" />
              </div>
              <div className="col-xl-10 col-lg-10 d-none d-lg-block">
                <div className="main-menu f-hd-right d-none d-md-block">
                  <nav className="navbar navbar-expand-lg navbar-light" id="mb-nav-desktop-main" aria-label="Main navigation">
                    <DesktopMainNav items={navItems} />

                    <HeaderAuthControls cdn={cdn} userSession={userSession} webroot={webroot} />
                  </nav>
                </div>

                <div className="f-hd-right d-sm-none1 mt-10">
                  <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#mobileMenuNew">
                    <i className="fa fa-bars fa-fw " aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Portal to document.body so .modal-backdrop (sibling to #root) stacks below the modal — inside fixed header it sat under the dimmer and blocked all clicks */}
      {menuPortalReady
        ? createPortal(
            <MobileMenuModal cdnBase={cdn} items={navItems} userSession={userSession} webroot={webroot} />,
            document.body
          )
        : null}
      {!loggedIn ? <HeaderLoginShellPortal cdnBase={cdn} variant="header" /> : null}
    </>
  );
};

export default Header;
