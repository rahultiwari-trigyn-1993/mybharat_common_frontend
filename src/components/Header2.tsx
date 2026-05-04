/**
 * Alternate header (nav + auth styling). Exported as `Header2` from the package entry.
 * Avoid mounting `Header` and `Header2` on one page — shared DOM ids / modal hooks.
 */
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MYBHARAT_CDN_BASE_BETA } from '../constants/cdn';
import { MobileMenuModal } from './MobileMenuModal';
import './Header2.css';

export type Header2Props = {
  title?: string;
  /** Override CDN base (no trailing slash), e.g. `https://cdn-beta.mybharats.in/mybharat` */
  cdnBase?: string;
};

export const Header2: React.FC<Header2Props> = ({ title = 'MyBharat', cdnBase }) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE_BETA).replace(/\/$/, '');
  const [menuPortalReady, setMenuPortalReady] = useState(false);

  useEffect(() => {
    setMenuPortalReady(true);

    const appendStylesheet = (id: string, href: string) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    const appendScript = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    appendStylesheet('mb-bootstrap-css', `${cdn}/assets/css/bootstrap.min.css`);
    appendStylesheet('mb-bootstrap-icons-css', `${cdn}/assets/css/bootstrap-icons.css`);
    appendStylesheet('mb-fontawesome-css', 'https://img1.digitallocker.gov.in/nad/v-22/assets/css/fontawesome.min.css');
    // appendStylesheet('mb-bootstrap-datepicker-css', `${cdn}/css/default.css`);
    appendScript('mb-popper-js', `${cdn}/assets/js/popper.min.js`);
    appendScript('mb-bootstrap-js', `${cdn}/assets/js/bootstrap.min.js`);
    appendScript(
      'mb-bootstrap-datepicker-js',
      `${cdn}/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js`
    );
  }, [cdn]);

  return (
    <>
    <header
      id="mb-common-header-root"
      className="fixed-top shadow mb-common-header mb-common-header--header2"
      style={{}}
    >
      <div className="bhashini-plugin-container" style={{}}></div>
      <div className="header-top d-none d-sm-block ">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 d-flex col-sm-4 col-6 align-items-center">
              <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" className="goi">
                <img
                  src={`${cdn}/assets/img/mybharat/Flag%20of%20India.png`}
                  style={{}}
                  className="cursor"
                />
                <strong className="gov_india">Government of India</strong>
              </a>
            </div>
            <div className="col-xl-9 col-lg-9 col-sm-8 col-6 text-end">
              <span className=" d-none d-md-inline">
                <button role="button" id="decreasetext" className="font01">
                  -A
                </button>

                <button role="button" id="resettext" className="font01 active01">
                  A
                </button>

                <button role="button" id="increasetext" className="font01">
                  A+
                </button>
                <span className="partition">| &nbsp;</span>

                <a href="tel:18002122729" title="Toll Free" className="skip01">
                  Toll Free : 14472 Or 18002122729
                </a>
                <span className="partition">| &nbsp;</span>
                <a href="/pages/support" className="skip01">
                  support.mybharat.gov.in
                </a>

                <span className="partition">| &nbsp;</span>
                <div id="bhashini-desktop-header"></div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area">
        <div className="container">
          <div className="row align-items-center gx-2">
            {/* Mobile / tablet (<lg): same row as mybharat.gov.in — logos left, open middle, toll + Bhashini + menu right */}
            <div className="col-12 d-lg-none mb-common-header__mobile-bar mb-common-header__mobile-bar--h2">
              <div className="mb-common-header__mobile-row mb-common-header__mobile-row--h2 d-flex align-items-center flex-nowrap w-100 py-2">
                <div className="mb-common-header__mobile-logos mb-common-header__mobile-logos--h2 min-w-0 d-flex align-items-center">
                  <div className="d-flex new_head align-items-center">
                    <a href="/">
                      <img
                        src={`${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`}
                        className="new_head1 logo-w-sm-md1"
                        alt=""
                      />
                    </a>
                    <span className="d-inline-flex align-items-center">
                      <a href="/">
                        <img
                          src={`${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`}
                          className="logo-w-sm-md-sec"
                          alt="MY Bharat"
                        />
                      </a>
                    </span>
                  </div>
                </div>
                <div className="mb-common-header__mobile-mid--h2 d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0">
                  <a href="tel:18002122729" title="Toll Free" id="toll_mb" className="skip01 mb-common-header__toll-link--h2">
                    <strong className="lang_toll_free">
                      <i className="fa fa-phone mb-common-header__toll-phone-icon" aria-hidden="true"></i>{' '}
                      14472 Or 18002122729
                    </strong>
                  </a>
                  <div id="bhashini-mobile-header" className="mb-common-header__bhashini-mid--h2">
                    <span className="mb-common-header__bhashini-fallback" aria-hidden="true">
                      <span>अ</span>
                      <span>A</span>
                    </span>
                  </div>
                </div>
                <div className="mb-common-header__mobile-end--h2 d-flex align-items-center justify-content-end flex-shrink-0 min-w-0">
                  <button
                    type="button"
                    className="btn mb-common-header__mobile-menu-btn--h2"
                    data-bs-toggle="modal"
                    id="mb_menus"
                    data-bs-target="#mobileMenuNew"
                    aria-label="Open menu"
                  >
                    <i className="fa fa-bars fa-fw" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Legacy hook: quick nav lives in drawer on small screens; keep id for host scripts */}
            <nav className="d-none" id="mb-nav-mobile-quick" aria-hidden="true" />

            {/* Desktop: logos + main nav */}
            <div className="col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1">
              <div className="d-flex new_head">
                <a href="/">
                  <img
                    src={`${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`}
                    className="new_head1 logo-w-sm-md1"
                    alt=""
                  />
                </a>
                <span style={{ display: 'inline-flex' }}>
                  <a href="/">
                    <img
                      src={`${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`}
                      className="logo-w-sm-md-sec"
                      alt="MY Bharat"
                    />
                  </a>
                </span>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 d-none d-lg-block">
              <div className="f-hd-right"></div>
              <div className="main-menu f-hd-right d-none d-md-block">
                <nav className="navbar navbar-expand-lg navbar-light" id="mb-nav-desktop-main" aria-label="Main navigation">
                  <ul className="menu_nav1">
                    <div className="dropdown_evnt_prog">
                      <button type="button" className="dropevent">
                        MY Bharat Diaspora <i className="fa fa-chevron-down" aria-hidden="true"></i>
                      </button>
                      <div className="dropevent_content">
                        <i className="fa fa-caret-up" aria-hidden="true"></i>
                        <a className="mission_yuva fontchange14" href="/pages/mb_friends">
                          <span className="lang_exp_lrn01">Friends of MY Bharat</span>
                        </a>
                        <a className="events fontchange14" href="/connect-international-youth-club">
                          <span className="lang_event">International Youth Club</span>
                        </a>
                      </div>
                    </div>

                    <li>
                      {' '}
                      <a
                        className="fontchange14 youth lang_youth"
                        href="https://web-beta.mybharats.in/youth-public-profile"
                      >
                        <span className="">Youth</span>
                      </a>
                    </li>

                    <li>
                      {' '}
                      <a className="fontchange14" href="/quiz">
                        <span className="">Quiz &amp; Essay</span>
                      </a>
                    </li>

                    <div className="dropdown_evnt_prog">
                      <button type="button" className="dropevent">
                        Events &amp; Program <i className="fa fa-chevron-down" aria-hidden="true"></i>
                      </button>
                      <div className="dropevent_content">
                        <i className="fa fa-caret-up" aria-hidden="true"></i>
                        <a className="mission_yuva fontchange14" href="/elp/listing">
                          <span className="lang_exp_lrn01">Experiential Learning</span>
                        </a>
                        <a className="events fontchange14" href="/pages/events">
                          <span className="lang_event">Volunteer for Bharat</span>
                        </a>
                        <a className="mega_event fontchange14" href="/mega_events">
                          <span className="lang_mega_event">Mega Events</span>
                        </a>
                        <a className="mega_event fontchange14" href="/pages/vbyld_2026">
                          <span className="lang_mega_event">VBYLD-2026</span>
                        </a>
                      </div>
                    </div>

                    <li>
                      {' '}
                      <a className="mega_event fontchange14" href="/pages/podcasts">
                        <span className="lang_mega_event"> MY Bharat Podcast</span>
                      </a>
                    </li>

                    <li>
                      {' '}
                      <a className="mega_event fontchange14" href="/pages/brics_2026">
                        <span className="lang_mega_event">BRICS India 2026</span>
                      </a>
                    </li>

                    <li>
                      {' '}
                      <a className="mega_event fontchange14" href="/mentorship">
                        <span className="lang_mega_event">Mentorship</span>
                      </a>
                    </li>

                    <li>
                      {' '}
                      <a className="mega_event fontchange14" href="/game/yuva">
                        <span className="lang_mega_event">Dice Roll Game</span>
                      </a>
                    </li>
                  </ul>

                  <button id="btnGroupDrop1" type="button" className="btn mb-common-header__auth-btn">
                    <span className="lang_yuva_register_login_link fontchange">Sign In</span>
                  </button>

                  <a href="/yuva_register" className="mb-common-header__register-link text-decoration-none">
                    <button id="btnGroupDrop2" type="button" className="btn mb-common-header__auth-btn">
                      <span className="fontchange">Register Now</span>
                    </button>
                  </a>
                  &nbsp;&nbsp;
                  <div className="btn-group" role="group">
                    <div className="dropdown-menu dropdown-menu-header" aria-labelledby="btnGroupDrop1">
                      <a className="dropdown-item border-bottom" href="/yuva_register">
                        <img src={`${cdn}/assets/img/yuva_landing/youth_icon1.png`} alt="" />{' '}
                        <span className="lang_yuva">Youth</span>
                        <br /> <span className="f-12-dropdown lang_applicants_volunteer">Applicants/Volunteers/Participants</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>

              <div className="f-hd-right d-sm-none1 mt-10">
                <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#mobileMenuNew">
                  <i className="fa fa-bars fa-fw " aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    {/* Portal to document.body so .modal-backdrop (sibling to #root) stacks below the modal — inside fixed header it sat under the dimmer and blocked all clicks */}
    {menuPortalReady ? createPortal(<MobileMenuModal cdnBase={cdn} />, document.body) : null}
    </>
  );
};

export default Header2;
