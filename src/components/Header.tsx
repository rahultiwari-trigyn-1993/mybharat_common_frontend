import React from 'react';
import { createPortal } from 'react-dom';
import { MYBHARAT_CDN_BASE } from '../constants/cdn';
import { DEFAULT_HEADER_MAIN_NAV } from '../navigation/headerMainNav.defaults';
import type { NavTreeItem } from '../navigation/types';
import { DesktopMainNav } from './DesktopMainNav';
import { HeaderBrandLogos } from './header/HeaderBrandLogos';
import { HeaderGovernmentStrip } from './header/HeaderGovernmentStrip';
import { HeaderMobileStrip } from './header/HeaderMobileStrip';
import { useMbHeaderBootstrapAndPortal } from './header/useMbHeaderBootstrapAndPortal';
import { MobileMenuModal } from './MobileMenuModal';

export type HeaderProps = {
  /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
  title?: string;
  /** Override CDN base (no trailing slash), e.g. `https://cdn-prod.mybharats.in/mybharat` */
  cdnBase?: string;
  /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER_MAIN_NAV}. */
  mainNavItems?: readonly NavTreeItem[];
};

export const Header: React.FC<HeaderProps> = ({ title = 'MyBharat', cdnBase, mainNavItems }) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE).replace(/\/$/, '');
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER_MAIN_NAV;

  return (
    <>
      <header id="mb-common-header-root" className="fixed-top shadow mb-common-header" aria-label={title}>
        <div className="bhashini-plugin-container mb-common-header__bhashini-root" />
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

                    <button id="btnGroupDrop1" type="button" className="btn mb-common-header__auth-btn">
                      Sign In
                    </button>

                    <a href="/yuva_register" className="mb-common-header__register-link text-decoration-none">
                      <button id="btnGroupDrop2" type="button" className="btn mb-common-header__auth-btn">
                        Register Now
                      </button>
                    </a>
                    &nbsp;&nbsp;
                    <div className="btn-group" role="group">
                      <div className="dropdown-menu dropdown-menu-header" aria-labelledby="btnGroupDrop1">
                        <a className="dropdown-item border-bottom" href="/yuva_register">
                          <img src={`${cdn}/assets/img/yuva_landing/youth_icon1.png`} alt="" />{' '}
                          Youth
                          <br /> <span className="f-12-dropdown lang_applicants_volunteer">Applicants/Volunteers/Participants</span>
                        </a>
                      </div>
                    </div>
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
      {menuPortalReady ? createPortal(<MobileMenuModal cdnBase={cdn} items={navItems} />, document.body) : null}
    </>
  );
};

export default Header;
