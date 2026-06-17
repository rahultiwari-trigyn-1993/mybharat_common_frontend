/*! mybharat_common_frontend@1.0.226 — if this version is wrong in Sources, Vite cached an old pre-bundle; see README "Vite dev server" */


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
styleInject("header.mb-common-header .f-hd-left {\n  float: left;\n}\nheader.mb-common-header .f-hd-right {\n  float: right;\n}\nheader.mb-common-header a,\nheader.mb-common-header a:hover,\nheader.mb-common-header a:focus,\nheader.mb-common-header a:focus-visible,\nheader.mb-common-header a:visited,\nheader.mb-common-header a:active {\n  text-decoration: none !important;\n}\n#mb-nav-desktop-main {\n  padding: 0;\n}\n@media (min-width: 992px) {\n  header.mb-common-header #mb-nav-desktop-main.navbar {\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 0;\n  }\n  header.mb-common-header #mb-nav-desktop-main .menu_nav1 {\n    display: inline-flex;\n    flex: 0 1 auto;\n    flex-wrap: nowrap;\n    align-items: center;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__auth-btn,\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__register-link {\n    flex: 0 0 auto;\n    align-self: center;\n    margin-left: 12px;\n    vertical-align: middle;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__profile,\n  header.mb-common-header #mb-nav-desktop-main > .chat-toggler.mb-common-header__profile {\n    flex: 0 0 auto;\n    align-self: center;\n    margin-left: 12px;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .btn-group {\n    flex: 0 0 auto;\n    align-self: center;\n  }\n}\n.header-top {\n  background: #081854;\n  position: relative;\n}\n.header-top .skip01 {\n  color: #ffffff;\n  line-height: 28px;\n  font-size: 13px;\n  font-weight: 600;\n  padding-right: 15px;\n}\n.header-top .partition {\n  color: #ffffff;\n}\n.header-top .goi {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  line-height: 1.2;\n  padding-top: 2px;\n  color: #ffffff;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  text-decoration: none;\n}\n.header-top .goi img {\n  flex-shrink: 0;\n  margin-right: 15px;\n  width: 25px;\n  height: 15px;\n  vertical-align: middle;\n}\n.header-top .font01 {\n  border: none;\n  outline: none;\n  background: no-repeat;\n  width: 40px;\n  height: auto;\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 600;\n}\n.header-top .language01 {\n  height: auto;\n  padding: 2px 0 2px 14px;\n}\n.header-top .active01 {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 6px;\n}\n.header-top .gov_india {\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n.bhashini-plugin-container {\n  display: inline;\n  float: right;\n  margin-right: 80px !important;\n  margin-top: 2px;\n}\n.bhashini-plugin-container svg {\n  width: 24px;\n  height: 24px;\n}\n.bhashini-dropdown-content {\n  bottom: auto !important;\n  right: -75px;\n  scrollbar-width: thin;\n}\n.bhashini-dropdown-content .language-option {\n  text-align: left !important;\n}\n.mb-common-header__modal-nav a {\n  color: #000000;\n  font-weight: 600;\n}\n.mb-common-header__modal-nav a:hover {\n  color: #f15b43;\n}\n#mobileMenuNew a,\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n.chat-toggler .username {\n  font-size: 15px;\n  font-weight: 700;\n  text-align: left;\n  line-height: 1.2;\n  color: #003d52;\n}\nheader.mb-common-header .chat-toggler.mb-common-header__profile {\n  display: inline-flex;\n  align-items: center;\n  align-self: center;\n  float: none;\n  margin-left: 12px;\n}\nheader.mb-common-header .chat-toggler.mb-common-header__profile .mb-common-header__profile-toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  float: none !important;\n  margin: 0 !important;\n  color: inherit;\n}\nheader.mb-common-header .chat-toggler .user-info-wrapper {\n  float: none;\n  flex-shrink: 0;\n  margin: 0;\n}\nheader.mb-common-header .chat-toggler .user-details {\n  float: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  line-height: 1.2;\n  color: #003d52;\n  min-width: 0;\n}\nheader.mb-common-header .chat-toggler .mb-common-header__welcome-label {\n  font-size: 11px;\n  font-weight: 400;\n  color: #1789d2;\n  text-align: left;\n  margin: 0 0 2px;\n  line-height: 1.2;\n}\nheader.mb-common-header .chat-toggler .profile-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #d9d9d9;\n}\nheader.mb-common-header .chat-toggler .mb-common-header__profile-initial {\n  font-size: 28px;\n  font-weight: 400;\n  color: #1789d2;\n  line-height: 1;\n  font-family: Inter, sans-serif;\n}\nheader.mb-common-header .chat-toggler .profile-wrapper .profileimage {\n  display: block;\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n}\n.mb-common-header__mobile-profile a {\n  color: #333333;\n  font-weight: 500;\n}\n");

// src/components/Header.css
styleInject('.main-menu ul li {\n  display: inline-block;\n  margin: 0 3px;\n  position: relative;\n  list-style: none;\n}\n.main-menu ul li a {\n  color: #000000;\n  display: list-item;\n  list-style: none;\n  line-height: 1;\n  padding: 6px 4px !important;\n  font-size: 13px;\n  font-weight: 600 !important;\n  text-decoration: none !important;\n}\n.header-area {\n  background-size: cover;\n}\n@media (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .header-area.mb-common-header__header-area {\n    padding-top: 0.45rem !important;\n    padding-bottom: 0.45rem !important;\n  }\n}\n.mb-common-header__mobile-bar {\n  position: relative;\n  z-index: 2;\n}\n.mb-common-header__mobile-bar .mb-common-header__mobile-row {\n  align-items: center !important;\n  gap: 0.5rem;\n}\n.mb-common-header__mobile-bar .mb-common-header__mobile-logos {\n  flex: 0 1 auto;\n  justify-content: flex-start;\n  align-items: center;\n  align-self: center;\n}\n@media (max-width: 991.98px) {\n  header.mb-common-header .mb-common-header__mobile-row--split {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.25rem 0.35rem;\n    width: 100%;\n    min-width: 0;\n  }\n  header.mb-common-header .mb-common-header__mobile-logos--split {\n    flex: 0 0 auto;\n    min-width: 0;\n    max-width: none;\n    align-items: center;\n    overflow: visible;\n    padding-right: 2px;\n  }\n  header.mb-common-header .mb-common-header__mobile-actions--split {\n    flex: 1 1 auto;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.35rem;\n    min-width: 0;\n    float: none !important;\n    margin-top: 0 !important;\n  }\n  header.mb-common-header .mb-common-header__mobile-actions--split #toll_mb .lang_toll_free {\n    justify-content: flex-end;\n  }\n  header.mb-common-header .mb-common-header__mobile-row--split {\n    padding-top: 0.3rem !important;\n    padding-bottom: 0.3rem !important;\n  }\n}\n.mb-common-header__mobile-bar #toll_mb.skip01 {\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex: 0 1 auto;\n  min-width: 0;\n  color: #1937b2;\n  text-decoration: none;\n  line-height: 1;\n}\n.mb-common-header__mobile-bar #toll_mb .lang_toll_free {\n  font-size: clamp(11px, 3vw, 14px);\n  font-weight: 700;\n  line-height: 1.15;\n  color: #1937b2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n}\n@media (max-width: 575.98px) {\n  .mb-common-header__mobile-bar #mb_menus.btn-light {\n    padding: 0.28rem 0.5rem;\n    font-size: 1rem;\n    line-height: 1;\n  }\n  header.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.88em;\n  }\n  .dropdown-menu-header a,\n  .dropdown-item,\n  .dropdown-menu-header a.border-bottom {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n  .dropdown-menu-header a:hover,\n  .dropdown-menu-header a:focus,\n  .dropdown-item:hover,\n  .dropdown-item:focus {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n}\nheader.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n  display: inline-block;\n  font-size: 0.95em;\n  line-height: 1;\n  vertical-align: middle;\n}\n@media (min-width: 1000px) {\n  .mb-common-header__mobile-bar #toll_mb,\n  .mb-common-header__mobile-bar #mb_menus {\n    position: static !important;\n    right: auto !important;\n    top: auto !important;\n  }\n}\n.mb-common-header__mobile-bar #mb_menus.btn-light {\n  flex: 0 0 auto;\n  border: 1px solid #dee2e6;\n}\n@media (max-width: 575.98px) {\n  .mb-common-header__mobile-bar #mb_menus.btn-light {\n    padding: 0.28rem 0.5rem;\n    font-size: 1rem;\n    line-height: 1;\n  }\n}\n.new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n}\n.new_head1 {\n  border-right: 1px solid #bdbdbd;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__register-link {\n  display: inline-block;\n  vertical-align: middle;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn:focus-visible {\n  color: #f15b43 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #f15b43 !important;\n}\n@media (min-width: 992px) {\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n    margin-left: 7px;\n    margin-top: 5px;\n  }\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md1 {\n    width: 90px !important;\n  }\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md {\n  width: 80px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .new_head2 {\n  width: 74px;\n  margin-top: 5px;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head img.logo-w-sm-md1,\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head img.logo-w-sm-md-sec {\n  flex-shrink: 1;\n  min-width: 0;\n  object-fit: contain;\n  height: auto !important;\n  max-width: none !important;\n}\n#mobileMenuNew img.logo-w-sm-md-sec {\n  width: 98px !important;\n  transform: scale(1.12);\n}\n#mobileMenuNew img.logo-w-sm-md1 {\n  width: 90px !important;\n  max-width: none !important;\n  height: auto !important;\n}\n.f-12-dropdown {\n  padding-left: 24px;\n  color: #000000;\n  font-weight: 400;\n  font-size: 12px;\n}\n.dropdown-menu-header {\n  background: #ffffff;\n  border: 1px solid #f15b43;\n  border-radius: 10px;\n}\n.dropdown-menu-header a.border-bottom {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a.border-bottom:hover,\n.dropdown-menu-header a.border-bottom:focus {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a {\n  padding-top: 4px;\n  padding-bottom: 10px;\n  text-decoration: none !important;\n}\n.dropdown_evnt_prog {\n  position: relative;\n  display: inline-block;\n}\n.dropevent {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  border: none;\n}\n.dropevent_content {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  min-width: 180px;\n  z-index: 1;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  left: -25px;\n}\n.dropevent_content > .fa.fa-caret-up {\n  position: absolute;\n  top: -10px;\n  left: 43%;\n  color: #bc4717;\n}\n.dropevent_content a {\n  color: black;\n  border-bottom: 1px solid #dcdcdc;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n}\n.dropevent_content a:hover {\n  background-color: #fff;\n}\n.dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n  transition: transform 0.3s ease-in-out;\n}\n.dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(0deg);\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(0deg);\n}\n.dropevent_content .dropdown_evnt_prog {\n  display: block;\n  width: 100%;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent {\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid #dcdcdc;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent_content {\n  left: 100%;\n  top: 0;\n  margin-left: 2px;\n}\n.dropevent_content .dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.pull-right {\n  margin-left: 30px;\n}\n.header_img {\n  text-align: center;\n  top: 0 !important;\n}\n.user-info-wrapper {\n  display: block;\n  margin: 0;\n  width: 46px;\n  height: 46px;\n  background: #6c757d8a;\n  border-radius: 50px;\n  padding: 3px;\n  float: left;\n}\n.user-info-wrapper .profile-wrapper {\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  display: inline-block;\n}\n.chat-toggler .user-details {\n  float: left;\n  line-height: 0;\n  color: #003d52;\n}\n.chat-toggler .dropdown-menu {\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.5);\n}\n.chat-toggler .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.chat-toggler .dropdown-menu[data-bs-popper] {\n  top: 92%;\n}\n.chat-toggler .dropdown-menu li {\n  display: block !important;\n}\n.chat-toggler .dropdown-menu li a i {\n  font-size: 12px;\n}\n.chat-toggler .dropdown-menu > li > a {\n  line-height: 25px !important;\n  color: #003d52 !important;\n  margin: 4px;\n  border-radius: 3px;\n  text-align: left;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  padding: 3px 20px !important;\n}\n.chat-toggler .dropdown-menu > li > a:hover {\n  text-decoration: none;\n  background-color: #eff2f3;\n  background-image: none;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  list-style: none;\n  text-shadow: none;\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.2);\n  border: none;\n  border-radius: 3px;\n  padding: 0;\n  font-size: 13px;\n}\n@media only screen and (max-width: 991.98px) {\n  #mobileMenuNew img.logo-w-sm-md1 {\n    width: clamp(118px, 32vw, 148px) !important;\n  }\n  #mobileMenuNew img.logo-w-sm-md-sec {\n    width: clamp(126px, 34vw, 156px) !important;\n    transform: scale(1.08) !important;\n  }\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-row--split {\n    gap: 0.25rem !important;\n    padding-left: 4px !important;\n    padding-right: 2px !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) > .bhashini-plugin-container.mb-common-header__bhashini-root {\n    bottom: 12px !important;\n    right: 42px !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .header-area {\n    min-height: 56px;\n  }\n}\n@media only screen and (max-width: 1000px) {\n  .header-top,\n  .main-menu {\n    display: none !important;\n  }\n  header.mb-common-header .d-sm-none1 {\n    display: block !important;\n  }\n  .header-area .justify-content-sm-end {\n    justify-content: flex-start !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area {\n    height: 60px;\n    min-height: 56px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area .container {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) > .bhashini-plugin-container.mb-common-header__bhashini-root {\n    display: inline-block !important;\n    visibility: visible !important;\n    pointer-events: auto !important;\n    position: absolute !important;\n    float: none !important;\n    right: 46px !important;\n    top: auto !important;\n    bottom: 14px !important;\n    margin: 0 !important;\n    z-index: 1001 !important;\n    line-height: 1;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) > .bhashini-plugin-container.mb-common-header__bhashini-root svg {\n    width: 24px;\n    height: 24px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__mobile-row--split {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.35rem !important;\n    width: 100%;\n    min-height: 52px;\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__mobile-logos--split {\n    flex: 0 1 auto !important;\n    align-items: center !important;\n    min-width: 0;\n    max-width: calc(100% - 158px);\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__bhashini-slot {\n    flex: 0 0 28px !important;\n    width: 28px;\n    min-width: 28px;\n    height: 24px;\n    display: inline-block;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head {\n    align-items: center !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__mobile-actions--split {\n    flex: 1 1 auto !important;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.4rem !important;\n    min-width: 0;\n    float: none !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #mb_menus {\n    position: static !important;\n    float: none !important;\n    right: auto !important;\n    top: auto !important;\n    left: auto !important;\n    bottom: auto !important;\n    margin: 0 !important;\n    z-index: auto !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb {\n    display: inline-flex !important;\n    align-items: center !important;\n    font-size: 10px !important;\n    white-space: nowrap;\n    flex: 0 1 auto;\n    min-width: 0;\n    color: #1937b2;\n    text-decoration: none;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb .lang_toll_free {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    line-height: 1.1 !important;\n    gap: 0.2em !important;\n    align-items: center !important;\n    display: inline-flex !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #mb_menus {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 auto !important;\n    padding: 6px !important;\n    border: 1px solid #dee2e6;\n  }\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  .bhashini-plugin-container svg path {\n    fill: #000000 !important;\n  }\n}\n@media (min-width: 1000px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) > .bhashini-plugin-container.mb-common-header__bhashini-root {\n    position: static !important;\n    float: right !important;\n    right: auto !important;\n    bottom: auto !important;\n    margin-right: 80px !important;\n    margin-top: 2px !important;\n    z-index: auto !important;\n  }\n}\n@media (min-width: 1001px) {\n  header.mb-common-header .d-sm-none1 {\n    display: none !important;\n  }\n}\n#mobileMenuNew.modal.left {\n  z-index: 1060 !important;\n}\n#mobileMenuNew.modal.left .modal-dialog {\n  position: fixed;\n  margin: auto;\n  width: 75%;\n  max-width: 420px;\n  height: 100%;\n  transform: translate3d(0%, 0, 0);\n  right: 0;\n  left: auto;\n}\n#mobileMenuNew.modal.left .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n#mobileMenuNew .modal-header .btn-close {\n  margin: -1rem -5px -0.5rem auto;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li:not(:last-child) {\n  border-bottom: 1px solid #d7d7d7;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a,\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew a,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active {\n  text-decoration: none !important;\n  color: inherit !important;\n}\n#mobileMenuNew .modal-body ul.list-unstyled li a {\n  text-decoration: none !important;\n  font-weight: 500 !important;\n  color: #333333 !important;\n}\n#mobileMenuNew .modal-body ul li a,\n#mobileMenuNew .modal-body ul li a span {\n  text-decoration: none !important;\n}\n.f-10-dropdown {\n  font-size: 10px;\n  color: #999999;\n}\n@media only screen and (max-width: 600px) {\n  #mobileMenuNew .modal-content {\n    transform: translate(100%, 0) scale(1);\n    transition: transform 0.4s ease-in-out;\n  }\n  #mobileMenuNew.modal.show .modal-content {\n    transform: translate(0, 0) scale(1);\n  }\n  #mobileMenuNew .accordion-button:not(.collapsed) {\n    background-color: #f15b43;\n    color: #fff;\n  }\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) {\n  font-family: "Noto Sans Meetei Mayek", sans-serif;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .single-login-pad {\n  margin-right: 15px;\n  padding: 0.375rem 1.75rem;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .rounded-pill {\n  border-radius: 5px !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:active,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.disabled,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:disabled,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.dropdown-toggle.show {\n  color: #ffffff;\n  border-color: #f15b4300;\n  background-color: #f15b43;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-item.active,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-item:active {\n  background-color: #f15b43;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn {\n  background-color: #ffff !important;\n  border: 1px solid #f15b43 !important;\n  color: #f15b43 !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn:hover {\n  color: #ffffff !important;\n  border-color: #f15b4300 !important;\n  background-color: #f15b43 !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn::after,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn1::after {\n  display: none !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .primary,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:focus {\n  box-shadow: 0 0 0 0.25rem #f15b4300;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.dropdown-toggle.show:focus,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:active:focus {\n  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu[data-bs-popper] {\n  top: 109%;\n  left: -275px;\n  margin-top: 0.125rem;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_yuva,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_youth_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_login_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_other,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_nyf,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_partner {\n  color: #f15b43;\n  font-weight: 500;\n  font-size: 15px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_yuva,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_youth_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_login_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_other,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_nyf,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .f-12-dropdown {\n  color: #ffff;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(1) {\n  color: #f39620;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(2) {\n  color: #0473b7;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(3) {\n  color: #04a651;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .home_ico .fa {\n  color: #313033;\n  font-size: 24px;\n  padding: 7px 10px;\n  cursor: pointer !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .home_ico {\n  cursor: pointer !important;\n  position: relative;\n  z-index: 999;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #unity-btn {\n  background:\n    linear-gradient(\n      95deg,\n      #faad17 -3.76%,\n      #e4860e 101.62%);\n  color: #fff !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #beta_txt {\n  position: absolute;\n  top: 61px;\n  background-color: #f15b43;\n  padding: 9px;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  bottom: 7px;\n  cursor: pointer;\n  display: none;\n  height: 20px;\n  margin-left: 113px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu {\n  position: relative;\n  list-style: none;\n  display: inline-block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu-link {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #000;\n  text-decoration: none;\n  white-space: nowrap;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu-link:hover {\n  color: #bc4717;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 220px;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  background: #fff;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n  z-index: 999;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu:hover > .resource-dropdown {\n  display: block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown > li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #dcdcdc;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown > li:last-child {\n  border-bottom: none;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu-link,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown li a,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #000;\n  text-decoration: none;\n  background: #fff;\n  white-space: nowrap;\n  line-height: 2 !important;\n  cursor: pointer;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu-link:hover,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown li a:hover,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a:hover {\n  background: #f8f8f8;\n  color: #bc4717;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu {\n  display: none;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  background: #fff;\n  border-top: 1px solid #e5e5e5;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .has-submenu.open > .resource-submenu {\n  display: block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ededed;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li:last-child {\n  border-bottom: none;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a {\n  padding-left: 32px;\n  font-weight: 500;\n}\n@media (max-width: 767px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #beta_txt {\n    position: relative !important;\n    height: 17px !important;\n    top: 19px !important;\n    margin-left: 3px !important;\n    font-size: 10px !important;\n    padding: 7px !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md1,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 70px !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md-sec,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 70px !important;\n    transform: scale(1) !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area {\n    height: 60px;\n  }\n  #mobileMenuNew .lang_mobile {\n    font-size: 1rem;\n    padding: 6px 11px 7px 32px;\n    color: #515151;\n    line-height: 19px;\n    width: 90%;\n    font-weight: 600;\n    border: none;\n  }\n  #mobileMenuNew .modal-title .logo a img {\n    height: auto !important;\n  }\n}\n');

// src/components/Footer.css
styleInject("#feed_back.modal,\n#feed_back1.modal,\n#successToaster.modal {\n  z-index: 1060 !important;\n}\n.litext {\n  color: #525c66;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n#footer_external a.litext,\n#footer_external p.litext {\n  color: #525c66 !important;\n}\n#footer_external a,\n#footer_external a:hover,\n#footer_external a:focus,\n#footer_external a:visited,\n#footer_external a:active,\n#feed_back a,\n#feed_back a:hover,\n#feed_back1 a,\n#feed_back1 a:hover,\n#successToaster a,\n#successToaster a:hover {\n  text-decoration: none !important;\n}\n#footer_external {\n  border-top: solid 1px #d6d6d6;\n}\n#footer_external .foot_p1 {\n  color: #525c66;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n#footer_external .footer-top {\n  background-color: #ffffff !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col {\n  text-align: left !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col h6.img_link,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col li,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col a.litext,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col p.litext {\n  text-align: left !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col ul {\n  padding-left: 0;\n}\n@media (max-width: 991.98px) {\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col {\n    text-align: center !important;\n  }\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col h6.img_link,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col li,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col a.litext,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col p.litext {\n    text-align: center !important;\n  }\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col ul {\n    padding-left: 0;\n  }\n  #footer_external .mb-common-footer__follow-col {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col h6.img_link {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col .social-icons {\n    justify-content: center;\n  }\n  #footer_external .mb-common-footer__follow-col .mb-common-footer__powered-by {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col .mb-common-footer__powered-inner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.35rem 0.75rem;\n    width: 100%;\n    max-width: 100%;\n  }\n  #footer_external .mb-common-footer__follow-col .foot_p1 {\n    text-align: center;\n  }\n}\n#footer_external .foot_p2 {\n  padding-left: initial;\n}\n.pricy1_a {\n  background-color: #000627;\n}\n.pricy1_a .row .col-sm-8 {\n  margin-bottom: 0;\n  line-height: 35px;\n}\n.pricy1_a .row .col-sm-8 p {\n  margin-bottom: 0;\n  line-height: 29px;\n}\n.pricy1_a .row {\n  color: #fff;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.pricy_a ul {\n  width: 100%;\n  line-height: 31px;\n  text-align: center;\n  display: inline-flex;\n  justify-content: center;\n  padding-left: 68px;\n  list-style: none;\n  margin: 0;\n  flex-wrap: wrap;\n}\n.pricy_a ul li:nth-child(1) {\n  padding-right: 27px;\n}\n.pricy_a p {\n  margin-bottom: 0;\n  line-height: 35px;\n}\n.foot1w {\n  width: fit-content;\n  color: #000;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  padding: 4px 10px;\n}\n.pricy1_a a {\n  color: #fff !important;\n  text-decoration: none;\n}\n@media only screen and (max-width: 600px) {\n  .foot1w {\n    margin: auto;\n  }\n  .pricy_a ul {\n    padding-left: 0;\n    display: flex;\n    justify-content: center;\n  }\n  .new_foot li .fab {\n    vertical-align: inherit !important;\n  }\n}\n.img_link {\n  color: #343f4a;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n}\n.new_foot li {\n  line-height: 15px;\n  padding: 1px;\n}\n.new_foot li img {\n  width: 81%;\n}\n@media (max-width: 767.98px) {\n  #footer_external .footer-contact {\n    text-align: center !important;\n  }\n  #footer_external .footer-contact .d-flex.align-items-center {\n    justify-content: center !important;\n  }\n}\n@media (min-width: 601px) and (max-width: 991.98px) {\n  #footer_external .footer-contact,\n  #footer_external .footer-links {\n    padding-bottom: 1rem;\n  }\n}\n.mb-common-footer__social-row {\n  flex-wrap: wrap;\n}\n.feed_back {\n  text-align: end;\n}\n#feed_back textarea {\n  margin-top: 0 !important;\n  margin-bottom: 11px !important;\n}\n#feed_back label {\n  font-size: 15px;\n  font-weight: 500;\n  line-height: 20px;\n  color: #252525;\n}\n#feed_back .cross_ico img {\n  cursor: pointer;\n  padding: 6px 10px;\n}\n#feed_back .text-left {\n  text-align: left;\n}\n#feed_back .cross_ico {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  position: static;\n  bottom: auto;\n  z-index: 1;\n}\n#feed_back .mb-common-footer__feedback-footer-row {\n  margin-top: 4px;\n}\n#feed_back .mb-common-footer__feedback-actions img {\n  cursor: pointer;\n}\n#feed_back .mb-common-footer__recaptcha {\n  min-height: 78px;\n}\n#feed_back .modal-body {\n  position: relative;\n}\n#feed_back .mb-common-footer__feedback-loader {\n  position: absolute;\n  inset: 0;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.72);\n  border-radius: inherit;\n  z-index: 10;\n}\n#feed_back .mb-common-footer__feedback-loader.is-visible {\n  display: flex;\n}\n#feed_back .mb-common-footer__feedback-loader-inner {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n#feed_back .mb-common-footer__feedback-spinner {\n  border: 4px solid #e9ecef;\n  border-top-color: #0fbd5f;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: mb-common-footer-feedback-spin 0.85s linear infinite;\n}\n#feed_back .mb-common-footer__feedback-loader-text {\n  color: #333;\n  font-size: 14px;\n  font-weight: 500;\n}\n@keyframes mb-common-footer-feedback-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n#feed_back .mb-common-footer__feedback-form--submitting {\n  pointer-events: none;\n  opacity: 0.55;\n}\n#feed_back .radio-tile-group {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n#feed_back .tt_yuvr {\n  display: inline-flex;\n  padding: 10px;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n  gap: 0.25rem;\n}\n#feed_back .tt_yuvr .input-container {\n  position: relative;\n  width: 50px;\n  margin-right: 18px;\n  margin-top: 7px;\n}\n#feed_back .tt_yuvr .input-container input {\n  position: absolute;\n  cursor: pointer;\n  z-index: 2;\n  opacity: 0;\n  width: 50px;\n  height: 50px;\n}\n#feed_back .tt_yuvr input:checked + .radio-tile {\n  background: #0b6bbe;\n}\n#feed_back .tt_yuvr input:checked + .radio-tile label {\n  color: #fff;\n}\n#feed_back .tt_yuvr .input-container .radio-tile {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: #eee;\n  width: 50px;\n  height: 50px;\n  border-radius: 30px;\n}\n#feed_back .tt_yuvr .input-container {\n  transition: transform 0.2s;\n}\n#feed_back .tt_yuvr .input-container:hover {\n  transform: scale(1.07);\n}\n#feed_back .tt_yuvr .input-container label {\n  font-size: 18px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 0;\n}\n.radio-tile-group:nth-child(1),\n.radio-tile-group:nth-child(2),\n.radio-tile-group:nth-child(3),\n.radio-tile-group:nth-child(4) {\n  border-top: 3px solid #f00;\n}\n.radio-tile-group:nth-child(5),\n.radio-tile-group:nth-child(6),\n.radio-tile-group:nth-child(7),\n.radio-tile-group:nth-child(8) {\n  border-top: 3px solid #ffbe15;\n}\n.radio-tile-group:nth-child(9),\n.radio-tile-group:nth-child(10) {\n  border-top: 3px solid #04a651;\n}\n.radio-tile-group:nth-child(5),\n.radio-tile-group:nth-child(9) {\n  margin-left: 10px;\n}\n.vError {\n  border: 1px solid #e41f12;\n}\np.vErrormsg {\n  font-size: small;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #e41f12;\n  margin-bottom: 20px;\n  float: inline-start;\n}\nsmall.vErrormsg {\n  font-size: small;\n  font-weight: 400;\n  color: #e41f12;\n  float: inline-start;\n}\n#char_left_cnt {\n  color: #252525;\n  float: inline-end;\n  font-size: small;\n}\n#successToaster .modal-dialog {\n  margin: 20% auto;\n}\n@media only screen and (min-width: 601px) {\n  #feed_back .modal-dialog {\n    max-width: 876px !important;\n    margin-top: 133px;\n  }\n  #feed_back1 .modal-dialog {\n    margin-top: 133px;\n  }\n}\n@media only screen and (max-width: 600px) {\n  #feed_back .tt_yuvr {\n    display: flex !important;\n    overflow: auto !important;\n  }\n  #feed_back .form-group {\n    margin-bottom: 10px;\n  }\n  #feed_back .tt_yuvr .input-container input {\n    width: 20px !important;\n    height: 20px !important;\n  }\n  #feed_back .tt_yuvr .input-container .radio-tile {\n    width: 30px !important;\n    height: 30px !important;\n    border-radius: 30px !important;\n  }\n  #feed_back .cross_ico {\n    position: initial !important;\n  }\n  #feed_back .tt_yuvr .input-container {\n    width: 17px !important;\n    margin-right: 18px !important;\n  }\n  #feed_back .tt_yuvr .input-container label {\n    font-size: 13px !important;\n  }\n  #feed_back .modal-dialog {\n    width: 100% !important;\n    padding: 10px 15px 10px 0;\n  }\n  .social-icons {\n    justify-content: center;\n  }\n}\n#pls_select h3 {\n  color: #343434;\n  font-weight: 600;\n}\n#pls_select {\n  text-align: center;\n}\n#pls_select #guest_usr {\n  background-color: #f15b43;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 500;\n  border-radius: 4px;\n  margin: 10px;\n}\n#pls_select #regi_usr {\n  background-color: #fff;\n  border: 1px solid #5a6370;\n  font-size: 16px;\n  color: #5a6370;\n  font-weight: 500;\n  border-radius: 4px;\n  margin: 10px;\n}\n#pls_select .btn-close {\n  border: none !important;\n  background: none !important;\n  float: right;\n  width: 32px;\n  height: 32px;\n  cursor: pointer;\n}\n#pls_select .col-sm-12:nth-child(2) {\n  margin-bottom: 20px;\n}\n#feedback_captcha_value {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.social-icons {\n  display: flex;\n  gap: 9px;\n  flex-wrap: wrap;\n}\n.social-icons .icon {\n  display: flex;\n  align-items: center;\n  background: white;\n  border-radius: 50px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  width: 30px;\n  overflow: hidden;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n.social-icons .icon img {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.social-icons .icon span {\n  margin-left: 4px;\n  white-space: nowrap;\n  opacity: 0;\n  transform: translateX(-10px);\n  transition: all 0.3s ease;\n  font-size: 13px;\n}\n.twitter-color {\n  color: #000;\n}\n.instagram-color {\n  color: #cf188a;\n}\n.facebook-color {\n  color: #4676ed;\n}\n.linkedin-color {\n  color: #4467ad;\n}\n.whatsapp-color {\n  color: #00c169;\n}\n.youtube-color {\n  color: #e52d27;\n}\n@media (hover: hover) and (pointer: fine) {\n  .social-icons .icon:hover {\n    width: 100px;\n    justify-content: flex-start;\n  }\n  .social-icons .icon:hover span {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.mb-20 {\n  margin-bottom: 1.25rem;\n}\n.whitetext img {\n  vertical-align: middle;\n}\n#footer_external .mb-common-footer__powered-inner {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.35rem 0.75rem;\n}\n#footer_external .mb-common-footer__powered-by {\n  color: #495059 !important;\n}\n#footer_external .whitetext.mb-common-footer__powered-logo {\n  color: inherit !important;\n  display: inline-flex;\n  align-items: center;\n  line-height: 1;\n}\n#footer_external .mb-common-footer__powered-logo img {\n  display: block;\n  flex-shrink: 0;\n}\n");

// src/components/Header.tsx
import { createPortal as createPortal2 } from "react-dom";

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
import React from "react";

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
import { jsx, jsxs } from "react/jsx-runtime";
function NavLinkLi({ item }) {
  const { href, external } = getNavLinkAttrs(item, "DesktopMainNav");
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
    "a",
    {
      className: item.linkClassName ?? "fontchange14",
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: item.spanClassName ? /* @__PURE__ */ jsx("span", { className: item.spanClassName, children: item.label }) : /* @__PURE__ */ jsx("span", { children: item.label })
    }
  ) });
}
function NavLinkInline({ item }) {
  const { href, external } = getNavLinkAttrs(item, "DesktopMainNav");
  return /* @__PURE__ */ jsx(
    "a",
    {
      className: item.linkClassName ?? "fontchange14",
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: item.spanClassName ? /* @__PURE__ */ jsx("span", { className: item.spanClassName, children: item.label }) : /* @__PURE__ */ jsx("span", { children: item.label })
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
    return /* @__PURE__ */ jsx(NavLinkInline, { item });
  }
  const isOpen = nestedOpenKey === myKey;
  const handleClick = (e) => {
    e.preventDefault();
    setNestedOpenKey(isOpen ? null : myKey);
  };
  const handleMouseLeave = React.useCallback(() => {
    if (isOpen) {
      setNestedOpenKey(null);
    }
  }, [isOpen, setNestedOpenKey]);
  return /* @__PURE__ */ jsxs("div", { className: `dropdown_evnt_prog ${isOpen ? "active" : ""}`, onMouseLeave: handleMouseLeave, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "dropevent", onClick: handleClick, children: [
      item.label,
      " ",
      /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dropevent_content", role: "menu", style: { display: isOpen ? "block" : "none" }, children: [
      /* @__PURE__ */ jsx("i", { className: "fa fa-caret-up", "aria-hidden": "true" }),
      item.children.map((child, i) => {
        const childSegments = [...segments, i];
        return /* @__PURE__ */ jsx(
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
  const [nestedOpenKey, setNestedOpenKey] = React.useState(null);
  const isOpenTop = openTopKey === topMenuKey;
  React.useEffect(() => {
    if (!isOpenTop) {
      setNestedOpenKey(null);
    }
  }, [isOpenTop]);
  const handleClick = (e) => {
    e.preventDefault();
    setOpenTopKey(isOpenTop ? null : topMenuKey);
  };
  const handleMouseLeave = React.useCallback(() => {
    if (isOpenTop) {
      setOpenTopKey(null);
    }
  }, [isOpenTop, setOpenTopKey]);
  return /* @__PURE__ */ jsx("li", { role: "presentation", children: /* @__PURE__ */ jsxs("div", { className: `dropdown_evnt_prog ${isOpenTop ? "active" : ""}`, onMouseLeave: handleMouseLeave, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "dropevent", onClick: handleClick, children: [
      item.label,
      " ",
      /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dropevent_content", role: "menu", style: { display: isOpenTop ? "block" : "none" }, children: [
      /* @__PURE__ */ jsx("i", { className: "fa fa-caret-up", "aria-hidden": "true" }),
      item.children.map((child, i) => {
        const childSegments = [...segments, i];
        return /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(NavLinkLi, { item });
  }
  return /* @__PURE__ */ jsx(
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
  const tree = React.useMemo(() => normalizeNavTree(items), [items]);
  const [openTopKey, setOpenTopKey] = React.useState(null);
  return /* @__PURE__ */ jsx("ul", { className: "menu_nav1", children: tree.map((item, index) => {
    const segments = [index];
    return /* @__PURE__ */ jsx(
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
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function HeaderBrandLogos({ cdn, layout }) {
  const yas = `${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`;
  const mb = `${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`;
  if (layout === "mobile") {
    const mobileLogoStyle = { width: 70, maxWidth: 70, height: "auto" };
    return /* @__PURE__ */ jsxs2("div", { className: "d-flex new_head align-items-center", children: [
      /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: yas, className: "new_head1 logo-w-sm-md1", alt: "", style: mobileLogoStyle }) }),
      /* @__PURE__ */ jsx2("span", { className: "d-inline-flex align-items-center", children: /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: mb, className: "logo-w-sm-md-sec", alt: "MY Bharat", style: mobileLogoStyle }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs2("div", { className: "d-flex new_head", children: [
    /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: yas, className: "new_head1 logo-w-sm-md1", alt: "" }) }),
    /* @__PURE__ */ jsx2("span", { style: { display: "inline-flex" }, children: /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: mb, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }) })
  ] });
}

// src/components/header/HeaderGovernmentStrip.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function HeaderGovernmentStrip({ cdn }) {
  return /* @__PURE__ */ jsx3("div", { className: "header-top d-none d-sm-block ", children: /* @__PURE__ */ jsx3("div", { className: "container", children: /* @__PURE__ */ jsxs3("div", { className: "row", children: [
    /* @__PURE__ */ jsx3("div", { className: "col-xl-3 col-lg-3 d-flex col-sm-4 col-6 align-items-center", children: /* @__PURE__ */ jsxs3("a", { href: "https://www.india.gov.in/", target: "_blank", rel: "noreferrer", className: "goi", children: [
      /* @__PURE__ */ jsx3("img", { src: `${cdn}/assets/img/mybharat/Flag%20of%20India.png`, className: "cursor", alt: "" }),
      /* @__PURE__ */ jsx3("strong", { className: "gov_india", children: "Government of India" })
    ] }) }),
    /* @__PURE__ */ jsx3("div", { className: "col-xl-9 col-lg-9 col-sm-8 col-6 text-end", children: /* @__PURE__ */ jsxs3("span", { className: " d-none d-md-inline", children: [
      /* @__PURE__ */ jsx3("button", { role: "button", id: "decreasetext", className: "font01", children: "-A" }),
      /* @__PURE__ */ jsx3("button", { role: "button", id: "resettext", className: "font01 active01", children: "A" }),
      /* @__PURE__ */ jsx3("button", { role: "button", id: "increasetext", className: "font01", children: "A+" }),
      /* @__PURE__ */ jsx3("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ jsx3("a", { href: "tel:18002122729", title: "Toll Free", className: "skip01", children: "Toll Free : 14472 Or 18002122729" }),
      /* @__PURE__ */ jsx3("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ jsx3("a", { href: "/pages/support", className: "skip01", children: "support.mybharat.gov.in" }),
      /* @__PURE__ */ jsx3("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ jsx3("div", { id: "bhashini-desktop-header" })
    ] }) })
  ] }) }) });
}

// src/components/header/HeaderMobileStrip.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var stripClasses = {
  split: {
    bar: "mb-common-header__mobile-bar mb-common-header__mobile-bar--split",
    row: "mb-common-header__mobile-row mb-common-header__mobile-row--split d-flex align-items-center flex-nowrap w-100 py-2",
    logos: "mb-common-header__mobile-logos mb-common-header__mobile-logos--split min-w-0 d-flex align-items-center",
    actions: "mb-common-header__mobile-actions--split d-sm-none1 d-flex flex-nowrap align-items-center justify-content-end flex-shrink-0 min-w-0",
    mid: "mb-common-header__mobile-mid--split d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0",
    tollLink: "skip01",
    end: "mb-common-header__mobile-end--split d-flex align-items-center justify-content-end flex-shrink-0 min-w-0",
    menuBtn: "btn btn-light"
  },
  h2: {
    bar: "mb-common-header__mobile-bar mb-common-header__mobile-bar--h2",
    row: "mb-common-header__mobile-row mb-common-header__mobile-row--h2 d-flex align-items-center flex-nowrap w-100 py-2",
    logos: "mb-common-header__mobile-logos mb-common-header__mobile-logos--h2 min-w-0 d-flex align-items-center",
    actions: "mb-common-header__mobile-actions--h2 d-sm-none1 d-flex flex-nowrap align-items-center justify-content-end flex-shrink-0 min-w-0",
    mid: "mb-common-header__mobile-mid--h2 d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0",
    tollLink: "skip01 mb-common-header__toll-link--h2",
    end: "mb-common-header__mobile-end--h2 d-flex align-items-center justify-content-end flex-shrink-0 min-w-0",
    menuBtn: "btn mb-common-header__mobile-menu-btn--h2"
  }
};
function HeaderMobileStrip({ cdn, variant }) {
  const s = stripClasses[variant];
  const tollLink = /* @__PURE__ */ jsx4("a", { href: "tel:18002122729", title: "Toll Free", id: "toll_mb", className: s.tollLink, children: /* @__PURE__ */ jsxs4("strong", { className: "lang_toll_free", children: [
    /* @__PURE__ */ jsx4(
      "i",
      {
        className: "fa fa-phone mb-common-header__toll-phone-icon",
        "aria-hidden": "true",
        style: { transform: variant === "h2" ? "rotate(180deg)" : "rotate(90deg)" }
      }
    ),
    " ",
    "14472 Or 18002122729"
  ] }) });
  const bhashiniSlot = /* @__PURE__ */ jsx4("span", { className: "mb-common-header__bhashini-slot", "aria-hidden": "true" });
  const menuButton = /* @__PURE__ */ jsx4(
    "button",
    {
      type: "button",
      className: s.menuBtn,
      "data-bs-toggle": "modal",
      id: "mb_menus",
      "data-bs-target": "#mobileMenuNew",
      "aria-label": "Open menu",
      children: /* @__PURE__ */ jsx4("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" })
    }
  );
  return /* @__PURE__ */ jsx4("div", { className: `col-12 d-lg-none ${s.bar}`, children: /* @__PURE__ */ jsxs4("div", { className: s.row, children: [
    /* @__PURE__ */ jsx4("div", { className: s.logos, children: /* @__PURE__ */ jsx4(HeaderBrandLogos, { cdn, layout: "mobile" }) }),
    s.actions ? /* @__PURE__ */ jsxs4("div", { className: s.actions, children: [
      tollLink,
      bhashiniSlot,
      menuButton
    ] }) : /* @__PURE__ */ jsxs4(Fragment, { children: [
      /* @__PURE__ */ jsxs4("div", { className: s.mid, children: [
        tollLink,
        bhashiniSlot
      ] }),
      /* @__PURE__ */ jsx4("div", { className: s.end, children: menuButton })
    ] })
  ] }) });
}

// src/components/header/useMbHeaderBootstrapAndPortal.ts
import { useEffect, useState } from "react";
function useMbHeaderBootstrapAndPortal(cdn) {
  const [menuPortalReady, setMenuPortalReady] = useState(false);
  useEffect(() => {
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
import React2 from "react";

// src/components/header/login/bootstrapModal.ts
function getBootstrapModal() {
  return typeof window !== "undefined" && window.bootstrap?.Modal;
}
var BOOTSTRAP_WAIT_MS = 8e3;
var BOOTSTRAP_POLL_MS = 50;
function whenElementReady(id, onReady) {
  if (document.getElementById(id)) {
    onReady();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById(id)) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - started >= BOOTSTRAP_WAIT_MS) {
      window.clearInterval(timer);
    }
  }, BOOTSTRAP_POLL_MS);
}
function whenBootstrapReady(onReady) {
  if (getBootstrapModal()) {
    onReady();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (getBootstrapModal()) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - started >= BOOTSTRAP_WAIT_MS) {
      window.clearInterval(timer);
    }
  }, BOOTSTRAP_POLL_MS);
}
function showBootstrapModal(id, options) {
  const tryShow = () => {
    const el = document.getElementById(id);
    const Modal = getBootstrapModal();
    if (!el || !Modal) return false;
    Modal.getOrCreateInstance(el, options).show();
    return true;
  };
  if (tryShow()) return;
  const attemptShow = () => {
    if (tryShow()) return;
    whenBootstrapReady(tryShow);
  };
  if (document.getElementById(id)) {
    whenBootstrapReady(tryShow);
  } else {
    whenElementReady(id, attemptShow);
  }
}
function hideBootstrapModal(id) {
  const el = document.getElementById(id);
  const Modal = getBootstrapModal();
  Modal?.getInstance(el)?.hide();
}
function switchBootstrapModal(fromId, toId, delayMs = 0) {
  hideBootstrapModal(fromId);
  window.setTimeout(() => showBootstrapModal(toId, { backdrop: "static", keyboard: false }), delayMs);
}

// src/components/header/login/shellLoginInternalAuth.ts
var SHELL_LOGIN_API_PROXY_DEFAULT = "/mybharat-shell-api";
var SHELL_INTERNAL_KC_CLIENT_PATH = "/_internal/kc-client";
var SHELL_INTERNAL_GUEST_OAUTH_PATH = "/_internal/guest-oauth";
var SHELL_INTERNAL_LOGIN_PUBKEY_PATH = "/_internal/login-pubkey";
var SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH = "/_internal/keycloak-login";
var SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH = "/_internal/verify-guest-otp";
var SHELL_INTERNAL_CHANGE_PASSWORD_PATH = "/_internal/keycloak-change-password";
var ShellInternalAuthError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShellInternalAuthError";
  }
};
var DEFAULT_INTERNAL_AUTH_ERROR = "Login is not configured. Ask the host app to enable internal auth proxy routes.";
function normalizeBearerAccessToken(raw) {
  if (!raw) return "";
  let token = raw.trim();
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, "").trim();
  }
  return token;
}
function readAccessTokenField(value) {
  if (typeof value !== "string") return void 0;
  const token = normalizeBearerAccessToken(value);
  return token || void 0;
}
function readAccessTokenFromNode(node, depth = 0) {
  if (node == null || depth > 5) return void 0;
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return void 0;
    try {
      return readAccessTokenFromNode(JSON.parse(trimmed), depth + 1);
    } catch {
      return void 0;
    }
  }
  if (typeof node !== "object") return void 0;
  const obj = node;
  const direct = readAccessTokenField(obj.access_token) ?? readAccessTokenField(obj.accessToken);
  if (direct) return direct;
  for (const key of ["data", "message", "response", "result"]) {
    const nested = readAccessTokenFromNode(obj[key], depth + 1);
    if (nested) return nested;
  }
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      const nested = readAccessTokenFromNode(value, depth + 1);
      if (nested) return nested;
    }
  }
  return void 0;
}
function readAccessTokenFromResponse(data) {
  const rootToken = readAccessTokenField(data.access_token) ?? readAccessTokenField(data.accessToken);
  if (rootToken) return rootToken;
  return readAccessTokenFromNode(data.data) ?? readAccessTokenFromNode(data.message) ?? readAccessTokenFromNode(data);
}
function readConfiguredProxyBase() {
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("api-proxy-base-url")?.trim();
  if (fromHeader) return fromHeader.replace(/\/$/, "");
  const fromShell = window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const fromMeta = document.querySelector('meta[name="mybharat-shell-api-proxy-base"]')?.getAttribute("content")?.trim();
  if (fromMeta) return fromMeta.replace(/\/$/, "");
  return "";
}
function resolveInternalAuthBase() {
  const explicit = readConfiguredProxyBase();
  if (explicit) return explicit;
  return SHELL_LOGIN_API_PROXY_DEFAULT;
}
function buildInternalAuthUrl(path) {
  const base = resolveInternalAuthBase();
  if (!base) {
    throw new ShellInternalAuthError(DEFAULT_INTERNAL_AUTH_ERROR);
  }
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
async function postInternalAuth(path, forceRefresh = false) {
  const refreshSuffix = forceRefresh ? path.includes("?") ? "&refresh=1" : "?refresh=1" : "";
  const url = `${buildInternalAuthUrl(path)}${refreshSuffix}`;
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: forceRefresh ? { "X-Shell-Auth-Refresh": "1" } : void 0
    });
  } catch {
    throw new ShellInternalAuthError(DEFAULT_INTERNAL_AUTH_ERROR);
  }
  const text = await res.text();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return { status_code: res.status, data: parsed };
    }
    const obj = parsed;
    if (obj.status_code == null || obj.status_code === "") {
      obj.status_code = res.status;
    }
    return obj;
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: text };
  }
}
async function postInternalAuthJson(path, body) {
  const url = buildInternalAuthUrl(path);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch {
    throw new ShellInternalAuthError(DEFAULT_INTERNAL_AUTH_ERROR);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: text };
  }
}
var cachedKeycloakClientToken = null;
var keycloakClientTokenPromise = null;
var cachedGuestOauthToken = null;
function clearShellInternalKcAuthCache() {
  cachedKeycloakClientToken = null;
  keycloakClientTokenPromise = null;
}
function clearShellInternalAuthCache() {
  clearShellInternalKcAuthCache();
  cachedGuestOauthToken = null;
}
function decodeJwtHeaderAlg(token) {
  try {
    const parts = token.split(".");
    if (parts.length < 1) return "";
    const base64 = parts[0].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
    const header = JSON.parse(atob(padded));
    return header.alg ?? "";
  } catch {
    return "";
  }
}
function assertKeycloakClientJwt(token) {
  if (decodeJwtHeaderAlg(token) !== "RS256") {
    throw new ShellInternalAuthError(
      "Internal auth returned the wrong token type for Keycloak client access."
    );
  }
}
async function fetchInternalKeycloakClientAccessToken(forceRefresh = false) {
  if (forceRefresh) {
    clearShellInternalKcAuthCache();
  }
  if (cachedKeycloakClientToken) {
    return cachedKeycloakClientToken;
  }
  if (keycloakClientTokenPromise) {
    return keycloakClientTokenPromise;
  }
  keycloakClientTokenPromise = (async () => {
    const data = await postInternalAuth(SHELL_INTERNAL_KC_CLIENT_PATH, forceRefresh);
    if (data.status_code === 404 || data.status_code === "404") {
      throw new ShellInternalAuthError(
        "Host proxy must map /_internal/kc-client \u2192 /api/getKeycloakClientAccessToken. See scripts/viteShellLoginProxy.mjs or docs/cakephp-shell-integration.md."
      );
    }
    const token = readAccessTokenFromResponse(data);
    if (!token) {
      const message = typeof data.message === "string" && data.message.trim() ? data.message.trim() : DEFAULT_INTERNAL_AUTH_ERROR;
      throw new ShellInternalAuthError(message);
    }
    assertKeycloakClientJwt(token);
    cachedKeycloakClientToken = token;
    return token;
  })();
  try {
    return await keycloakClientTokenPromise;
  } catch (err) {
    cachedKeycloakClientToken = null;
    keycloakClientTokenPromise = null;
    throw err;
  } finally {
    if (cachedKeycloakClientToken) {
      keycloakClientTokenPromise = null;
    }
  }
}
async function fetchInternalGuestOauthAccessToken(forceRefresh = false) {
  if (forceRefresh) {
    cachedGuestOauthToken = null;
  }
  if (cachedGuestOauthToken) {
    return cachedGuestOauthToken;
  }
  const data = await postInternalAuth(SHELL_INTERNAL_GUEST_OAUTH_PATH, forceRefresh);
  if (data.status_code === 404 || data.status_code === "404") {
    throw new ShellInternalAuthError(
      "Host proxy must map /_internal/guest-oauth \u2192 /api/oauth with server credentials. See scripts/viteShellLoginProxy.mjs."
    );
  }
  const token = readAccessTokenFromResponse(data);
  if (!token) {
    const message = typeof data.message === "string" && data.message.trim() ? data.message.trim() : DEFAULT_INTERNAL_AUTH_ERROR;
    throw new ShellInternalAuthError(message);
  }
  cachedGuestOauthToken = token;
  return token;
}

// src/components/header/login/shellLoginSecretPayload.ts
var cachedPublicKeyPem = null;
var publicKeyPromise = null;
function readConfiguredPublicKeyPem() {
  const fromShell = window.MYBHARAT_SHELL?.login?.loginPayloadPublicKey?.trim();
  if (fromShell) return fromShell;
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("login-payload-public-key")?.trim();
  if (fromHeader) return fromHeader;
  const fromMeta = document.querySelector('meta[name="mybharat-login-payload-public-key"]')?.getAttribute("content")?.trim();
  return fromMeta ?? "";
}
async function fetchPublicKeyPemFromHost() {
  const res = await postInternalAuthJson(SHELL_INTERNAL_LOGIN_PUBKEY_PATH, {});
  const pem = typeof res.public_key === "string" && res.public_key || typeof res.publicKey === "string" && res.publicKey || "";
  if (!pem.trim()) {
    throw new Error("Login encryption is not configured on the host.");
  }
  return pem.trim();
}
async function resolveLoginPayloadPublicKeyPem() {
  const configured = readConfiguredPublicKeyPem();
  if (configured) return configured;
  if (cachedPublicKeyPem) return cachedPublicKeyPem;
  if (publicKeyPromise) return publicKeyPromise;
  publicKeyPromise = fetchPublicKeyPemFromHost().then((pem) => {
    cachedPublicKeyPem = pem;
    return pem;
  });
  try {
    return await publicKeyPromise;
  } finally {
    publicKeyPromise = null;
  }
}
function pemToSpkiBuffer(pem) {
  const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----/g, "").replace(/-----END PUBLIC KEY-----/g, "").replace(/\s+/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
async function importRsaPublicKey(pem) {
  return crypto.subtle.importKey(
    "spki",
    pemToSpkiBuffer(pem),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );
}
function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
async function encryptLoginSecret(plaintext) {
  const value = plaintext.trim();
  if (!value) {
    throw new Error("Secret value is empty.");
  }
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("Secure login requires Web Crypto in this browser.");
  }
  const pem = await resolveLoginPayloadPublicKeyPem();
  const key = await importRsaPublicKey(pem);
  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    key,
    new TextEncoder().encode(value)
  );
  return {
    v: 1,
    alg: "RSA-OAEP",
    ciphertext: bufferToBase64(encrypted)
  };
}

// src/components/header/login/loginWithOtpFlow.ts
var DEFAULT_ERROR = "Something went wrong!!! Plz try again later.";
var REG_CODE_STORAGE_KEY = "mybharat_reg_code";
function isLoginOtpRedirectResult(res) {
  return "redirecting" in res && res.redirecting === true;
}
function isSuccessStatus(statusCode) {
  if (statusCode == null || statusCode === "") return false;
  const code = typeof statusCode === "string" ? Number(statusCode) : statusCode;
  return code === 200 || code === 201;
}
function readLoginFetchBase() {
  const shell = window.MYBHARAT_SHELL?.login;
  const proxy = shell?.apiProxyBaseUrl?.trim().replace(/\/$/, "");
  if (proxy) return proxy;
  const direct = shell?.apiBaseUrl?.trim().replace(/\/$/, "") || document.querySelector("mybharat-header")?.getAttribute("api-base-url")?.trim().replace(/\/$/, "") || "";
  if (!direct) return "";
  try {
    const origin = direct.includes("://") ? new URL(direct).origin : window.location.origin;
    if (origin !== window.location.origin) return "/mybharat-shell-api";
  } catch {
  }
  return direct;
}
function apiUrl(path) {
  const base = readLoginFetchBase();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
function readPagesBaseUrl() {
  const fromShell = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("login-base-url")?.trim();
  return fromHeader ? fromHeader.replace(/\/$/, "") : "";
}
function pagesUrl(path) {
  const base = readPagesBaseUrl();
  const segment = path.startsWith("/") ? path.slice(1) : path;
  if (base) return `${base}/${segment}`;
  return `/${segment}`;
}
function readCookieDomain() {
  const configured = window.MYBHARAT_SHELL?.login?.cookieDomain?.trim();
  if (configured) return configured;
  return window.location.hostname;
}
function readSessionEstablishPath() {
  return window.MYBHARAT_SHELL?.login?.sessionEstablishPath?.trim() || "/reports/establishSession";
}
async function parseJsonResponse(res, text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return {
        status_code: res.status,
        data: parsed
      };
    }
    const obj = parsed;
    if (obj.status_code == null || obj.status_code === "") {
      obj.status_code = res.status;
    }
    return obj;
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: text };
  }
}
async function postGatewayJson(path, body, bearerToken) {
  const headers = {
    "Content-Type": "Application/json",
    Accept: "Application/json"
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken.replace(/^bearer\s+/i, "").trim()}`;
  }
  let res;
  try {
    res = await fetch(apiUrl(path), {
      method: "POST",
      credentials: "omit",
      headers,
      body: JSON.stringify(body)
    });
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  return parseJsonResponse(res, await res.text());
}
function readField(obj, ...keys) {
  if (!obj || typeof obj !== "object") return void 0;
  const record = obj;
  for (const key of keys) {
    if (record[key] != null && record[key] !== "") return record[key];
  }
  return void 0;
}
function readString(obj, ...keys) {
  const value = readField(obj, ...keys);
  return value != null ? String(value) : "";
}
function unwrapDataNode(response) {
  const data = response.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data;
  }
  return {};
}
function storeRegCodeFromVerifyResponse(verify) {
  const regCode = verify.reg_code?.trim();
  if (!regCode) return;
  try {
    sessionStorage.setItem(REG_CODE_STORAGE_KEY, regCode);
  } catch {
  }
}
function readStoredRegCode() {
  try {
    return sessionStorage.getItem(REG_CODE_STORAGE_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}
function clearStoredRegCode() {
  try {
    sessionStorage.removeItem(REG_CODE_STORAGE_KEY);
  } catch {
  }
}
function detectLoginBy(identifier) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(identifier)) return "email";
  if (/^[6-9]\d{9}$/.test(identifier)) return "mobile";
  return "";
}
function decodeJwtPayload(accessToken) {
  try {
    const parts = accessToken.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}
function formatCreatedTimestamp(raw) {
  if (raw == null || raw === "") return "";
  const numeric = typeof raw === "string" ? Number(raw) : raw;
  const date = typeof numeric === "number" && !Number.isNaN(numeric) ? new Date(numeric > 1e12 ? numeric : numeric * 1e3) : new Date(String(raw));
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
function buildDlIdDetail(profile, mbToken, jwt) {
  const dlId = readString(profile, "dl_id", "dlId") || readString(jwt, "dl_id", "dlId");
  const kcId = readString(profile, "kc_id", "kcId") || readString(jwt, "sub");
  const username = readString(profile, "username", "preferred_username") || readString(jwt, "preferred_username", "username");
  return {
    dl_id: dlId,
    kc_id: kcId,
    dlId,
    kcId,
    username,
    first_name: readString(profile, "first_name", "firstName"),
    middle_name: readString(profile, "middle_name", "middleName"),
    last_name: readString(profile, "last_name", "lastName"),
    full_name: readString(profile, "screen_name", "full_name", "fullName"),
    email: readString(profile, "user_email", "email"),
    mobile: readString(profile, "user_phone", "mobile"),
    dob: readString(profile, "dob", "date_of_birth"),
    address: readString(profile, "address", "address1"),
    gender: readString(profile, "gender"),
    state_id: readString(profile, "state_id", "stateId"),
    district_id: readString(profile, "city_id", "district_id", "districtId"),
    country_id: readString(profile, "country_id", "countryId"),
    is_outside_india: readString(profile, "is_outside_india", "isOutsideIndia"),
    pincode: readString(profile, "zip", "pincode"),
    access_token: mbToken,
    demographic_status: readString(profile, "demographic_status", "demographicStatus"),
    address2: readString(profile, "address2"),
    caste_category: readString(profile, "caste_category", "casteCategory"),
    pwd_status: readString(profile, "pwd_status", "pwdStatus"),
    pwd_type: readString(profile, "pwd_type", "pwdType"),
    pwd_other_text: readString(profile, "pwd_other_text", "pwdOtherText")
  };
}
function buildUserRecord(profile, dlIdDetail, mbToken) {
  const fullName = readString(profile, "screen_name", "full_name", "FullName");
  const orgName = readString(profile, "org_name", "Org_name", "organization_name");
  return {
    ID: readString(profile, "id", "ID", "user_id"),
    Name: fullName || readString(dlIdDetail, "full_name", "username"),
    User_email: readString(profile, "user_email", "email"),
    Ministry: readString(profile, "ministry", "Ministry"),
    UserType: readString(profile, "user_type", "UserType") || "6",
    Yuva_type: readString(profile, "yuva_type", "Yuva_type"),
    created: formatCreatedTimestamp(readField(profile, "created", "created_at")),
    email_verification: readString(profile, "email_verification"),
    user_verification: readString(profile, "user_verification"),
    mmmd_reg_status: readString(profile, "mmmd_reg_status"),
    city_id: readString(profile, "city_id", "district_id"),
    state_id: readString(profile, "state_id"),
    tmp_state_name: readString(profile, "tmp_state_name"),
    tmp_city_name: readString(profile, "tmp_city_name"),
    institution_id: readString(profile, "institution_id"),
    register_as: readString(profile, "register_as"),
    user_status: readString(profile, "user_status"),
    user_phone: readString(profile, "user_phone", "mobile"),
    auth_mode: readString(profile, "auth_mode") || "otp",
    dl_id: readString(dlIdDetail, "dl_id"),
    kc_id: readString(dlIdDetail, "kc_id"),
    dlId: readString(dlIdDetail, "dlId"),
    kcId: readString(dlIdDetail, "kcId"),
    username: readString(dlIdDetail, "username"),
    FullName: fullName,
    Department: readString(profile, "department", "Department"),
    ProfilePic: readString(profile, "profile_pic", "ProfilePic"),
    otp_verfication: readString(profile, "otp_verfication") || "1",
    Gender: readString(profile, "gender", "Gender"),
    DOB: readString(profile, "dob", "DOB"),
    access_token: mbToken,
    org_name: orgName,
    Org_name: orgName,
    Org_type: readString(profile, "org_type", "Org_type"),
    demographic_status: readString(profile, "demographic_status"),
    isMentor: readString(profile, "is_mentor", "isMentor")
  };
}
function isTruthyFlag(value) {
  return value === 1 || value === "1" || value === true || value === "true";
}
function readNfyStatus(profile, user) {
  const raw = readField(profile, "nyf_status", "nyf", "nfyStatus") ?? readField(user, "nyf", "nyf_status");
  return isTruthyFlag(raw);
}
function readCvBuilderFlag(profile, user) {
  const raw = readField(profile, "cvbuilder", "cv_builder", "cvBuilder") ?? readField(user, "cvbuilder");
  return isTruthyFlag(raw);
}
function resolveAfterLoginRoute(userType, profile, user) {
  const type = userType.trim();
  if (type === "9" || type === "14") {
    return { controller: "pages", action: "organizational_dashboard" };
  }
  if (type === "17") {
    return { controller: "pages", action: "mybharat_state_dashboard" };
  }
  if (type === "11") {
    return { controller: "pages", action: "msmeverifier" };
  }
  if (type === "10") {
    return { controller: "pages", action: "dyo_dashboard" };
  }
  if (type === "1" || type === "13" || type === "15" || type === "50" || type === "102") {
    return { controller: "pages", action: "admin_dashboard" };
  }
  if (type === "6") {
    if (readCvBuilderFlag(profile, user)) {
      return { controller: "pages", action: "cvbuilder" };
    }
    return { controller: "Reports", action: "public_profile" };
  }
  if (type === "51") {
    if (readNfyStatus(profile, user)) {
      return { controller: "pages", action: "nyf_dashboard" };
    }
    return { controller: "pages", action: "organizational_dashboard" };
  }
  if (type === "18") {
    return { controller: "pages", action: "organizational_dashboard" };
  }
  return { controller: "pages", action: "dashboard" };
}
function buildSessionHints(userType, profile, user) {
  const type = userType.trim();
  const hints = {};
  if (type === "6") {
    hints.cvbuilder = readCvBuilderFlag(profile, user);
  }
  if (type === "18" || type === "51") {
    hints.nyf_status = readNfyStatus(profile, user);
  }
  if (type === "51") {
    hints.org_activity_list = [];
  }
  return Object.keys(hints).length > 0 ? hints : void 0;
}
async function fetchClientAccessToken() {
  return fetchInternalKeycloakClientAccessToken();
}
async function fetchGetUserId(dlId) {
  const base = window.MYBHARAT_SHELL?.login?.publicProfileApiBaseUrl?.trim();
  if (!base || !dlId) return "";
  const url = `${base.replace(/\/$/, "")}/getUserId`;
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ dl_id: dlId })
    });
  } catch {
    return "";
  }
  const parsed = await parseJsonResponse(res, await res.text());
  if (!isSuccessStatus(parsed.status_code)) return "";
  const data = unwrapDataNode(parsed);
  return readString(data, "id", "ID", "user_id");
}
function cookieExists(name) {
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${name}=`));
}
function setLoginAuthCookies(token, domain, encryptId) {
  const expiry = new Date(Date.now() + 1440 * 60 * 1e3).toUTCString();
  if (!cookieExists("token") && !cookieExists("token_essays")) {
    document.cookie = `token=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
    document.cookie = `token_essays=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
  }
  if (encryptId) {
    document.cookie = `encryptId=${encodeURIComponent(encryptId)};expires=${expiry};path=/;domain=${domain};`;
  }
}
function redirectToEstablishSession(body) {
  const url = pagesUrl(readSessionEstablishPath());
  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  form.style.display = "none";
  form.acceptCharset = "UTF-8";
  const payloadInput = document.createElement("input");
  payloadInput.type = "hidden";
  payloadInput.name = "payload";
  payloadInput.value = JSON.stringify(body);
  form.appendChild(payloadInput);
  const authOutputInput = document.createElement("input");
  authOutputInput.type = "hidden";
  authOutputInput.name = "auth_output";
  authOutputInput.value = JSON.stringify(body.auth_output);
  form.appendChild(authOutputInput);
  const scalarFields = [
    ["loginby", body.loginby],
    ["username", body.username],
    ["token", body.token],
    ["encryptId", body.encryptId],
    ["org_id", body.org_id != null ? String(body.org_id) : void 0],
    ["org_name", body.org_name],
    ["controller", body.after_login_route.controller],
    ["action", body.after_login_route.action],
    ["session_hints", body.session_hints ? JSON.stringify(body.session_hints) : void 0]
  ];
  for (const [name, value] of scalarFields) {
    if (value == null || value === "") continue;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}
function resolveGatewayError(res, fallback = DEFAULT_ERROR) {
  if (typeof res?.error_description === "string" && res.error_description.trim()) {
    return res.error_description.trim();
  }
  if (typeof res?.message === "string" && res.message.trim()) return res.message.trim();
  return fallback;
}
function readNestedRecord(obj, ...path) {
  let current = obj;
  for (const key of path) {
    if (!current || typeof current !== "object") return {};
    current = current[key];
  }
  return current && typeof current === "object" && !Array.isArray(current) ? current : {};
}
function readKeycloakNode(res) {
  const data = unwrapDataNode(res);
  const authOutput = readField(res, "auth_output");
  const authOutputRecord = authOutput && typeof authOutput === "object" && !Array.isArray(authOutput) ? authOutput : {};
  const candidates = [
    readNestedRecord(res, "keycloak"),
    readNestedRecord(data, "keycloak"),
    readNestedRecord(authOutputRecord, "keycloak")
  ];
  for (const node of candidates) {
    if (readString(node, "access_token", "accessToken")) return node;
  }
  return candidates.find((node) => Object.keys(node).length > 0) ?? {};
}
function readLoginTokens(res) {
  const data = unwrapDataNode(res);
  const keycloak = readKeycloakNode(res);
  const accessToken = readString(keycloak, "access_token", "accessToken") || readString(res, "access_token", "accessToken") || readString(data, "access_token", "accessToken");
  const mbToken = readString(res, "mb_token", "mbToken", "token") || readString(data, "mb_token", "mbToken", "token") || readString(keycloak, "mb_token", "mbToken") || accessToken;
  return { accessToken, mbToken };
}
async function finalizeEstablishSession(username, mbToken, accessToken, orgLogin, options) {
  if (!isSuccessStatus(orgLogin.status_code)) {
    return {
      status_code: orgLogin.status_code ?? 500,
      message: typeof orgLogin.message === "string" ? orgLogin.message : "Unable to load user profile. Please try again."
    };
  }
  const profile = unwrapDataNode(orgLogin);
  if (Object.keys(profile).length === 0) {
    return { status_code: 500, message: "User profile is empty. Please try again." };
  }
  const jwt = decodeJwtPayload(accessToken);
  const dlId = readString(jwt, "dl_id", "dlId");
  const dlIdDetail = buildDlIdDetail(profile, mbToken, jwt);
  const User = buildUserRecord(profile, dlIdDetail, mbToken);
  const loginby = detectLoginBy(username);
  if (!readString(User, "ID") && dlId) {
    const userId = await fetchGetUserId(dlId);
    if (userId) User.ID = userId;
  }
  const userType = readString(User, "UserType") || "6";
  const afterLoginRoute = resolveAfterLoginRoute(userType, profile, User);
  const sessionHints = buildSessionHints(userType, profile, User);
  const orgName = readString(User, "org_name", "Org_name");
  const orgId = readString(profile, "org_id", "organization_id", "orgId");
  const encryptId = readString(profile, "encryptId", "encrypt_id");
  if (encryptId) {
    User.encryptId = encryptId;
  }
  const authOutput = {
    status_code: 200,
    data: { dl_id_detail: dlIdDetail, User }
  };
  const establishPayload = {
    auth_output: authOutput,
    loginby,
    username,
    org_name: orgName || void 0,
    org_id: orgId || void 0,
    token: mbToken,
    encryptId: encryptId || void 0,
    after_login_route: afterLoginRoute,
    session_hints: sessionHints
  };
  if (options?.clearRegCode) {
    clearStoredRegCode();
  }
  setLoginAuthCookies(mbToken, readCookieDomain(), encryptId || void 0);
  redirectToEstablishSession(establishPayload);
  return { redirecting: true };
}
async function runLoginAfterAccessToken(username, mbToken, accessToken, clientToken, options) {
  const jwt = decodeJwtPayload(accessToken);
  const dlId = readString(jwt, "dl_id", "dlId");
  if (!dlId) {
    return { status_code: 500, message: "Unable to resolve user profile. Please try again." };
  }
  const resolvedUsername = username.trim() || readString(jwt, "preferred_username", "username") || username;
  const orgLogin = await postGatewayJson(
    "/userOrgAccessLogin",
    { dl_id: dlId },
    clientToken
  );
  return finalizeEstablishSession(resolvedUsername, mbToken, accessToken, orgLogin, options);
}
function resolveExchangeError(res) {
  return resolveGatewayError(res, DEFAULT_ERROR);
}
async function completeLoginWithOtp(username) {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: "Something went wrong! Please try again." };
  }
  let clientToken;
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  const exchange = await postGatewayJson(
    "/keycloakGetExchangeToken",
    { username, reg_code: regCode },
    clientToken
  );
  if (!isSuccessStatus(exchange.status_code)) {
    return {
      status_code: exchange.status_code ?? 401,
      message: resolveExchangeError(exchange)
    };
  }
  const { accessToken, mbToken } = readLoginTokens(exchange);
  if (!accessToken || !mbToken) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  return runLoginAfterAccessToken(username, mbToken, accessToken, clientToken, {
    clearRegCode: true
  });
}
async function completePasswordSignIn(username, password) {
  let clientToken;
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  let loginRes;
  try {
    loginRes = await postInternalAuthJson(
      SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH,
      {
        username,
        password_secret: await encryptLoginSecret(password)
      }
    );
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  const statusCode = loginRes.status_code;
  if (statusCode === 401 || statusCode === "401") {
    return { status_code: 401, message: resolveGatewayError(loginRes, "Login failed") };
  }
  const { accessToken, mbToken } = readLoginTokens(loginRes);
  if (!accessToken || !mbToken) {
    return {
      status_code: statusCode ?? 500,
      message: resolveGatewayError(loginRes, DEFAULT_ERROR)
    };
  }
  return runLoginAfterAccessToken(username, mbToken, accessToken, clientToken);
}
function readAttributeString(attributes, ...keys) {
  if (!attributes || typeof attributes !== "object") return "";
  const record = attributes;
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value) && value.length > 0) {
      const first = value[0];
      if (first != null && String(first).trim()) return String(first).trim();
    }
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}
function readKeycloakForgotPasswordUser(node) {
  if (Array.isArray(node)) {
    for (const item of node) {
      const user = readKeycloakForgotPasswordUser(item);
      if (user?.id) return user;
    }
    return null;
  }
  if (!node || typeof node !== "object") return null;
  const obj = node;
  if (typeof obj.id === "string" && obj.id.trim()) {
    return obj;
  }
  for (const key of ["data", "message", "response", "result", "user"]) {
    const nested = readKeycloakForgotPasswordUser(obj[key]);
    if (nested?.id) return nested;
  }
  return null;
}
function isForgotPasswordGatewaySuccess(response) {
  if (Array.isArray(response) && response.length > 0) return true;
  if (response && typeof response === "object") {
    return isSuccessStatus(response.status_code);
  }
  return false;
}
function isKeycloakChangePasswordSuccess(res) {
  if (isSuccessStatus(res.status_code)) return true;
  if (res.status_code != null && res.status_code !== "" && !isSuccessStatus(res.status_code)) {
    return false;
  }
  const message = res.message;
  if (typeof message !== "string" || !message.trim()) return false;
  const normalized = message.trim().toLowerCase();
  if (normalized.includes("fail") || normalized.includes("error") || normalized.includes("invalid")) {
    return false;
  }
  return normalized.includes("password changed successfully") || normalized.includes("changed successfully") || normalized === "success";
}
function readForgotPasswordIdentity(response) {
  const user = readKeycloakForgotPasswordUser(response) ?? readKeycloakForgotPasswordUser(response?.data) ?? readKeycloakForgotPasswordUser(response?.message);
  if (user?.id) {
    const dlId2 = readAttributeString(user.attributes, "dlId", "dl_id", "DLId") || readString(user, "dlId", "dl_id");
    return { userId: user.id.trim(), dlId: dlId2 };
  }
  const data = unwrapDataNode(response);
  const userId = readString(data, "userId", "user_id", "ID", "id") || readString(response, "userId", "user_id", "ID", "id");
  const dlId = readString(data, "dlId", "dl_id") || readString(response, "dlId", "dl_id");
  return { userId, dlId };
}
async function completeForgotPasswordUpdate(identifier, password) {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  let clientToken;
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  const forgotRes = await postGatewayJson(
    "/keycloakForgotPassword",
    { identifier, reg_code: regCode },
    clientToken
  );
  if (!isForgotPasswordGatewaySuccess(forgotRes)) {
    return { status_code: forgotRes.status_code ?? 500, message: DEFAULT_ERROR };
  }
  const { userId, dlId } = readForgotPasswordIdentity(forgotRes);
  if (!userId || !dlId) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  const changeRes = await postInternalAuthJson(
    SHELL_INTERNAL_CHANGE_PASSWORD_PATH,
    {
      userId,
      dlId,
      password_secret: await encryptLoginSecret(password)
    }
  );
  if (!isKeycloakChangePasswordSuccess(changeRes)) {
    return {
      status_code: changeRes.status_code ?? 500,
      message: resolveGatewayError(changeRes, DEFAULT_ERROR)
    };
  }
  clearStoredRegCode();
  return { status_code: 200, message: "success" };
}

// src/components/header/login/headerLoginFlow.ts
var HEADER_LOGIN_SIGN_IN_SELECTORS = "#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link";
var LOGIN_DATA_KEY = "loginData";
var DEFAULT_LOGIN_API_ERROR = "Something went wrong!!! Plz try again later.";
var shellLoginApiBaseUrl;
var shellLoginApiProxyBaseUrl;
var SHELL_LOGIN_API_PROXY_DEFAULT2 = "/mybharat-shell-api";
var warnedAutoLoginProxy = false;
function applyShellLoginApiConfig(apiBaseUrl, apiProxyBaseUrl) {
  const url = apiBaseUrl?.trim();
  if (url) shellLoginApiBaseUrl = url.replace(/\/$/, "");
  const proxy = apiProxyBaseUrl?.trim();
  if (proxy) shellLoginApiProxyBaseUrl = proxy.replace(/\/$/, "");
  clearShellInternalAuthCache();
}
var installed = false;
var timeRemainingHeader = 45;
var responseCount = 0;
var countdownHeader = null;
var otpLoginSendInFlight = false;
var LoginApiError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginApiError";
  }
};
function loginModalRoot() {
  return document.querySelector(".mb-common-header-login") ?? document;
}
function $(id) {
  const root = loginModalRoot();
  if (root === document) return document.getElementById(id);
  const escaped = typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(id) : id;
  return root.querySelector(`#${escaped}`);
}
function val(id) {
  return ($(id)?.value ?? "").trim();
}
function setVal(id, value) {
  const el = $(id);
  if (el) el.value = value;
}
function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}
function setHtml(id, html) {
  const el = $(id);
  if (el) el.innerHTML = html;
}
function isChecked(id) {
  return !!$(id)?.checked;
}
function setChecked(id, checked) {
  const el = $(id);
  if (el) el.checked = checked;
}
function setDisabled(id, disabled) {
  const el = $(id);
  if (el) el.disabled = disabled;
}
function showLoader() {
  const el = $("mb-common-header-loader");
  if (el) el.style.display = "flex";
}
function hideLoader() {
  const el = $("mb-common-header-loader");
  if (el) el.style.display = "none";
}
function validateEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}
function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-+=])[A-Za-z\d@$!%*?&#^()\-+=]{8,15}$/.test(password);
}
function storeLoginIdentifier(identifier) {
  try {
    localStorage.setItem(LOGIN_DATA_KEY, identifier);
  } catch {
  }
}
function readLoginIdentifier() {
  try {
    return localStorage.getItem(LOGIN_DATA_KEY) ?? "";
  } catch {
    return "";
  }
}
function clearLoginStorage() {
  try {
    localStorage.removeItem(LOGIN_DATA_KEY);
    localStorage.removeItem("user_id");
  } catch {
  }
}
function cookieExists2(name) {
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${name}=`));
}
function setAuthCookies(token, domain, encryptId) {
  const expiry = new Date(Date.now() + 1440 * 60 * 1e3).toUTCString();
  if (!cookieExists2("token") && !cookieExists2("token_essays")) {
    document.cookie = `token=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
    document.cookie = `token_essays=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
  }
  if (encryptId) {
    document.cookie = `encryptId=${encodeURIComponent(encryptId)};expires=${expiry};path=/;domain=${domain};`;
  }
}
function resolveFirebaseTrackingUserId(loginRes) {
  const data = loginRes?.data;
  if (data && typeof data === "object") {
    for (const key of ["user_id", "userId", "ID", "id"]) {
      const value = data[key];
      if (value != null && String(value).trim()) return String(value);
    }
  }
  const userData = window.USER_DATA?.ID;
  if (userData != null && String(userData).trim()) return String(userData);
  const fromShell = window.__MYBHARAT_LOGIN_USER_ID__?.trim();
  if (fromShell) return fromShell;
  return "unknown";
}
function tryFirebaseEvent(event, loginRes) {
  const setup = window.setupFirebaseUserAjaxEvents;
  if (typeof setup !== "function") return;
  const rawId = resolveFirebaseTrackingUserId(loginRes);
  const encode = window.encodeIdentifier;
  const trackingId = typeof encode === "function" ? encode(rawId) : rawId;
  setup(event, trackingId);
}
function readShellLoginApiBaseUrl() {
  if (shellLoginApiBaseUrl) return shellLoginApiBaseUrl;
  const fromShellLogin = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (fromShellLogin) return fromShellLogin.replace(/\/$/, "");
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("api-base-url")?.trim();
  if (fromHeader) return fromHeader.replace(/\/$/, "");
  const fromMeta = document.querySelector('meta[name="mybharat-shell-api-base-url"]')?.getAttribute("content")?.trim();
  return fromMeta ? fromMeta.replace(/\/$/, "") : "";
}
function readShellLoginApiProxyBaseUrl() {
  if (shellLoginApiProxyBaseUrl) return shellLoginApiProxyBaseUrl;
  const fromShell = window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("api-proxy-base-url")?.trim();
  if (fromHeader) return fromHeader.replace(/\/$/, "");
  const fromMeta = document.querySelector('meta[name="mybharat-shell-api-proxy-base"]')?.getAttribute("content")?.trim();
  return fromMeta ? fromMeta.replace(/\/$/, "") : "";
}
function resolveApiBaseOrigin(base) {
  if (typeof window === "undefined") return void 0;
  try {
    const resolved = base.includes("://") ? base : `${window.location.origin}${base.startsWith("/") ? base : `/${base}`}`;
    return new URL(resolved).origin;
  } catch {
    return void 0;
  }
}
function isCrossOriginApiBase(base) {
  if (typeof window === "undefined" || !base) return false;
  const apiOrigin = resolveApiBaseOrigin(base);
  return !!apiOrigin && apiOrigin !== window.location.origin;
}
function readShellLoginFetchBaseUrl() {
  const proxy = readShellLoginApiProxyBaseUrl();
  if (proxy) return proxy;
  const direct = readShellLoginApiBaseUrl();
  if (!direct) return "";
  if (!isCrossOriginApiBase(direct)) return direct;
  if (!warnedAutoLoginProxy && typeof console !== "undefined") {
    warnedAutoLoginProxy = true;
    console.warn(
      `[mybharat header] apiBaseUrl (${direct}) is cross-origin; login fetch uses same-origin proxy ${SHELL_LOGIN_API_PROXY_DEFAULT2}. Forward that path to the API on your dev server (see docs).`
    );
  }
  return SHELL_LOGIN_API_PROXY_DEFAULT2;
}
function syncShellLoginApiConfigFromDom() {
  const headerEl = document.querySelector("mybharat-header");
  const apiBaseUrl = headerEl?.getAttribute("api-base-url")?.trim();
  const apiProxyBaseUrl = headerEl?.getAttribute("api-proxy-base-url")?.trim();
  const baseUrl = headerEl?.getAttribute("login-base-url")?.trim();
  if (apiBaseUrl) applyShellLoginApiConfig(apiBaseUrl, apiProxyBaseUrl);
  if (!baseUrl && !apiBaseUrl && !apiProxyBaseUrl) return;
  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...baseUrl ? { baseUrl } : {},
      ...apiBaseUrl ? { apiBaseUrl } : {},
      ...apiProxyBaseUrl ? { apiProxyBaseUrl } : {}
    }
  };
}
function buildLoginApiUrl(path) {
  const base = readShellLoginFetchBaseUrl();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
function getShellApiFetchBaseUrl() {
  syncShellLoginApiConfigFromDom();
  return readShellLoginFetchBaseUrl();
}
function buildShellApiUrl(path) {
  syncShellLoginApiConfigFromDom();
  return buildLoginApiUrl(path);
}
function isSuccessStatus2(statusCode) {
  if (statusCode == null || statusCode === "") return false;
  const code = typeof statusCode === "string" ? Number(statusCode) : statusCode;
  return code === 200 || code === 201;
}
function resolveLoginApiError(res, fallback = DEFAULT_LOGIN_API_ERROR) {
  if (res && typeof res === "object") {
    if (typeof res.error_description === "string" && res.error_description.trim()) {
      return res.error_description.trim();
    }
    if (typeof res.error === "string" && res.error.trim()) {
      return res.error.trim();
    }
  }
  const message = res?.message;
  if (typeof message === "string" && message.trim()) return message.trim();
  if (message && typeof message === "object") {
    const obj = message;
    for (const key of ["message", "error", "error_description", "detail", "description"]) {
      const v = obj[key];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  }
  return fallback;
}
function resolveVerifyOtpError(res, fallback = "Please enter valid OTP.") {
  const data = res?.data;
  if (typeof data === "string" && data.trim()) return data.trim();
  if (data && typeof data === "object") {
    const parts = [];
    for (const value of Object.values(data)) {
      if (typeof value === "string" && value.trim()) parts.push(value.trim());
      else if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === "string" && item.trim()) parts.push(item.trim());
        }
      }
    }
    if (parts.length) return parts.join(" ");
  }
  return resolveLoginApiError(res, fallback);
}
function markLoginOtpVerified() {
  setText("otp-field-3_error", "");
  setVal("verify_otp_header", "1");
  timeRemainingHeader = 0;
  if (countdownHeader) clearInterval(countdownHeader);
  document.querySelectorAll(".resend_otp_header").forEach((el) => {
    el.style.display = "none";
  });
  document.querySelectorAll(".otp_timer_header").forEach((el) => {
    el.style.display = "none";
  });
  setDisabled("otp-field-3", true);
  setDisabled("btn-otp-verify-header", true);
}
var LOGIN_API_JSON_CONTENT_TYPE = "Application/json";
var LOGIN_API_FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
function normalizeBearerAccessToken2(raw) {
  if (!raw) return "";
  let token = raw.trim();
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, "").trim();
  }
  return token;
}
function parseLoginApiResponse(res, text) {
  try {
    const parsed = JSON.parse(text);
    if (parsed.status_code == null || parsed.status_code === "") {
      parsed.status_code = res.status;
    }
    return parsed;
  } catch {
    if (!res.ok) throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
    return { status_code: res.status, message: text };
  }
}
async function fetchLoginApiFormPost(path, form, bearerAccessToken) {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const token = normalizeBearerAccessToken2(bearerAccessToken);
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const url = buildLoginApiUrl(path);
  const headers = new Headers();
  headers.set("Content-Type", LOGIN_API_FORM_CONTENT_TYPE);
  headers.set("Authorization", `Bearer ${token}`);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers,
      body: new URLSearchParams(form)
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const text = await res.text();
  return parseLoginApiResponse(res, text);
}
function buildBearerJsonHeaders(bearerAccessToken) {
  const headers = new Headers();
  headers.set("Content-Type", LOGIN_API_JSON_CONTENT_TYPE);
  headers.set("Accept", LOGIN_API_JSON_CONTENT_TYPE);
  const token = normalizeBearerAccessToken2(bearerAccessToken);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}
async function fetchLoginApiJsonPost(path, body, bearerAccessToken) {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const token = normalizeBearerAccessToken2(bearerAccessToken);
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const headers = buildBearerJsonHeaders(token);
  if (!headers.has("Authorization")) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const url = buildLoginApiUrl(path);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers,
      body: JSON.stringify(body)
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const text = await res.text();
  return parseLoginApiResponse(res, text);
}
function isKeycloakUnauthorizedResponse(data) {
  if (!data || typeof data !== "object") return false;
  const obj = data;
  if (obj.status_code === 401 || obj.status_code === "401") return true;
  const err = typeof obj.error === "string" ? obj.error : "";
  return /401|unauthorized/i.test(err);
}
async function getKeycloakClientAccessToken(forceRefresh = false) {
  try {
    return await fetchInternalKeycloakClientAccessToken(forceRefresh);
  } catch (err) {
    if (err instanceof ShellInternalAuthError) {
      throw new LoginApiError(err.message);
    }
    throw err;
  }
}
async function getOauthAccessToken(forceRefresh = false) {
  try {
    return await fetchInternalGuestOauthAccessToken(forceRefresh);
  } catch (err) {
    if (err instanceof ShellInternalAuthError) {
      throw new LoginApiError(err.message);
    }
    throw err;
  }
}
function readShellClientIpAddress() {
  return window.MYBHARAT_SHELL?.login?.ipAddress?.trim() ?? "";
}
function readClientUserAgent() {
  return typeof navigator !== "undefined" ? navigator.userAgent : "";
}
var CLIENT_IP_SESSION_KEY = "mybharat_client_ip_address";
var cachedClientIpAddress = null;
var clientIpFetchPromise = null;
function readCachedClientIpFromSession() {
  try {
    return sessionStorage.getItem(CLIENT_IP_SESSION_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}
function storeClientIpCache(ip) {
  cachedClientIpAddress = ip;
  try {
    sessionStorage.setItem(CLIENT_IP_SESSION_KEY, ip);
  } catch {
  }
}
function parseIpFromJsonResponse(data) {
  if (!data || typeof data !== "object") return void 0;
  const obj = data;
  for (const key of ["ip", "ipAddress", "query", "ip_address"]) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return void 0;
}
function parseIpFromCloudflareTrace(text) {
  for (const line of text.split("\n")) {
    if (line.startsWith("ip=")) {
      const ip = line.slice(3).trim();
      if (ip) return ip;
    }
  }
  return void 0;
}
async function fetchClientIpFromPublicApi() {
  const jsonEndpoints = [
    "https://api.ipify.org?format=json",
    "https://api64.ipify.org?format=json"
  ];
  for (const url of jsonEndpoints) {
    try {
      const res = await fetch(url, { method: "GET", credentials: "omit" });
      if (!res.ok) continue;
      const data = await res.json();
      const ip = parseIpFromJsonResponse(data);
      if (ip) return ip;
    } catch {
    }
  }
  try {
    const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
      method: "GET",
      credentials: "omit"
    });
    if (res.ok) {
      const ip = parseIpFromCloudflareTrace(await res.text());
      if (ip) return ip;
    }
  } catch {
  }
  return "";
}
async function resolveClientIpAddress() {
  const fromShell = readShellClientIpAddress();
  if (fromShell) return fromShell;
  if (cachedClientIpAddress) return cachedClientIpAddress;
  const fromSession = readCachedClientIpFromSession();
  if (fromSession) {
    cachedClientIpAddress = fromSession;
    return fromSession;
  }
  if (!clientIpFetchPromise) {
    clientIpFetchPromise = fetchClientIpFromPublicApi().finally(() => {
      clientIpFetchPromise = null;
    });
  }
  const ip = await clientIpFetchPromise;
  if (ip) storeClientIpCache(ip);
  return ip;
}
function prefetchClientIpAddress() {
  void resolveClientIpAddress();
}
async function fetchCheckUserExists(identifier, accessToken) {
  return fetchLoginApiJsonPost("/checkUserExists", { identifier }, accessToken);
}
function handleLoginRedirect(signInJsonObj) {
  const fromQuiz = localStorage.getItem("fromQuiz");
  const returnUrl = localStorage.getItem("fromOrg");
  const quizId = localStorage.getItem("quizId");
  const designForBharat = localStorage.getItem("design_for_bharat") === "true";
  const hackForSocial = localStorage.getItem("hack_for_social_cause") === "true";
  const baseUrl = window.MYBHARAT_SHELL?.login?.baseUrl ?? "/";
  if (hackForSocial) {
    localStorage.removeItem("hack_for_social_cause");
    window.location.href = `${baseUrl}pages/podcasts`;
    return;
  }
  if (designForBharat) {
    localStorage.removeItem("design_for_bharat");
    window.location.href = `${baseUrl}pages/design_for_bharat`;
    return;
  }
  if (returnUrl && quizId != null) {
    window.location.href = returnUrl;
    return;
  }
  if (fromQuiz && window.location.href.includes("quiz") && quizId != null) {
    hideBootstrapModal("signInModal");
    hideBootstrapModal("loginWithOtpModal");
    hideBootstrapModal("loginWIthOtpVerifyModal");
    window.location.reload();
    return;
  }
  if (signInJsonObj.redirect_url && signInJsonObj.token && signInJsonObj.domain) {
    setAuthCookies(signInJsonObj.token, signInJsonObj.domain, signInJsonObj.encryptId);
    const matches = document.cookie.match(/(?:^|; )essay_redirect_url=([^;]*)/);
    if (matches) {
      document.cookie = "essay_redirect_url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = decodeURIComponent(matches[1]);
      return;
    }
    const fromGamification = localStorage.getItem("fromGamification");
    if (fromGamification) {
      localStorage.removeItem("fromGamification");
      window.location.href = fromGamification;
      return;
    }
    window.location.href = signInJsonObj.redirect_url;
    return;
  }
  if (signInJsonObj.controller && signInJsonObj.action) {
    window.location.href = `${baseUrl}${signInJsonObj.controller}/${signInJsonObj.action}`;
    return;
  }
  window.location.href = baseUrl;
}
function startTimerHeader() {
  document.querySelectorAll(".resend_otp_header").forEach((el) => {
    el.style.display = "none";
  });
  document.querySelectorAll(".otp_timer_header").forEach((el) => {
    el.style.display = "block";
  });
  updateTimerHeader();
  if (countdownHeader) clearInterval(countdownHeader);
  countdownHeader = setInterval(updateTimerHeader, 1e3);
}
function updateTimerHeader() {
  const label = `Resend OTP in 00:${timeRemainingHeader}`;
  setText("timerHeader", label);
  setText("timerHeaderOtp", label);
  if (timeRemainingHeader > 0) {
    timeRemainingHeader -= 1;
    return;
  }
  if (countdownHeader) clearInterval(countdownHeader);
  document.querySelectorAll(".otp_timer_header").forEach((el) => {
    el.style.display = "none";
  });
  if (val("verified_otp_header") === "1") {
    document.querySelectorAll(".resend_otp_header").forEach((el) => {
      el.style.display = "none";
    });
  } else {
    document.querySelectorAll(".resend_otp_header").forEach((el) => {
      el.style.display = "block";
    });
    const alertEl = $("alertDivHeader");
    if (alertEl) alertEl.style.display = "none";
  }
}
function resetOtpLoginForm() {
  setVal("otp_login_header", "");
  setText("otp_login_header_error", "");
  setChecked("consentCheck1", false);
  loginModalQueryAll(".login_otp_header").forEach((el) => {
    el.disabled = true;
  });
}
function openLoginWithOtpModalNow() {
  if (!document.getElementById("loginWithOtpModal")) return;
  resetOtpLoginForm();
  hideBootstrapModal("mobileMenuNew");
  showBootstrapModal("loginWithOtpModal");
  window.dispatchEvent(new CustomEvent("mb:open-login", { bubbles: true, detail: { mode: "otp" } }));
}
function openLoginWithOtpModal() {
  if (document.getElementById("loginWithOtpModal")) {
    openLoginWithOtpModalNow();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById("loginWithOtpModal")) {
      window.clearInterval(timer);
      openLoginWithOtpModalNow();
      return;
    }
    if (Date.now() - started >= 8e3) {
      window.clearInterval(timer);
    }
  }, 50);
}
function openSignInPasswordModal() {
  if (!document.getElementById("signInModal")) return;
  hideBootstrapModal("mobileMenuNew");
  showBootstrapModal("signInModal", { backdrop: "static", keyboard: false });
  window.dispatchEvent(new CustomEvent("mb:open-login", { bubbles: true, detail: { mode: "password" } }));
}
function togglePasswordField(inputId, toggleId) {
  const input = $(inputId);
  const toggle = $(toggleId);
  if (!input || !toggle) return;
  const icon = toggle.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon?.classList.replace("bi-eye-slash", "bi-eye");
  } else {
    input.type = "password";
    icon?.classList.replace("bi-eye", "bi-eye-slash");
  }
}
function loginModalQueryAll(selector) {
  const root = loginModalRoot();
  if (root === document) return document.querySelectorAll(selector);
  return root.querySelectorAll(selector);
}
function validateOtpLoginInput() {
  const input = val("otp_login_header");
  const isEmail = validateEmail(input);
  const isMobile = validatePhone(input);
  const consent = isChecked("consentCheck1");
  const err = $("otp_login_header_error");
  const buttons = loginModalQueryAll(".login_otp_header");
  if ((isEmail || isMobile) && consent) {
    if (err) err.style.display = "none";
    buttons.forEach((b) => {
      b.disabled = false;
    });
  } else if (!consent && (isEmail || isMobile)) {
    setText("otp_login_header_error", "Please check the consent box");
    if (err) err.style.display = "block";
    buttons.forEach((b) => {
      b.disabled = true;
    });
  } else {
    setText("otp_login_header_error", "Please enter valid Mobile / Email");
    if (err) err.style.display = "block";
    buttons.forEach((b) => {
      b.disabled = true;
    });
  }
}
function validatePasswordLoginForm() {
  const username = val("username");
  const password = val("password");
  const consent = isChecked("consentCheck2");
  const btn = $("signInButton");
  const err = $("user_mobile_header_error_login");
  if (username && password && consent) {
    setText("user_mobile_header_error_login", "");
    if (err) err.style.display = "none";
    if (btn) btn.disabled = false;
  } else {
    setText("user_mobile_header_error_login", "All inputs are mandatory!");
    if (err) err.style.display = "block";
    if (btn) btn.disabled = true;
  }
}
function buildSendMobileGuestUserOtpForm(data, ipAddress) {
  const form = {
    ip_address: ipAddress,
    user_agent: readClientUserAgent()
  };
  const phone = data.user_phone?.trim();
  const email = data.user_email?.trim();
  if (phone) {
    form.user_phone = phone;
  } else if (email) {
    form.user_email = email;
  }
  return form;
}
async function sendGuestOtp(data) {
  const ipAddress = await resolveClientIpAddress();
  if (!ipAddress) {
    return {
      status_code: 400,
      message: "Unable to detect your IP address. Please try again."
    };
  }
  const form = buildSendMobileGuestUserOtpForm(data, ipAddress);
  if (!form.user_phone && !form.user_email) {
    return {
      status_code: 400,
      message: "Please enter valid Mobile / Email"
    };
  }
  try {
    let accessToken = await getOauthAccessToken();
    let res = await fetchLoginApiFormPost(
      "/sendMobileGuestUserOtp",
      form,
      accessToken
    );
    if (isKeycloakUnauthorizedResponse(res)) {
      accessToken = await getOauthAccessToken(true);
      res = await fetchLoginApiFormPost(
        "/sendMobileGuestUserOtp",
        form,
        accessToken
      );
    }
    return res;
  } catch (err) {
    const message = err instanceof LoginApiError ? err.message : DEFAULT_LOGIN_API_ERROR;
    return { status_code: 500, message };
  }
}
async function verifyGuestUserOtp(identifier, otp) {
  try {
    const otpSecret = await encryptLoginSecret(otp);
    const body = {
      otp_secret: otpSecret
    };
    if (validateEmail(identifier)) {
      body.user_email = identifier;
      body.user_phone = "";
    } else if (validatePhone(identifier)) {
      body.user_phone = identifier;
      body.user_email = "";
    } else {
      body.user_email = identifier;
      body.user_phone = "";
    }
    return await postInternalAuthJson(SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH, body);
  } catch (err) {
    const message = err instanceof Error ? err.message : DEFAULT_LOGIN_API_ERROR;
    return { status_code: 500, message };
  }
}
function readKeycloakGivenData(message) {
  if (message && typeof message === "object" && "given_data" in message) {
    return message.given_data;
  }
  return void 0;
}
async function checkUserInKeycloak(identifier) {
  try {
    let accessToken = await getKeycloakClientAccessToken();
    let check = await fetchCheckUserExists(identifier, accessToken);
    if (isKeycloakUnauthorizedResponse(check)) {
      clearShellInternalKcAuthCache();
      accessToken = await getKeycloakClientAccessToken(true);
      check = await fetchCheckUserExists(identifier, accessToken);
    }
    if (!isSuccessStatus2(check.status_code)) {
      return {
        ...check,
        status_code: check.status_code ?? 500,
        message: resolveLoginApiError(check)
      };
    }
    return check;
  } catch (err) {
    const message = err instanceof LoginApiError ? err.message : DEFAULT_LOGIN_API_ERROR;
    return { status_code: 500, message };
  }
}
function buildOtpPayload(identifier, givenData) {
  if (givenData === "Mobile" || validatePhone(identifier)) {
    setText("mobEmailHeader", "Mobile Number");
    setText("mobEmailConfirm", "Mobile Number");
    return { user_phone: identifier };
  }
  setText("mobEmailHeader", "Email Id");
  setText("mobEmailConfirm", "Email ID");
  return { user_email: identifier };
}
async function handleForgotPasswordGetOtp() {
  const identifier = val("user_mobile_header");
  if (!identifier) return;
  storeLoginIdentifier(identifier);
  showLoader();
  setText("user_mobile_header_error", "");
  try {
    const check = await checkUserInKeycloak(identifier);
    if (!isSuccessStatus2(check.status_code)) {
      setText("user_mobile_header_error", resolveLoginApiError(check));
      return;
    }
    const given = readKeycloakGivenData(check.message);
    const payload = buildOtpPayload(identifier, given);
    const otpRes = await sendGuestOtp(payload);
    if (isSuccessStatus2(otpRes.status_code)) {
      timeRemainingHeader = 45;
      startTimerHeader();
      setDisabled("user_mobile_header", true);
      document.querySelectorAll(".generate_otp_header").forEach((el) => {
        el.disabled = true;
      });
      switchBootstrapModal("forgotPwdModal", "otpVerifyForgotPwdModal", 200);
      setVal("otp-field-2", "");
      setDisabled("btn-verify-otp-header", false);
    } else {
      setText("user_mobile_header_error", String(otpRes.message ?? "Failed to send OTP"));
    }
  } finally {
    hideLoader();
  }
}
function validateOtpLoginForm() {
  validateOtpLoginInput();
}
function submitOtpLoginFromModal() {
  validateOtpLoginInput();
  const btn = loginModalQueryAll(".login_otp_header")[0];
  if (btn?.disabled) return;
  void handleOtpLoginSend();
}
async function handleOtpLoginSend() {
  if (otpLoginSendInFlight) return;
  const identifier = val("otp_login_header");
  if (!identifier) return;
  otpLoginSendInFlight = true;
  storeLoginIdentifier(identifier);
  showLoader();
  loginModalQueryAll(".login_otp_header").forEach((el) => {
    el.disabled = true;
  });
  try {
    const check = await checkUserInKeycloak(identifier);
    if (!isSuccessStatus2(check.status_code)) {
      setText("otp_login_header_error", resolveLoginApiError(check));
      return;
    }
    const given = readKeycloakGivenData(check.message);
    const payload = buildOtpPayload(identifier, given);
    const otpRes = await sendGuestOtp(payload);
    if (isSuccessStatus2(otpRes.status_code)) {
      timeRemainingHeader = 45;
      startTimerHeader();
      switchBootstrapModal("loginWithOtpModal", "loginWIthOtpVerifyModal", 200);
      setVal("otp-field-3", "");
      setText("otp-field-3_error", "");
    } else {
      setText("otp_login_header_error", String(otpRes.message ?? "Please check Mobile / Email you entered!"));
    }
  } finally {
    otpLoginSendInFlight = false;
    hideLoader();
    validateOtpLoginInput();
  }
}
function otpPayloadForStoredIdentifier() {
  const identifier = readLoginIdentifier();
  if (validatePhone(identifier)) return { user_phone: identifier };
  if (validateEmail(identifier)) return { user_email: identifier };
  return { user_email: identifier };
}
async function handleResendOtp() {
  if (timeRemainingHeader > 0) return;
  timeRemainingHeader = 45;
  const payload = otpPayloadForStoredIdentifier();
  const res = await sendGuestOtp(payload);
  if (isSuccessStatus2(res.status_code)) {
    startTimerHeader();
    setText("otp-field-2_error", "");
    setText("otp-field-3_error", "");
  }
}
async function handleVerifyForgotOtp() {
  const identifier = readLoginIdentifier() || val("user_mobile_header");
  const otp = val("otp-field-2");
  if (!otp) {
    setText("otp-field-2_error", "Please enter OTP");
    return;
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    setText("otp-field-2_error", "Please enter 6 digit OTP");
    return;
  }
  const verify = await verifyGuestUserOtp(identifier, otp);
  if (isSuccessStatus2(verify.status_code)) {
    storeRegCodeFromVerifyResponse(verify);
    setText("otp-field-2_error", "");
    setVal("verified_otp_header", "1");
    timeRemainingHeader = 0;
    setDisabled("user_mobile_header", true);
    setDisabled("btn-verify-otp-header", true);
    switchBootstrapModal("otpVerifyForgotPwdModal", "newPasswordModal", 200);
    setVal("newPwd", "");
    setVal("confirmPwd", "");
    return;
  }
  responseCount += 1;
  if (responseCount >= 5) {
    setHtml("otp-field-2_error", "You have reached maximum limit to verify OTP. Please try again after sometime.");
    setDisabled("btn-verify-otp-header", true);
  } else {
    setText("otp-field-2_error", "Please enter valid OTP.");
  }
}
async function handleVerifyLoginOtp() {
  const userMobile = readLoginIdentifier();
  setVal("otp_login_header", userMobile);
  setDisabled("btn-otp-verify-header", true);
  const otp = val("otp-field-3");
  if (!otp) {
    setText("otp-field-3_error", "Please enter OTP");
    setDisabled("btn-otp-verify-header", false);
    return;
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    setText("otp-field-3_error", "Please enter 6 digit OTP");
    setDisabled("btn-otp-verify-header", false);
    return;
  }
  showLoader();
  try {
    const verify = await verifyGuestUserOtp(userMobile, otp);
    if (!isSuccessStatus2(verify.status_code)) {
      responseCount += 1;
      if (responseCount >= 5) {
        document.querySelectorAll(".otp_timer_header").forEach((el) => {
          el.style.display = "none";
        });
        document.querySelectorAll(".resend_otp_header").forEach((el) => {
          el.style.display = "none";
        });
        loginModalQueryAll(".generate_otp_header").forEach((el) => {
          el.disabled = true;
        });
        setHtml(
          "otp-field-3_error",
          "You have reached maximum limit to verify OTP. Please try again after sometime."
        );
        setDisabled("btn-otp-verify-header", true);
      } else {
        setText("otp-field-3_error", resolveVerifyOtpError(verify));
        setDisabled("btn-otp-verify-header", false);
      }
      return;
    }
    markLoginOtpVerified();
    storeRegCodeFromVerifyResponse(verify);
    const loginRes = await completeLoginWithOtp(userMobile);
    clearLoginStorage();
    if (isLoginOtpRedirectResult(loginRes)) {
      tryFirebaseEvent("user_login_success");
      return;
    }
    if (isSuccessStatus2(loginRes.status_code)) {
      const redirectPayload = loginRes;
      tryFirebaseEvent("user_login_success", redirectPayload);
      handleLoginRedirect(redirectPayload);
      return;
    }
    tryFirebaseEvent("user_login_failure");
    setText("otp-field-3_error", String(loginRes.message ?? "Login failed"));
    setDisabled("btn-otp-verify-header", false);
  } finally {
    hideLoader();
  }
}
async function handleUpdatePassword() {
  const identifier = readLoginIdentifier() || val("user_mobile_header");
  const password = val("newPwd");
  const confirmPwd = val("confirmPwd");
  if (!validatePassword(password)) {
    setText("new_pwd_error", "Please follow the password policy!");
    return;
  }
  if (password !== confirmPwd) {
    setText("new_pwd_error", "Passwords do not match!");
    return;
  }
  showLoader();
  setText("new_pwd_error", "");
  try {
    const res = await completeForgotPasswordUpdate(identifier, password);
    if (isSuccessStatus2(res.status_code)) {
      switchBootstrapModal("newPasswordModal", "successModal", 200);
      return;
    }
    setText(
      "new_pwd_error",
      typeof res.message === "string" && res.message.trim() ? res.message.trim() : DEFAULT_LOGIN_API_ERROR
    );
  } finally {
    hideLoader();
  }
}
async function handlePasswordSignIn() {
  validatePasswordLoginForm();
  const username = val("username");
  const password = val("password");
  const consent = isChecked("consentCheck2");
  if (!username || !password || !consent) return;
  showLoader();
  try {
    const res = await completePasswordSignIn(username, password);
    clearLoginStorage();
    if (isLoginOtpRedirectResult(res)) {
      tryFirebaseEvent("user_login_success");
      return;
    }
    if (res.status_code === 401 || res.status_code === "401") {
      tryFirebaseEvent("user_login_failure");
      setText("user_mobile_header_error_login", String(res.message ?? "Login failed"));
      return;
    }
    tryFirebaseEvent("user_login_failure");
    setText("user_mobile_header_error_login", DEFAULT_LOGIN_API_ERROR);
  } finally {
    hideLoader();
  }
}
function onDocumentClick(e) {
  const target = e.target;
  if (!target) return;
  const signInTrigger = target.closest(HEADER_LOGIN_SIGN_IN_SELECTORS);
  if (signInTrigger) {
    e.preventDefault();
    openLoginWithOtpModal();
    return;
  }
  if (target.closest("#forgot_password")) {
    e.preventDefault();
    const username = val("username") || val("otp_login_header");
    if (username) {
      setVal("user_mobile_header", username);
      setDisabled("user_mobile_header", false);
      document.querySelectorAll(".generate_otp_header").forEach((el) => {
        el.disabled = !!username;
      });
    }
    switchBootstrapModal("signInModal", "forgotPwdModal", 0);
    return;
  }
  if (target.closest("#login_with_otp")) {
    e.preventDefault();
    const username = val("username");
    if (username) setVal("otp_login_header", username);
    switchBootstrapModal("signInModal", "loginWithOtpModal", 0);
    return;
  }
  if (target.closest("#login_with_pwd")) {
    e.preventDefault();
    const otpVal = val("otp_login_header");
    if (otpVal) setVal("username", otpVal);
    setChecked("consentCheck2", false);
    switchBootstrapModal("loginWithOtpModal", "signInModal", 0);
    return;
  }
  if (target.closest("#backToSignInModal")) {
    e.preventDefault();
    const mobile = val("user_mobile_header");
    if (mobile) {
      setVal("username", mobile);
      validatePasswordLoginForm();
    }
    switchBootstrapModal("forgotPwdModal", "signInModal", 0);
    return;
  }
  if (target.closest("#backToSignInModal2")) {
    e.preventDefault();
    switchBootstrapModal("loginWithOtpModal", "signInModal", 0);
    return;
  }
  if (target.closest("#backTologinWithOtpModal")) {
    e.preventDefault();
    setChecked("consentCheck1", false);
    switchBootstrapModal("loginWIthOtpVerifyModal", "loginWithOtpModal", 0);
    return;
  }
  if (target.closest("#backToForgotPwdModal")) {
    e.preventDefault();
    setDisabled("user_mobile_header", false);
    document.querySelectorAll(".generate_otp_header").forEach((el) => {
      el.disabled = false;
    });
    switchBootstrapModal("otpVerifyForgotPwdModal", "forgotPwdModal", 0);
    return;
  }
  if (target.closest("#backToOtpVerifyForgotPwdModal")) {
    e.preventDefault();
    setVal("otp-field-2", "");
    setDisabled("btn-verify-otp-header", false);
    switchBootstrapModal("newPasswordModal", "otpVerifyForgotPwdModal", 0);
    return;
  }
  if (target.closest("#backToNewPwdModal")) {
    e.preventDefault();
    switchBootstrapModal("successModal", "newPasswordModal", 0);
    return;
  }
  if (target.closest(".generate_otp_header")) {
    e.preventDefault();
    void handleForgotPasswordGetOtp();
    return;
  }
  if (target.closest(".login_otp_header")) {
    e.preventDefault();
    if (target.closest(".mb-common-header-login")) return;
    submitOtpLoginFromModal();
    return;
  }
  if (target.closest("#signInButton")) {
    e.preventDefault();
    void handlePasswordSignIn();
    return;
  }
  if (target.closest("#togglePassword")) {
    e.preventDefault();
    togglePasswordField("password", "togglePassword");
    return;
  }
  if (target.closest("#toggleNewPwd")) {
    e.preventDefault();
    togglePasswordField("newPwd", "toggleNewPwd");
    return;
  }
  if (target.closest("#toggleConfirmPwd")) {
    e.preventDefault();
    togglePasswordField("confirmPwd", "toggleConfirmPwd");
    return;
  }
  if (target.closest("#btn-verify-otp-header")) {
    e.preventDefault();
    void handleVerifyForgotOtp();
    return;
  }
  if (target.closest("#btn-otp-verify-header")) {
    e.preventDefault();
    void handleVerifyLoginOtp();
    return;
  }
  if (target.closest("#updatePwdButton")) {
    e.preventDefault();
    void handleUpdatePassword();
    return;
  }
  if (target.closest("#resendOTPHeader") || target.closest("#resendOTPVerifyHeader")) {
    e.preventDefault();
    void handleResendOtp();
    return;
  }
  if (target.closest("#loginNowButton")) {
    e.preventDefault();
    hideBootstrapModal("successModal");
    window.location.href = window.MYBHARAT_SHELL?.login?.baseUrl ?? "/";
    return;
  }
  if (target.closest("#close-signIn")) {
    localStorage.removeItem("fromQuiz");
    localStorage.removeItem("quizId");
    localStorage.removeItem("loginData");
    localStorage.removeItem("design_for_bharat");
    localStorage.removeItem("hack_for_social_cause");
    return;
  }
  if (target.closest("#close-otpLogin")) {
    setVal("otp_login_header", "");
    localStorage.removeItem("fromQuiz");
    localStorage.removeItem("quizId");
    localStorage.removeItem("loginData");
    localStorage.removeItem("design_for_bharat");
    localStorage.removeItem("hack_for_social_cause");
    loginModalQueryAll(".login_otp_header").forEach((el) => {
      el.disabled = true;
    });
  }
}
function onDocumentInput(e) {
  const target = e.target;
  if (!target) return;
  if (target.id === "otp_login_header" || target.id === "consentCheck1") {
    validateOtpLoginInput();
  }
  if (target.id === "username" || target.id === "password" || target.id === "consentCheck2") {
    validatePasswordLoginForm();
  }
  if (target.id === "user_mobile_header") {
    document.querySelectorAll(".generate_otp_header").forEach((el) => {
      el.disabled = !val("user_mobile_header");
    });
  }
  if (target.id === "newPwd" || target.id === "confirmPwd") {
    const password = val("newPwd");
    const confirmPassword = val("confirmPwd");
    const help = $("confirmPwdHelpBlock");
    if (!validatePassword(password)) {
      $("newPwd")?.classList.add("is-invalid");
    } else {
      $("newPwd")?.classList.remove("is-invalid");
    }
    if (password !== confirmPassword) {
      $("confirmPwd")?.classList.add("is-invalid");
      if (help) help.style.display = "block";
    } else {
      $("confirmPwd")?.classList.remove("is-invalid");
      if (help) help.style.display = "none";
    }
  }
}
function onDocumentKeyPress(e) {
  const target = e.target;
  if (target?.classList.contains("otp-field")) {
    if (e.charCode < 48 || e.charCode > 57) e.preventDefault();
  }
}
function installHeaderLoginFlow() {
  if (installed) return () => void 0;
  installed = true;
  syncShellLoginApiConfigFromDom();
  applyShellLoginApiConfig(
    window.MYBHARAT_SHELL?.login?.apiBaseUrl,
    window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl
  );
  prefetchClientIpAddress();
  document.addEventListener("click", onDocumentClick, true);
  document.addEventListener("input", onDocumentInput, true);
  document.addEventListener("change", onDocumentInput, true);
  document.addEventListener("keypress", onDocumentKeyPress, true);
  if (window.location.hash === "#login") {
    window.setTimeout(openLoginWithOtpModal, 0);
  }
  const w = window;
  w.MyBharatShell = w.MyBharatShell ?? {};
  w.MyBharatShell.openLoginModal = (mode = "otp") => {
    if (mode === "password") openSignInPasswordModal();
    else openLoginWithOtpModal();
  };
  return () => {
    installed = false;
    document.removeEventListener("click", onDocumentClick, true);
    document.removeEventListener("input", onDocumentInput, true);
    document.removeEventListener("change", onDocumentInput, true);
    document.removeEventListener("keypress", onDocumentKeyPress, true);
  };
}
function hostHasLoginModals() {
  const el = document.getElementById("loginWithOtpModal");
  return !!el && !el.closest(".mb-common-header-login");
}

// src/components/header/headerUserSession.ts
function isGuestHeaderUserPayload(input) {
  return parseHeaderUserSession(input) == null;
}
function ucfirst(value) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
var EXCLUDED_PROFILE_MENU_TYPES = /* @__PURE__ */ new Set([11, 12, 13, 14, 50]);
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readUserType(data) {
  const raw = data.user_type ?? data.userType;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : void 0;
}
function buildDisplayName(data) {
  const parts = [data.first_name, data.middle_name, data.last_name].map((p) => typeof p === "string" ? p.trim() : "").filter(Boolean);
  if (parts.length) return ucfirst(parts.join(" "));
  const screen = typeof data.screen_name === "string" ? data.screen_name.trim() : "";
  if (screen) return ucfirst(screen);
  const username = typeof data.username === "string" ? data.username.trim() : "";
  if (username) return username;
  return "User";
}
function resolveUserType(data) {
  const explicit = readUserType(data);
  if (explicit != null) return explicit;
  if (typeof data.yuva_type === "string" && data.yuva_type.trim()) return 6;
  return void 0;
}
function parseUserId(data) {
  const raw = data.id;
  if (typeof raw === "number" && Number.isFinite(raw) && raw > 0) return raw;
  if (typeof raw === "string" && raw.trim() !== "") {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}
function isEmptyUserData(data) {
  if (data == null) return true;
  if (!isRecord(data)) return true;
  if (Object.keys(data).length === 0) return true;
  return parseUserId(data) == null;
}
function unwrapUserData(input) {
  if (input == null) return null;
  if (isRecord(input) && "displayName" in input && typeof input.id === "number") {
    return null;
  }
  if (isRecord(input) && "data" in input) {
    if (isEmptyUserData(input.data)) return null;
    return input.data;
  }
  if (isRecord(input)) {
    if (isEmptyUserData(input)) return null;
    return input;
  }
  return null;
}
function normalizeSession(data) {
  if (isEmptyUserData(data)) return null;
  const id = parseUserId(data);
  if (id == null) return null;
  const displayName = buildDisplayName(data);
  if (!displayName.trim()) return null;
  const profilePic = typeof data.profile_pic === "string" && data.profile_pic.trim() || typeof data.profile_pic_path === "string" && data.profile_pic_path.trim() || null;
  return {
    id,
    dlId: typeof data.dl_id === "string" ? data.dl_id : void 0,
    displayName,
    username: typeof data.username === "string" ? data.username : void 0,
    email: typeof data.user_email === "string" ? data.user_email : void 0,
    profilePic,
    publicProfileUrl: typeof data.public_profile === "string" ? data.public_profile : void 0,
    myBharatId: typeof data.my_bharat_id === "string" ? data.my_bharat_id : void 0,
    userType: resolveUserType(data),
    orgType: typeof data.org_type === "string" && data.org_type || typeof data.orgType === "string" && data.orgType || void 0
  };
}
function parseHeaderUserSession(input) {
  if (input == null) return null;
  if (isRecord(input) && "displayName" in input && typeof input.id === "number") {
    return input;
  }
  const data = unwrapUserData(input);
  if (!data) return null;
  return normalizeSession(data);
}
function isHeaderUserLoggedIn(input) {
  return parseHeaderUserSession(input) != null;
}
function headerUserInitial(user) {
  const ch = user.displayName.trim().charAt(0);
  return ch ? ch.toUpperCase() : "U";
}
function headerUserDisplayName(user, maxLength = 20) {
  const name = user.displayName.trim();
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
}
function buildHeaderProfileMenuItems(user, options) {
  const webroot = (options?.webroot ?? "/").replace(/\/?$/, "/");
  const items = [];
  const userType = user.userType;
  if (userType == null || !EXCLUDED_PROFILE_MENU_TYPES.has(userType)) {
    if (userType === 6) {
      items.push({
        href: user.publicProfileUrl ?? "/youth-profile",
        label: "MY Bharat Profile",
        iconClass: "fa fa-th-large",
        external: Boolean(user.publicProfileUrl?.startsWith("http"))
      });
    } else {
      items.push({
        href: "/dashboard",
        label: "Dashboard",
        iconClass: "fa fa-th-large"
      });
    }
    if (userType != null && userType !== 6) {
      items.push(
        {
          href: `${webroot}users/editpartnerprofile`,
          label: "My Account",
          iconClass: "fa fa-user"
        },
        {
          href: `${webroot}reports/partner_profile`,
          label: "View Profile",
          iconClass: "fa fa-user"
        }
      );
    }
  }
  items.push({
    href: `${webroot}users/check_user_logout`,
    label: "Log Out",
    iconClass: "fa fa-power-off",
    className: "firebase-profile-logout-btn"
  });
  return items;
}
function encodeHeaderUserIdForLogout(userId) {
  if (typeof window !== "undefined" && typeof window.encodeIdentifier === "function") {
    try {
      return window.encodeIdentifier(String(userId));
    } catch {
    }
  }
  return String(userId);
}

// src/components/header/HeaderProfileMenu.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function ProfileAvatar({ user }) {
  const initial = headerUserInitial(user);
  const pic = user.profilePic?.trim();
  return /* @__PURE__ */ jsx5("div", { className: "user-info-wrapper", children: /* @__PURE__ */ jsx5("div", { className: "profile-wrapper", id: "profileMenuUserNameContatiner", children: pic ? /* @__PURE__ */ jsx5("img", { src: pic, className: "profileimage", width: 40, height: 40, alt: "" }) : /* @__PURE__ */ jsx5("span", { className: "mb-common-header__profile-initial", "aria-hidden": "true", children: initial }) }) });
}
function MenuLink({
  item,
  userId,
  dismissModal,
  className
}) {
  const isLogout = item.className?.includes("firebase-profile-logout-btn");
  const linkClass = [className, item.className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs5(
    "a",
    {
      href: item.href,
      className: linkClass || void 0,
      "data-bs-dismiss": dismissModal ? "modal" : void 0,
      "data-userid": isLogout ? encodeHeaderUserIdForLogout(userId) : void 0,
      ...item.external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: [
        /* @__PURE__ */ jsx5("i", { className: item.iconClass, "aria-hidden": "true" }),
        "\xA0\xA0",
        item.label
      ]
    }
  );
}
function HeaderProfileMenu({ user, webroot, variant = "desktop" }) {
  const items = buildHeaderProfileMenuItems(user, { webroot });
  const displayName = headerUserDisplayName(user);
  if (variant === "mobile") {
    return /* @__PURE__ */ jsx5("div", { className: "m-menu border-top mt-2 pt-2 mb-common-header__mobile-profile", children: /* @__PURE__ */ jsx5("ul", { className: "list-unstyled mb-0", children: items.map((item) => /* @__PURE__ */ jsx5("li", { className: "border-bottom", children: /* @__PURE__ */ jsx5(
      MenuLink,
      {
        item,
        userId: user.id,
        dismissModal: true,
        className: "mbv_yuva_drop text-decoration-none text-reset d-block py-2"
      }
    ) }, item.href + item.label)) }) });
  }
  return /* @__PURE__ */ jsxs5("div", { className: "dropdown chat-toggler header_img mb-common-header__profile", children: [
    /* @__PURE__ */ jsxs5(
      "a",
      {
        href: "#",
        className: "mb-common-header__profile-toggle text-decoration-none",
        id: "user-options",
        role: "button",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false",
        onClick: (e) => e.preventDefault(),
        children: [
          /* @__PURE__ */ jsx5(ProfileAvatar, { user }),
          /* @__PURE__ */ jsxs5("div", { className: "user-details", children: [
            /* @__PURE__ */ jsx5("p", { className: "mb-common-header__welcome-label", children: "Welcome" }),
            /* @__PURE__ */ jsx5("div", { className: "username", children: displayName })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx5("ul", { className: "dropdown-menu dropdown-menu-end pull-right", role: "menu", "aria-labelledby": "user-options", children: items.map((item) => /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsx5(MenuLink, { item, userId: user.id }) }, item.href + item.label)) })
  ] });
}

// src/components/MobileMenuModal.tsx
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function collapseDomId(path) {
  return `mb-mnav-${path.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}
function MobileNavLinkRow({ item }) {
  const { href, external } = getNavLinkAttrs(item, "MobileMenuModal");
  const aClass = ["fontchange14", "text-decoration-none", "text-reset", item.linkClassName].filter(Boolean).join(" ");
  const spanClass = ["d-block", "py-2", item.spanClassName].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx6(
    "a",
    {
      href,
      className: aClass,
      "data-bs-dismiss": "modal",
      style: { marginLeft: 0 },
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: /* @__PURE__ */ jsx6("span", { className: spanClass, style: { marginLeft: 0 }, children: item.label })
    }
  );
}
function MobileNavNode({ item, segments }) {
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(MobileNavLinkRow, { item }) });
  }
  const path = navTreeItemKey(item, segments);
  const collapseId = collapseDomId(path);
  return /* @__PURE__ */ jsxs6("li", { className: "border-0", children: [
    /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        className: "w-100 text-start border-0 bg-transparent fontchange14 text-reset py-2 px-0 d-flex align-items-center justify-content-between",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${collapseId}`,
        "aria-expanded": "false",
        "aria-controls": collapseId,
        children: [
          /* @__PURE__ */ jsx6("span", { children: item.label }),
          /* @__PURE__ */ jsx6("i", { className: "fa fa-chevron-down small", "aria-hidden": "true" })
        ]
      }
    ),
    /* @__PURE__ */ jsx6("div", { id: collapseId, className: "collapse", children: /* @__PURE__ */ jsx6("ul", { className: "list-unstyled mb-0 ps-3 pb-1 border-start ms-1", children: item.children.map((child, j) => {
      const childSegments = [...segments, j];
      return /* @__PURE__ */ jsx6(MobileNavNode, { item: child, segments: childSegments }, navTreeItemKey(child, childSegments));
    }) }) })
  ] });
}
var MobileMenuModal = ({
  cdnBase,
  items,
  userSession,
  webroot
}) => {
  const tree = React2.useMemo(() => normalizeNavTree(items), [items]);
  const user = parseHeaderUserSession(userSession);
  return /* @__PURE__ */ jsx6(
    "div",
    {
      className: "modal left fade",
      id: "mobileMenuNew",
      tabIndex: -1,
      "aria-labelledby": "mobileMenuNewLabel",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx6("div", { className: "modal-dialog", children: /* @__PURE__ */ jsxs6("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsxs6("div", { className: "modal-header align-items-center border-0 pb-0", children: [
          /* @__PURE__ */ jsx6("h5", { className: "modal-title flex-grow-1 mb-0", id: "mobileMenuNewLabel", children: /* @__PURE__ */ jsx6("div", { className: "logo", children: /* @__PURE__ */ jsx6("a", { href: "/", "data-bs-dismiss": "modal", children: /* @__PURE__ */ jsx6(
            "img",
            {
              src: `${cdnBase}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`,
              className: "logo-w-sm-md-sec",
              alt: "MY Bharat"
            }
          ) }) }) }),
          /* @__PURE__ */ jsx6("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "modal-body pt-2", children: [
          /* @__PURE__ */ jsx6("div", { className: "m-menu", children: /* @__PURE__ */ jsx6("ul", { className: "list-unstyled mb-0", children: tree.map((item, i) => {
            const segments = [i];
            return /* @__PURE__ */ jsx6(MobileNavNode, { item, segments }, navTreeItemKey(item, segments));
          }) }) }),
          !user ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
            /* @__PURE__ */ jsx6("div", { className: "m-menu border-top mt-2 pt-2", children: /* @__PURE__ */ jsxs6("ul", { className: "list-unstyled mb-0", children: [
              /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(
                "a",
                {
                  className: "mbv_yuva_drop border-bottom text-decoration-none text-reset d-block",
                  href: "#",
                  id: "signInLink",
                  style: { borderBottom: "1px solid #D7D7D7" },
                  onClick: (e) => {
                    e.preventDefault();
                    openLoginWithOtpModal();
                  },
                  children: /* @__PURE__ */ jsx6("span", { className: "lang_yuva_register_login_link d-block py-2", style: { marginLeft: 0 }, children: "Sign In" })
                }
              ) }),
              /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(
                "a",
                {
                  className: "mbv_yuva_drop border-bottom text-decoration-none text-reset d-block",
                  href: "/yuva_register",
                  "data-bs-dismiss": "modal",
                  style: { borderBottom: "1px solid #D7D7D7" },
                  children: /* @__PURE__ */ jsx6("span", { className: "lang_register d-block py-2", style: { marginLeft: 0 }, children: "Register Now" })
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx6("div", { className: "accordion mt-2", id: "accordionExamples", children: /* @__PURE__ */ jsxs6("div", { className: "accordion-item border-0", children: [
              /* @__PURE__ */ jsx6("h2", { className: "accordion-header", id: "headingTwos", children: /* @__PURE__ */ jsx6(
                "button",
                {
                  className: "accordion-button collapsed",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#collapseTwos",
                  "aria-expanded": "false",
                  "aria-controls": "collapseTwos",
                  children: /* @__PURE__ */ jsx6("span", { className: "lang_register", children: "Get Started" })
                }
              ) }),
              /* @__PURE__ */ jsx6(
                "div",
                {
                  id: "collapseTwos",
                  className: "accordion-collapse collapse",
                  "aria-labelledby": "headingTwos",
                  "data-bs-parent": "#accordionExamples",
                  children: /* @__PURE__ */ jsxs6("div", { className: "accordion-body", children: [
                    /* @__PURE__ */ jsxs6(
                      "a",
                      {
                        className: "mbv_yuva_drop border-bottom text-decoration-none d-block py-2",
                        href: "/yuva_register",
                        "data-bs-dismiss": "modal",
                        style: { borderBottom: "1px solid #D7D7D7" },
                        children: [
                          /* @__PURE__ */ jsx6("span", { className: "lang_yuva", children: "Youth" }),
                          /* @__PURE__ */ jsx6("br", {}),
                          /* @__PURE__ */ jsx6("span", { className: "f-10-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs6(
                      "a",
                      {
                        className: "mbv_partner text-decoration-none d-block py-2",
                        href: "/partner_register",
                        "data-bs-dismiss": "modal",
                        style: { borderBottom: "1px solid #D7D7D7", padding: "8px 1px 3px 1px" },
                        children: [
                          /* @__PURE__ */ jsx6("span", { className: "lang_partner", children: "Partner" }),
                          /* @__PURE__ */ jsx6("br", {}),
                          /* @__PURE__ */ jsx6("span", { className: "f-10-dropdown lang_BYCN", children: "Knowledge Institution/ Businesses/Government/NGOs/Youth Club/Academia/" }),
                          /* @__PURE__ */ jsx6("br", {}),
                          /* @__PURE__ */ jsx6("span", { className: "f-10-dropdown lang_dyo_nss_register", children: "DYOs/NSS Program Officers/Placement Officers" })
                        ]
                      }
                    )
                  ] })
                }
              )
            ] }) })
          ] }) : /* @__PURE__ */ jsx6(HeaderProfileMenu, { user, webroot, variant: "mobile" })
        ] })
      ] }) })
    }
  );
};

// src/components/header/login/useHeaderLoginShell.tsx
import { useLayoutEffect as useLayoutEffect2, useState as useState2 } from "react";

// src/components/header/login/HeaderLoginModals.tsx
import { memo, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

// src/components/header/login/HeaderLogin.css
styleInject(".mb-common-header-login .uniform-modal-height .modal-dialog {\n  position: relative !important;\n}\n.mb-common-header-login .uniform-modal-height .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n.mb-common-header-login .form-check {\n  padding-right: 1.5em !important;\n}\n.mb-common-header-login .mr-button {\n  margin-right: 1.5rem;\n}\n.mb-common-header-login #forgot_password,\n.mb-common-header-login #login_with_pwd {\n  font-size: 14px;\n  color: #0b6bbe;\n  cursor: pointer;\n  margin-bottom: 0;\n}\n.mb-common-header-login #login_with_otp {\n  font-size: 14px;\n  color: #f15f22;\n  cursor: pointer;\n  margin-bottom: 0;\n}\n.mb-common-header-login .pipe {\n  color: #bbbbbb;\n}\n.mb-common-header-login hr {\n  margin: 20px 0 !important;\n}\n.mb-common-header-login #register_now {\n  color: #f15f22;\n  cursor: pointer;\n  font-weight: 500;\n}\n.mb-common-header-login a,\n.mb-common-header-login a:hover,\n.mb-common-header-login a:focus,\n.mb-common-header-login a:visited,\n.mb-common-header-login a:active {\n  text-decoration: none !important;\n}\n.mb-common-header-login .go-back {\n  cursor: pointer;\n  width: 350px;\n  color: rgba(80, 80, 80, 1);\n}\n.mb-common-header-login .input-error {\n  color: red;\n}\n.mb-common-header-login .mb-common-header-login__btn {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n  box-shadow: none !important;\n  font-weight: 600;\n  line-height: 1.25;\n}\n.mb-common-header-login .mb-common-header-login__btn:hover,\n.mb-common-header-login .mb-common-header-login__btn:focus-visible {\n  color: #f15b43 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #f15b43 !important;\n  box-shadow: none !important;\n}\n.mb-common-header-login .mb-common-header-login__btn:focus {\n  box-shadow: none !important;\n}\n.mb-common-header-login .mb-common-header-login__btn:disabled,\n.mb-common-header-login .mb-common-header-login__btn.disabled {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n  opacity: 0.65;\n}\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn {\n  --bs-btn-bg: #bc4717;\n  --bs-btn-border-color: #bc4717;\n  background-color: #bc4717 !important;\n  border-radius: 9999px !important;\n  padding: 10px 22px !important;\n  min-height: 42px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn:hover,\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn:focus-visible {\n  color: #bc4717 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #bc4717 !important;\n}\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn:disabled,\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn.disabled {\n  background-color: #bc4717 !important;\n  border: none !important;\n}\n.mb-common-header-login .form-check-input:focus {\n  box-shadow: none !important;\n}\n#mb-common-header-loader {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.3);\n  display: none;\n  justify-content: center;\n  align-items: center;\n  z-index: 3000;\n}\n#mb-common-header-loader .spinner {\n  border: 8px solid #f3f3f3;\n  border-top: 8px solid #3498db;\n  border-radius: 50%;\n  width: 50px;\n  height: 50px;\n  animation: mb-common-header-spin 1s linear infinite;\n}\n@keyframes mb-common-header-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n");

// src/components/header/login/HeaderLoginModals.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var LOGIN_BTN = "btn mb-common-header-login__btn";
function quizRegisterHref() {
  if (typeof window !== "undefined" && window.location.href.includes("/quiz")) {
    return "javascript:void(0)";
  }
  return "/yuva_register";
}
function disableShellLoginSubmitButtons() {
  document.querySelectorAll(".mb-common-header-login .login_otp_header, .mb-common-header-login .generate_otp_header").forEach((el) => {
    el.disabled = true;
  });
  const signIn = document.querySelector(".mb-common-header-login #signInButton");
  if (signIn) signIn.disabled = true;
}
function HeaderLoginModalsInner({ cdnBase, variant = "header" }) {
  useLayoutEffect(() => {
    disableShellLoginSubmitButtons();
  }, []);
  const logo = `${cdnBase}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`;
  const rootClass = variant === "header2" ? "mb-common-header-login mb-common-header-login--header2" : "mb-common-header-login";
  const content = /* @__PURE__ */ jsxs7("div", { className: rootClass, "aria-hidden": false, children: [
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "signInModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsx7("div", { className: "text-center w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", id: "close-signIn", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-1", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "signInModalLabel", children: "Login" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12 mb-3", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "username", className: "form-label", children: "Mobile / Email / Username / MY Bharat ID*" }),
            /* @__PURE__ */ jsx7("input", { type: "text", className: "form-control", id: "username", name: "username", placeholder: "Enter here" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "password", className: "form-label", children: "Password*" }),
            /* @__PURE__ */ jsxs7("div", { className: "input-group mb-3", id: "emailGroup", children: [
              /* @__PURE__ */ jsx7(
                "input",
                {
                  type: "password",
                  className: "form-control",
                  id: "password",
                  name: "password",
                  placeholder: "Enter password",
                  minLength: 8,
                  maxLength: 15
                }
              ),
              /* @__PURE__ */ jsx7("span", { className: "input-group-text", children: /* @__PURE__ */ jsx7("a", { href: "#", className: "form-control-icon", id: "togglePassword", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx7("i", { className: "bi bi-eye-slash", "aria-hidden": "true" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx7("small", { id: "user_mobile_header_error_login", className: "input-error" })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row mt-2", style: { paddingTop: "0.4rem" }, children: /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("div", { className: "alert alert-success", id: "alertDivHeader", role: "alert", style: { fontSize: 13, padding: "0.5rem 0.7rem" }, children: "To create a new password or reset your existing one, click 'Forgot Password'" }) }) }),
        /* @__PURE__ */ jsx7("div", { className: "row mt-2", children: /* @__PURE__ */ jsxs7("div", { style: { marginLeft: 23 }, children: [
          /* @__PURE__ */ jsx7("input", { className: "form-check-input", type: "checkbox", id: "consentCheck2" }),
          /* @__PURE__ */ jsxs7("label", { className: "form-check-label", htmlFor: "consentCheck2", children: [
            "I consent to",
            " ",
            /* @__PURE__ */ jsx7("a", { href: "/pages/terms_of_use", style: { color: "#0B6BBE" }, children: "terms of use" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs7("div", { className: "row mt-2", style: { paddingTop: "0.4rem" }, children: [
          /* @__PURE__ */ jsxs7("div", { className: "col-md-8 d-flex align-items-center", children: [
            /* @__PURE__ */ jsx7("p", { id: "forgot_password", title: "To create a new password or reset your existing one, click 'Forgot Password'", children: "Forgot Password" }),
            /* @__PURE__ */ jsx7("p", { className: "mx-2 pipe", children: "|" }),
            /* @__PURE__ */ jsx7("p", { id: "login_with_otp", children: "Login with OTP" })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-4", children: /* @__PURE__ */ jsx7("button", { type: "button", id: "signInButton", className: `${LOGIN_BTN} float-end w-100 firebase-user-login-btn`, children: "Login" }) })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
          /* @__PURE__ */ jsx7("hr", { style: { height: 1, borderBottom: "1px solid #666", margin: "20px 0" } }),
          /* @__PURE__ */ jsxs7("div", { style: { fontSize: 16, textAlign: "center" }, children: [
            "New User?",
            " ",
            /* @__PURE__ */ jsx7("a", { href: quizRegisterHref(), children: /* @__PURE__ */ jsx7("span", { id: "register_now", children: "Register Now" }) })
          ] })
        ] }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "forgotPwdModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backToSignInModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsx7("div", { className: "form-check mb-4", children: /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "forgotPwdModalLabel", children: "Forgot Password" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "user_mobile_header", className: "form-label", children: "Mobile / Email / Username / MY Bharat ID*" }),
            /* @__PURE__ */ jsx7("input", { type: "text", className: "form-control", id: "user_mobile_header", name: "user_mobile_header", placeholder: "Enter here..." })
          ] }),
          /* @__PURE__ */ jsx7("small", { id: "user_mobile_header_error", className: "input-error" })
        ] }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: `${LOGIN_BTN} float-end w-25 mr-button generate_otp_header mb-3`, children: "Get OTP" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "otpVerifyForgotPwdModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backToForgotPwdModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsx7("div", { className: "form-check", children: /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "otpVerifyForgotPwdModalLabel", children: "Verify Your Account" }),
          /* @__PURE__ */ jsxs7("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "otp-field-2", className: "form-label", children: "Enter OTP" }),
            /* @__PURE__ */ jsx7("div", { className: "input-group mb-3", children: /* @__PURE__ */ jsx7("input", { id: "otp-field-2", type: "text", className: "form-control otp-field", maxLength: 6, autoComplete: "off" }) }),
            /* @__PURE__ */ jsxs7("div", { className: "alert alert-success", role: "alert", style: { fontSize: 14, padding: "0.7rem 1rem" }, children: [
              "OTP has been sent to your ",
              /* @__PURE__ */ jsx7("span", { id: "mobEmailHeader" }),
              " . OTP is valid for 2 minutes"
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "forgot float-end", children: [
              /* @__PURE__ */ jsx7("div", { className: "otp_timer_header mb-3", children: /* @__PURE__ */ jsx7("p", { id: "timerHeader", style: { color: "#0B6BBE", fontSize: "0.8rem" } }) }),
              /* @__PURE__ */ jsx7("div", { className: "resend_otp_header mb-3", style: { display: "none" }, children: /* @__PURE__ */ jsx7("p", { id: "resendOTPHeader", style: { color: "#0B6BBE", cursor: "pointer", fontSize: "0.8rem" }, children: "Resend OTP" }) })
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("p", { id: "otp-field-2_error", className: "text-danger", style: { color: "#dc3545", fontSize: "0.8rem" } }) }),
            /* @__PURE__ */ jsx7("input", { type: "hidden", id: "verified_otp_header", defaultValue: "0" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", id: "btn-verify-otp-header", className: `${LOGIN_BTN} float-end w-25 mr-button mb-3`, children: "Verify OTP" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "newPasswordModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backToOtpVerifyForgotPwdModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-1", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "newPasswordModalLabel", children: "Set a New Password" }),
          /* @__PURE__ */ jsx7("div", { className: "mb-3", style: { fontSize: 15 }, children: "Create a new password. Ensure it differs from previous ones for security" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12 mb-3", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "newPwd", className: "form-label", children: "Password*" }),
            /* @__PURE__ */ jsxs7("div", { className: "input-group", children: [
              /* @__PURE__ */ jsx7("input", { type: "password", className: "form-control", id: "newPwd", name: "newPwd", minLength: 8, maxLength: 15 }),
              /* @__PURE__ */ jsx7("span", { className: "input-group-text", children: /* @__PURE__ */ jsx7("a", { href: "#", className: "form-control-icon", id: "toggleNewPwd", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx7("i", { className: "bi bi-eye-slash", "aria-hidden": "true" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "confirmPwd", className: "form-label", children: "Confirm Password*" }),
            /* @__PURE__ */ jsxs7("div", { className: "input-group mb-3", children: [
              /* @__PURE__ */ jsx7("input", { type: "password", className: "form-control", id: "confirmPwd", name: "confirmPwd", minLength: 8, maxLength: 15 }),
              /* @__PURE__ */ jsx7("span", { className: "input-group-text", children: /* @__PURE__ */ jsx7("a", { href: "#", className: "form-control-icon", id: "toggleConfirmPwd", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx7("i", { className: "bi bi-eye-slash", "aria-hidden": "true" }) }) })
            ] }),
            /* @__PURE__ */ jsx7("div", { id: "confirmPwdHelpBlock", className: "form-text", style: { display: "none", color: "red" }, children: "Passwords do not match!" })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("p", { id: "new_pwd_error", className: "text-danger", style: { color: "#dc3545", fontSize: "0.8rem" } }) })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "row mt-2", style: { paddingTop: "0.4rem" }, children: [
          /* @__PURE__ */ jsx7("div", { className: "col-md-6" }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-6", children: /* @__PURE__ */ jsx7("button", { type: "button", id: "updatePwdButton", className: `${LOGIN_BTN} float-end w-100 mb-20 firebase-user-password-update-btn`, children: "Update Password" }) })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "successModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsx7("span", { className: "go-back", id: "backToNewPwdModal" }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-1", children: [
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsx7("div", { style: { textAlign: "center", padding: 20 }, children: /* @__PURE__ */ jsx7("i", { className: "bi bi-check-circle-fill", style: { fontSize: 60, color: "#279A33" }, "aria-hidden": "true" }) }) }),
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 17, fontWeight: 500, color: "#000", textAlign: "center", paddingBottom: 20 }, children: "You have successfully changed your password." }),
        /* @__PURE__ */ jsx7("div", { style: { textAlign: "center", marginTop: 15 }, children: /* @__PURE__ */ jsx7("button", { type: "button", id: "loginNowButton", className: `${LOGIN_BTN} mb-20`, children: "Login Now" }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "loginWithOtpModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsx7("span", { className: "go-back", id: "backToSignInModal2", children: "\xA0" }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", id: "close-otpLogin", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-4", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "loginWithOtpModalLabel", children: "Login" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "otp_login_header", id: "otp_login_header_label", className: "form-label", children: "Mobile / Email*" }),
            /* @__PURE__ */ jsx7(
              "input",
              {
                type: "text",
                className: "form-control",
                id: "otp_login_header",
                name: "otp_login_header",
                placeholder: "Enter here...",
                onInput: () => validateOtpLoginForm()
              }
            )
          ] }),
          /* @__PURE__ */ jsx7("small", { id: "otp_login_header_error", className: "input-error", style: { paddingTop: 16 } })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row mt-2", children: /* @__PURE__ */ jsxs7("div", { style: { marginLeft: 23, paddingTop: 16 }, children: [
          /* @__PURE__ */ jsx7("input", { className: "form-check-input", type: "checkbox", id: "consentCheck1", onChange: () => validateOtpLoginForm() }),
          /* @__PURE__ */ jsxs7("label", { className: "form-check-label", htmlFor: "consentCheck1", children: [
            "I consent to",
            " ",
            /* @__PURE__ */ jsx7("a", { href: "/pages/terms_of_use", style: { color: "#0B6BBE" }, children: "terms of use" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs7("div", { className: "row", style: { marginTop: 20, marginBottom: 64 }, children: [
          /* @__PURE__ */ jsx7("div", { className: "col-md-8", style: { paddingTop: 6 }, children: /* @__PURE__ */ jsx7("p", { id: "login_with_pwd", children: "Login with Password" }) }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-4", children: /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              className: `${LOGIN_BTN} float-end w-100 login_otp_header firebase-user-sentOtp-btn mb-3`,
              onClick: (e) => {
                e.preventDefault();
                submitOtpLoginFromModal();
              },
              children: "Login"
            }
          ) }),
          /* @__PURE__ */ jsx7("p", { children: /* @__PURE__ */ jsx7("b", { children: "International users, please sign in using your registered Email ID only" }) })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
          /* @__PURE__ */ jsx7("hr", { style: { height: 1, borderBottom: "1px solid #666", margin: "20px 0" } }),
          /* @__PURE__ */ jsxs7("div", { style: { fontSize: 16, textAlign: "center" }, children: [
            "New User?",
            " ",
            /* @__PURE__ */ jsx7("a", { href: quizRegisterHref(), children: /* @__PURE__ */ jsx7("span", { id: "register_now", children: "Register Now" }) })
          ] })
        ] }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "loginWIthOtpVerifyModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backTologinWithOtpModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "loginWIthOtpVerifyModalLabel", children: "Verify Your Account" }),
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "otp-field-3", className: "form-label", children: "Enter OTP" }),
            /* @__PURE__ */ jsx7("div", { className: "input-group mb-3", children: /* @__PURE__ */ jsx7("input", { id: "otp-field-3", type: "text", className: "form-control otp-field", maxLength: 6, autoComplete: "off" }) }),
            /* @__PURE__ */ jsxs7("div", { className: "alert alert-success", id: "alertVerifyHeader", role: "alert", style: { fontSize: 14, padding: "0.7rem 0.8rem" }, children: [
              "OTP has been sent to your ",
              /* @__PURE__ */ jsx7("span", { id: "mobEmailConfirm" }),
              " . OTP is valid for 2 minutes"
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "forgot float-end", children: [
              /* @__PURE__ */ jsx7("div", { className: "otp_timer_header mb-3", children: /* @__PURE__ */ jsx7("p", { id: "timerHeaderOtp", style: { color: "#0B6BBE", fontSize: "0.8rem" } }) }),
              /* @__PURE__ */ jsx7("div", { className: "resend_otp_header mb-3", style: { display: "none" }, children: /* @__PURE__ */ jsx7("p", { id: "resendOTPVerifyHeader", style: { color: "#0B6BBE", cursor: "pointer", fontSize: "0.8rem" }, children: "Resend OTP" }) })
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("p", { id: "otp-field-3_error", className: "text-danger", style: { color: "#dc3545", fontSize: "0.8rem" } }) }),
            /* @__PURE__ */ jsx7("input", { type: "hidden", id: "verify_otp_header", defaultValue: "0" })
          ] })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("button", { type: "button", id: "btn-otp-verify-header", className: `${LOGIN_BTN} float-end mb-3 firebase-user-otplogin-btn`, children: "Verify OTP" }) }) }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs7("div", { style: { fontSize: 16, textAlign: "center", borderTop: "1px solid #ccc", paddingTop: 10 }, children: [
          "New User?",
          " ",
          /* @__PURE__ */ jsx7("a", { href: quizRegisterHref(), children: /* @__PURE__ */ jsx7("span", { id: "register_now", children: "Register Now" }) })
        ] }) }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { id: "mb-common-header-loader", "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "spinner" }) })
  ] });
  return createPortal(content, document.body);
}
var HeaderLoginModals = memo(HeaderLoginModalsInner);

// src/components/header/login/useHeaderLoginShell.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function useHeaderLoginShell(enabled = true) {
  const [showModals] = useState2(() => !hostHasLoginModals());
  useLayoutEffect2(() => {
    if (!enabled) return void 0;
    return installHeaderLoginFlow();
  }, [enabled]);
  return enabled && showModals;
}
function HeaderLoginShellPortal({
  cdnBase,
  enabled = true,
  variant = "header"
}) {
  const showModals = useHeaderLoginShell(enabled);
  if (!showModals) return null;
  return /* @__PURE__ */ jsx8(HeaderLoginModals, { cdnBase, variant });
}

// src/components/header/login/useHeaderLoginConfig.ts
import { useEffect as useEffect2 } from "react";
function applyHeaderLoginConfig(config) {
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const loginPayloadPublicKey = config?.loginPayloadPublicKey?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  if (!baseUrl && !apiBaseUrl && !apiProxyBaseUrl && !loginPayloadPublicKey && !ipAddress && !publicProfileApiBaseUrl && !cookieDomain) {
    return;
  }
  if (apiBaseUrl || apiProxyBaseUrl) applyShellLoginApiConfig(apiBaseUrl, apiProxyBaseUrl);
  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...baseUrl ? { baseUrl } : {},
      ...apiBaseUrl ? { apiBaseUrl } : {},
      ...apiProxyBaseUrl ? { apiProxyBaseUrl } : {},
      ...loginPayloadPublicKey ? { loginPayloadPublicKey } : {},
      ...ipAddress ? { ipAddress } : {},
      ...publicProfileApiBaseUrl ? { publicProfileApiBaseUrl } : {},
      ...cookieDomain ? { cookieDomain } : {}
    }
  };
}
function useHeaderLoginConfig(config) {
  applyHeaderLoginConfig(config);
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const loginPayloadPublicKey = config?.loginPayloadPublicKey?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  useEffect2(() => {
    applyHeaderLoginConfig({
      baseUrl,
      apiBaseUrl,
      apiProxyBaseUrl,
      loginPayloadPublicKey,
      ipAddress,
      publicProfileApiBaseUrl,
      cookieDomain
    });
  }, [
    baseUrl,
    apiBaseUrl,
    apiProxyBaseUrl,
    loginPayloadPublicKey,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain
  ]);
}

// src/components/header/HeaderAuthControls.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function HeaderAuthControls({ cdn, userSession, webroot }) {
  const user = parseHeaderUserSession(userSession);
  if (user) {
    return /* @__PURE__ */ jsx9(HeaderProfileMenu, { user, webroot, variant: "desktop" });
  }
  return /* @__PURE__ */ jsxs8(Fragment3, { children: [
    /* @__PURE__ */ jsx9(
      "button",
      {
        id: "btnGroupDrop1",
        type: "button",
        className: "btn mb-common-header__auth-btn",
        onClick: (e) => {
          e.preventDefault();
          openLoginWithOtpModal();
        },
        children: /* @__PURE__ */ jsx9("span", { className: "lang_yuva_register_login_link fontchange", children: "Sign In" })
      }
    ),
    /* @__PURE__ */ jsx9("a", { href: "/yuva_register", className: "mb-common-header__register-link text-decoration-none", children: /* @__PURE__ */ jsx9("button", { id: "btnGroupDrop2", type: "button", className: "btn mb-common-header__auth-btn", children: /* @__PURE__ */ jsx9("span", { className: "fontchange", children: "Register Now" }) }) }),
    "\xA0\xA0",
    /* @__PURE__ */ jsx9("div", { className: "btn-group", role: "group", children: /* @__PURE__ */ jsx9("div", { className: "dropdown-menu dropdown-menu-header", "aria-labelledby": "btnGroupDrop1", children: /* @__PURE__ */ jsxs8("a", { className: "dropdown-item border-bottom", href: "/yuva_register", children: [
      /* @__PURE__ */ jsx9("img", { src: `${cdn}/assets/img/yuva_landing/youth_icon1.png`, alt: "" }),
      " ",
      /* @__PURE__ */ jsx9("span", { className: "lang_yuva", children: "Youth" }),
      /* @__PURE__ */ jsx9("br", {}),
      " ",
      /* @__PURE__ */ jsx9("span", { className: "f-12-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
    ] }) }) })
  ] });
}

// src/components/Header.tsx
import { Fragment as Fragment4, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var Header = ({
  title = "MyBharat",
  cdnBase,
  mainNavItems,
  userSession,
  webroot,
  baseUrl,
  apiBaseUrl,
  apiProxyBaseUrl,
  loginPayloadPublicKey,
  ipAddress,
  publicProfileApiBaseUrl,
  cookieDomain
}) => {
  useHeaderLoginConfig({
    baseUrl,
    apiBaseUrl,
    apiProxyBaseUrl,
    loginPayloadPublicKey,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain
  });
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE).replace(/\/$/, "");
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER_MAIN_NAV;
  const loggedIn = isHeaderUserLoggedIn(userSession);
  return /* @__PURE__ */ jsxs9(Fragment4, { children: [
    /* @__PURE__ */ jsxs9("header", { id: "mb-common-header-root", className: "fixed-top shadow mb-common-header", "aria-label": title, children: [
      /* @__PURE__ */ jsx10("div", { id: "bhashini-mobile-header", className: "bhashini-plugin-container mb-common-header__bhashini-root" }),
      /* @__PURE__ */ jsx10(HeaderGovernmentStrip, { cdn }),
      /* @__PURE__ */ jsx10("div", { className: "header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area", children: /* @__PURE__ */ jsx10("div", { className: "container", children: /* @__PURE__ */ jsxs9("div", { className: "row align-items-center gx-2", children: [
        /* @__PURE__ */ jsx10(HeaderMobileStrip, { cdn, variant: "split" }),
        /* @__PURE__ */ jsx10("nav", { className: "d-none", id: "mb-nav-mobile-quick", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx10("div", { className: "col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1", children: /* @__PURE__ */ jsx10(HeaderBrandLogos, { cdn, layout: "desktop" }) }),
        /* @__PURE__ */ jsxs9("div", { className: "col-xl-10 col-lg-10 d-none d-lg-block", children: [
          /* @__PURE__ */ jsx10("div", { className: "main-menu f-hd-right d-none d-md-block", children: /* @__PURE__ */ jsxs9("nav", { className: "navbar navbar-expand-lg navbar-light", id: "mb-nav-desktop-main", "aria-label": "Main navigation", children: [
            /* @__PURE__ */ jsx10(DesktopMainNav, { items: navItems }),
            /* @__PURE__ */ jsx10(HeaderAuthControls, { cdn, userSession, webroot })
          ] }) }),
          /* @__PURE__ */ jsx10("div", { className: "f-hd-right d-sm-none1 mt-10", children: /* @__PURE__ */ jsx10("button", { type: "button", className: "btn btn-light", "data-bs-toggle": "modal", "data-bs-target": "#mobileMenuNew", children: /* @__PURE__ */ jsx10("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" }) }) })
        ] })
      ] }) }) })
    ] }),
    menuPortalReady ? createPortal2(
      /* @__PURE__ */ jsx10(MobileMenuModal, { cdnBase: cdn, items: navItems, userSession, webroot }),
      document.body
    ) : null,
    !loggedIn ? /* @__PURE__ */ jsx10(HeaderLoginShellPortal, { cdnBase: cdn, variant: "header" }) : null
  ] });
};
var Header_default = Header;

// src/components/Header2.tsx
import { createPortal as createPortal3 } from "react-dom";

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
styleInject(".main-menu ul li {\n  display: inline-block;\n  margin: 0 3px;\n  position: relative;\n  list-style: none;\n}\n.main-menu ul li a {\n  color: #000000;\n  display: list-item;\n  list-style: none;\n  line-height: 1;\n  padding: 6px 4px !important;\n  font-size: 13px;\n  font-weight: 600 !important;\n  position: relative;\n  transition: all 0.3s ease-in-out;\n  text-decoration: none !important;\n}\n.dropevent i.fa-chevron-down {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition: transform 0.3s ease-in-out;\n  margin-left: 4px;\n}\n.dropdown_evnt_prog.active > .dropevent_content {\n  display: block !important;\n}\n.dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent_content {\n  display: block !important;\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n.header-area {\n  background-size: cover;\n}\n@media (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .header-area.mb-common-header__header-area {\n    padding-top: 0.45rem !important;\n    padding-bottom: 0.45rem !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 {\n  position: relative;\n  z-index: 2;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-row--h2 {\n  align-items: center !important;\n  gap: 0.5rem;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-logos--h2 {\n  flex: 0 1 auto;\n  justify-content: flex-start;\n  align-items: center;\n  align-self: center;\n}\n@media (max-width: 991.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.25rem 0.35rem;\n    width: 100%;\n    min-width: 0;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-logos--h2 {\n    flex: 0 0 auto;\n    min-width: 0;\n    max-width: none;\n    align-items: center;\n    overflow: visible;\n    padding-right: 2px;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-actions--h2 {\n    flex: 1 1 auto;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.35rem;\n    min-width: 0;\n    float: none !important;\n    margin-top: 0 !important;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-actions--h2 #toll_mb .lang_toll_free {\n    justify-content: flex-end;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    padding-top: 0.3rem !important;\n    padding-bottom: 0.3rem !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 #toll_mb.skip01,\n.mb-common-header__mobile-bar--h2 #toll_mb.mb-common-header__toll-link--h2 {\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex: 0 1 auto;\n  min-width: 0;\n  color: rgb(13 110 253);\n  text-decoration: none !important;\n  line-height: 1;\n}\n.mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n  font-size: clamp(11px, 3vw, 14px);\n  font-weight: 700;\n  line-height: 1.15;\n  color: rgb(13 110 253);\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n  display: inline-block;\n  font-size: 0.95em;\n  line-height: 1;\n  vertical-align: middle;\n  transform: rotate(180deg);\n}\n@media (min-width: 1000px) {\n  .mb-common-header__mobile-bar--h2 #toll_mb,\n  .mb-common-header__mobile-bar--h2 #mb_menus {\n    position: static !important;\n    right: auto !important;\n    top: auto !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 #mb_menus {\n  position: static !important;\n  right: auto !important;\n  top: auto !important;\n}\n@media (max-width: 575.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.88em;\n  }\n  .dropdown-menu-header a,\n  .dropdown-item,\n  .dropdown-menu-header a.border-bottom {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n  .dropdown-menu-header a:hover,\n  .dropdown-menu-header a:focus,\n  .dropdown-item:hover,\n  .dropdown-item:focus {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n  width: auto !important;\n  height: auto !important;\n  min-width: 0 !important;\n  padding: 6px !important;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  background-color: #bc4717 !important;\n  border: none !important;\n  color: #ffffff !important;\n  border-radius: 10px !important;\n  box-shadow: none !important;\n  line-height: 1 !important;\n  flex: 0 0 auto !important;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2:hover {\n  background-color: #9a3a13 !important;\n  color: #ffffff !important;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2:focus-visible {\n  background-color: #9a3a13 !important;\n  color: #ffffff !important;\n  outline: 2px solid rgb(13 110 253);\n  outline-offset: 2px;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 .fa {\n  color: #ffffff !important;\n  font-size: 1rem;\n  line-height: 1;\n}\n@media (max-width: 575.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n    padding: 0.28rem 0.5rem !important;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 .fa,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 .fa {\n    font-size: 1rem !important;\n  }\n}\nheader.mb-common-header--header2.mb-common-header .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n  border: none !important;\n}\n.new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n}\n.new_head1 {\n  border-right: 1px solid #bdbdbd;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__register-link {\n  display: inline-block;\n  vertical-align: middle;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn {\n  --bs-btn-bg: #bc4717;\n  --bs-btn-border-color: #bc4717;\n  color: #ffffff !important;\n  background-color: #bc4717 !important;\n  border: none !important;\n  border-radius: 9999px !important;\n  padding: 10px 22px !important;\n  font-weight: 600 !important;\n  line-height: 1.25 !important;\n  box-shadow: none !important;\n  min-height: 42px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn:focus-visible,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn:focus-visible {\n  color: #bc4717 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #bc4717 !important;\n  box-shadow: none !important;\n}\n@media (min-width: 992px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n    margin-left: 7px;\n    margin-top: 5px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md1 {\n    width: 90px !important;\n  }\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n  }\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 90px !important;\n    max-width: none !important;\n    height: auto !important;\n  }\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md1,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n  flex-shrink: 1;\n  min-width: 0;\n  object-fit: contain;\n  height: auto !important;\n  max-width: none !important;\n}\n@media only screen and (max-width: 991.98px) {\n  body:has(header.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 90px !important;\n    max-width: none !important;\n    height: auto !important;\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 98px !important;\n    max-width: none !important;\n    height: auto !important;\n    transform: scale(1.12) !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n    align-items: center !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md1,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n    width: 70px !important;\n    max-width: 70px !important;\n    min-width: 0 !important;\n    height: auto !important;\n    max-height: 48px !important;\n    object-fit: contain !important;\n    transform: none !important;\n    margin-left: 0 !important;\n    margin-top: 0 !important;\n    flex-shrink: 0 !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md1,\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 70px !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md-sec,\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 70px !important;\n    transform: none !important;\n  }\n}\n.f-12-dropdown {\n  padding-left: 24px;\n  color: #000000;\n  font-weight: 400;\n  font-size: 12px;\n}\n.dropdown-menu-header {\n  background: #ffffff;\n  border: 1px solid #f15b43;\n  border-radius: 10px;\n}\n.dropdown-menu-header a.border-bottom {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a.border-bottom:hover,\n.dropdown-menu-header a.border-bottom:focus {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a {\n  padding-top: 4px;\n  padding-bottom: 10px;\n  text-decoration: none !important;\n}\n.dropdown_evnt_prog {\n  position: relative;\n  display: inline-block;\n}\n.dropevent {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  border: none;\n}\n.dropevent_content {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  min-width: 180px;\n  z-index: 1;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  left: -25px;\n}\n.dropevent_content > .fa.fa-caret-up {\n  position: absolute;\n  top: -10px;\n  left: 43%;\n  color: #bc4717;\n}\n.dropevent_content a {\n  color: black;\n  border-bottom: 1px solid #dcdcdc;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n}\n.dropevent_content a:hover {\n  background-color: #fff;\n}\n.dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.dropevent_content .dropdown_evnt_prog {\n  display: block;\n  width: 100%;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent {\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid #dcdcdc;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent_content {\n  left: 100%;\n  top: 0;\n  margin-left: 2px;\n  z-index: 2;\n}\n.dropevent_content .dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.pull-right {\n  margin-left: 30px;\n}\n.header_img {\n  text-align: center;\n  top: 0 !important;\n}\n.user-info-wrapper {\n  display: block;\n  margin: 0;\n  width: 46px;\n  height: 46px;\n  background: #6c757d8a;\n  border-radius: 50px;\n  padding: 3px;\n  float: left;\n}\n.user-info-wrapper .profile-wrapper {\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  display: inline-block;\n}\n.chat-toggler .user-details {\n  float: left;\n  line-height: 0;\n  color: #003d52;\n}\n.chat-toggler .dropdown-menu {\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.5);\n}\n.chat-toggler .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.chat-toggler .dropdown-menu[data-bs-popper] {\n  top: 92%;\n}\n.chat-toggler .dropdown-menu li {\n  display: block !important;\n}\n.chat-toggler .dropdown-menu li a i {\n  font-size: 12px;\n}\n.chat-toggler .dropdown-menu > li > a {\n  line-height: 25px !important;\n  color: #003d52 !important;\n  margin: 4px;\n  border-radius: 3px;\n  text-align: left;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  padding: 3px 20px !important;\n}\n.chat-toggler .dropdown-menu > li > a:hover {\n  text-decoration: none;\n  background-color: #eff2f3;\n  background-image: none;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  list-style: none;\n  text-shadow: none;\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.2);\n  border: none;\n  border-radius: 3px;\n  padding: 0;\n  font-size: 13px;\n}\n@media only screen and (max-width: 600px) {\n  .header-area {\n    min-height: 56px;\n  }\n}\n@media only screen and (max-width: 1000px) {\n  .header-top,\n  .main-menu {\n    display: none !important;\n  }\n  header.mb-common-header .d-sm-none1 {\n    display: block !important;\n  }\n  .header-area .justify-content-sm-end {\n    justify-content: flex-start !important;\n  }\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    gap: 0.25rem !important;\n    padding-left: 4px !important;\n    padding-right: 2px !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 > .bhashini-plugin-container.mb-common-header__bhashini-root {\n    bottom: 14px !important;\n    right: 46px !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .header-area {\n    height: 60px;\n    min-height: 56px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .header-area .container {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 > .bhashini-plugin-container.mb-common-header__bhashini-root {\n    display: inline-block !important;\n    visibility: visible !important;\n    pointer-events: auto !important;\n    position: absolute !important;\n    float: none !important;\n    right: 46px !important;\n    top: auto !important;\n    bottom: 14px !important;\n    margin: 0 !important;\n    z-index: 1001 !important;\n    line-height: 1;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 > .bhashini-plugin-container.mb-common-header__bhashini-root svg {\n    width: 24px;\n    height: 24px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__mobile-row--h2 {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.35rem !important;\n    width: 100%;\n    min-height: 52px;\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__mobile-logos--h2 {\n    flex: 0 1 auto !important;\n    align-items: center !important;\n    min-width: 0;\n    max-width: calc(100% - 158px);\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__bhashini-slot {\n    flex: 0 0 28px !important;\n    width: 28px;\n    min-width: 28px;\n    height: 24px;\n    display: inline-block;\n    margin-right: 0.1rem;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n    align-items: center !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__mobile-actions--h2 {\n    flex: 1 1 auto !important;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.4rem !important;\n    min-width: 0;\n    float: none !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus {\n    position: static !important;\n    float: none !important;\n    right: auto !important;\n    top: auto !important;\n    left: auto !important;\n    bottom: auto !important;\n    margin: 0 !important;\n    z-index: auto !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb {\n    display: inline-flex !important;\n    align-items: center !important;\n    font-size: 10px !important;\n    white-space: nowrap;\n    flex: 0 1 auto;\n    min-width: 0;\n    color: rgb(13 110 253);\n    text-decoration: none;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    line-height: 1.1 !important;\n    gap: 0.2em !important;\n    align-items: center !important;\n    display: inline-flex !important;\n    color: rgb(13 110 253);\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 auto !important;\n    width: auto !important;\n    height: auto !important;\n    min-width: 0 !important;\n    padding: 6px !important;\n    background-color: #bc4717 !important;\n    border: none !important;\n    color: #ffffff !important;\n    border-radius: 10px !important;\n    box-shadow: none !important;\n    margin-left: 0.1rem;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 .fa {\n    color: #ffffff !important;\n    font-size: 1rem !important;\n    line-height: 1 !important;\n  }\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  .bhashini-plugin-container svg path {\n    fill: #000000 !important;\n  }\n}\n@media (min-width: 1000px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 > .bhashini-plugin-container.mb-common-header__bhashini-root {\n    position: static !important;\n    float: right !important;\n    right: auto !important;\n    bottom: auto !important;\n    margin-right: 80px !important;\n    margin-top: 2px !important;\n    z-index: auto !important;\n  }\n}\n@media (min-width: 1001px) {\n  header.mb-common-header .d-sm-none1 {\n    display: none !important;\n  }\n}\n#mobileMenuNew.modal.left {\n  z-index: 1060 !important;\n}\n#mobileMenuNew.modal.left .modal-dialog {\n  position: fixed;\n  margin: auto;\n  width: 75%;\n  max-width: 420px;\n  height: 100%;\n  transform: translate3d(0%, 0, 0);\n  right: 0;\n  left: auto;\n}\n#mobileMenuNew.modal.left .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n#mobileMenuNew .modal-header .btn-close {\n  margin: -1rem -5px -0.5rem auto;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li:not(:last-child) {\n  border-bottom: 1px solid #d7d7d7;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a,\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew a,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active {\n  text-decoration: none !important;\n  color: inherit !important;\n}\n#mobileMenuNew .modal-body ul.list-unstyled li a {\n  text-decoration: none !important;\n  font-weight: 500 !important;\n  color: #333333 !important;\n}\n#mobileMenuNew .modal-body ul li a,\n#mobileMenuNew .modal-body ul li a span {\n  text-decoration: none !important;\n}\n.f-10-dropdown {\n  font-size: 10px;\n  color: #999999;\n}\n@media only screen and (max-width: 600px) {\n  #mobileMenuNew .modal-content {\n    transform: translate(100%, 0) scale(1);\n    transition: transform 0.4s ease-in-out;\n  }\n  #mobileMenuNew.modal.show .modal-content {\n    transform: translate(0, 0) scale(1);\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew .accordion-button:not(.collapsed) {\n    background-color: #bc4717 !important;\n    color: #fff !important;\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew .accordion-button::after {\n    transform: rotate(0deg);\n    transition: transform 0.3s ease-in-out;\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew .accordion-button:not(.collapsed)::after {\n    transform: rotate(-90deg);\n    transition: transform 0.3s ease-in-out;\n  }\n}\nbody:has(header.mb-common-header--header2) #mobileMenuNew [data-bs-toggle=collapse] i.fa-chevron-down {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition: transform 0.3s ease-in-out;\n}\nbody:has(header.mb-common-header--header2) #mobileMenuNew [data-bs-toggle=collapse][aria-expanded=true] i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\nbody:has(header.mb-common-header--header2) #mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li:last-child > a,\nbody:has(header.mb-common-header--header2) #mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li:last-child > a > span {\n  color: #bc4717 !important;\n}\n");

// src/components/Header2.tsx
import { Fragment as Fragment5, jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var Header2 = ({
  title = "MyBharat",
  cdnBase,
  mainNavItems,
  userSession,
  webroot,
  baseUrl,
  apiBaseUrl,
  apiProxyBaseUrl,
  loginPayloadPublicKey,
  ipAddress,
  publicProfileApiBaseUrl,
  cookieDomain
}) => {
  useHeaderLoginConfig({
    baseUrl,
    apiBaseUrl,
    apiProxyBaseUrl,
    loginPayloadPublicKey,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain
  });
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE_BETA).replace(/\/$/, "");
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems ?? DEFAULT_HEADER2_MAIN_NAV;
  const loggedIn = isHeaderUserLoggedIn(userSession);
  return /* @__PURE__ */ jsxs10(Fragment5, { children: [
    /* @__PURE__ */ jsxs10(
      "header",
      {
        id: "mb-common-header-root",
        className: "fixed-top shadow mb-common-header mb-common-header--header2",
        "aria-label": title,
        children: [
          /* @__PURE__ */ jsx11("div", { id: "bhashini-mobile-header", className: "bhashini-plugin-container mb-common-header__bhashini-root" }),
          /* @__PURE__ */ jsx11(HeaderGovernmentStrip, { cdn }),
          /* @__PURE__ */ jsx11("div", { className: "header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area", children: /* @__PURE__ */ jsx11("div", { className: "container", children: /* @__PURE__ */ jsxs10("div", { className: "row align-items-center gx-2", children: [
            /* @__PURE__ */ jsx11(HeaderMobileStrip, { cdn, variant: "h2" }),
            /* @__PURE__ */ jsx11("nav", { className: "d-none", id: "mb-nav-mobile-quick", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx11("div", { className: "col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1", children: /* @__PURE__ */ jsx11(HeaderBrandLogos, { cdn, layout: "desktop" }) }),
            /* @__PURE__ */ jsxs10("div", { className: "col-xl-10 col-lg-10 d-none d-lg-block", children: [
              /* @__PURE__ */ jsx11("div", { className: "main-menu f-hd-right d-none d-md-block", children: /* @__PURE__ */ jsxs10("nav", { className: "navbar navbar-expand-lg navbar-light", id: "mb-nav-desktop-main", "aria-label": "Main navigation", children: [
                /* @__PURE__ */ jsx11(DesktopMainNav, { items: navItems }),
                /* @__PURE__ */ jsx11(HeaderAuthControls, { cdn, userSession, webroot })
              ] }) }),
              /* @__PURE__ */ jsx11("div", { className: "f-hd-right d-sm-none1 mt-10", children: /* @__PURE__ */ jsx11("button", { type: "button", className: "btn btn-light", "data-bs-toggle": "modal", "data-bs-target": "#mobileMenuNew", children: /* @__PURE__ */ jsx11("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" }) }) })
            ] })
          ] }) }) })
        ]
      }
    ),
    menuPortalReady ? createPortal3(
      /* @__PURE__ */ jsx11(MobileMenuModal, { cdnBase: cdn, items: navItems, userSession, webroot }),
      document.body
    ) : null,
    !loggedIn ? /* @__PURE__ */ jsx11(HeaderLoginShellPortal, { cdnBase: cdn, variant: "header2" }) : null
  ] });
};
var Header2_default = Header2;

// src/components/footer/useFooterFeedbackShell.ts
import { useLayoutEffect as useLayoutEffect3 } from "react";

// src/components/footer/footerRecaptchaBridge.ts
var feedbackRecaptchaWidgetId = null;
function setFeedbackRecaptchaWidgetId(widgetId) {
  feedbackRecaptchaWidgetId = widgetId;
}
function getFeedbackRecaptchaWidgetId() {
  return feedbackRecaptchaWidgetId;
}
function isFeedbackRecaptchaRendered() {
  return !!document.querySelector("#feed_back .mb-common-footer__recaptcha iframe");
}
function resetFeedbackRecaptchaSafely() {
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha || feedbackRecaptchaWidgetId == null || !isFeedbackRecaptchaRendered()) {
    return;
  }
  try {
    grecaptcha.reset(feedbackRecaptchaWidgetId);
  } catch {
  }
}

// src/components/footer/footerFeedbackSubmit.ts
var SAVE_FEEDBACK_DATA_PATH = "/saveFeedbackData";
var TRIGGER_YOUTH_REWARD_PATH = "/trigger-youth-reward-points";
var feedbackApiBaseUrl;
var feedbackSubmitUrlOverride;
var feedbackUserSession;
var feedbackIsLoggedInOverride;
function applyFooterFeedbackApiConfig(options) {
  const apiBase = options?.feedbackApiBaseUrl?.trim();
  if (apiBase) feedbackApiBaseUrl = apiBase.replace(/\/$/, "");
  const submitUrl = options?.feedbackSubmitUrl?.trim();
  if (submitUrl) feedbackSubmitUrlOverride = submitUrl;
  if (options?.userSession !== void 0) {
    feedbackUserSession = options.userSession;
  }
  if (options?.isLoggedIn !== void 0) {
    feedbackIsLoggedInOverride = options.isLoggedIn;
  }
}
function resolveUserSession() {
  if (feedbackUserSession !== void 0) return feedbackUserSession;
  return window.MYBHARAT_SHELL?.footer?.userSession ?? window.MYBHARAT_SHELL?.header?.userSession ?? null;
}
function resolveApiFetchBase() {
  if (feedbackApiBaseUrl) return feedbackApiBaseUrl;
  const fromFooter = window.MYBHARAT_SHELL?.footer?.feedbackApiBaseUrl?.trim();
  if (fromFooter) return fromFooter.replace(/\/$/, "");
  const fromShell = getShellApiFetchBaseUrl();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const loginApi = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (loginApi) return loginApi.replace(/\/$/, "");
  return "";
}
function resolveSubmitUrl() {
  if (feedbackSubmitUrlOverride) return feedbackSubmitUrlOverride;
  const fromShell = window.MYBHARAT_SHELL?.footer?.feedbackSubmitUrl?.trim();
  if (fromShell) return fromShell;
  const base = resolveApiFetchBase();
  if (!base) return SAVE_FEEDBACK_DATA_PATH;
  return `${base}${SAVE_FEEDBACK_DATA_PATH}`;
}
function usesHostApiAuthProxy(base) {
  return base === "/api";
}
function unwrapRawUserRecord(input) {
  if (input == null || typeof input !== "object") return null;
  if ("data" in input && input.data != null && typeof input.data === "object") {
    return input.data;
  }
  return input;
}
function readSessionPhone(raw) {
  if (!raw) return "";
  for (const key of ["user_phone", "phone", "mobile", "USER_PHONE"]) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}
function resolveWebActivityUrl() {
  const baseUrl = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (baseUrl) {
    const normalized = baseUrl.replace(/\/$/, "");
    return `${normalized}/`;
  }
  if (typeof window !== "undefined") {
    return `${window.location.origin}/`;
  }
  return "/";
}
function resolveIsLoggedInForSubmit(formType) {
  const isWeb = formType.toLowerCase() === "web";
  if (!isWeb) return true;
  if (feedbackIsLoggedInOverride !== void 0) return feedbackIsLoggedInOverride;
  if (window.MYBHARAT_SHELL?.footer?.isLoggedIn !== void 0) {
    return !!window.MYBHARAT_SHELL.footer.isLoggedIn;
  }
  return isHeaderUserLoggedIn(resolveUserSession());
}
function buildSaveFeedbackPayload(form, isLoggedIn) {
  const session = parseHeaderUserSession(resolveUserSession());
  const raw = unwrapRawUserRecord(resolveUserSession());
  const formType = (form.type || "web").trim() || "web";
  const isWeb = formType.toLowerCase() === "web";
  const payload = {
    user_name: !isLoggedIn && form.user_name?.trim() ? form.user_name.trim() : session?.displayName ?? "",
    user_email: !isLoggedIn && form.user_email?.trim() ? form.user_email.trim() : session?.email ?? "",
    user_mobile: !isLoggedIn && form.user_mobile?.trim() ? form.user_mobile.trim() : readSessionPhone(raw),
    dl_id: !isLoggedIn ? "" : session?.dlId ?? "",
    user_registered: !isLoggedIn ? "N" : "Y",
    user_type: formType,
    user_activity: isWeb ? resolveWebActivityUrl() : "",
    user_activity_id: isWeb ? "" : "",
    user_feedback: form.user_feedback.trim(),
    user_rating: form.user_rating.trim(),
    feedback_exist_check: "0",
    feedback_captcha_name: !isLoggedIn ? form.feedback_captcha_name?.trim() ?? "" : "",
    feedback_captcha_value: !isLoggedIn ? form.feedback_captcha_value?.trim() ?? "" : "",
    "g-recaptcha-response": !isLoggedIn ? form["g-recaptcha-response"]?.trim() ?? "" : "",
    id: !isLoggedIn ? "" : session ? String(session.id) : ""
  };
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== void 0)
  );
}
async function postFormToApi(url, form) {
  const base = resolveApiFetchBase();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "application/json"
  };
  if (!usesHostApiAuthProxy(base)) {
    const token = await fetchInternalGuestOauthAccessToken();
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: new URLSearchParams(form),
    credentials: usesHostApiAuthProxy(base) ? "same-origin" : "omit"
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Unable to submit feedback. Please try again.");
  }
}
function buildApiUrl(path) {
  const base = resolveApiFetchBase();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  if (!base) return suffix;
  return `${base}${suffix}`;
}
async function postJsonToApi(path, body) {
  const base = resolveApiFetchBase();
  const url = buildApiUrl(path);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  if (!usesHostApiAuthProxy(base)) {
    const token = await fetchInternalGuestOauthAccessToken();
    headers.Authorization = `Bearer ${token}`;
  }
  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    credentials: usesHostApiAuthProxy(base) ? "same-origin" : "omit"
  });
}
async function triggerGeneralFeedbackReward(userId) {
  if (!Number.isFinite(userId) || userId <= 0) return;
  try {
    await postJsonToApi(TRIGGER_YOUTH_REWARD_PATH, {
      events: [
        {
          event_key: "general_feedback",
          action: "added",
          user_id: userId
        }
      ],
      is_batch: true
    });
  } catch {
  }
}
async function saveUserFeedback(form) {
  const formType = (form.type || "web").trim() || "web";
  const isLoggedIn = resolveIsLoggedInForSubmit(formType);
  const session = parseHeaderUserSession(resolveUserSession());
  if (isLoggedIn && formType === "web" && session) {
    void triggerGeneralFeedbackReward(session.id);
  }
  const payload = buildSaveFeedbackPayload(form, isLoggedIn);
  return postFormToApi(resolveSubmitUrl(), payload);
}
function isFeedbackSubmitSuccess(res) {
  const code = res.status_code;
  if (code == null || code === "") return false;
  const numeric = typeof code === "string" ? Number(code) : code;
  return numeric === 200 || numeric === 201;
}

// src/components/footer/footerFeedbackFlow.ts
var GUEST_VALIDATION_FIELDS = [
  ["user_rating:checked", "Rating"],
  ["user_name", "Name"],
  ["user_email", "Email"],
  ["user_mobile", "Mobile"],
  ["user_feedback", "Feedback"]
];
var LOGGED_IN_VALIDATION_FIELDS = [
  ["user_rating:checked", "Rating"],
  ["user_feedback", "Feedback"]
];
var FEEDBACK_MAX_CHARS = 250;
var installed2 = false;
var feedbackIsLoggedIn;
var submitInFlight = false;
function applyFooterFeedbackConfig(options) {
  applyFooterFeedbackApiConfig({
    feedbackApiBaseUrl: options?.feedbackApiBaseUrl,
    feedbackSubmitUrl: options?.feedbackSubmitUrl,
    userSession: options?.userSession,
    isLoggedIn: options?.isLoggedIn
  });
  if (options?.isLoggedIn !== void 0) {
    feedbackIsLoggedIn = options.isLoggedIn;
  }
}
function resolveIsLoggedIn() {
  if (feedbackIsLoggedIn !== void 0) return feedbackIsLoggedIn;
  if (window.MYBHARAT_SHELL?.footer?.isLoggedIn !== void 0) {
    return !!window.MYBHARAT_SHELL.footer.isLoggedIn;
  }
  const form = document.getElementById("feedbackFrm");
  return form ? !form.querySelector("#user_name") : false;
}
function resolveRequiresCaptcha() {
  if (resolveIsLoggedIn()) return false;
  return !!document.querySelector("#feed_back .mb-common-footer__recaptcha[data-sitekey]");
}
function fieldElement(fieldKey) {
  if (fieldKey === "user_rating:checked") {
    return document.querySelector(
      '#feedbackFrm input[name="user_rating"]:checked'
    );
  }
  return document.getElementById(fieldKey);
}
function fieldValue(fieldKey) {
  const el = fieldElement(fieldKey);
  if (!el) return "";
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.value.trim();
  }
  return (el.textContent ?? "").trim();
}
function setFieldError(fieldKey, label, hasError, message) {
  if (fieldKey === "user_rating:checked") {
    const errEl2 = document.querySelector(".Ratingerr");
    if (hasError) {
      fieldElement(fieldKey)?.classList.add("vError");
      if (errEl2) errEl2.textContent = message ?? `Please enter your ${label}`;
    } else {
      document.querySelectorAll('#feedbackFrm input[name="user_rating"]').forEach((input) => {
        input.classList.remove("vError");
      });
      if (errEl2) errEl2.textContent = "";
    }
    return;
  }
  const el = document.getElementById(fieldKey);
  const errEl = document.querySelector(`.${label}err`);
  if (hasError) {
    el?.classList.add("vError");
    if (errEl) errEl.textContent = message ?? `Please enter your ${label}`;
  } else {
    el?.classList.remove("vError");
    if (errEl) errEl.textContent = "";
  }
}
function validateGuestFieldFormat(fieldKey, label, value) {
  if (fieldKey === "user_email") {
    if (!validateEmail(value)) {
      setFieldError(fieldKey, label, true, "Please enter a valid Email Id");
      return false;
    }
    setFieldError(fieldKey, label, false);
    return true;
  }
  if (fieldKey === "user_mobile") {
    if (!validatePhone(value)) {
      setFieldError(fieldKey, label, true, "Please enter a valid 10-digit Mobile Number");
      return false;
    }
    setFieldError(fieldKey, label, false);
    return true;
  }
  return true;
}
function validateFeedbackForm(requireCaptcha = resolveRequiresCaptcha()) {
  const fields = resolveIsLoggedIn() ? LOGGED_IN_VALIDATION_FIELDS : GUEST_VALIDATION_FIELDS;
  let validCount = fields.length;
  for (const [fieldKey, label] of fields) {
    const value = fieldValue(fieldKey);
    if (value === "") {
      setFieldError(fieldKey, label, true);
      validCount -= 1;
      continue;
    }
    if (!resolveIsLoggedIn() && !validateGuestFieldFormat(fieldKey, label, value)) {
      validCount -= 1;
      continue;
    }
    setFieldError(fieldKey, label, false);
  }
  if (requireCaptcha) {
    const captchaEl = document.getElementById("g-recaptcha-response");
    const captchaVal = captchaEl?.value.trim() ?? "";
    const captchaErr = document.querySelector(".captchaerr");
    if (!captchaVal) {
      if (captchaErr) captchaErr.textContent = "Please check the reCAPTCHA checkbox.";
      return false;
    }
    if (captchaErr) captchaErr.textContent = "";
  }
  return validCount === fields.length;
}
function showFeedbackAlert(msg, type) {
  const el = document.getElementById("feedback_alert");
  if (!el) return;
  el.style.display = "";
  el.className = `alert alert-${type}`;
  el.innerHTML = `<small>${msg}</small>`;
  window.setTimeout(() => {
    el.style.display = "none";
  }, 1e4);
}
function resetFeedbackForm() {
  const fields = resolveIsLoggedIn() ? LOGGED_IN_VALIDATION_FIELDS : GUEST_VALIDATION_FIELDS;
  for (const [fieldKey, label] of fields) {
    if (fieldKey !== "user_rating:checked") {
      const el = document.getElementById(fieldKey);
      if (el) {
        el.value = "";
        el.classList.remove("vError");
      }
    }
    const errEl = document.querySelector(`.${label}err`);
    if (errEl) errEl.textContent = "";
  }
  const charCnt = document.getElementById("char_left_cnt");
  if (charCnt) charCnt.textContent = "";
  if (resolveRequiresCaptcha()) {
    const captchaErr = document.querySelector(".captchaerr");
    if (captchaErr) captchaErr.textContent = "";
    resetFeedbackRecaptchaSafely();
  }
}
function readFeedbackFormValues() {
  const form = document.getElementById("feedbackFrm");
  const captchaEl = document.getElementById("g-recaptcha-response");
  const typeInput = form?.querySelector('input[name="type"]');
  const ratingInput = form?.querySelector('input[name="user_rating"]:checked');
  return {
    type: typeInput?.value.trim() || "web",
    user_rating: ratingInput?.value.trim() ?? "",
    user_feedback: fieldValue("user_feedback"),
    user_name: fieldValue("user_name"),
    user_email: fieldValue("user_email"),
    user_mobile: fieldValue("user_mobile"),
    feedback_captcha_name: fieldValue("feedback_captcha_name"),
    feedback_captcha_value: fieldValue("feedback_captcha_value"),
    "g-recaptcha-response": captchaEl?.value.trim() ?? ""
  };
}
function triggerFirebaseFeedbackEvent(event) {
  const setup = window.setupFirebaseUserAjaxEvents;
  const encode = window.encodeIdentifier;
  if (!setup || !encode) return;
  const userId = window.USER_DATA?.ID ?? window.__MYBHARAT_LOGIN_USER_ID__ ?? "";
  setup(event, encode(String(userId)));
}
function setFormC2Visible(visible) {
  const el = document.getElementById("form_c2");
  if (el) el.style.display = visible ? "" : "none";
}
function setFeedbackSubmitting(submitting) {
  const form = document.getElementById("feedbackFrm");
  const loader = document.getElementById("mb-common-footer-feedback-loader");
  const cancelBtn = document.getElementById("form_cl");
  form?.classList.toggle("mb-common-footer__feedback-form--submitting", submitting);
  loader?.classList.toggle("is-visible", submitting);
  if (loader) loader.setAttribute("aria-hidden", submitting ? "false" : "true");
  if (cancelBtn instanceof HTMLImageElement) {
    cancelBtn.style.pointerEvents = submitting ? "none" : "";
    cancelBtn.style.opacity = submitting ? "0.45" : "";
  }
}
function showFeedbackLoader() {
  setFeedbackSubmitting(true);
}
function hideFeedbackLoader() {
  setFeedbackSubmitting(false);
}
async function onFormC2Click(e) {
  e.preventDefault();
  if (submitInFlight) return;
  setFormC2Visible(false);
  const requireCaptcha = resolveRequiresCaptcha();
  if (!validateFeedbackForm(requireCaptcha)) {
    setFormC2Visible(true);
    return;
  }
  submitInFlight = true;
  showFeedbackLoader();
  try {
    const res = await saveUserFeedback(readFeedbackFormValues());
    if (isFeedbackSubmitSuccess(res)) {
      hideBootstrapModal("feed_back");
      showBootstrapModal("successToaster");
      window.setTimeout(() => hideBootstrapModal("successToaster"), 1e4);
      resetFeedbackForm();
      triggerFirebaseFeedbackEvent("user_feedback_success");
    } else {
      showFeedbackAlert(
        typeof res.data === "string" && res.data || typeof res.message === "string" && res.message || "Unable to submit feedback.",
        "danger"
      );
      triggerFirebaseFeedbackEvent("user_feedback_failure");
      setFormC2Visible(true);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unable to submit feedback.";
    showFeedbackAlert(msg, "danger");
    triggerFirebaseFeedbackEvent("user_feedback_failure");
    setFormC2Visible(true);
  } finally {
    submitInFlight = false;
    hideFeedbackLoader();
  }
}
function onDocumentClick2(e) {
  const target = e.target;
  if (!target) return;
  if (target.closest("#form_c2")) {
    void onFormC2Click(e);
    return;
  }
  if (target.closest("#form_cl, #feedback_mdl_btn")) {
    resetFeedbackForm();
  }
}
function isFooterFeedbackField(target) {
  return Boolean(target.closest("#feed_back, #feed_back1, #footer_external"));
}
function onDocumentInput2(e) {
  const target = e.target;
  if (!target || !isFooterFeedbackField(target)) return;
  if (target.id === "user_feedback") {
    const len = target.value.length;
    const charCnt = document.getElementById("char_left_cnt");
    if (!charCnt || len > FEEDBACK_MAX_CHARS) return;
    charCnt.textContent = len > 0 ? `Remaining characters: ${FEEDBACK_MAX_CHARS - len}` : `Remaining characters: ${FEEDBACK_MAX_CHARS}`;
  }
  if (target.id === "user_name") {
    const el = target;
    el.value = el.value.replace(/[^a-zA-Z ]/g, "").replace(/(\..*)\./g, "$1");
  }
  if (target.id === "user_mobile") {
    const el = target;
    el.value = el.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
  }
}
function syncFooterFeedbackConfigFromDom() {
  const footerEl = document.querySelector("mybharat-footer");
  if (!footerEl) return;
  const isLoggedInAttr = footerEl.getAttribute("is-logged-in");
  applyFooterFeedbackConfig({
    feedbackApiBaseUrl: footerEl.getAttribute("feedback-api-base-url") ?? void 0,
    feedbackSubmitUrl: footerEl.getAttribute("feedback-submit-url") ?? void 0,
    isLoggedIn: isLoggedInAttr === "true" || isLoggedInAttr === "" ? true : isLoggedInAttr === "false" ? false : void 0
  });
}
function installFooterFeedbackFlow() {
  if (installed2) return () => void 0;
  installed2 = true;
  syncFooterFeedbackConfigFromDom();
  applyFooterFeedbackConfig({
    feedbackApiBaseUrl: window.MYBHARAT_SHELL?.footer?.feedbackApiBaseUrl,
    feedbackSubmitUrl: window.MYBHARAT_SHELL?.footer?.feedbackSubmitUrl,
    userSession: window.MYBHARAT_SHELL?.footer?.userSession ?? window.MYBHARAT_SHELL?.header?.userSession,
    isLoggedIn: window.MYBHARAT_SHELL?.footer?.isLoggedIn
  });
  document.addEventListener("click", onDocumentClick2, true);
  document.addEventListener("input", onDocumentInput2, true);
  return () => {
    installed2 = false;
    document.removeEventListener("click", onDocumentClick2, true);
    document.removeEventListener("input", onDocumentInput2, true);
  };
}

// src/components/footer/useFooterFeedbackShell.ts
function useFooterFeedbackShell({
  feedbackApiBaseUrl: feedbackApiBaseUrl2,
  feedbackSubmitUrl,
  userSession,
  isLoggedIn,
  enabled = true
} = {}) {
  useLayoutEffect3(() => {
    if (!enabled) return void 0;
    applyFooterFeedbackConfig({
      feedbackApiBaseUrl: feedbackApiBaseUrl2,
      feedbackSubmitUrl,
      userSession,
      isLoggedIn
    });
    return installFooterFeedbackFlow();
  }, [enabled, feedbackApiBaseUrl2, feedbackSubmitUrl, userSession, isLoggedIn]);
}

// src/components/FooterModals.tsx
import { useEffect as useEffect3, useRef, useState as useState3 } from "react";
import { createPortal as createPortal4 } from "react-dom";

// src/components/footer/resolveRecaptchaSiteKey.ts
function resolveRecaptchaSiteKey(prop) {
  const fromProp = prop?.trim();
  if (fromProp) return fromProp;
  const fromShell = window.MYBHARAT_SHELL?.footer?.recaptchaSiteKey?.trim();
  if (fromShell) return fromShell;
  for (const selector of [
    'meta[name="google-site-key"]',
    'meta[name="google-recaptcha-site-key"]',
    'meta[name="recaptcha-site-key"]'
  ]) {
    const fromMeta = document.querySelector(selector)?.getAttribute("content")?.trim();
    if (fromMeta) return fromMeta;
  }
  const footerEl = document.querySelector("mybharat-footer");
  const fromAttr = footerEl?.getAttribute("recaptcha-site-key")?.trim();
  return fromAttr ?? "";
}

// src/components/footer/footerRecaptchaLoader.ts
var SCRIPT_ID = "mb-google-recaptcha-script";
var SCRIPT_ONLOAD = "__mbRecaptchaScriptOnload";
function flushRecaptchaReadyCallbacks() {
  const callbacks = window.__mbRecaptchaReadyCallbacks ?? [];
  window.__mbRecaptchaReadyCallbacks = [];
  callbacks.forEach((cb) => {
    try {
      cb();
    } catch {
    }
  });
}
function ensureRecaptchaScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  window.__mbRecaptchaReadyCallbacks = window.__mbRecaptchaReadyCallbacks ?? [];
  window[SCRIPT_ONLOAD] = () => flushRecaptchaReadyCallbacks();
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = `https://www.google.com/recaptcha/api.js?onload=${SCRIPT_ONLOAD}&render=explicit`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}
function whenRecaptchaReady(timeoutMs = 15e3) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("reCAPTCHA timed out while loading"));
    }, timeoutMs);
    const finish = () => {
      if (settled) return;
      const api = window.grecaptcha;
      if (!api?.render) {
        settled = true;
        window.clearTimeout(timeoutId);
        reject(new Error("reCAPTCHA API unavailable"));
        return;
      }
      const done = (resolved) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        resolve(resolved);
      };
      if (typeof api.ready === "function") {
        api.ready(() => done(api));
      } else {
        done(api);
      }
    };
    if (window.grecaptcha?.render) {
      finish();
      return;
    }
    ensureRecaptchaScript();
    window.__mbRecaptchaReadyCallbacks = window.__mbRecaptchaReadyCallbacks ?? [];
    window.__mbRecaptchaReadyCallbacks.push(finish);
    const pollForApi = (attempt = 0) => {
      if (settled) return;
      if (window.grecaptcha?.render) {
        finish();
        return;
      }
      if (attempt >= 200) return;
      window.setTimeout(() => pollForApi(attempt + 1), 50);
    };
    pollForApi();
  });
}
function preloadRecaptchaScript() {
  if (window.grecaptcha?.render) return;
  ensureRecaptchaScript();
}

// src/components/footer/footerRecaptchaWidget.ts
function hasRenderedWidget(container) {
  return !!container.querySelector('iframe[src*="recaptcha"], iframe[title*="reCAPTCHA"]');
}
async function renderFeedbackRecaptchaWidget(container, siteKey) {
  const key = siteKey.trim();
  if (!key) return null;
  if (hasRenderedWidget(container)) {
    return getFeedbackRecaptchaWidgetId();
  }
  try {
    const grecaptcha = await whenRecaptchaReady();
    if (hasRenderedWidget(container)) {
      return getFeedbackRecaptchaWidgetId();
    }
    container.replaceChildren();
    const widgetId = grecaptcha.render(container, { sitekey: key });
    setFeedbackRecaptchaWidgetId(widgetId);
    return widgetId;
  } catch {
    return null;
  }
}
function scheduleFeedbackRecaptchaRender(getContainer, siteKey, delayMs = 150) {
  window.setTimeout(() => {
    void (async () => {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const container = getContainer();
        if (container && hasRenderedWidget(container)) return;
        if (container && siteKey.trim()) {
          const widgetId = await renderFeedbackRecaptchaWidget(container, siteKey);
          if (widgetId != null) return;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 200));
      }
    })();
  }, delayMs);
}

// src/components/FooterModals.tsx
import { Fragment as Fragment6, jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
function getBootstrapModal2() {
  return typeof window !== "undefined" && window.bootstrap?.Modal;
}
var FooterModals = ({
  cdnBase,
  isLoggedIn,
  recaptchaSiteKey,
  onRegisteredUserClick
}) => {
  const [portalReady, setPortalReady] = useState3(false);
  const captchaContainerRef = useRef(null);
  const captchaSiteKey = resolveRecaptchaSiteKey(recaptchaSiteKey);
  const showGuestFeedbackRow = !isLoggedIn;
  const canRenderCaptcha = showGuestFeedbackRow && Boolean(captchaSiteKey);
  const queueCaptchaRender = () => {
    if (!canRenderCaptcha) return;
    scheduleFeedbackRecaptchaRender(() => captchaContainerRef.current, captchaSiteKey, 150);
  };
  useEffect3(() => {
    setPortalReady(true);
  }, []);
  useEffect3(() => {
    if (!canRenderCaptcha) return void 0;
    preloadRecaptchaScript();
    return void 0;
  }, [canRenderCaptcha]);
  useEffect3(() => {
    const modalEl = document.getElementById("feed_back");
    if (!modalEl || !canRenderCaptcha) return void 0;
    const onShown = () => {
      queueCaptchaRender();
    };
    const onHidden = () => {
      resetFeedbackRecaptchaSafely();
    };
    modalEl.addEventListener("shown.bs.modal", onShown);
    modalEl.addEventListener("hidden.bs.modal", onHidden);
    if (modalEl.classList.contains("show")) {
      queueCaptchaRender();
    }
    return () => {
      modalEl.removeEventListener("shown.bs.modal", onShown);
      modalEl.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, [canRenderCaptcha, captchaSiteKey]);
  const hideChoiceShowForm = () => {
    const Modal = getBootstrapModal2();
    const el1 = document.getElementById("feed_back1");
    const elForm = document.getElementById("feed_back");
    if (!Modal || !el1 || !elForm) return;
    Modal.getInstance(el1)?.hide();
    window.setTimeout(() => {
      Modal.getOrCreateInstance(elForm).show();
      queueCaptchaRender();
    }, 200);
  };
  const hideChoiceOpenRegistered = () => {
    const Modal = getBootstrapModal2();
    Modal?.getInstance(document.getElementById("feed_back1"))?.hide();
    onRegisteredUserClick?.();
    window.setTimeout(() => {
      if (document.getElementById("loginWithOtpModal")) {
        openLoginWithOtpModal();
      }
    }, 200);
  };
  const feedbackActions = /* @__PURE__ */ jsxs11("div", { className: "cross_ico mb-common-footer__feedback-actions", children: [
    /* @__PURE__ */ jsx12("img", { src: `${cdnBase}/assets/img/yuva_landing/mega_checkcircle1.png`, id: "form_cl", "data-bs-dismiss": "modal", alt: "" }),
    /* @__PURE__ */ jsx12("a", { id: "form_c2", href: "#", className: "d-inline-block", children: /* @__PURE__ */ jsx12("img", { src: `${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`, alt: "" }) })
  ] });
  const content = /* @__PURE__ */ jsxs11(Fragment6, { children: [
    /* @__PURE__ */ jsx12("div", { className: "modal fade", id: "feed_back1", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx12("div", { className: "modal-dialog", children: /* @__PURE__ */ jsx12("div", { className: "modal-content", children: /* @__PURE__ */ jsx12("div", { className: "modal-body", style: { borderRadius: 8 }, children: /* @__PURE__ */ jsxs11("div", { className: "row", id: "pls_select", children: [
      /* @__PURE__ */ jsx12("div", { className: "col-sm-12", children: /* @__PURE__ */ jsx12(
        "img",
        {
          src: `${cdnBase}/assets/img/yuva_landing/XCircle_n.png`,
          alt: "",
          className: "btn-close",
          "data-bs-dismiss": "modal"
        }
      ) }),
      /* @__PURE__ */ jsxs11("div", { className: "col-sm-12", children: [
        /* @__PURE__ */ jsx12("h3", { children: "Please Select" }),
        /* @__PURE__ */ jsx12("button", { type: "button", id: "guest_usr", className: "btn btn-success", name: "Guest User", onClick: hideChoiceShowForm, children: "Guest User" }),
        /* @__PURE__ */ jsx12("button", { type: "button", id: "regi_usr", className: "btn btn-info", name: "Registered User", onClick: hideChoiceOpenRegistered, children: "Registered User" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx12("div", { className: "modal fade", id: "feed_back", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx12("div", { className: "modal-dialog", children: /* @__PURE__ */ jsx12("div", { className: "modal-content", children: /* @__PURE__ */ jsxs11("div", { className: "modal-body", style: { borderRadius: 8 }, children: [
      /* @__PURE__ */ jsxs11("form", { id: "feedbackFrm", children: [
        /* @__PURE__ */ jsx12("input", { type: "hidden", name: "type", value: "web" }),
        /* @__PURE__ */ jsxs11("div", { className: "row pb-10", children: [
          /* @__PURE__ */ jsxs11("div", { className: "col-sm-12", children: [
            /* @__PURE__ */ jsx12("div", { className: "tt_yuvr", children: Array.from({ length: 10 }, (_, i) => {
              const n = i + 1;
              return /* @__PURE__ */ jsx12("div", { className: "radio-tile-group", children: /* @__PURE__ */ jsxs11("div", { className: "input-container", children: [
                /* @__PURE__ */ jsx12("input", { type: "radio", name: "user_rating", id: `user_rating_${n}`, value: String(n), defaultChecked: n === 10 }),
                /* @__PURE__ */ jsx12("div", { className: "radio-tile", children: /* @__PURE__ */ jsx12("label", { className: "label-text-space", htmlFor: `user_rating_${n}`, children: n }) })
              ] }) }, n);
            }) }),
            /* @__PURE__ */ jsx12("p", { className: "vErrormsg Ratingerr" })
          ] }),
          /* @__PURE__ */ jsx12("div", { className: "col-sm-12", children: /* @__PURE__ */ jsxs11("div", { className: "form-group text-left", children: [
            /* @__PURE__ */ jsx12("label", { htmlFor: "user_feedback", children: "Write a feedback*" }),
            /* @__PURE__ */ jsx12("small", { id: "char_left_cnt" }),
            /* @__PURE__ */ jsx12(
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
            /* @__PURE__ */ jsx12("p", { className: "vErrormsg Feedbackerr" })
          ] }) }),
          !isLoggedIn ? /* @__PURE__ */ jsxs11(Fragment6, { children: [
            /* @__PURE__ */ jsx12("input", { type: "hidden", id: "feedback_captcha_name", name: "feedback_captcha_name", value: "" }),
            /* @__PURE__ */ jsx12("div", { className: "col-sm-4", children: /* @__PURE__ */ jsxs11("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx12(
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
              /* @__PURE__ */ jsx12("p", { className: "vErrormsg Nameerr" })
            ] }) }),
            /* @__PURE__ */ jsx12("div", { className: "col-sm-4", children: /* @__PURE__ */ jsxs11("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx12(
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
              /* @__PURE__ */ jsx12("p", { className: "vErrormsg Mobileerr" })
            ] }) }),
            /* @__PURE__ */ jsx12("div", { className: "col-sm-4", children: /* @__PURE__ */ jsxs11("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx12("input", { type: "email", className: "form-control", id: "user_email", name: "user_email", placeholder: "Email*", maxLength: 100 }),
              /* @__PURE__ */ jsx12("p", { className: "vErrormsg Emailerr" })
            ] }) })
          ] }) : null
        ] }),
        showGuestFeedbackRow ? /* @__PURE__ */ jsxs11("div", { className: "row align-items-end mb-common-footer__feedback-footer-row", children: [
          /* @__PURE__ */ jsxs11("div", { className: "col-sm-8 col-md-9", children: [
            /* @__PURE__ */ jsx12(
              "div",
              {
                ref: (node) => {
                  captchaContainerRef.current = node;
                  if (node && canRenderCaptcha) {
                    const modalEl = document.getElementById("feed_back");
                    if (modalEl?.classList.contains("show")) {
                      scheduleFeedbackRecaptchaRender(() => node, captchaSiteKey, 0);
                    }
                  }
                },
                className: "mb-common-footer__recaptcha",
                "data-sitekey": captchaSiteKey || void 0
              }
            ),
            /* @__PURE__ */ jsx12("p", { className: "vErrormsg captchaerr" })
          ] }),
          /* @__PURE__ */ jsx12("div", { className: "col-sm-4 col-md-3", children: feedbackActions })
        ] }) : /* @__PURE__ */ jsx12("div", { className: "row mb-common-footer__feedback-footer-row", children: /* @__PURE__ */ jsx12("div", { className: "col-sm-12 d-flex justify-content-end", children: feedbackActions }) })
      ] }),
      /* @__PURE__ */ jsx12(
        "div",
        {
          id: "mb-common-footer-feedback-loader",
          className: "mb-common-footer__feedback-loader",
          "aria-hidden": "true",
          "aria-live": "polite",
          children: /* @__PURE__ */ jsxs11("div", { className: "mb-common-footer__feedback-loader-inner", children: [
            /* @__PURE__ */ jsx12("div", { className: "mb-common-footer__feedback-spinner", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx12("span", { className: "mb-common-footer__feedback-loader-text", children: "Submitting\u2026" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx12("div", { className: "row", children: /* @__PURE__ */ jsx12("div", { className: "col-sm-12", children: /* @__PURE__ */ jsx12("div", { id: "feedback_alert", className: "alert", role: "alert", style: { display: "none" } }) }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx12("div", { className: "modal fade", id: "successToaster", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx12("div", { className: "modal-dialog", style: { width: "fit-content" }, children: /* @__PURE__ */ jsx12("div", { className: "modal-content", style: { border: "2px solid #0fbd5f" }, children: /* @__PURE__ */ jsx12("div", { className: "modal-header", style: { borderBottom: "none" }, children: /* @__PURE__ */ jsxs11("h4", { className: "modal-title", style: { color: "#0fbd5f", fontSize: 16, fontWeight: 400 }, children: [
      /* @__PURE__ */ jsx12("img", { src: `${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`, alt: "" }),
      " Feedback has been submitted Successfully"
    ] }) }) }) }) })
  ] });
  if (!portalReady) return null;
  return createPortal4(content, document.body);
};
var FooterModals_default = FooterModals;

// src/components/Footer.tsx
import { Fragment as Fragment7, jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var footerIntroDefault = "MY Bharat is an initiative of Ministry of Youth Affairs & Sports to empower Indian youth through social mobility, educational equity, and practical skills.";
var dicLineDefault = "Digital India Corporation (DIC) Ministry of Electronics & IT (MeitY) Government of India";
var copyrightDefault = "\xA9 2023 - MY Bharat @ All rights reserved | Ministry of Youth Affairs and Sports, Govt. of India\xAE";
function formatLastUpdated() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}
var Footer = ({
  cdnBase,
  isLoggedIn,
  recaptchaSiteKey,
  feedbackApiBaseUrl: feedbackApiBaseUrl2,
  feedbackSubmitUrl,
  userSession,
  onRegisteredUserClick
}) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE).replace(/\/$/, "");
  const feedbackModalTarget = isLoggedIn ? "#feed_back" : "#feed_back1";
  useFooterFeedbackShell({
    feedbackApiBaseUrl: feedbackApiBaseUrl2,
    feedbackSubmitUrl,
    userSession,
    isLoggedIn
  });
  return /* @__PURE__ */ jsxs12(Fragment7, { children: [
    /* @__PURE__ */ jsxs12("footer", { id: "footer_external", className: "footer-area-1 mb-common-footer", children: [
      /* @__PURE__ */ jsx13("div", { className: "footer-top py-3", children: /* @__PURE__ */ jsx13("div", { className: "container", children: /* @__PURE__ */ jsxs12("div", { className: "row", children: [
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-contact pt-4", children: [
          /* @__PURE__ */ jsxs12("div", { className: "d-flex flex-wrap align-items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx13("a", { href: "/", children: /* @__PURE__ */ jsx13(
              "img",
              {
                src: `${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`,
                alt: "",
                className: "img-responsive cursor",
                style: { width: 100 }
              }
            ) }),
            /* @__PURE__ */ jsx13("span", { className: "text-muted d-none d-sm-inline", "aria-hidden": "true", children: "|" }),
            /* @__PURE__ */ jsx13("a", { href: "/", children: /* @__PURE__ */ jsx13(
              "img",
              {
                src: `${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`,
                alt: "MY Bharat",
                className: "img-responsive cursor",
                style: { width: 100 }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx13("p", { className: "lang_footer_page_col_one foot_p1 fontchange14", children: /* @__PURE__ */ jsx13("small", { children: footerIntroDefault }) }),
          /* @__PURE__ */ jsxs12("p", { className: "foot1w fontchange14", children: [
            /* @__PURE__ */ jsx13("span", { className: "lang_footer_page_last_update", children: "Last updated: " }),
            " ",
            formatLastUpdated()
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col", children: [
          /* @__PURE__ */ jsx13("h6", { className: "img_link lang_footer_heading_import fontchange mb-2", children: "Important Links" }),
          /* @__PURE__ */ jsxs12("ul", { className: "foot_p2 list-unstyled mb-0", children: [
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/mega_events", className: "litext lang_mega_event fontchange", children: "Mega Events" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/pages/experiential_learning?mode=I", className: "litext lang_exp_lrn01 fontchange", children: "Experiential Learning" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { className: "litext lang_event fontchange", href: "/pages/events", children: "Volunteer for Bharat" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { className: "litext lang_about fontchange", href: "/pages/about_mybharat", children: "About" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col", children: [
          /* @__PURE__ */ jsx13("h6", { className: "img_link lang_footer_heading_useful fontchange mb-2", children: "Useful Links" }),
          /* @__PURE__ */ jsxs12("ul", { className: "list-unstyled mb-0", children: [
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/pages/policy", className: "litext lang_policy_page_header fontchange", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/resources-list", className: "litext lang_resources_list_ftr fontchange", children: "Resources" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/pages/support", className: "litext lang_contact_page_contact_us_ftr fontchange", children: "Support" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/sitemap", className: "litext lang_sitemap fontchange", children: "Sitemap" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13(
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
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__follow-col", children: [
          /* @__PURE__ */ jsx13("h6", { className: "img_link lang_footer_heading_follow fontchange mb-2", children: "Follow Us" }),
          /* @__PURE__ */ jsxs12("div", { className: "social-icons mb-20 mb-common-footer__social-row", children: [
            /* @__PURE__ */ jsx13("a", { href: "https://x.com/MYBharatHQ", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: `${cdn}/assets/img/icon/twitter_v10.png`, alt: "Twitter" }),
              /* @__PURE__ */ jsx13("span", { className: "twitter-color", children: "Twitter" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.instagram.com/mybharatgov/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: `${cdn}/assets/img/icon/instagram_v10.png`, alt: "Instagram" }),
              /* @__PURE__ */ jsx13("span", { className: "instagram-color", children: "Instagram" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.facebook.com/mybharathq/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: `${cdn}/assets/img/icon/facebook_v10.png`, alt: "Facebook" }),
              /* @__PURE__ */ jsx13("span", { className: "facebook-color", children: "Facebook" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.linkedin.com/company/mybharatgov/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: `${cdn}/assets/img/icon/linkedin_v10.png`, alt: "Linkedin" }),
              /* @__PURE__ */ jsx13("span", { className: "linkedin-color", children: "Linkedin" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: `${cdn}/assets/img/icon/whatsapp_v10.png`, alt: "WhatsApp" }),
              /* @__PURE__ */ jsx13("span", { className: "whatsapp-color", children: "WhatsApp" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.youtube.com/@MyBharatHQ", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: `${cdn}/assets/img/icon/youtube_v10.png`, alt: "YouTube" }),
              /* @__PURE__ */ jsx13("span", { className: "youtube-color", children: "YouTube" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx13("p", { className: "fw-normal mb-common-footer__powered-by mb-0", children: /* @__PURE__ */ jsxs12("small", { className: "mb-common-footer__powered-inner", children: [
            /* @__PURE__ */ jsx13("span", { className: "lang_footer_page_col_powered_by", children: "Powered by:" }),
            /* @__PURE__ */ jsx13(
              "a",
              {
                className: "whitetext text-decoration-none mb-common-footer__powered-logo",
                href: "https://digitalindia.gov.in/",
                target: "_blank",
                rel: "noreferrer",
                children: /* @__PURE__ */ jsx13(
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
          /* @__PURE__ */ jsx13("p", { className: "footertext mt-2 lang_footer_page_col_five_desc foot_p1 fontchange14", children: dicLineDefault })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx13("section", { className: "pricy1_a py-2", children: /* @__PURE__ */ jsx13("div", { className: "container", children: /* @__PURE__ */ jsxs12("div", { className: "row align-items-center flex-column flex-sm-row text-center text-sm-start", children: [
        /* @__PURE__ */ jsx13("div", { className: "col-sm-8", children: /* @__PURE__ */ jsx13("a", { href: "https://yas.gov.in/", target: "_blank", rel: "noreferrer", className: "text-decoration-none", children: /* @__PURE__ */ jsx13("small", { className: "lang_copyryt fontchange12", children: copyrightDefault }) }) }),
        /* @__PURE__ */ jsx13("div", { className: "col-sm-4 pricy_a", children: /* @__PURE__ */ jsx13("small", { children: /* @__PURE__ */ jsxs12("ul", { children: [
          /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13("a", { href: "/pages/terms_of_use", className: "pricy_a lang_trms fontchange12", children: "Terms & Conditions" }) }),
          /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13("a", { href: "/pages/policy", className: "lang_policy_page_header fontchange12", children: "Privacy Policy" }) })
        ] }) }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx13(
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
import { useEffect as useEffect4, useState as useState4 } from "react";
function useMainNavItems(options) {
  const { load, select, fallback = DEFAULT_HEADER_MAIN_NAV, maxDepth } = options;
  const [nav, setNav] = useState4(fallback);
  useEffect4(() => {
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
var MYBHARAT_COMMON_FRONTEND_VERSION = "1.0.226";
var index_default = { Header: Header_default, Header2: Header2_default, Footer: Footer_default };
export {
  DEFAULT_HEADER2_MAIN_NAV,
  DEFAULT_HEADER_MAIN_NAV,
  DEFAULT_LOGIN_API_ERROR,
  DesktopMainNav,
  Footer_default as Footer,
  HEADER_LOGIN_SIGN_IN_SELECTORS,
  Header_default as Header,
  Header2_default as Header2,
  HeaderAuthControls,
  HeaderLoginShellPortal,
  HeaderProfileMenu,
  MYBHARAT_CDN_BASE,
  MYBHARAT_CDN_BASE_BETA,
  MYBHARAT_CDN_ORIGIN,
  MYBHARAT_COMMON_FRONTEND_VERSION,
  SAVE_FEEDBACK_DATA_PATH,
  SHELL_INTERNAL_CHANGE_PASSWORD_PATH,
  SHELL_INTERNAL_GUEST_OAUTH_PATH,
  SHELL_INTERNAL_KC_CLIENT_PATH,
  SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH,
  SHELL_INTERNAL_LOGIN_PUBKEY_PATH,
  SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH,
  SHELL_LOGIN_API_PROXY_DEFAULT2 as SHELL_LOGIN_API_PROXY_DEFAULT,
  applyFooterFeedbackApiConfig,
  applyFooterFeedbackConfig,
  applyShellLoginApiConfig,
  buildHeaderProfileMenuItems,
  buildShellApiUrl,
  completeForgotPasswordUpdate,
  completeLoginWithOtp,
  completeLoginWithOtp as completeLoginWithOtpFlow,
  completePasswordSignIn,
  index_default as default,
  filterUnsafeNavTree,
  getKeycloakClientAccessToken,
  getShellApiFetchBaseUrl,
  installFooterFeedbackFlow,
  installHeaderLoginFlow,
  isFeedbackSubmitSuccess,
  isGuestHeaderUserPayload,
  isHeaderUserLoggedIn,
  isLoginOtpRedirectResult,
  isNavGroupItem,
  isNavLinkItem,
  isSafeNavHref,
  navTreeItemKey,
  normalizeApiMenuTree,
  normalizeHrefForNav,
  normalizeNavTree,
  openLoginWithOtpModal,
  openSignInPasswordModal,
  parseHeaderUserSession,
  prepareMainNavItems,
  saveUserFeedback,
  submitOtpLoginFromModal,
  triggerGeneralFeedbackReward,
  unwrapMenuListFromPayload,
  useFooterFeedbackShell,
  useMainNavItems,
  validateFeedbackForm,
  validateOtpLoginForm
};
