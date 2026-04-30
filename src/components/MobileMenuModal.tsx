import React from 'react';

const youthProfileHref = 'https://web.mybharat.gov.in/youth-public-profile';

export type MobileMenuModalProps = {
  cdnBase: string;
};

/**
 * Port of `header.ctp` guest mobile drawer: `#mobileMenuNew.modal.left.fade`
 * + `m-menu` links + `#signInLink` + Get Started accordion.
 * Login modals / jQuery live in the host app — see `docs/header-ctp-reference.md`.
 */
export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ cdnBase }) => (
  <div
    className="modal left fade"
    id="mobileMenuNew"
    tabIndex={-1}
    aria-labelledby="mobileMenuNewLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header align-items-center border-0 pb-0">
          <h5 className="modal-title flex-grow-1 mb-0" id="mobileMenuNewLabel">
            <div className="logo">
              <a href="/" data-bs-dismiss="modal">
                <img
                  src={`${cdnBase}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`}
                  className="logo-w-sm-md-sec"
                  alt="MY Bharat"
                />
              </a>
            </div>
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body pt-2">
          <div className="m-menu">
            <ul className="list-unstyled mb-0">
              <li>
                <a href={youthProfileHref} className="text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_Youth d-block py-2" style={{ marginLeft: 0 }}>
                    Youth
                  </span>
                </a>
              </li>
              <li>
                <a href="/quiz" className="fontchange14 text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="d-block py-2" style={{ marginLeft: 0 }}>
                    Quiz &amp; Essay
                  </span>
                </a>
              </li>
              <li>
                <a href="/voices/blogs" className="fontchange14 text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="d-block py-2" style={{ marginLeft: 0 }}>
                    Blogs
                  </span>
                </a>
              </li>
              <li>
                <a href="/pages/newsletter" className="fontchange14 text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="d-block py-2" style={{ marginLeft: 0 }}>
                    Newsletters
                  </span>
                </a>
              </li>
              <li>
                <a href="/pages/experiential_learning?mode=I" className="academia text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_exp_lrn01 d-block py-2" style={{ marginLeft: 0 }}>
                    Experiential Learning
                  </span>
                </a>
              </li>
              <li>
                <a href="/pages/events" className="text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_event d-block py-2">Volunteer for Bharat</span>
                </a>
              </li>
              <li>
                <a href="/mega_events" className="text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_mega_event d-block py-2">Mega Events</span>
                </a>
              </li>
              <li>
                <a href="/pages/vbyld_2026" className="text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_event d-block py-2">VBYLD-2026</span>
                </a>
              </li>
              <li>
                <a href="/pages/podcasts" className="text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_event d-block py-2">MY Bharat Podcast</span>
                </a>
              </li>
              <li>
                <a href="/pages/brics_2026" className="text-decoration-none text-reset" data-bs-dismiss="modal">
                  <span className="lang_event d-block py-2">BRICS India 2026</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="m-menu border-top mt-2 pt-2">
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  className="mbv_yuva_drop border-bottom text-decoration-none text-reset d-block"
                  href="#"
                  id="signInLink"
                  style={{ borderBottom: '1px solid #D7D7D7' }}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="lang_yuva_register_login_link d-block py-2" style={{ marginLeft: 0 }}>
                    Sign In
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="mbv_yuva_drop border-bottom text-decoration-none text-reset d-block"
                  href="/yuva_register"
                  data-bs-dismiss="modal"
                  style={{ borderBottom: '1px solid #D7D7D7' }}
                >
                  <span className="lang_register d-block py-2" style={{ marginLeft: 0 }}>
                    Register Now
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="accordion mt-2" id="accordionExamples">
            <div className="accordion-item border-0">
              <h2 className="accordion-header" id="headingTwos">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwos"
                  aria-expanded="false"
                  aria-controls="collapseTwos"
                >
                  <span className="lang_register">Get Started</span>
                </button>
              </h2>
              <div
                id="collapseTwos"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwos"
                data-bs-parent="#accordionExamples"
              >
                <div className="accordion-body">
                  <a
                    className="mbv_yuva_drop border-bottom text-decoration-none d-block py-2"
                    href="https://mybharat.gov.in/yuva_register"
                    data-bs-dismiss="modal"
                    style={{ borderBottom: '1px solid #D7D7D7' }}
                  >
                    <span className="lang_yuva">Youth</span>
                    <br />
                    <span className="f-10-dropdown lang_applicants_volunteer">Applicants/Volunteers/Participants</span>
                  </a>
                  <a
                    className="mbv_partner text-decoration-none d-block py-2"
                    href="https://mybharat.gov.in/partner_register"
                    data-bs-dismiss="modal"
                    style={{ borderBottom: '1px solid #D7D7D7', padding: '8px 1px 3px 1px' }}
                  >
                    <span className="lang_partner">Partner</span>
                    <br />
                    <span className="f-10-dropdown lang_BYCN">
                      Knowledge Institution/ Businesses/Government/NGOs/Youth Club/Academia/
                    </span>
                    <br />
                    <span className="f-10-dropdown lang_dyo_nss_register">
                      DYOs/NSS Program Officers/Placement Officers
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MobileMenuModal;
