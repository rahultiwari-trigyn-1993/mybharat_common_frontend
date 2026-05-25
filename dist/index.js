/*! mybharat_common_frontend@1.0.176 — if this version is wrong in Sources, Vite cached an old pre-bundle; see README "Vite dev server" */

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DEFAULT_HEADER2_MAIN_NAV: () => DEFAULT_HEADER2_MAIN_NAV,
  DEFAULT_HEADER_MAIN_NAV: () => DEFAULT_HEADER_MAIN_NAV,
  DesktopMainNav: () => DesktopMainNav,
  Footer: () => Footer_default,
  Header: () => Header_default,
  Header2: () => Header2_default,
  MYBHARAT_CDN_BASE: () => MYBHARAT_CDN_BASE,
  MYBHARAT_CDN_BASE_BETA: () => MYBHARAT_CDN_BASE_BETA,
  MYBHARAT_CDN_ORIGIN: () => MYBHARAT_CDN_ORIGIN,
  MYBHARAT_COMMON_FRONTEND_VERSION: () => MYBHARAT_COMMON_FRONTEND_VERSION,
  default: () => index_default,
  filterUnsafeNavTree: () => filterUnsafeNavTree,
  isNavGroupItem: () => isNavGroupItem,
  isNavLinkItem: () => isNavLinkItem,
  isSafeNavHref: () => isSafeNavHref,
  navTreeItemKey: () => navTreeItemKey,
  normalizeApiMenuTree: () => normalizeApiMenuTree,
  normalizeHrefForNav: () => normalizeHrefForNav,
  normalizeNavTree: () => normalizeNavTree,
  prepareMainNavItems: () => prepareMainNavItems,
  unwrapMenuListFromPayload: () => unwrapMenuListFromPayload,
  useMainNavItems: () => useMainNavItems
});
module.exports = __toCommonJS(index_exports);

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/components/header/Header.common.css
styleInject("header.mb-common-header .f-hd-left {\n  float: left;\n}\nheader.mb-common-header .f-hd-right {\n  float: right;\n}\n#mb-nav-desktop-main {\n  padding: 0;\n}\n@media (min-width: 992px) {\n  header.mb-common-header #mb-nav-desktop-main.navbar {\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 0;\n  }\n  header.mb-common-header #mb-nav-desktop-main .menu_nav1 {\n    display: inline-flex;\n    flex: 0 1 auto;\n    flex-wrap: nowrap;\n    align-items: center;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__auth-btn,\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__register-link {\n    flex: 0 0 auto;\n    align-self: center;\n    margin-left: 12px;\n    vertical-align: middle;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .btn-group {\n    flex: 0 0 auto;\n    align-self: center;\n  }\n}\n.header-top {\n  background: #081854;\n  position: relative;\n}\n.header-top .skip01 {\n  color: #ffffff;\n  line-height: 28px;\n  font-size: 13px;\n  font-weight: 600;\n  padding-right: 15px;\n}\n.header-top .partition {\n  color: #ffffff;\n}\n.header-top .goi {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  line-height: 1.2;\n  padding-top: 2px;\n  color: #ffffff;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  text-decoration: none;\n}\n.header-top .goi img {\n  flex-shrink: 0;\n  margin-right: 15px;\n  width: 25px;\n  height: 15px;\n  vertical-align: middle;\n}\n.header-top .font01 {\n  border: none;\n  outline: none;\n  background: no-repeat;\n  width: 40px;\n  height: auto;\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 600;\n}\n.header-top .language01 {\n  height: auto;\n  padding: 2px 0 2px 14px;\n}\n.header-top .active01 {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 6px;\n}\n.header-top .gov_india {\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n.bhashini-plugin-container {\n  display: inline;\n  float: right;\n  margin-right: 80px !important;\n  margin-top: 2px;\n}\n.bhashini-plugin-container svg {\n  width: 24px;\n  height: 24px;\n}\n.bhashini-dropdown-content {\n  bottom: auto !important;\n  right: -75px;\n  scrollbar-width: thin;\n}\n.bhashini-dropdown-content .language-option {\n  text-align: left !important;\n}\n.mb-common-header__modal-nav a {\n  color: #000000;\n  font-weight: 600;\n}\n.mb-common-header__modal-nav a:hover {\n  color: #f15b43;\n}\n");

// src/components/Header.css
styleInject('.main-menu ul li {\n  display: inline-block;\n  margin: 0 3px;\n  position: relative;\n  list-style: none;\n}\n.main-menu ul li a {\n  color: #000000;\n  display: list-item;\n  list-style: none;\n  line-height: 1;\n  padding: 6px 4px !important;\n  font-size: 13px;\n  font-weight: 600 !important;\n  text-decoration: none !important;\n}\n.header-area {\n  background-size: cover;\n}\n@media (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .header-area.mb-common-header__header-area {\n    padding-top: 0.45rem !important;\n    padding-bottom: 0.45rem !important;\n  }\n}\n.mb-common-header__mobile-bar {\n  position: relative;\n  z-index: 2;\n}\n.mb-common-header__mobile-bar .mb-common-header__mobile-row {\n  align-items: center !important;\n  gap: 0.5rem;\n}\n.mb-common-header__mobile-bar .mb-common-header__mobile-logos {\n  flex: 0 1 auto;\n  justify-content: flex-start;\n  align-items: center;\n  align-self: center;\n}\n@media (max-width: 991.98px) {\n  header.mb-common-header .mb-common-header__mobile-row--split {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.25rem 0.35rem;\n    width: 100%;\n    min-width: 0;\n  }\n  header.mb-common-header .mb-common-header__mobile-logos--split {\n    flex: 1 1 auto;\n    min-width: 0;\n    max-width: calc(100% - 168px);\n    align-items: center;\n    overflow: hidden;\n    padding-right: 2px;\n  }\n  header.mb-common-header .mb-common-header__mobile-actions--split {\n    flex: 0 0 auto;\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 0.2rem;\n    min-width: 0;\n    float: none !important;\n    margin-top: 0 !important;\n  }\n  header.mb-common-header .mb-common-header__mobile-actions--split #toll_mb .lang_toll_free {\n    justify-content: flex-end;\n  }\n  header.mb-common-header .mb-common-header__bhashini-mid--split {\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n  }\n  header.mb-common-header .mb-common-header__mobile-row--split {\n    padding-top: 0.3rem !important;\n    padding-bottom: 0.3rem !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) > .bhashini-plugin-container {\n    display: none !important;\n    visibility: hidden !important;\n    pointer-events: none !important;\n  }\n}\n.mb-common-header__mobile-bar #toll_mb.skip01 {\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex: 0 1 auto;\n  min-width: 0;\n  color: #1937b2;\n  text-decoration: none;\n  line-height: 1;\n}\n.mb-common-header__mobile-bar #toll_mb .lang_toll_free {\n  font-size: clamp(11px, 3vw, 14px);\n  font-weight: 700;\n  line-height: 1.15;\n  color: #1937b2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n}\n@media (max-width: 575.98px) {\n  .mb-common-header__mobile-bar #toll_mb .lang_toll_free {\n    font-size: clamp(9px, 2.65vw, 11px);\n    font-weight: 600;\n    gap: 0.2em;\n    letter-spacing: -0.02em;\n    line-height: 1.1;\n  }\n  .mb-common-header__mobile-bar #mb_menus.btn-light {\n    padding: 0.28rem 0.5rem;\n    font-size: 1rem;\n    line-height: 1;\n  }\n  header.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.88em;\n  }\n  .dropdown-menu-header a,\n  .dropdown-item,\n  .dropdown-menu-header a.border-bottom {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n  .dropdown-menu-header a:hover,\n  .dropdown-menu-header a:focus,\n  .dropdown-item:hover,\n  .dropdown-item:focus {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n}\nheader.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n  display: inline-block;\n  font-size: 0.95em;\n  line-height: 1;\n  vertical-align: middle;\n  transform: rotate(108deg);\n  transform-origin: 50% 58%;\n}\n.mb-common-header__mobile-bar #toll_mb,\n.mb-common-header__mobile-bar #mb_menus {\n  position: static !important;\n  right: auto !important;\n  top: auto !important;\n}\n.mb-common-header__mobile-bar #bhashini-mobile-header {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 auto;\n  min-width: 0;\n  min-height: 0;\n}\n.mb-common-header__mobile-bar #mb_menus.btn-light {\n  flex: 0 0 auto;\n  border: 1px solid #dee2e6;\n}\n@media (max-width: 575.98px) {\n  .mb-common-header__mobile-bar #mb_menus.btn-light {\n    padding: 0.28rem 0.5rem;\n    font-size: 1rem;\n    line-height: 1;\n  }\n}\n.new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n}\n.new_head1 {\n  border-right: 1px solid #bdbdbd;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__register-link {\n  display: inline-block;\n  vertical-align: middle;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn:focus-visible {\n  color: #f15b43 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #f15b43 !important;\n}\n@media (min-width: 992px) {\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n    margin-left: 7px;\n    margin-top: 5px;\n  }\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md1 {\n    width: 90px !important;\n  }\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md {\n  width: 80px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .new_head2 {\n  width: 74px;\n  margin-top: 5px;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head img.logo-w-sm-md1,\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head img.logo-w-sm-md-sec {\n  flex-shrink: 1;\n  min-width: 0;\n  object-fit: contain;\n  height: auto !important;\n  max-width: none !important;\n}\n#mobileMenuNew img.logo-w-sm-md-sec {\n  width: 98px !important;\n  transform: scale(1.12);\n}\n#mobileMenuNew img.logo-w-sm-md1 {\n  width: 90px !important;\n  max-width: none !important;\n  height: auto !important;\n}\n.f-12-dropdown {\n  padding-left: 24px;\n  color: #000000;\n  font-weight: 400;\n  font-size: 12px;\n}\n.dropdown-menu-header {\n  background: #ffffff;\n  border: 1px solid #f15b43;\n  border-radius: 10px;\n}\n.dropdown-menu-header a.border-bottom {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a.border-bottom:hover,\n.dropdown-menu-header a.border-bottom:focus {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a {\n  padding-top: 4px;\n  padding-bottom: 10px;\n  text-decoration: none !important;\n}\n.dropdown_evnt_prog {\n  position: relative;\n  display: inline-block;\n}\n.dropevent {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  border: none;\n}\n.dropevent_content {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  min-width: 180px;\n  z-index: 1;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  left: -25px;\n}\n.dropevent_content > .fa.fa-caret-up {\n  position: absolute;\n  top: -10px;\n  left: 43%;\n  color: #bc4717;\n}\n.dropevent_content a {\n  color: black;\n  border-bottom: 1px solid #dcdcdc;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n}\n.dropevent_content a:hover {\n  background-color: #fff;\n}\n.dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n  transition: transform 0.3s ease-in-out;\n}\n.dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(0deg);\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(0deg);\n}\n.dropevent_content .dropdown_evnt_prog {\n  display: block;\n  width: 100%;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent {\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid #dcdcdc;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent_content {\n  left: 100%;\n  top: 0;\n  margin-left: 2px;\n}\n.dropevent_content .dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.pull-right {\n  margin-left: 30px;\n}\n.header_img {\n  text-align: center;\n  top: 0 !important;\n}\n.user-info-wrapper {\n  display: block;\n  margin: 0;\n  width: 46px;\n  height: 46px;\n  background: #6c757d8a;\n  border-radius: 50px;\n  padding: 3px;\n  float: left;\n}\n.user-info-wrapper .profile-wrapper {\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  display: inline-block;\n}\n.chat-toggler .user-details {\n  float: left;\n  line-height: 0;\n  color: #003d52;\n}\n.chat-toggler .dropdown-menu {\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.5);\n}\n.chat-toggler .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.chat-toggler .dropdown-menu[data-bs-popper] {\n  top: 92%;\n}\n.chat-toggler .dropdown-menu li {\n  display: block !important;\n}\n.chat-toggler .dropdown-menu li a i {\n  font-size: 12px;\n}\n.chat-toggler .dropdown-menu > li > a {\n  line-height: 25px !important;\n  color: #003d52 !important;\n  margin: 4px;\n  border-radius: 3px;\n  text-align: left;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  padding: 3px 20px !important;\n}\n.chat-toggler .dropdown-menu > li > a:hover {\n  text-decoration: none;\n  background-color: #eff2f3;\n  background-image: none;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  list-style: none;\n  text-shadow: none;\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.2);\n  border: none;\n  border-radius: 3px;\n  padding: 0;\n  font-size: 13px;\n}\n@media only screen and (max-width: 991.98px) {\n  #mobileMenuNew img.logo-w-sm-md1 {\n    width: clamp(118px, 32vw, 148px) !important;\n  }\n  #mobileMenuNew img.logo-w-sm-md-sec {\n    width: clamp(126px, 34vw, 156px) !important;\n    transform: scale(1.08) !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head img.new_head1.logo-w-sm-md1 {\n    width: clamp(48px, 17vw, 70px) !important;\n    min-width: 0 !important;\n    max-width: 70px !important;\n    height: auto !important;\n    flex-shrink: 1 !important;\n    transform: none !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head img.logo-w-sm-md-sec {\n    width: clamp(52px, 19vw, 78px) !important;\n    min-width: 0 !important;\n    max-width: 78px !important;\n    height: auto !important;\n    flex-shrink: 1 !important;\n    transform: scale(1.05) !important;\n    margin-left: 2px !important;\n    margin-top: 0 !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head a img {\n    padding-left: 2px !important;\n    padding-right: 2px !important;\n  }\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-row--split {\n    gap: 0.15rem 0.25rem !important;\n    padding-left: 6px !important;\n    padding-right: 4px !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-logos--split {\n    max-width: calc(100% - 158px);\n    padding-right: 0 !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-actions--split {\n    gap: 0.12rem !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb.skip01 {\n    white-space: nowrap !important;\n    min-width: 0 !important;\n    overflow: visible !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb .lang_toll_free {\n    font-size: 9.7px !important;\n    font-weight: 700 !important;\n    line-height: 1.1 !important;\n    letter-spacing: 0 !important;\n    gap: 0.2em !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.82em !important;\n    margin-right: 0.1em !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__bhashini-mid--split,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #bhashini-mobile-header {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 auto !important;\n    min-width: 16px !important;\n    margin-left: 2px !important;\n    margin-right: 2px !important;\n    overflow: visible !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .header-area {\n    min-height: 56px;\n  }\n}\n@media only screen and (max-width: 1000px) {\n  .header-top,\n  .main-menu {\n    display: none !important;\n  }\n  header.mb-common-header .d-sm-none1 {\n    display: block !important;\n  }\n  .header-area .justify-content-sm-end {\n    justify-content: flex-start !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  .header-area {\n    min-height: 56px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) > .bhashini-plugin-container {\n    display: none !important;\n    visibility: hidden !important;\n    pointer-events: none !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .bhashini-plugin-container {\n    position: static !important;\n    float: none !important;\n    right: auto !important;\n    top: auto !important;\n    margin: 0 !important;\n  }\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  .bhashini-plugin-container svg path {\n    fill: #000000 !important;\n  }\n}\n@media (min-width: 1001px) {\n  header.mb-common-header .d-sm-none1 {\n    display: none !important;\n  }\n}\n#mobileMenuNew.modal.left {\n  z-index: 1060 !important;\n}\n#mobileMenuNew.modal.left .modal-dialog {\n  position: fixed;\n  margin: auto;\n  width: 75%;\n  max-width: 420px;\n  height: 100%;\n  transform: translate3d(0%, 0, 0);\n  right: 0;\n  left: auto;\n}\n#mobileMenuNew.modal.left .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n#mobileMenuNew .modal-header .btn-close {\n  margin: -1rem -5px -0.5rem auto;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li:not(:last-child) {\n  border-bottom: 1px solid #d7d7d7;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a,\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew a,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active {\n  text-decoration: none !important;\n  color: inherit !important;\n}\n#mobileMenuNew .modal-body ul.list-unstyled li a {\n  text-decoration: none !important;\n  font-weight: 500 !important;\n  color: #333333 !important;\n}\n#mobileMenuNew .modal-body ul li a,\n#mobileMenuNew .modal-body ul li a span {\n  text-decoration: none !important;\n}\n.f-10-dropdown {\n  font-size: 10px;\n  color: #999999;\n}\n@media only screen and (max-width: 600px) {\n  #mobileMenuNew .modal-content {\n    transform: translate(100%, 0) scale(1);\n    transition: transform 0.4s ease-in-out;\n  }\n  #mobileMenuNew.modal.show .modal-content {\n    transform: translate(0, 0) scale(1);\n  }\n  #mobileMenuNew .accordion-button:not(.collapsed) {\n    background-color: #f15b43;\n    color: #fff;\n  }\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) {\n  font-family: "Noto Sans Meetei Mayek", sans-serif;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .single-login-pad {\n  margin-right: 15px;\n  padding: 0.375rem 1.75rem;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .rounded-pill {\n  border-radius: 5px !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:active,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.disabled,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:disabled,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.dropdown-toggle.show {\n  color: #ffffff;\n  border-color: #f15b4300;\n  background-color: #f15b43;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-item.active,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-item:active {\n  background-color: #f15b43;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn {\n  background-color: #ffff !important;\n  border: 1px solid #f15b43 !important;\n  color: #f15b43 !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn:hover {\n  color: #ffffff !important;\n  border-color: #f15b4300 !important;\n  background-color: #f15b43 !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn::after,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn1::after {\n  display: none !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .primary,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:focus {\n  box-shadow: 0 0 0 0.25rem #f15b4300;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.dropdown-toggle.show:focus,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:active:focus {\n  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu[data-bs-popper] {\n  top: 109%;\n  left: -275px;\n  margin-top: 0.125rem;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_yuva,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_youth_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_login_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_other,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_nyf,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_partner {\n  color: #f15b43;\n  font-weight: 500;\n  font-size: 15px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_yuva,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_youth_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_login_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_other,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_nyf,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .f-12-dropdown {\n  color: #ffff;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(1) {\n  color: #f39620;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(2) {\n  color: #0473b7;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(3) {\n  color: #04a651;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .home_ico .fa {\n  color: #313033;\n  font-size: 24px;\n  padding: 7px 10px;\n  cursor: pointer !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .home_ico {\n  cursor: pointer !important;\n  position: relative;\n  z-index: 999;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #unity-btn {\n  background:\n    linear-gradient(\n      95deg,\n      #faad17 -3.76%,\n      #e4860e 101.62%);\n  color: #fff !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #beta_txt {\n  position: absolute;\n  top: 61px;\n  background-color: #f15b43;\n  padding: 9px;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  bottom: 7px;\n  cursor: pointer;\n  display: none;\n  height: 20px;\n  margin-left: 113px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu {\n  position: relative;\n  list-style: none;\n  display: inline-block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu-link {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #000;\n  text-decoration: none;\n  white-space: nowrap;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu-link:hover {\n  color: #bc4717;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 220px;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  background: #fff;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n  z-index: 999;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu:hover > .resource-dropdown {\n  display: block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown > li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #dcdcdc;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown > li:last-child {\n  border-bottom: none;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu-link,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown li a,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #000;\n  text-decoration: none;\n  background: #fff;\n  white-space: nowrap;\n  line-height: 2 !important;\n  cursor: pointer;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu-link:hover,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown li a:hover,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a:hover {\n  background: #f8f8f8;\n  color: #bc4717;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu {\n  display: none;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  background: #fff;\n  border-top: 1px solid #e5e5e5;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .has-submenu.open > .resource-submenu {\n  display: block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ededed;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li:last-child {\n  border-bottom: none;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a {\n  padding-left: 32px;\n  font-weight: 500;\n}\n@media (max-width: 767px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #beta_txt {\n    position: relative !important;\n    height: 17px !important;\n    top: 19px !important;\n    margin-left: 3px !important;\n    font-size: 10px !important;\n    padding: 7px !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md1,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 70px !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md-sec,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 70px !important;\n    transform: scale(1) !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head img.new_head1.logo-w-sm-md1,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head img.logo-w-sm-md-sec {\n    width: 70px !important;\n    min-width: 70px !important;\n    max-width: 70px !important;\n    transform: none !important;\n    margin-left: 2px !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area {\n    height: 60px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb_new1 {\n    position: absolute;\n    left: 0;\n    top: 12px;\n  }\n  #mobileMenuNew .lang_mobile {\n    font-size: 1rem;\n    padding: 6px 11px 7px 32px;\n    color: #515151;\n    line-height: 19px;\n    width: 90%;\n    font-weight: 600;\n    border: none;\n  }\n  #mobileMenuNew .modal-title .logo a img {\n    height: auto !important;\n  }\n}\n');

// src/components/Footer.css
styleInject("#feed_back.modal,\n#feed_back1.modal,\n#successToaster.modal {\n  z-index: 1060 !important;\n}\n.litext {\n  color: #525c66;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n#footer_external a.litext,\n#footer_external p.litext {\n  color: #525c66 !important;\n}\n#footer_external a.litext {\n  text-decoration: none !important;\n}\n#footer_external {\n  border-top: solid 1px #d6d6d6;\n}\n#footer_external .foot_p1 {\n  color: #525c66;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n#footer_external .footer-top {\n  background-color: #ffffff !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col {\n  text-align: left !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col h6.img_link,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col li,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col a.litext,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col p.litext {\n  text-align: left !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col ul {\n  padding-left: 0;\n}\n@media (max-width: 991.98px) {\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col {\n    text-align: center !important;\n  }\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col h6.img_link,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col li,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col a.litext,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col p.litext {\n    text-align: center !important;\n  }\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col ul {\n    padding-left: 0;\n  }\n  #footer_external .mb-common-footer__follow-col {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col h6.img_link {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col .social-icons {\n    justify-content: center;\n  }\n  #footer_external .mb-common-footer__follow-col .mb-common-footer__powered-by {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col .mb-common-footer__powered-inner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.35rem 0.75rem;\n    width: 100%;\n    max-width: 100%;\n  }\n  #footer_external .mb-common-footer__follow-col .foot_p1 {\n    text-align: center;\n  }\n}\n#footer_external .foot_p2 {\n  padding-left: initial;\n}\n.pricy1_a {\n  background-color: #000627;\n}\n.pricy1_a .row .col-sm-8 {\n  margin-bottom: 0;\n  line-height: 35px;\n}\n.pricy1_a .row .col-sm-8 p {\n  margin-bottom: 0;\n  line-height: 29px;\n}\n.pricy1_a .row {\n  color: #fff;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.pricy_a ul {\n  width: 100%;\n  line-height: 31px;\n  text-align: center;\n  display: inline-flex;\n  justify-content: center;\n  padding-left: 68px;\n  list-style: none;\n  margin: 0;\n  flex-wrap: wrap;\n}\n.pricy_a ul li:nth-child(1) {\n  padding-right: 27px;\n}\n.pricy_a p {\n  margin-bottom: 0;\n  line-height: 35px;\n}\n.foot1w {\n  width: fit-content;\n  color: #000;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  padding: 4px 10px;\n}\n.pricy1_a a {\n  color: #fff !important;\n  text-decoration: none;\n}\n@media only screen and (max-width: 600px) {\n  .foot1w {\n    margin: auto;\n  }\n  .pricy_a ul {\n    padding-left: 0;\n    display: flex;\n    justify-content: center;\n  }\n  .new_foot li .fab {\n    vertical-align: inherit !important;\n  }\n}\n.img_link {\n  color: #343f4a;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n}\n.new_foot li {\n  line-height: 15px;\n  padding: 1px;\n}\n.new_foot li img {\n  width: 81%;\n}\n@media (max-width: 767.98px) {\n  #footer_external .footer-contact {\n    text-align: center !important;\n  }\n  #footer_external .footer-contact .d-flex.align-items-center {\n    justify-content: center !important;\n  }\n}\n@media (min-width: 601px) and (max-width: 991.98px) {\n  #footer_external .footer-contact,\n  #footer_external .footer-links {\n    padding-bottom: 1rem;\n  }\n}\n.mb-common-footer__social-row {\n  flex-wrap: wrap;\n}\n.feed_back {\n  text-align: end;\n}\n#feed_back textarea {\n  margin-top: 0 !important;\n  margin-bottom: 11px !important;\n}\n#feed_back label {\n  font-size: 15px;\n  font-weight: 500;\n  line-height: 20px;\n  color: #252525;\n}\n#feed_back .cross_ico img {\n  cursor: pointer;\n  padding: 6px 10px;\n}\n#feed_back .text-left {\n  text-align: left;\n}\n#feed_back .cross_ico {\n  display: flex;\n  position: absolute;\n  bottom: 18px;\n  z-index: 999;\n}\n#feed_back .radio-tile-group {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n#feed_back .tt_yuvr {\n  display: inline-flex;\n  padding: 10px;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n  gap: 0.25rem;\n}\n#feed_back .tt_yuvr .input-container {\n  position: relative;\n  width: 50px;\n  margin-right: 18px;\n  margin-top: 7px;\n}\n#feed_back .tt_yuvr .input-container input {\n  position: absolute;\n  cursor: pointer;\n  z-index: 2;\n  opacity: 0;\n  width: 50px;\n  height: 50px;\n}\n#feed_back .tt_yuvr input:checked + .radio-tile {\n  background: #0b6bbe;\n}\n#feed_back .tt_yuvr input:checked + .radio-tile label {\n  color: #fff;\n}\n#feed_back .tt_yuvr .input-container .radio-tile {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: #eee;\n  width: 50px;\n  height: 50px;\n  border-radius: 30px;\n}\n#feed_back .tt_yuvr .input-container {\n  transition: transform 0.2s;\n}\n#feed_back .tt_yuvr .input-container:hover {\n  transform: scale(1.07);\n}\n#feed_back .tt_yuvr .input-container label {\n  font-size: 18px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 0;\n}\n.radio-tile-group:nth-child(1),\n.radio-tile-group:nth-child(2),\n.radio-tile-group:nth-child(3),\n.radio-tile-group:nth-child(4) {\n  border-top: 3px solid #f00;\n}\n.radio-tile-group:nth-child(5),\n.radio-tile-group:nth-child(6),\n.radio-tile-group:nth-child(7),\n.radio-tile-group:nth-child(8) {\n  border-top: 3px solid #ffbe15;\n}\n.radio-tile-group:nth-child(9),\n.radio-tile-group:nth-child(10) {\n  border-top: 3px solid #04a651;\n}\n.radio-tile-group:nth-child(5),\n.radio-tile-group:nth-child(9) {\n  margin-left: 10px;\n}\n.vError {\n  border: 1px solid #e41f12;\n}\np.vErrormsg {\n  font-size: small;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #e41f12;\n  margin-bottom: 20px;\n  float: inline-start;\n}\nsmall.vErrormsg {\n  font-size: small;\n  font-weight: 400;\n  color: #e41f12;\n  float: inline-start;\n}\n#char_left_cnt {\n  color: #252525;\n  float: inline-end;\n  font-size: small;\n}\n#successToaster .modal-dialog {\n  margin: 20% auto;\n}\n@media only screen and (min-width: 601px) {\n  #feed_back .modal-dialog {\n    max-width: 876px !important;\n    margin-top: 133px;\n  }\n  #feed_back1 .modal-dialog {\n    margin-top: 133px;\n  }\n}\n@media only screen and (max-width: 600px) {\n  #feed_back .tt_yuvr {\n    display: flex !important;\n    overflow: auto !important;\n  }\n  #feed_back .form-group {\n    margin-bottom: 10px;\n  }\n  #feed_back .tt_yuvr .input-container input {\n    width: 20px !important;\n    height: 20px !important;\n  }\n  #feed_back .tt_yuvr .input-container .radio-tile {\n    width: 30px !important;\n    height: 30px !important;\n    border-radius: 30px !important;\n  }\n  #feed_back .cross_ico {\n    position: initial !important;\n  }\n  #feed_back .tt_yuvr .input-container {\n    width: 17px !important;\n    margin-right: 18px !important;\n  }\n  #feed_back .tt_yuvr .input-container label {\n    font-size: 13px !important;\n  }\n  #feed_back .modal-dialog {\n    width: 100% !important;\n    padding: 10px 15px 10px 0;\n  }\n  .social-icons {\n    justify-content: center;\n  }\n}\n#pls_select h3 {\n  color: #343434;\n  font-weight: 600;\n}\n#pls_select {\n  text-align: center;\n}\n#pls_select #guest_usr {\n  background-color: #f15b43;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 500;\n  border-radius: 4px;\n  margin: 10px;\n}\n#pls_select #regi_usr {\n  background-color: #fff;\n  border: 1px solid #5a6370;\n  font-size: 16px;\n  color: #5a6370;\n  font-weight: 500;\n  border-radius: 4px;\n  margin: 10px;\n}\n#pls_select .btn-close {\n  border: none !important;\n  background: none !important;\n  float: right;\n  width: 32px;\n  height: 32px;\n  cursor: pointer;\n}\n#pls_select .col-sm-12:nth-child(2) {\n  margin-bottom: 20px;\n}\n#feedback_captcha_value {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.social-icons {\n  display: flex;\n  gap: 9px;\n  flex-wrap: wrap;\n}\n.social-icons .icon {\n  display: flex;\n  align-items: center;\n  background: white;\n  border-radius: 50px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  width: 30px;\n  overflow: hidden;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n.social-icons .icon img {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.social-icons .icon span {\n  margin-left: 4px;\n  white-space: nowrap;\n  opacity: 0;\n  transform: translateX(-10px);\n  transition: all 0.3s ease;\n  font-size: 13px;\n}\n.twitter-color {\n  color: #000;\n}\n.instagram-color {\n  color: #cf188a;\n}\n.facebook-color {\n  color: #4676ed;\n}\n.linkedin-color {\n  color: #4467ad;\n}\n.whatsapp-color {\n  color: #00c169;\n}\n.youtube-color {\n  color: #e52d27;\n}\n@media (hover: hover) and (pointer: fine) {\n  .social-icons .icon:hover {\n    width: 100px;\n    justify-content: flex-start;\n  }\n  .social-icons .icon:hover span {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.mb-20 {\n  margin-bottom: 1.25rem;\n}\n.whitetext img {\n  vertical-align: middle;\n}\n#footer_external .mb-common-footer__powered-inner {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.35rem 0.75rem;\n}\n#footer_external .mb-common-footer__powered-by {\n  color: #495059 !important;\n}\n#footer_external .whitetext.mb-common-footer__powered-logo {\n  color: inherit !important;\n  display: inline-flex;\n  align-items: center;\n  line-height: 1;\n}\n#footer_external .mb-common-footer__powered-logo img {\n  display: block;\n  flex-shrink: 0;\n}\n");

// src/components/Header.tsx
var import_react_dom = require("react-dom");

// src/constants/cdn.ts
var MYBHARAT_CDN_ORIGIN = "https://cdn-prod.mybharats.in";
var MYBHARAT_CDN_BASE = `${MYBHARAT_CDN_ORIGIN}/mybharat`;
var MYBHARAT_CDN_BASE_BETA = "https://cdn-beta.mybharats.in/mybharat";

// src/navigation/headerMainNav.defaults.ts
var DEFAULT_HEADER_MAIN_NAV = [
  {
    type: "link",
    label: "Youth",
    href: "https://web.mybharat.gov.in/youth-public-profile",
    linkClassName: "fontchange14 youth lang_youth",
    spanClassName: ""
  },
  {
    type: "link",
    label: "Quiz & Essay",
    href: "/quiz",
    linkClassName: "fontchange14",
    spanClassName: ""
  },
  {
    type: "group",
    label: "Voices",
    children: [
      {
        type: "link",
        label: "Blogs",
        href: "/voices/blogs",
        linkClassName: "events fontchange14",
        spanClassName: "lang_event"
      },
      {
        type: "link",
        label: "Newsletters",
        href: "/pages/newsletter",
        linkClassName: "mission_yuva fontchange14",
        spanClassName: "lang_exp_lrn01"
      }
    ]
  },
  {
    type: "group",
    label: "Events & Program",
    children: [
      {
        type: "link",
        label: "Experiential Learning",
        href: "/pages/experiential_learning?mode=I",
        linkClassName: "mission_yuva fontchange14",
        spanClassName: "lang_exp_lrn01"
      },
      {
        type: "link",
        label: "Volunteer for Bharat",
        href: "/pages/events",
        linkClassName: "events fontchange14",
        spanClassName: "lang_event"
      },
      {
        type: "link",
        label: "Mega Events",
        href: "/mega_events",
        linkClassName: "mega_event fontchange14",
        spanClassName: "lang_mega_event"
      },
      {
        type: "link",
        label: "VBYLD-2026",
        href: "/pages/vbyld_2026",
        linkClassName: "mega_event fontchange14",
        spanClassName: "lang_mega_event"
      }
    ]
  },
  {
    type: "link",
    label: " MY Bharat Podcast",
    href: "/pages/podcasts",
    linkClassName: "mega_event fontchange14",
    spanClassName: "lang_mega_event"
  },
  {
    type: "link",
    label: "BRICS India 2026",
    href: "/pages/brics_2026",
    linkClassName: "mega_event fontchange14",
    spanClassName: "lang_mega_event"
  }
];

// src/components/DesktopMainNav.tsx
var import_react = __toESM(require("react"));

// src/navigation/navHref.ts
function isSafeNavHref(href) {
  const h = href.trim();
  if (!h) return false;
  if (/^\s*(javascript:|data:|vbscript:)/i.test(h)) return false;
  if (/^https?:\/\//i.test(h)) return true;
  if (h.startsWith("mailto:") || h.startsWith("tel:")) return true;
  if (h.startsWith("/")) return !h.startsWith("//");
  return false;
}

// src/navigation/navLinkAttrs.ts
function warnInvalid(href, context) {
  if (typeof console !== "undefined" && console.warn) {
    console.warn(`[${context}] invalid href:`, href);
  }
}
function getNavLinkAttrs(item, context = "Nav") {
  const ok = isSafeNavHref(item.href);
  const href = ok ? item.href : "#";
  if (!ok) warnInvalid(item.href, context);
  const external = item.external ?? /^https?:\/\//i.test(href);
  return { href, external };
}

// src/navigation/navTree.ts
function isPlainRecord(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function normalizeLink(raw) {
  const href = typeof raw.href === "string" ? raw.href.trim() : "";
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  if (!href && !label) return null;
  const link = {
    type: "link",
    label,
    href: href || "#"
  };
  if (typeof raw.linkClassName === "string") link.linkClassName = raw.linkClassName;
  if (typeof raw.spanClassName === "string") link.spanClassName = raw.spanClassName;
  if (typeof raw.external === "boolean") link.external = raw.external;
  return link;
}
function normalizeGroup(raw, depth, maxDepth) {
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  const rawChildren = raw.children;
  const arr = Array.isArray(rawChildren) ? rawChildren : [];
  const children = normalizeNavTreeInner(arr, depth + 1, maxDepth);
  if (children.length === 0) return null;
  return {
    type: "group",
    label: label || "More",
    children
  };
}
function navNodeType(raw) {
  const t = raw.type;
  if (typeof t === "string") return t.trim().toLowerCase();
  return null;
}
function unwrapRootNavArray(data) {
  if (Array.isArray(data)) return data;
  if (!isPlainRecord(data)) return [];
  const keys = ["items", "children", "mainNavItems", "nav", "navigation", "data"];
  for (const k of keys) {
    const v = data[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}
function normalizeNavTreeInner(items, depth, maxDepth) {
  if (depth > maxDepth) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[normalizeNavTree] maxDepth exceeded; deeper nodes dropped.");
    }
    return [];
  }
  const list = depth === 0 ? unwrapRootNavArray(items) : Array.isArray(items) ? items : [];
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const raw of list) {
    if (!isPlainRecord(raw)) continue;
    const t = navNodeType(raw);
    if (t === "link") {
      const link = normalizeLink(raw);
      if (link) out.push(link);
      continue;
    }
    if (t === "group") {
      const group = normalizeGroup(raw, depth, maxDepth);
      if (group) out.push(group);
      continue;
    }
  }
  return out;
}
function normalizeNavTree(items, options) {
  const maxDepth = options?.maxDepth ?? 32;
  return normalizeNavTreeInner(items, 0, maxDepth);
}
function isNavLinkItem(item) {
  return item.type === "link";
}
function isNavGroupItem(item) {
  return item.type === "group";
}

// src/navigation/navTreeKeys.ts
function navTreeItemKey(item, segments) {
  const prefix = segments.join("_");
  if (!isNavGroupItem(item)) {
    return `${prefix}|L|${item.label}|${item.href}`;
  }
  return `${prefix}|G|${item.label}|${item.children.length}`;
}

// src/components/DesktopMainNav.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function NavLinkLi({ item }) {
  const { href, external } = getNavLinkAttrs(item, "DesktopMainNav");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "a",
    {
      className: item.linkClassName ?? "fontchange14",
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: item.spanClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.spanClassName, children: item.label }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
    }
  ) });
}
function NavLinkInline({ item }) {
  const { href, external } = getNavLinkAttrs(item, "DesktopMainNav");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "a",
    {
      className: item.linkClassName ?? "fontchange14",
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: item.spanClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.spanClassName, children: item.label }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
    }
  );
}
function NavDropdownChild({
  item,
  segments,
  nestedOpenKey,
  setNestedOpenKey
}) {
  const myKey = navTreeItemKey(item, segments);
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinkInline, { item });
  }
  const isOpen = nestedOpenKey === myKey;
  const handleClick = (e) => {
    e.preventDefault();
    setNestedOpenKey(isOpen ? null : myKey);
  };
  const handleMouseLeave = import_react.default.useCallback(() => {
    if (isOpen) {
      setNestedOpenKey(null);
    }
  }, [isOpen, setNestedOpenKey]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `dropdown_evnt_prog ${isOpen ? "active" : ""}`, onMouseLeave: handleMouseLeave, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dropevent", onClick: handleClick, children: [
      item.label,
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dropevent_content", role: "menu", style: { display: isOpen ? "block" : "none" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-caret-up", "aria-hidden": "true" }),
      item.children.map((child, i) => {
        const childSegments = [...segments, i];
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          NavDropdownChild,
          {
            item: child,
            segments: childSegments,
            nestedOpenKey,
            setNestedOpenKey
          },
          navTreeItemKey(child, childSegments)
        );
      })
    ] })
  ] });
}
function DropdownLi({
  item,
  segments,
  openTopKey,
  setOpenTopKey,
  topMenuKey
}) {
  const [nestedOpenKey, setNestedOpenKey] = import_react.default.useState(null);
  const isOpenTop = openTopKey === topMenuKey;
  import_react.default.useEffect(() => {
    if (!isOpenTop) {
      setNestedOpenKey(null);
    }
  }, [isOpenTop]);
  const handleClick = (e) => {
    e.preventDefault();
    setOpenTopKey(isOpenTop ? null : topMenuKey);
  };
  const handleMouseLeave = import_react.default.useCallback(() => {
    if (isOpenTop) {
      setOpenTopKey(null);
    }
  }, [isOpenTop, setOpenTopKey]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { role: "presentation", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `dropdown_evnt_prog ${isOpenTop ? "active" : ""}`, onMouseLeave: handleMouseLeave, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dropevent", onClick: handleClick, children: [
      item.label,
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dropevent_content", role: "menu", style: { display: isOpenTop ? "block" : "none" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-caret-up", "aria-hidden": "true" }),
      item.children.map((child, i) => {
        const childSegments = [...segments, i];
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          NavDropdownChild,
          {
            item: child,
            segments: childSegments,
            nestedOpenKey,
            setNestedOpenKey
          },
          navTreeItemKey(child, childSegments)
        );
      })
    ] })
  ] }) });
}
function TopItem({
  item,
  segments,
  openTopKey,
  setOpenTopKey
}) {
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinkLi, { item });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    DropdownLi,
    {
      item,
      segments,
      openTopKey,
      setOpenTopKey,
      topMenuKey: navTreeItemKey(item, segments)
    }
  );
}
var DesktopMainNav = ({ items }) => {
  const tree = import_react.default.useMemo(() => normalizeNavTree(items), [items]);
  const [openTopKey, setOpenTopKey] = import_react.default.useState(null);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "menu_nav1", children: tree.map((item, index) => {
    const segments = [index];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      TopItem,
      {
        item,
        segments,
        openTopKey,
        setOpenTopKey
      },
      navTreeItemKey(item, segments)
    );
  }) });
};

// src/components/header/HeaderBrandLogos.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function HeaderBrandLogos({ cdn, layout }) {
  const yas = `${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`;
  const mb = `${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`;
  if (layout === "mobile") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "d-flex new_head align-items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: yas, className: "new_head1 logo-w-sm-md1", alt: "" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "d-inline-flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: mb, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }) })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "d-flex new_head", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: yas, className: "new_head1 logo-w-sm-md1", alt: "" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { display: "inline-flex" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: mb, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }) })
  ] });
}

// src/components/header/HeaderGovernmentStrip.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function HeaderGovernmentStrip({ cdn }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "header-top d-none d-sm-block ", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-xl-3 col-lg-3 d-flex col-sm-4 col-6 align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("a", { href: "https://www.india.gov.in/", target: "_blank", rel: "noreferrer", className: "goi", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: `${cdn}/assets/img/mybharat/Flag%20of%20India.png`, className: "cursor", alt: "" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { className: "gov_india", children: "Government of India" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-xl-9 col-lg-9 col-sm-8 col-6 text-end", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: " d-none d-md-inline", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { role: "button", id: "decreasetext", className: "font01", children: "-A" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { role: "button", id: "resettext", className: "font01 active01", children: "A" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { role: "button", id: "increasetext", className: "font01", children: "A+" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: "tel:18002122729", title: "Toll Free", className: "skip01", children: "Toll Free : 14472 Or 18002122729" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: "/pages/support", className: "skip01", children: "support.mybharat.gov.in" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: "bhashini-desktop-header" })
    ] }) })
  ] }) }) });
}

// src/components/header/HeaderMobileStrip.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var stripClasses = {
  split: {
    bar: "mb-common-header__mobile-bar mb-common-header__mobile-bar--split",
    row: "mb-common-header__mobile-row mb-common-header__mobile-row--split d-flex align-items-center flex-nowrap w-100 py-2",
    logos: "mb-common-header__mobile-logos mb-common-header__mobile-logos--split min-w-0 d-flex align-items-center",
    actions: "mb-common-header__mobile-actions--split f-hd-right d-sm-none1 d-flex flex-nowrap align-items-center justify-content-end flex-shrink-0 min-w-0",
    mid: "mb-common-header__mobile-mid--split d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0",
    tollLink: "skip01",
    bhashini: "mb-common-header__bhashini-mid--split",
    end: "mb-common-header__mobile-end--split d-flex align-items-center justify-content-end flex-shrink-0 min-w-0",
    menuBtn: "btn btn-light"
  },
  h2: {
    bar: "mb-common-header__mobile-bar--h2",
    row: "mb-common-header__mobile-row mb-common-header__mobile-row--h2 d-flex align-items-center flex-nowrap w-100 py-2",
    logos: "mb-common-header__mobile-logos mb-common-header__mobile-logos--h2 min-w-0 d-flex align-items-center",
    mid: "mb-common-header__mobile-mid--h2 d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0",
    tollLink: "skip01 mb-common-header__toll-link--h2",
    bhashini: "mb-common-header__bhashini-mid--h2",
    end: "mb-common-header__mobile-end--h2 d-flex align-items-center justify-content-end flex-shrink-0 min-w-0",
    menuBtn: "btn mb-common-header__mobile-menu-btn--h2"
  }
};
function HeaderMobileStrip({ cdn, variant }) {
  const s = stripClasses[variant];
  const tollAndBhashini = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { href: "tel:18002122729", title: "Toll Free", id: "toll_mb", className: s.tollLink, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("strong", { className: "lang_toll_free", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "fa fa-phone mb-common-header__toll-phone-icon", "aria-hidden": "true" }),
      " 14472 Or 18002122729"
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { id: "bhashini-mobile-header", className: s.bhashini })
  ] });
  const menuButton = /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type: "button",
      className: s.menuBtn,
      "data-bs-toggle": "modal",
      id: "mb_menus",
      "data-bs-target": "#mobileMenuNew",
      "aria-label": "Open menu",
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" })
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `col-12 d-lg-none ${s.bar}`, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: s.row, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: s.logos, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(HeaderBrandLogos, { cdn, layout: "mobile" }) }),
    variant === "split" && s.actions ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: s.actions, children: [
      tollAndBhashini,
      menuButton
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: s.mid, children: tollAndBhashini }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: s.end, children: menuButton })
    ] })
  ] }) });
}

// src/components/header/useMbHeaderBootstrapAndPortal.ts
var import_react2 = require("react");
function useMbHeaderBootstrapAndPortal(cdn) {
  const [menuPortalReady, setMenuPortalReady] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    setMenuPortalReady(true);
    const appendStylesheet = (id, href) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };
    const appendScript = (id, src) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };
    appendStylesheet("mb-bootstrap-css", `${cdn}/assets/css/bootstrap.min.css`);
    appendStylesheet("mb-bootstrap-icons-css", `${cdn}/assets/css/bootstrap-icons.css`);
    appendStylesheet("mb-fontawesome-css", "https://img1.digitallocker.gov.in/nad/v-22/assets/css/fontawesome.min.css");
    appendScript("mb-popper-js", `${cdn}/assets/js/popper.min.js`);
    appendScript("mb-bootstrap-js", `${cdn}/assets/js/bootstrap.min.js`);
    appendScript(
      "mb-bootstrap-datepicker-js",
      `${cdn}/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js`
    );
  }, [cdn]);
  return menuPortalReady;
}

// src/components/MobileMenuModal.tsx
var import_react3 = __toESM(require("react"));
var import_jsx_runtime5 = require("react/jsx-runtime");
function collapseDomId(path) {
  return `mb-mnav-${path.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}
function MobileNavLinkRow({ item }) {
  const { href, external } = getNavLinkAttrs(item, "MobileMenuModal");
  const aClass = ["fontchange14", "text-decoration-none", "text-reset", item.linkClassName].filter(Boolean).join(" ");
  const spanClass = ["d-block", "py-2", item.spanClassName].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "a",
    {
      href,
      className: aClass,
      "data-bs-dismiss": "modal",
      style: { marginLeft: 0 },
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: spanClass, style: { marginLeft: 0 }, children: item.label })
    }
  );
}
function MobileNavNode({ item, segments }) {
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MobileNavLinkRow, { item }) });
  }
  const path = navTreeItemKey(item, segments);
  const collapseId = collapseDomId(path);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { className: "border-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "button",
      {
        type: "button",
        className: "w-100 text-start border-0 bg-transparent fontchange14 text-reset py-2 px-0 d-flex align-items-center justify-content-between",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${collapseId}`,
        "aria-expanded": "false",
        "aria-controls": collapseId,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: item.label }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { className: "fa fa-chevron-down small", "aria-hidden": "true" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { id: collapseId, className: "collapse", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "list-unstyled mb-0 ps-3 pb-1 border-start ms-1", children: item.children.map((child, j) => {
      const childSegments = [...segments, j];
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MobileNavNode, { item: child, segments: childSegments }, navTreeItemKey(child, childSegments));
    }) }) })
  ] });
}
var MobileMenuModal = ({ cdnBase, items }) => {
  const tree = import_react3.default.useMemo(() => normalizeNavTree(items), [items]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      className: "modal left fade",
      id: "mobileMenuNew",
      tabIndex: -1,
      "aria-labelledby": "mobileMenuNewLabel",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "modal-dialog", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-content", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-header align-items-center border-0 pb-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h5", { className: "modal-title flex-grow-1 mb-0", id: "mobileMenuNewLabel", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "logo", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("a", { href: "/", "data-bs-dismiss": "modal", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "img",
            {
              src: `${cdnBase}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`,
              className: "logo-w-sm-md-sec",
              alt: "MY Bharat"
            }
          ) }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-body pt-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "m-menu", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "list-unstyled mb-0", children: tree.map((item, i) => {
            const segments = [i];
            return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MobileNavNode, { item, segments }, navTreeItemKey(item, segments));
          }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "m-menu border-top mt-2 pt-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("ul", { className: "list-unstyled mb-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "a",
              {
                className: "mbv_yuva_drop border-bottom text-decoration-none text-reset d-block",
                href: "#",
                id: "signInLink",
                style: { borderBottom: "1px solid #D7D7D7" },
                onClick: (e) => e.preventDefault(),
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lang_yuva_register_login_link d-block py-2", style: { marginLeft: 0 }, children: "Sign In" })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "a",
              {
                className: "mbv_yuva_drop border-bottom text-decoration-none text-reset d-block",
                href: "/yuva_register",
                "data-bs-dismiss": "modal",
                style: { borderBottom: "1px solid #D7D7D7" },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lang_register d-block py-2", style: { marginLeft: 0 }, children: "Register Now" })
              }
            ) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "accordion mt-2", id: "accordionExamples", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "accordion-item border-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "accordion-header", id: "headingTwos", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                className: "accordion-button collapsed",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#collapseTwos",
                "aria-expanded": "false",
                "aria-controls": "collapseTwos",
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lang_register", children: "Get Started" })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "div",
              {
                id: "collapseTwos",
                className: "accordion-collapse collapse",
                "aria-labelledby": "headingTwos",
                "data-bs-parent": "#accordionExamples",
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "accordion-body", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                    "a",
                    {
                      className: "mbv_yuva_drop border-bottom text-decoration-none d-block py-2",
                      href: "/yuva_register",
                      "data-bs-dismiss": "modal",
                      style: { borderBottom: "1px solid #D7D7D7" },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lang_yuva", children: "Youth" }),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "f-10-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                    "a",
                    {
                      className: "mbv_partner text-decoration-none d-block py-2",
                      href: "/partner_register",
                      "data-bs-dismiss": "modal",
                      style: { borderBottom: "1px solid #D7D7D7", padding: "8px 1px 3px 1px" },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lang_partner", children: "Partner" }),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "f-10-dropdown lang_BYCN", children: "Knowledge Institution/ Businesses/Government/NGOs/Youth Club/Academia/" }),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "f-10-dropdown lang_dyo_nss_register", children: "DYOs/NSS Program Officers/Placement Officers" })
                      ]
                    }
                  )
                ] })
              }
            )
          ] }) })
        ] })
      ] }) })
    }
  );
};

// src/components/Header.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Header = ({ title = "MyBharat", cdnBase, mainNavItems }) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE).replace(/\/$/, "");
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER_MAIN_NAV;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { id: "mb-common-header-root", className: "fixed-top shadow mb-common-header", "aria-label": title, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "bhashini-plugin-container" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(HeaderGovernmentStrip, { cdn }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "row align-items-center gx-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(HeaderMobileStrip, { cdn, variant: "split" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("nav", { className: "d-none", id: "mb-nav-mobile-quick", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(HeaderBrandLogos, { cdn, layout: "desktop" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "col-xl-10 col-lg-10 d-none d-lg-block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "main-menu f-hd-right d-none d-md-block", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("nav", { className: "navbar navbar-expand-lg navbar-light", id: "mb-nav-desktop-main", "aria-label": "Main navigation", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(DesktopMainNav, { items: navItems }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { id: "btnGroupDrop1", type: "button", className: "btn mb-common-header__auth-btn", children: "Sign In" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("a", { href: "/yuva_register", className: "mb-common-header__register-link text-decoration-none", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { id: "btnGroupDrop2", type: "button", className: "btn mb-common-header__auth-btn", children: "Register Now" }) }),
            "\xA0\xA0",
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "btn-group", role: "group", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "dropdown-menu dropdown-menu-header", "aria-labelledby": "btnGroupDrop1", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("a", { className: "dropdown-item border-bottom", href: "/yuva_register", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", { src: `${cdn}/assets/img/yuva_landing/youth_icon1.png`, alt: "" }),
              " ",
              "Youth",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("br", {}),
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "f-12-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
            ] }) }) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "f-hd-right d-sm-none1 mt-10", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "btn btn-light", "data-bs-toggle": "modal", "data-bs-target": "#mobileMenuNew", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" }) }) })
        ] })
      ] }) }) })
    ] }),
    menuPortalReady ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)(MobileMenuModal, { cdnBase: cdn, items: navItems }), document.body) : null
  ] });
};
var Header_default = Header;

// src/components/Header2.tsx
var import_react_dom2 = require("react-dom");

// src/navigation/header2MainNav.defaults.ts
var DEFAULT_HEADER2_MAIN_NAV = [
  {
    type: "group",
    label: "MYBHARAT Diaspora",
    children: [
      {
        type: "link",
        label: "Friends of MY Bharat",
        href: "/pages/mb_friends",
        linkClassName: "mission_yuva fontchange14",
        spanClassName: "lang_exp_lrn01"
      },
      {
        type: "link",
        label: "International Youth Club",
        href: "/connect-international-youth-club",
        linkClassName: "events fontchange14",
        spanClassName: "lang_event"
      }
    ]
  },
  {
    type: "group",
    label: "Resources",
    children: [
      {
        type: "group",
        label: "Voices",
        children: [
          {
            type: "link",
            label: "Blogs",
            href: "/voices/blogs",
            linkClassName: "mission_yuva fontchange14",
            spanClassName: "lang_exp_lrn01"
          },
          {
            type: "link",
            label: "Newsletters",
            href: "/pages/newsletter",
            linkClassName: "events fontchange14",
            spanClassName: "lang_event"
          }
        ]
      },
      {
        type: "link",
        label: "Other Resources",
        href: "/resources-list",
        linkClassName: "events fontchange14",
        spanClassName: "lang_event"
      }
    ]
  },
  {
    type: "link",
    label: "Youth",
    href: "https://web-beta.mybharats.in/youth-public-profile",
    linkClassName: "fontchange14 youth lang_youth",
    spanClassName: ""
  },
  {
    type: "link",
    label: "Quiz & Essay",
    href: "/quiz",
    linkClassName: "fontchange14",
    spanClassName: ""
  },
  {
    type: "group",
    label: "Events & Program",
    children: [
      {
        type: "link",
        label: "Experiential Learning",
        href: "/elp/listing",
        linkClassName: "mission_yuva fontchange14",
        spanClassName: "lang_exp_lrn01"
      },
      {
        type: "link",
        label: "Volunteer for Bharat",
        href: "/pages/events",
        linkClassName: "events fontchange14",
        spanClassName: "lang_event"
      },
      {
        type: "link",
        label: "Mega Events",
        href: "/mega_events",
        linkClassName: "mega_event fontchange14",
        spanClassName: "lang_mega_event"
      },
      {
        type: "link",
        label: "VBYLD-2026",
        href: "/pages/vbyld_2026",
        linkClassName: "mega_event fontchange14",
        spanClassName: "lang_mega_event"
      }
    ]
  },
  {
    type: "link",
    label: " MY Bharat Podcast",
    href: "/pages/podcasts",
    linkClassName: "mega_event fontchange14",
    spanClassName: "lang_mega_event"
  },
  {
    type: "link",
    label: "BRICS India 2026",
    href: "/pages/brics_2026",
    linkClassName: "mega_event fontchange14",
    spanClassName: "lang_mega_event"
  },
  {
    type: "link",
    label: "Mentorship",
    href: "/mentorship",
    linkClassName: "mega_event fontchange14",
    spanClassName: "lang_mega_event"
  },
  {
    type: "link",
    label: "Dice Roll Game",
    href: "/game/yuva",
    linkClassName: "mega_event fontchange14",
    spanClassName: "lang_mega_event"
  }
];

// src/components/Header2.css
styleInject(".main-menu ul li {\n  display: inline-block;\n  margin: 0 3px;\n  position: relative;\n  list-style: none;\n}\n.main-menu ul li a {\n  color: #000000;\n  display: list-item;\n  list-style: none;\n  line-height: 1;\n  padding: 6px 4px !important;\n  font-size: 13px;\n  font-weight: 600 !important;\n  position: relative;\n  transition: all 0.3s ease-in-out;\n}\n.dropevent i.fa-chevron-down {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition: transform 0.3s ease-in-out;\n  margin-left: 4px;\n}\n.dropdown_evnt_prog.active > .dropevent_content {\n  display: block !important;\n}\n.dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent_content {\n  display: block !important;\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n.header-area {\n  background-size: cover;\n}\n@media (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .header-area.mb-common-header__header-area {\n    padding-top: 0.45rem !important;\n    padding-bottom: 0.45rem !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 {\n  position: relative;\n  z-index: 2;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-row--h2 {\n  align-items: center !important;\n  gap: 0.75rem;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-logos--h2 {\n  flex: 0 1 auto;\n  justify-content: flex-start;\n  align-items: center;\n  align-self: center;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-actions-wrap.f-hd-right.d-sm-none1 {\n  flex: 0 0 auto;\n  float: none !important;\n  justify-content: flex-end;\n  align-items: center !important;\n  gap: 0.5rem;\n  margin-top: 0 !important;\n}\n.mb-common-header__mobile-bar--h2 #toll_mb.skip01 {\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex: 0 1 auto;\n  min-width: 0;\n  color: rgb(13 110 253);\n  text-decoration: none;\n  line-height: 1;\n}\n.mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n  font-size: clamp(11px, 3vw, 14px);\n  font-weight: 700;\n  line-height: 1.15;\n  color: rgb(13 110 253);\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n  display: inline-block;\n  font-size: 0.95em;\n  line-height: 0;\n  vertical-align: middle;\n  transform: rotate(180deg);\n  transform-origin: 50% 58%;\n}\n.mb-common-header__mobile-bar--h2 #mb_menus {\n  position: static !important;\n  right: auto !important;\n  top: auto !important;\n}\n.mb-common-header__mobile-bar--h2 #mb_menus.btn-light {\n  flex: 0 0 auto;\n  border: 1px solid #dee2e6;\n}\n.mb-common-header__mobile-bar--h2 #bhashini-mobile-header {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 auto;\n  min-width: 0;\n  min-height: 0;\n}\n@media (max-width: 991.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    display: grid !important;\n    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n    gap: 0.35rem 0.5rem;\n    align-items: center;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-logos--h2 {\n    min-width: 0;\n    justify-self: start;\n    align-items: center;\n    padding-right: clamp(4px, 1.5vw, 12px);\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-mid--h2 {\n    justify-self: center;\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: center;\n    gap: 0.25rem;\n    min-width: 0;\n    max-width: min(260px, 38vw);\n    padding-left: 0;\n    position: relative;\n    z-index: 2;\n    background-color: #ffffff;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-mid--h2 #toll_mb .lang_toll_free {\n    justify-content: center;\n  }\n  header.mb-common-header--header2 .mb-common-header__bhashini-mid--h2 {\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-end--h2 {\n    min-width: 0;\n    justify-self: end;\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.5rem;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    padding-top: 0.3rem !important;\n    padding-bottom: 0.3rem !important;\n  }\n}\n@media (max-width: 575.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    gap: 0.2rem 0.35rem;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-mid--h2 {\n    max-width: min(190px, 54vw);\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n    font-size: clamp(9px, 2.65vw, 11px);\n    font-weight: 600;\n    gap: 0.2em;\n    letter-spacing: -0.02em;\n    line-height: 1.1;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.88em;\n  }\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 {\n  width: 44px;\n  height: 44px;\n  padding: 0 !important;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  background-color: #bc4717 !important;\n  border: none !important;\n  color: #ffffff !important;\n  border-radius: 10px !important;\n  box-shadow: none !important;\n  line-height: 1 !important;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2:hover {\n  background-color: #9a3a13 !important;\n  color: #ffffff !important;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2:focus-visible {\n  background-color: #9a3a13 !important;\n  color: #ffffff !important;\n  outline: 2px solid rgb(13 110 253);\n  outline-offset: 2px;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 .fa {\n  color: #ffffff;\n  font-size: 1.15rem;\n}\n@media (max-width: 575.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 {\n    width: 40px !important;\n    height: 40px !important;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 .fa {\n    font-size: 1.05rem;\n  }\n}\nheader.mb-common-header--header2.mb-common-header .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n  border: none !important;\n}\n.new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n}\n.new_head1 {\n  border-right: 1px solid #bdbdbd;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__register-link {\n  display: inline-block;\n  vertical-align: middle;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn {\n  --bs-btn-bg: #bc4717;\n  --bs-btn-border-color: #bc4717;\n  color: #ffffff !important;\n  background-color: #bc4717 !important;\n  border: none !important;\n  border-radius: 9999px !important;\n  padding: 10px 22px !important;\n  font-weight: 600 !important;\n  line-height: 1.25 !important;\n  box-shadow: none !important;\n  min-height: 42px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn:focus-visible,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn:focus-visible {\n  color: #bc4717 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #bc4717 !important;\n  box-shadow: none !important;\n}\nheader#mb-common-header-root.mb-common-header .logo-w-sm-md-sec {\n  width: 136px !important;\n  transform: scale(1.12);\n  margin-left: 7px;\n  margin-top: 5px;\n}\nheader#mb-common-header-root.mb-common-header .logo-w-sm-md1 {\n  width: 124px !important;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md1,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n  flex-shrink: 1;\n  min-width: 0;\n  object-fit: contain;\n  height: auto !important;\n  max-width: 99px !important;\n}\n#mobileMenuNew img.logo-w-sm-md-sec {\n  width: 136px !important;\n  transform: scale(1.12);\n}\n#mobileMenuNew img.logo-w-sm-md1 {\n  width: 124px !important;\n  max-width: none !important;\n  height: auto !important;\n}\n@media only screen and (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md1 {\n    width: clamp(118px, 32vw, 148px) !important;\n  }\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md-sec {\n    width: clamp(126px, 34vw, 156px) !important;\n    transform: scale(1.08) !important;\n  }\n  #mobileMenuNew img.logo-w-sm-md1 {\n    width: clamp(118px, 32vw, 148px) !important;\n  }\n  #mobileMenuNew img.logo-w-sm-md-sec {\n    width: clamp(126px, 34vw, 156px) !important;\n    transform: scale(1.08) !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .logo-w-sm-md1 {\n    width: clamp(72px, 20vw, 142px) !important;\n    max-width: none !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .logo-w-sm-md-sec {\n    width: clamp(76px, 21vw, 150px) !important;\n    transform: scale(1.08) !important;\n    max-width: none !important;\n  }\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.new_head1.logo-w-sm-md1 {\n    width: 66px !important;\n    min-width: 66px !important;\n    max-width: 66px !important;\n    height: auto !important;\n    transform: none !important;\n    flex-shrink: 0 !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n    width: 74px !important;\n    min-width: 74px !important;\n    max-width: 74px !important;\n    height: auto !important;\n    transform: none !important;\n    margin-left: 2px !important;\n    margin-top: 0 !important;\n    flex-shrink: 0 !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .logo-w-sm-md1 {\n    width: clamp(52px, 14vw, 96px) !important;\n    max-width: none !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .logo-w-sm-md-sec {\n    width: clamp(56px, 15vw, 104px) !important;\n    transform: scale(1.06) !important;\n    max-width: none !important;\n  }\n}\n.f-12-dropdown {\n  padding-left: 24px;\n  color: #000000;\n  font-weight: 400;\n  font-size: 12px;\n}\n.dropdown-menu-header {\n  background: #ffffff;\n  border: 1px solid #f15b43;\n  border-radius: 10px;\n}\n.dropdown-menu-header a {\n  padding-top: 4px;\n  padding-bottom: 10px;\n}\n.dropdown_evnt_prog {\n  position: relative;\n  display: inline-block;\n}\n.dropevent {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  border: none;\n}\n.dropevent_content {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  min-width: 180px;\n  z-index: 1;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  left: -25px;\n}\n.dropevent_content > .fa.fa-caret-up {\n  position: absolute;\n  top: -10px;\n  left: 43%;\n  color: #bc4717;\n}\n.dropevent_content a {\n  color: black;\n  border-bottom: 1px solid #dcdcdc;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n}\n.dropevent_content a:hover {\n  background-color: #fff;\n}\n.dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.dropevent_content .dropdown_evnt_prog {\n  display: block;\n  width: 100%;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent {\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid #dcdcdc;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent_content {\n  left: 100%;\n  top: 0;\n  margin-left: 2px;\n  z-index: 2;\n}\n.dropevent_content .dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.pull-right {\n  margin-left: 30px;\n}\n.header_img {\n  text-align: center;\n  top: 0 !important;\n}\n.user-info-wrapper {\n  display: block;\n  margin: 0;\n  width: 46px;\n  height: 46px;\n  background: #6c757d8a;\n  border-radius: 50px;\n  padding: 3px;\n  float: left;\n}\n.user-info-wrapper .profile-wrapper {\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  display: inline-block;\n}\n.chat-toggler .user-details {\n  float: left;\n  line-height: 0;\n  color: #003d52;\n}\n.chat-toggler .dropdown-menu {\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.5);\n}\n.chat-toggler .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.chat-toggler .dropdown-menu[data-bs-popper] {\n  top: 92%;\n}\n.chat-toggler .dropdown-menu li {\n  display: block !important;\n}\n.chat-toggler .dropdown-menu li a i {\n  font-size: 12px;\n}\n.chat-toggler .dropdown-menu > li > a {\n  line-height: 25px !important;\n  color: #003d52 !important;\n  margin: 4px;\n  border-radius: 3px;\n  text-align: left;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  padding: 3px 20px !important;\n}\n.chat-toggler .dropdown-menu > li > a:hover {\n  text-decoration: none;\n  background-color: #eff2f3;\n  background-image: none;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  list-style: none;\n  text-shadow: none;\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.2);\n  border: none;\n  border-radius: 3px;\n  padding: 0;\n  font-size: 13px;\n}\n@media only screen and (max-width: 600px) {\n  .header-area {\n    min-height: 56px;\n  }\n}\n@media only screen and (max-width: 1000px) {\n  .header-top,\n  .main-menu {\n    display: none !important;\n  }\n  header.mb-common-header .d-sm-none1 {\n    display: block !important;\n  }\n  .header-area .justify-content-sm-end {\n    justify-content: flex-start !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  .header-area {\n    min-height: 56px;\n  }\n  .bhashini-plugin-container {\n    position: absolute;\n    right: -35px;\n    top: 15px;\n  }\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  .bhashini-plugin-container svg path {\n    fill: #000000 !important;\n  }\n}\n@media (min-width: 1001px) {\n  header.mb-common-header .d-sm-none1 {\n    display: none !important;\n  }\n}\n#mobileMenuNew.modal.left {\n  z-index: 1060 !important;\n}\n#mobileMenuNew.modal.left .modal-dialog {\n  position: fixed;\n  margin: auto;\n  width: 75%;\n  max-width: 420px;\n  height: 100%;\n  transform: translate3d(0%, 0, 0);\n  right: 0;\n  left: auto;\n}\n#mobileMenuNew.modal.left .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n#mobileMenuNew .modal-header .btn-close {\n  margin: -1rem -5px -0.5rem auto;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li:not(:last-child) {\n  border-bottom: 1px solid #d7d7d7;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li > a {\n  display: block;\n  color: #333333 !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li > a > span {\n  display: block;\n  padding-top: 9px !important;\n  padding-bottom: 9px !important;\n  font-size: 13px !important;\n  font-weight: 700 !important;\n  line-height: 1.2;\n  color: #333333 !important;\n  text-decoration: none !important;\n  text-underline-offset: 2px;\n  text-decoration-thickness: 1px;\n}\n#mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li > a {\n  display: block;\n  color: #333333 !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li > a > span {\n  display: block;\n  padding-top: 8px !important;\n  padding-bottom: 8px !important;\n  font-size: 13px !important;\n  font-weight: 500 !important;\n  line-height: 1.2;\n  color: #333333 !important;\n  text-decoration: none !important;\n  text-underline-offset: 2px;\n  text-decoration-thickness: 1px;\n}\n#mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li:last-child > a,\n#mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li:last-child > a > span {\n  color: #f15f22 !important;\n}\n.f-10-dropdown {\n  font-size: 10px;\n  color: #999999;\n}\n@media only screen and (max-width: 600px) {\n  #mobileMenuNew .modal-content {\n    transform: translate(100%, 0) scale(1);\n    transition: transform 0.4s ease-in-out;\n  }\n  #mobileMenuNew.modal.show .modal-content {\n    transform: translate(0, 0) scale(1);\n  }\n  #mobileMenuNew .accordion-button:not(.collapsed) {\n    background-color: #f15b43;\n    color: #fff;\n  }\n  #mobileMenuNew .accordion-button::after {\n    transform: rotate(0deg);\n    transition: transform 0.3s ease-in-out;\n  }\n  #mobileMenuNew .accordion-button:not(.collapsed)::after {\n    transform: rotate(-90deg);\n    transition: transform 0.3s ease-in-out;\n  }\n}\n#mobileMenuNew [data-bs-toggle=collapse] i.fa-chevron-down {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition: transform 0.3s ease-in-out;\n}\n#mobileMenuNew [data-bs-toggle=collapse][aria-expanded=true] i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb.skip01.mb-common-header__toll-link--h2 {\n    text-decoration: none !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    grid-template-columns: auto minmax(0, 1fr) auto !important;\n    column-gap: 5px !important;\n    padding-left: 10px !important;\n    padding-right: 6px !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-logos--h2 {\n    flex: 0 0 auto !important;\n    min-width: max-content !important;\n    padding-right: 4px !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-mid--h2 {\n    max-width: 142px !important;\n    gap: 0.12rem !important;\n    justify-self: end !important;\n    overflow: visible !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb.skip01.mb-common-header__toll-link--h2 {\n    white-space: nowrap !important;\n    min-width: 0 !important;\n    max-width: 104px !important;\n    overflow: visible !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n    font-size: 9.7px !important;\n    font-weight: 700 !important;\n    line-height: 1.1 !important;\n    letter-spacing: 0 !important;\n    gap: 0.2em !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.82em !important;\n    margin-right: 0.1em !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__bhashini-mid--h2,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #bhashini-mobile-header {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 auto !important;\n    min-width: 16px !important;\n    margin-left: 2px !important;\n    margin-right: 2px !important;\n    overflow: visible !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #bhashini-mobile-header .mb-common-header__bhashini-fallback {\n    display: inline-flex !important;\n    flex-direction: column !important;\n    align-items: center !important;\n    justify-content: center !important;\n    color: #111111 !important;\n    font-size: 12px !important;\n    font-weight: 400 !important;\n    line-height: 0.78 !important;\n    letter-spacing: 0 !important;\n    min-width: 12px !important;\n    padding-left: 10px !important;\n    transform: translateY(1px);\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #bhashini-mobile-header .mb-common-header__bhashini-fallback span {\n    display: block;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-end--h2 {\n    flex: 0 0 auto !important;\n    min-width: 40px !important;\n    justify-self: end !important;\n    margin-left: 0 !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n    width: 33px !important;\n    height: 38px !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 .fa {\n    font-size: 0.98rem !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.new_head1.logo-w-sm-md1 {\n    width: 78px !important;\n    min-width: 78px !important;\n    max-width: 78px !important;\n    height: auto !important;\n    flex-shrink: 0 !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n    width: 105px !important;\n    min-width: 105px !important;\n    max-width: 105px !important;\n    height: auto !important;\n    transform: none !important;\n    margin-left: 1px !important;\n    margin-top: 0 !important;\n    flex-shrink: 0 !important;\n  }\n}\n");

// src/components/Header2.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Header2 = ({ title = "MyBharat", cdnBase, mainNavItems }) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE_BETA).replace(/\/$/, "");
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER2_MAIN_NAV;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "header",
      {
        id: "mb-common-header-root",
        className: "fixed-top shadow mb-common-header mb-common-header--header2",
        "aria-label": title,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "bhashini-plugin-container" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(HeaderGovernmentStrip, { cdn }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "row align-items-center gx-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(HeaderMobileStrip, { cdn, variant: "h2" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("nav", { className: "d-none", id: "mb-nav-mobile-quick", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(HeaderBrandLogos, { cdn, layout: "desktop" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "col-xl-10 col-lg-10 d-none d-lg-block", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "f-hd-right" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "main-menu f-hd-right d-none d-md-block", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("nav", { className: "navbar navbar-expand-lg navbar-light", id: "mb-nav-desktop-main", "aria-label": "Main navigation", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DesktopMainNav, { items: navItems }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { id: "btnGroupDrop1", type: "button", className: "btn mb-common-header__auth-btn", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lang_yuva_register_login_link fontchange", children: "Sign In" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: "/yuva_register", className: "mb-common-header__register-link text-decoration-none", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { id: "btnGroupDrop2", type: "button", className: "btn mb-common-header__auth-btn", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "fontchange", children: "Register Now" }) }) }),
                "\xA0\xA0",
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "btn-group", role: "group", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dropdown-menu dropdown-menu-header", "aria-labelledby": "btnGroupDrop1", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { className: "dropdown-item border-bottom", href: "/yuva_register", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("img", { src: `${cdn}/assets/img/yuva_landing/youth_icon1.png`, alt: "" }),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lang_yuva", children: "Youth" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("br", {}),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "f-12-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
                ] }) }) })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "f-hd-right d-sm-none1 mt-10", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "btn btn-light", "data-bs-toggle": "modal", "data-bs-target": "#mobileMenuNew", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" }) }) })
            ] })
          ] }) }) })
        ]
      }
    ),
    menuPortalReady ? (0, import_react_dom2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime7.jsx)(MobileMenuModal, { cdnBase: cdn, items: navItems }), document.body) : null
  ] });
};
var Header2_default = Header2;

// src/components/FooterModals.tsx
var import_react4 = require("react");
var import_react_dom3 = require("react-dom");
var import_jsx_runtime8 = require("react/jsx-runtime");
function getBootstrapModal() {
  return typeof window !== "undefined" && window.bootstrap?.Modal;
}
var FooterModals = ({
  cdnBase,
  isLoggedIn,
  recaptchaSiteKey,
  onRegisteredUserClick
}) => {
  const [portalReady, setPortalReady] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    setPortalReady(true);
    const scriptId = "mb-google-recaptcha-script";
    let created = false;
    if (!isLoggedIn && recaptchaSiteKey && !document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://www.google.com/recaptcha/api.js";
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
      created = true;
    }
    return () => {
      if (created) {
        document.getElementById(scriptId)?.remove();
      }
    };
  }, [isLoggedIn, recaptchaSiteKey]);
  const hideChoiceShowForm = () => {
    const Modal = getBootstrapModal();
    const el1 = document.getElementById("feed_back1");
    const elForm = document.getElementById("feed_back");
    if (!Modal || !el1 || !elForm) return;
    Modal.getInstance(el1)?.hide();
    window.setTimeout(() => Modal.getOrCreateInstance(elForm).show(), 200);
  };
  const hideChoiceOpenRegistered = () => {
    const Modal = getBootstrapModal();
    Modal?.getInstance(document.getElementById("feed_back1"))?.hide();
    onRegisteredUserClick?.();
    const hostModal = document.getElementById("loginWithOtpModal");
    if (hostModal && getBootstrapModal()) {
      window.setTimeout(() => getBootstrapModal().getOrCreateInstance(hostModal).show(), 200);
    }
  };
  const content = /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal fade", id: "feed_back1", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-dialog", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-content", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-body", style: { borderRadius: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "row", id: "pls_select", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "img",
        {
          src: `${cdnBase}/assets/img/yuva_landing/XCircle_n.png`,
          alt: "",
          className: "btn-close",
          "data-bs-dismiss": "modal"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "col-sm-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: "Please Select" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", id: "guest_usr", className: "btn btn-success", name: "Guest User", onClick: hideChoiceShowForm, children: "Guest User" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", id: "regi_usr", className: "btn btn-info", name: "Registered User", onClick: hideChoiceOpenRegistered, children: "Registered User" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal fade", id: "feed_back", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-dialog", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-content", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "modal-body", style: { borderRadius: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-10", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { id: "feedbackFrm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "hidden", name: "type", value: "web" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "row pb-10", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "col-sm-12", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "tt_yuvr", children: Array.from({ length: 10 }, (_, i) => {
                const n = i + 1;
                return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "radio-tile-group", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "input-container", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "radio", name: "user_rating", id: `user_rating_${n}`, value: String(n), defaultChecked: n === 10 }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "radio-tile", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "label-text-space", htmlFor: `user_rating_${n}`, children: n }) })
                ] }) }, n);
              }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "vErrormsg Ratingerr" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-group text-left", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { htmlFor: "user_feedback", children: "Write a feedback*" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("small", { id: "char_left_cnt" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "textarea",
                {
                  id: "user_feedback",
                  name: "user_feedback",
                  rows: 4,
                  cols: 50,
                  className: "form-control",
                  placeholder: "Write here (250 characters)",
                  maxLength: 250
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "vErrormsg Feedbackerr" })
            ] }) }),
            !isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "hidden", id: "feedback_captcha_name", name: "feedback_captcha_name", value: "" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-4", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  "input",
                  {
                    type: "text",
                    className: "form-control",
                    id: "user_name",
                    name: "user_name",
                    placeholder: "Name*",
                    maxLength: 100
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "vErrormsg Nameerr" })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-4", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  "input",
                  {
                    type: "text",
                    className: "form-control",
                    id: "user_mobile",
                    name: "user_mobile",
                    placeholder: "Mobile*",
                    maxLength: 10
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "vErrormsg Mobileerr" })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-4", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "email", className: "form-control", id: "user_email", name: "user_email", placeholder: "Email*", maxLength: 100 }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "vErrormsg Emailerr" })
              ] }) }),
              recaptchaSiteKey ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "g-recaptcha", "data-sitekey": recaptchaSiteKey }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "vErrormsg captchaerr" })
              ] }) : null
            ] }) : null
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "row pb-10", style: { position: "relative", height: "97%" }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "cross_ico", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: `${cdnBase}/assets/img/yuva_landing/mega_checkcircle1.png`, id: "form_cl", "data-bs-dismiss": "modal", alt: "" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("a", { id: "form_c2", href: "#", className: "d-inline-block", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: `${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`, alt: "" }) })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "col-sm-10", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { id: "feedback_alert", className: "alert", role: "alert", style: { display: "none" } }) }) })
    ] }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal fade", id: "successToaster", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-dialog", style: { width: "fit-content" }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-content", style: { border: "2px solid #0fbd5f" }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "modal-header", style: { borderBottom: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h4", { className: "modal-title", style: { color: "#0fbd5f", fontSize: 16, fontWeight: 400 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: `${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`, alt: "" }),
      " Feedback has been submitted Successfully"
    ] }) }) }) }) })
  ] });
  if (!portalReady) return null;
  return (0, import_react_dom3.createPortal)(content, document.body);
};
var FooterModals_default = FooterModals;

// src/components/Footer.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var footerIntroDefault = "MY Bharat is an initiative of Ministry of Youth Affairs & Sports to empower Indian youth through social mobility, educational equity, and practical skills.";
var dicLineDefault = "Digital India Corporation (DIC) Ministry of Electronics & IT (MeitY) Government of India";
var copyrightDefault = "\xA9 2023 - MY Bharat @ All rights reserved | Ministry of Youth Affairs and Sports, Govt. of India\xAE";
function formatLastUpdated() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}
var Footer = ({ cdnBase, isLoggedIn, recaptchaSiteKey, onRegisteredUserClick }) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE).replace(/\/$/, "");
  const feedbackModalTarget = isLoggedIn ? "#feed_back" : "#feed_back1";
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("footer", { id: "footer_external", className: "footer-area-1 mb-common-footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "footer-top py-3", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "col-lg-3 col-md-6 footer-contact pt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "d-flex flex-wrap align-items-center gap-2 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "img",
              {
                src: `${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`,
                alt: "",
                className: "img-responsive cursor",
                style: { width: 100 }
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-muted d-none d-sm-inline", "aria-hidden": "true", children: "|" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "img",
              {
                src: `${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`,
                alt: "MY Bharat",
                className: "img-responsive cursor",
                style: { width: 100 }
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "lang_footer_page_col_one foot_p1 fontchange14", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: footerIntroDefault }) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "foot1w fontchange14", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "lang_footer_page_last_update", children: "Last updated: " }),
            " ",
            formatLastUpdated()
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h6", { className: "img_link lang_footer_heading_import fontchange mb-2", children: "Important Links" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("ul", { className: "foot_p2 list-unstyled mb-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/mega_events", className: "litext lang_mega_event fontchange", children: "Mega Events" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/pages/experiential_learning?mode=I", className: "litext lang_exp_lrn01 fontchange", children: "Experiential Learning" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { className: "litext lang_event fontchange", href: "/pages/events", children: "Volunteer for Bharat" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { className: "litext lang_about fontchange", href: "/pages/about_mybharat", children: "About" }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h6", { className: "img_link lang_footer_heading_useful fontchange mb-2", children: "Useful Links" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("ul", { className: "list-unstyled mb-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/pages/policy", className: "litext lang_policy_page_header fontchange", children: "Privacy Policy" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/resources-list", className: "litext lang_resources_list_ftr fontchange", children: "Resources" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/pages/support", className: "litext lang_contact_page_contact_us_ftr fontchange", children: "Support" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/sitemap", className: "litext lang_sitemap fontchange", children: "Sitemap" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "p",
              {
                className: "litext lang_content_Feedback mb-0 border-0 bg-transparent",
                id: "feedback_mdl_btn",
                "data-bs-toggle": "modal",
                "data-bs-target": feedbackModalTarget,
                style: { cursor: "pointer" },
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.target.click();
                  }
                },
                children: "Feedback"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__follow-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h6", { className: "img_link lang_footer_heading_follow fontchange mb-2", children: "Follow Us" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "social-icons mb-20 mb-common-footer__social-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://x.com/MYBharatHQ", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "icon", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: `${cdn}/assets/img/icon/twitter_v10.png`, alt: "Twitter" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "twitter-color", children: "Twitter" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://www.instagram.com/mybharatgov/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "icon", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: `${cdn}/assets/img/icon/instagram_v10.png`, alt: "Instagram" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "instagram-color", children: "Instagram" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://www.facebook.com/mybharathq/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "icon", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: `${cdn}/assets/img/icon/facebook_v10.png`, alt: "Facebook" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "facebook-color", children: "Facebook" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://www.linkedin.com/company/mybharatgov/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "icon", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: `${cdn}/assets/img/icon/linkedin_v10.png`, alt: "Linkedin" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "linkedin-color", children: "Linkedin" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "icon", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: `${cdn}/assets/img/icon/whatsapp_v10.png`, alt: "WhatsApp" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "whatsapp-color", children: "WhatsApp" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://www.youtube.com/@MyBharatHQ", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "icon", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: `${cdn}/assets/img/icon/youtube_v10.png`, alt: "YouTube" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "youtube-color", children: "YouTube" })
            ] }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "fw-normal mb-common-footer__powered-by mb-0", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("small", { className: "mb-common-footer__powered-inner", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "lang_footer_page_col_powered_by", children: "Powered by:" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "a",
              {
                className: "whitetext text-decoration-none mb-common-footer__powered-logo",
                href: "https://digitalindia.gov.in/",
                target: "_blank",
                rel: "noreferrer",
                children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                  "img",
                  {
                    src: `${cdn}/assets/img/yuva_landing/DigitalIndiamybharat.svg`,
                    alt: "Digital India",
                    style: { width: 100, height: "auto", display: "block" }
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "footertext mt-2 lang_footer_page_col_five_desc foot_p1 fontchange14", children: dicLineDefault })
        ] })
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("section", { className: "pricy1_a py-2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "row align-items-center flex-column flex-sm-row text-center text-sm-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "col-sm-8", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "https://yas.gov.in/", target: "_blank", rel: "noreferrer", className: "text-decoration-none", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { className: "lang_copyryt fontchange12", children: copyrightDefault }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "col-sm-4 pricy_a", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("ul", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/pages/terms_of_use", className: "pricy_a lang_trms fontchange12", children: "Terms & Conditions" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: "/pages/policy", className: "lang_policy_page_header fontchange12", children: "Privacy Policy" }) })
        ] }) }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      FooterModals_default,
      {
        cdnBase: cdn,
        isLoggedIn,
        recaptchaSiteKey,
        onRegisteredUserClick
      }
    )
  ] });
};
var Footer_default = Footer;

// src/navigation/navApiNormalize.ts
var LABEL_KEYS = ["label", "name", "title", "text", "menu_label", "menu_name", "display_name"];
var HREF_KEYS = ["href", "url", "path", "link", "route", "slug", "menu_url"];
var CHILD_KEYS = [
  "children",
  "submenu",
  "items",
  "nodes",
  "child_menus",
  "menu_items",
  "sub_menus"
];
function isPlainRecord2(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function pickFirstString(obj, keys) {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}
function pickChildArray(raw) {
  for (const k of CHILD_KEYS) {
    const v = raw[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return [];
}
function normalizeHrefForNav(href) {
  if (typeof href !== "string") return "";
  const t = href.trim();
  if (!t) return "";
  if (/^\s*(javascript:|data:|vbscript:)/i.test(t)) return "";
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith("mailto:") || t.startsWith("tel:")) return t;
  if (t.startsWith("/")) return t.startsWith("//") ? "" : t;
  return `/${t.replace(/^\.\//, "")}`;
}
function normalizeApiMenuNode(raw, depth, maxDepth) {
  if (depth > maxDepth) return null;
  if (!isPlainRecord2(raw)) return null;
  const rawType = typeof raw.type === "string" ? raw.type.trim().toLowerCase() : "";
  const childSource = pickChildArray(raw);
  const children = childSource.map((c) => normalizeApiMenuNode(c, depth + 1, maxDepth)).filter((n) => n !== null);
  const label = pickFirstString(raw, LABEL_KEYS);
  const hrefRaw = pickFirstString(raw, HREF_KEYS);
  const treatAsGroup = rawType === "group" || rawType !== "link" && children.length > 0;
  if (treatAsGroup) {
    if (!children.length) return null;
    return { type: "group", label: label || "More", children };
  }
  const href = normalizeHrefForNav(hrefRaw);
  const link = {
    type: "link",
    label: label || href || "Link",
    href: href || "/"
  };
  if (typeof raw.linkClassName === "string") link.linkClassName = raw.linkClassName;
  if (typeof raw.spanClassName === "string") link.spanClassName = raw.spanClassName;
  if (typeof raw.external === "boolean") link.external = raw.external;
  return link;
}
function normalizeApiMenuTree(items, options) {
  const maxDepth = options?.maxDepth ?? 32;
  if (!Array.isArray(items)) return [];
  return items.map((raw) => normalizeApiMenuNode(raw, 0, maxDepth)).filter((n) => n !== null);
}

// src/navigation/filterUnsafeNavTree.ts
function filterUnsafeNavTree(items) {
  return items.map((item) => {
    if (item.type === "link") return isSafeNavHref(item.href) ? item : null;
    const children = filterUnsafeNavTree(item.children);
    return children.length ? { ...item, children } : null;
  }).filter((item) => item !== null);
}

// src/navigation/unwrapMenuList.ts
var MENU_LIST_KEYS = [
  "items",
  "children",
  "menus",
  "menu_items",
  "nodes",
  "data",
  "tree",
  "mainNavItems",
  "nav",
  "navigation"
];
function unwrapMenuListFromPayload(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return null;
  const obj = data;
  for (const k of MENU_LIST_KEYS) {
    const v = obj[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return null;
}

// src/navigation/prepareMainNavItems.ts
function prepareMainNavItems(raw, options) {
  const fallback = options?.fallback ?? [];
  const list = unwrapMenuListFromPayload(raw);
  if (!list?.length) return fallback.length ? fallback : [];
  const shaped = normalizeApiMenuTree(list, { maxDepth: options?.maxDepth });
  const safe = filterUnsafeNavTree(shaped);
  if (safe.length) return safe;
  return fallback.length ? fallback : [];
}

// src/navigation/useMainNavItems.ts
var import_react5 = require("react");
function useMainNavItems(options) {
  const { load, select, fallback = DEFAULT_HEADER_MAIN_NAV, maxDepth } = options;
  const [nav, setNav] = (0, import_react5.useState)(fallback);
  (0, import_react5.useEffect)(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await load();
        const slice = select ? select(raw) : raw;
        const items = prepareMainNavItems(slice, { fallback, maxDepth });
        if (!cancelled) setNav(items);
      } catch {
        if (!cancelled) setNav(fallback);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, select, fallback, maxDepth]);
  return nav;
}

// src/index.ts
var MYBHARAT_COMMON_FRONTEND_VERSION = "1.0.176";
var index_default = { Header: Header_default, Header2: Header2_default, Footer: Footer_default };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_HEADER2_MAIN_NAV,
  DEFAULT_HEADER_MAIN_NAV,
  DesktopMainNav,
  Footer,
  Header,
  Header2,
  MYBHARAT_CDN_BASE,
  MYBHARAT_CDN_BASE_BETA,
  MYBHARAT_CDN_ORIGIN,
  MYBHARAT_COMMON_FRONTEND_VERSION,
  filterUnsafeNavTree,
  isNavGroupItem,
  isNavLinkItem,
  isSafeNavHref,
  navTreeItemKey,
  normalizeApiMenuTree,
  normalizeHrefForNav,
  normalizeNavTree,
  prepareMainNavItems,
  unwrapMenuListFromPayload,
  useMainNavItems
});
