/**
 * Alternate header (nav + auth styling). Exported as `Header2` from the package entry.
 * Avoid mounting `Header` and `Header2` on one page — shared DOM ids / modal hooks.
 */
import React from 'react';
import { createPortal } from 'react-dom';
import { MYBHARAT_CDN_BASE_BETA } from '../constants/cdn';
import { DEFAULT_HEADER2_MAIN_NAV } from '../navigation/header2MainNav.defaults';
import type { NavTreeItem } from '../navigation/types';
import { DesktopMainNav } from './DesktopMainNav';
import { HeaderBrandLogos } from './header/HeaderBrandLogos';
import { HeaderGovernmentStrip } from './header/HeaderGovernmentStrip';
import { HeaderMobileStrip } from './header/HeaderMobileStrip';
import { useMbHeaderBootstrapAndPortal } from './header/useMbHeaderBootstrapAndPortal';
import { MobileMenuModal } from './MobileMenuModal';
import { HeaderLoginShellPortal } from './header/login/useHeaderLoginShell';
import { useHeaderLoginConfig } from './header/login/useHeaderLoginConfig';
import './Header2.css';

import { HeaderAuthControls, isHeaderUserLoggedIn } from './header/HeaderAuthControls';
import type { HeaderUserSessionInput } from './header/headerUserSession';

export type Header2Props = {
  /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
  title?: string;
  /** Override CDN base (no trailing slash), e.g. `https://cdn-beta.mybharats.in/mybharat` */
  cdnBase?: string;
  /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER2_MAIN_NAV}. */
  mainNavItems?: readonly NavTreeItem[];
  /** Logged-in user (`data` object or full API envelope). Guest header when omitted. */
  userSession?: HeaderUserSessionInput;
  /** Cake webroot for profile / logout URLs (default `/`). */
  webroot?: string;
  /** Portal origin for header login redirects (`VITE_BASE_URL`). */
  baseUrl?: string;
  /** API origin for header login calls (`VITE_API_BASE_URL` / dev `/api`). */
  apiBaseUrl?: string;
};

export const Header2: React.FC<Header2Props> = ({
  title = 'MyBharat',
  cdnBase,
  mainNavItems,
  userSession,
  webroot,
  baseUrl,
  apiBaseUrl,
}) => {
  useHeaderLoginConfig({ baseUrl, apiBaseUrl });
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE_BETA).replace(/\/$/, '');
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER2_MAIN_NAV;
  const loggedIn = isHeaderUserLoggedIn(userSession);

  return (
    <>
      <header
        id="mb-common-header-root"
        className="fixed-top shadow mb-common-header mb-common-header--header2"
        aria-label={title}
      >
        <div id="bhashini-mobile-header" className="bhashini-plugin-container mb-common-header__bhashini-root" />
        <HeaderGovernmentStrip cdn={cdn} />

        <div className="header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area">
          <div className="container">
            <div className="row align-items-center gx-2">
              {/* Mobile / tablet (<lg): same row as mybharat.gov.in — logos left, open middle, toll + Bhashini + menu right */}
              <HeaderMobileStrip cdn={cdn} variant="h2" />

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
      {menuPortalReady && !loggedIn ? (
        <HeaderLoginShellPortal cdnBase={cdn} variant="header2" />
      ) : null}
    </>
  );
};

export default Header2;
