import React from 'react';
import { openLoginWithOtpModal } from './login/headerLoginFlow';
import {
  isHeaderUserLoggedIn,
  parseHeaderUserSession,
  type HeaderUserSessionInput,
} from './headerUserSession';
import { HeaderProfileMenu } from './HeaderProfileMenu';

export type HeaderAuthControlsProps = {
  cdn: string;
  userSession?: HeaderUserSessionInput;
  webroot?: string;
};

/**
 * Desktop auth area — guest Sign In / Register or logged-in profile dropdown.
 */
export function HeaderAuthControls({ cdn, userSession, webroot }: HeaderAuthControlsProps) {
  const user = parseHeaderUserSession(userSession);

  if (user) {
    return <HeaderProfileMenu user={user} webroot={webroot} variant="desktop" />;
  }

  return (
    <>
      <button
        id="btnGroupDrop1"
        type="button"
        className="btn mb-common-header__auth-btn"
        onClick={(e) => {
          e.preventDefault();
          openLoginWithOtpModal();
        }}
      >
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
            <br />{' '}
            <span className="f-12-dropdown lang_applicants_volunteer">Applicants/Volunteers/Participants</span>
          </a>
        </div>
      </div>
    </>
  );
}

export { isHeaderUserLoggedIn, parseHeaderUserSession };
export default HeaderAuthControls;
