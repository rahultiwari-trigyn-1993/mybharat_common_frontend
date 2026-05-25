import React from 'react';
import { MYBHARAT_CDN_BASE } from '../constants/cdn';
import FooterModals from './FooterModals';

export type FooterProps = {
  /** CDN origin + `/mybharat` path segment (no trailing slash) */
  cdnBase?: string;
  /** Matches logged-in `User` / `$ufdl_id` — feedback opens full form; skips Guest modal branch for captcha UI when false */
  isLoggedIn?: boolean;
  /** When set and user is not logged in, renders reCAPTCHA widget inside `#feed_back` */
  recaptchaSiteKey?: string;
  /** Consumer hook when Registered User is chosen in `#feed_back1` */
  onRegisteredUserClick?: () => void;
};

const footerIntroDefault =
  'MY Bharat is an initiative of Ministry of Youth Affairs & Sports to empower Indian youth through social mobility, educational equity, and practical skills.';

const dicLineDefault =
  'Digital India Corporation (DIC) Ministry of Electronics & IT (MeitY) Government of India';

const copyrightDefault =
  '© 2023 - MY Bharat @ All rights reserved | Ministry of Youth Affairs and Sports, Govt. of India®';

function formatLastUpdated(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

export const Footer: React.FC<FooterProps> = ({ cdnBase, isLoggedIn, recaptchaSiteKey, onRegisteredUserClick }) => {
  const cdn = (cdnBase ?? MYBHARAT_CDN_BASE).replace(/\/$/, '');
  const feedbackModalTarget = isLoggedIn ? '#feed_back' : '#feed_back1';

  return (
    <>
      <footer id="footer_external" className="footer-area-1 mb-common-footer">
        <div className="footer-top py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact pt-4">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                  <a href="/">
                    <img
                      src={`${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`}
                      alt=""
                      className="img-responsive cursor"
                      style={{ width: 100 }}
                    />
                  </a>
                  <span className="text-muted d-none d-sm-inline" aria-hidden="true">
                    |
                  </span>
                  <a href="/">
                    <img
                      src={`${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`}
                      alt="MY Bharat"
                      className="img-responsive cursor"
                      style={{ width: 100 }}
                    />
                  </a>
                </div>

                <p className="lang_footer_page_col_one foot_p1 fontchange14">
                  <small>{footerIntroDefault}</small>
                </p>

                <p className="foot1w fontchange14">
                  <span className="lang_footer_page_last_update">Last updated: </span> {formatLastUpdated()}
                </p>
              </div>

              <div className="col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col">
                <h6 className="img_link lang_footer_heading_import fontchange mb-2">Important Links</h6>
                <ul className="foot_p2 list-unstyled mb-0">
                  <li className="mb-2 fw-normal">
                    <a href="/mega_events" className="litext lang_mega_event fontchange">
                      Mega Events
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <a href="/pages/experiential_learning?mode=I" className="litext lang_exp_lrn01 fontchange">
                      Experiential Learning
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <a className="litext lang_event fontchange" href="/pages/events">
                      Volunteer for Bharat
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <a className="litext lang_about fontchange" href="/pages/about_mybharat">
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col">
                <h6 className="img_link lang_footer_heading_useful fontchange mb-2">Useful Links</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2 fw-normal">
                    <a href="/pages/policy" className="litext lang_policy_page_header fontchange">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <a href="/resources-list" className="litext lang_resources_list_ftr fontchange">
                      Resources
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <a href="/pages/support" className="litext lang_contact_page_contact_us_ftr fontchange">
                      Support
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <a href="/sitemap" className="litext lang_sitemap fontchange">
                      Sitemap
                    </a>
                  </li>
                  <li className="mb-2 fw-normal">
                    <p
                      className="litext lang_content_Feedback mb-0 border-0 bg-transparent"
                      id="feedback_mdl_btn"
                      data-bs-toggle="modal"
                      data-bs-target={feedbackModalTarget}
                      style={{ cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          (e.target as HTMLElement).click();
                        }
                      }}
                    >
                      Feedback
                    </p>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__follow-col">
                <h6 className="img_link lang_footer_heading_follow fontchange mb-2">Follow Us</h6>
                <div className="social-icons mb-20 mb-common-footer__social-row">
                  <a href="https://x.com/MYBharatHQ" target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src={`${cdn}/assets/img/icon/twitter_v10.png`} alt="Twitter" />
                      <span className="twitter-color">Twitter</span>
                    </div>
                  </a>
                  <a href="https://www.instagram.com/mybharatgov/" target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src={`${cdn}/assets/img/icon/instagram_v10.png`} alt="Instagram" />
                      <span className="instagram-color">Instagram</span>
                    </div>
                  </a>
                  <a href="https://www.facebook.com/mybharathq/" target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src={`${cdn}/assets/img/icon/facebook_v10.png`} alt="Facebook" />
                      <span className="facebook-color">Facebook</span>
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/company/mybharatgov/" target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src={`${cdn}/assets/img/icon/linkedin_v10.png`} alt="Linkedin" />
                      <span className="linkedin-color">Linkedin</span>
                    </div>
                  </a>
                  <a href="https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h" target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src={`${cdn}/assets/img/icon/whatsapp_v10.png`} alt="WhatsApp" />
                      <span className="whatsapp-color">WhatsApp</span>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@MyBharatHQ" target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src={`${cdn}/assets/img/icon/youtube_v10.png`} alt="YouTube" />
                      <span className="youtube-color">YouTube</span>
                    </div>
                  </a>
                </div>

                <p className="fw-normal mb-common-footer__powered-by mb-0">
                  <small className="mb-common-footer__powered-inner">
                    <span className="lang_footer_page_col_powered_by">Powered by:</span>
                    <a
                      className="whitetext text-decoration-none mb-common-footer__powered-logo"
                      href="https://digitalindia.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`${cdn}/assets/img/yuva_landing/DigitalIndiamybharat.svg`}
                        alt="Digital India"
                        style={{ width: 100, height: 'auto', display: 'block' }}
                      />
                    </a>
                  </small>
                </p>

                <p className="footertext mt-2 lang_footer_page_col_five_desc foot_p1 fontchange14">{dicLineDefault}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="pricy1_a py-2">
          <div className="container">
            <div className="row align-items-center flex-column flex-sm-row text-center text-sm-start">
              <div className="col-sm-8">
                <a href="https://yas.gov.in/" target="_blank" rel="noreferrer" className="text-decoration-none">
                  <small className="lang_copyryt fontchange12">{copyrightDefault}</small>
                </a>
              </div>
              <div className="col-sm-4 pricy_a">
                <small>
                  <ul>
                    <li>
                      <a href="/pages/terms_of_use" className="pricy_a lang_trms fontchange12">
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a href="/pages/policy" className="lang_policy_page_header fontchange12">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </small>
              </div>
            </div>
          </div>
        </section>
      </footer>

      <FooterModals
        cdnBase={cdn}
        isLoggedIn={isLoggedIn}
        recaptchaSiteKey={recaptchaSiteKey}
        onRegisteredUserClick={onRegisteredUserClick}
      />
    </>
  );
};

export default Footer;
