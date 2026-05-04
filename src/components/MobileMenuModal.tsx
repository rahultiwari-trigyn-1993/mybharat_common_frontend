import React from 'react';
import type { NavLinkItem, NavTreeItem } from '../navigation/types';
import { getNavLinkAttrs } from '../navigation/navLinkAttrs';

export type MobileMenuModalProps = {
  cdnBase: string;
  /** Same tree as desktop main nav (`DesktopMainNav`) — single source of truth. */
  items: readonly NavTreeItem[];
};

function collapseDomId(path: string): string {
  return `mb-mnav-${path.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
}

function MobileNavLinkRow({ item }: { item: NavLinkItem }) {
  const { href, external } = getNavLinkAttrs(item, 'MobileMenuModal');
  const aClass = ['fontchange14', 'text-decoration-none', 'text-reset', item.linkClassName].filter(Boolean).join(' ');
  const spanClass = ['d-block', 'py-2', item.spanClassName].filter(Boolean).join(' ');
  return (
    <a
      href={href}
      className={aClass}
      data-bs-dismiss="modal"
      style={{ marginLeft: 0 }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={spanClass} style={{ marginLeft: 0 }}>
        {item.label}
      </span>
    </a>
  );
}

function MobileNavNode({ item, path }: { item: NavTreeItem; path: string }) {
  if (item.type === 'link') {
    return (
      <li>
        <MobileNavLinkRow item={item} />
      </li>
    );
  }

  const collapseId = collapseDomId(path);
  return (
    <li className="border-0">
      <button
        type="button"
        className="w-100 text-start border-0 bg-transparent fontchange14 text-reset py-2 px-0 d-flex align-items-center justify-content-between"
        data-bs-toggle="collapse"
        data-bs-target={`#${collapseId}`}
        aria-expanded="false"
        aria-controls={collapseId}
      >
        <span>{item.label}</span>
        <i className="fa fa-chevron-down small" aria-hidden="true" />
      </button>
      <div id={collapseId} className="collapse">
        <ul className="list-unstyled mb-0 ps-3 pb-1 border-start ms-1">
          {item.children.map((child, j) => (
            <MobileNavNode key={`${path}-${j}`} item={child} path={`${path}-${j}`} />
          ))}
        </ul>
      </div>
    </li>
  );
}

/**
 * Port of `header.ctp` guest mobile drawer: `#mobileMenuNew.modal.left.fade`
 * + `m-menu` links + `#signInLink` + Get Started accordion.
 * Main links are driven by `items` (same as desktop). Login modals / jQuery live in the host app — see `docs/header-ctp-reference.md`.
 */
export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ cdnBase, items }) => {
  const rootPath = React.useId().replace(/:/g, '');

  return (
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
                {items.map((item, i) => (
                  <MobileNavNode key={`${rootPath}-${i}`} item={item} path={`${rootPath}-${i}`} />
                ))}
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
                      href="/yuva_register"
                      data-bs-dismiss="modal"
                      style={{ borderBottom: '1px solid #D7D7D7' }}
                    >
                      <span className="lang_yuva">Youth</span>
                      <br />
                      <span className="f-10-dropdown lang_applicants_volunteer">Applicants/Volunteers/Participants</span>
                    </a>
                    <a
                      className="mbv_partner text-decoration-none d-block py-2"
                      href="/partner_register"
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
};

export default MobileMenuModal;
