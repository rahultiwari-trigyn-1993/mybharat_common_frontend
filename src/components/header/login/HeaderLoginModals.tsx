import React from 'react';
import { createPortal } from 'react-dom';
import './HeaderLogin.css';

export type HeaderLoginModalsProps = {
  cdnBase: string;
};

function quizRegisterHref(): string {
  if (typeof window !== 'undefined' && window.location.href.includes('/quiz')) {
    return 'javascript:void(0)';
  }
  return '/yuva_register';
}

/**
 * Login / OTP modals ported from `header.ctp`.
 * Portaled to `document.body` alongside `#mobileMenuNew`.
 */
export function HeaderLoginModals({ cdnBase }: HeaderLoginModalsProps) {
  const logo = `${cdnBase}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`;

  const content = (
    <div className="mb-common-header-login" aria-hidden={false}>
      <div className="modal fade uniform-modal-height" id="signInModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <div className="text-center w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" id="close-signIn" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check mb-1">
                <div className="row">
                  <h5 className="modal-title mb-3" id="signInModalLabel">
                    Login
                  </h5>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="username" className="form-label">
                      Mobile / Email / Username / MY Bharat ID*
                    </label>
                    <input type="text" className="form-control" id="username" name="username" placeholder="Enter here" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="password" className="form-label">
                      Password*
                    </label>
                    <div className="input-group mb-3" id="emailGroup">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        minLength={8}
                        maxLength={15}
                      />
                      <span className="input-group-text">
                        <a href="#" className="form-control-icon" id="togglePassword" onClick={(e) => e.preventDefault()}>
                          <i className="bi bi-eye-slash" aria-hidden="true" />
                        </a>
                      </span>
                    </div>
                  </div>
                  <small id="user_mobile_header_error_login" className="input-error" />
                </div>
                <div className="row mt-2" style={{ paddingTop: '0.4rem' }}>
                  <div className="col-md-12">
                    <div className="alert alert-success" id="alertDivHeader" role="alert" style={{ fontSize: 13, padding: '0.5rem 0.7rem' }}>
                      To create a new password or reset your existing one, click &apos;Forgot Password&apos;
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div style={{ marginLeft: 23 }}>
                    <input className="form-check-input" type="checkbox" id="consentCheck2" />
                    <label className="form-check-label" htmlFor="consentCheck2">
                      I consent to{' '}
                      <a href="/pages/terms_of_use" style={{ color: '#0B6BBE' }}>
                        terms of use
                      </a>
                    </label>
                  </div>
                </div>
                <div className="row mt-2" style={{ paddingTop: '0.4rem' }}>
                  <div className="col-md-8 d-flex align-items-center">
                    <p id="forgot_password" title="To create a new password or reset your existing one, click 'Forgot Password'">
                      Forgot Password
                    </p>
                    <p className="mx-2 pipe">|</p>
                    <p id="login_with_otp">Login with OTP</p>
                  </div>
                  <div className="col-md-4">
                    <button type="button" id="signInButton" className="btn btn-outline-primary rounded-pill float-end w-100 firebase-user-login-btn" disabled>
                      Login
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <hr style={{ height: 1, borderBottom: '1px solid #666', margin: '20px 0' }} />
                    <div style={{ fontSize: 16, textAlign: 'center' }}>
                      New User?{' '}
                      <a href={quizRegisterHref()}>
                        <span id="register_now">Register Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade uniform-modal-height" id="forgotPwdModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <span className="go-back" id="backToSignInModal">
                <i className="bi bi-arrow-left" aria-hidden="true" /> Go back
              </span>
              <div className="text-start w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check mb-4">
                <div className="row">
                  <h5 className="modal-title mb-3" id="forgotPwdModalLabel">
                    Forgot Password
                  </h5>
                  <div className="col-md-12">
                    <label htmlFor="user_mobile_header" className="form-label">
                      Mobile / Email / Username / MY Bharat ID*
                    </label>
                    <input type="text" className="form-control" id="user_mobile_header" name="user_mobile_header" placeholder="Enter here..." />
                  </div>
                  <small id="user_mobile_header_error" className="input-error" />
                </div>
              </div>
              <button type="button" className="btn btn-outline-primary rounded-pill float-end w-25 mr-button generate_otp_header mb-3" disabled>
                Get OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade uniform-modal-height" id="otpVerifyForgotPwdModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <span className="go-back" id="backToForgotPwdModal">
                <i className="bi bi-arrow-left" aria-hidden="true" /> Go back
              </span>
              <div className="text-start w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check">
                <div className="row">
                  <h5 className="modal-title mb-3" id="otpVerifyForgotPwdModalLabel">
                    Verify Your Account
                  </h5>
                  <div className="mb-3">
                    <label htmlFor="otp-field-2" className="form-label">
                      Enter OTP
                    </label>
                    <div className="input-group mb-3">
                      <input id="otp-field-2" type="text" className="form-control otp-field" maxLength={6} autoComplete="off" />
                    </div>
                    <div className="alert alert-success" role="alert" style={{ fontSize: 14, padding: '0.7rem 1rem' }}>
                      OTP has been sent to your <span id="mobEmailHeader" /> . OTP is valid for 2 minutes
                    </div>
                    <div className="forgot float-end">
                      <div className="otp_timer_header mb-3">
                        <p id="timerHeader" style={{ color: '#0B6BBE', fontSize: '0.8rem' }} />
                      </div>
                      <div className="resend_otp_header mb-3" style={{ display: 'none' }}>
                        <p id="resendOTPHeader" style={{ color: '#0B6BBE', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Resend OTP
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <p id="otp-field-2_error" className="text-danger" style={{ color: '#dc3545', fontSize: '0.8rem' }} />
                    </div>
                    <input type="hidden" id="verified_otp_header" defaultValue="0" />
                  </div>
                </div>
              </div>
              <button type="button" id="btn-verify-otp-header" className="btn btn-outline-primary rounded-pill float-end w-25 mr-button mb-3">
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade uniform-modal-height" id="newPasswordModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <span className="go-back" id="backToOtpVerifyForgotPwdModal">
                <i className="bi bi-arrow-left" aria-hidden="true" /> Go back
              </span>
              <div className="text-start w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check mb-1">
                <div className="row">
                  <h5 className="modal-title mb-3" id="newPasswordModalLabel">
                    Set a New Password
                  </h5>
                  <div className="mb-3" style={{ fontSize: 15 }}>
                    Create a new password. Ensure it differs from previous ones for security
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="newPwd" className="form-label">
                      Password*
                    </label>
                    <div className="input-group">
                      <input type="password" className="form-control" id="newPwd" name="newPwd" minLength={8} maxLength={15} />
                      <span className="input-group-text">
                        <a href="#" className="form-control-icon" id="toggleNewPwd" onClick={(e) => e.preventDefault()}>
                          <i className="bi bi-eye-slash" aria-hidden="true" />
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="confirmPwd" className="form-label">
                      Confirm Password*
                    </label>
                    <div className="input-group mb-3">
                      <input type="password" className="form-control" id="confirmPwd" name="confirmPwd" minLength={8} maxLength={15} />
                      <span className="input-group-text">
                        <a href="#" className="form-control-icon" id="toggleConfirmPwd" onClick={(e) => e.preventDefault()}>
                          <i className="bi bi-eye-slash" aria-hidden="true" />
                        </a>
                      </span>
                    </div>
                    <div id="confirmPwdHelpBlock" className="form-text" style={{ display: 'none', color: 'red' }}>
                      Passwords do not match!
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p id="new_pwd_error" className="text-danger" style={{ color: '#dc3545', fontSize: '0.8rem' }} />
                  </div>
                </div>
                <div className="row mt-2" style={{ paddingTop: '0.4rem' }}>
                  <div className="col-md-6" />
                  <div className="col-md-6">
                    <button type="button" id="updatePwdButton" className="btn btn-outline-primary rounded-pill float-end w-100 mb-20 firebase-user-password-update-btn">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade uniform-modal-height" id="successModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <span className="go-back" id="backToNewPwdModal" />
              <div className="text-start w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check mb-1">
                <div className="row">
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <i className="bi bi-check-circle-fill" style={{ fontSize: 60, color: '#279A33' }} aria-hidden="true" />
                  </div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 500, color: '#000', textAlign: 'center', paddingBottom: 20 }}>
                  You have successfully changed your password.
                </div>
                <div style={{ textAlign: 'center', marginTop: 15 }}>
                  <button type="button" id="loginNowButton" className="btn btn-outline-primary rounded-pill mb-20">
                    Login Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade uniform-modal-height" id="loginWithOtpModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <span className="go-back" id="backToSignInModal2">
                &nbsp;
              </span>
              <div className="text-start w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" id="close-otpLogin" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check mb-4">
                <div className="row">
                  <h5 className="modal-title mb-3" id="loginWithOtpModalLabel">
                    Login
                  </h5>
                  <div className="col-md-12">
                    <label htmlFor="otp_login_header" id="otp_login_header_label" className="form-label">
                      Mobile / Email*
                    </label>
                    <input type="text" className="form-control" id="otp_login_header" name="otp_login_header" placeholder="Enter here..." />
                  </div>
                  <small id="otp_login_header_error" className="input-error" style={{ paddingTop: 16 }} />
                </div>
                <div className="row mt-2">
                  <div style={{ marginLeft: 23, paddingTop: 16 }}>
                    <input className="form-check-input" type="checkbox" id="consentCheck1" />
                    <label className="form-check-label" htmlFor="consentCheck1">
                      I consent to{' '}
                      <a href="/pages/terms_of_use" style={{ color: '#0B6BBE' }}>
                        terms of use
                      </a>
                    </label>
                  </div>
                </div>
                <div className="row" style={{ marginTop: 20, marginBottom: 64 }}>
                  <div className="col-md-8" style={{ paddingTop: 6 }}>
                    <p id="login_with_pwd">Login with Password</p>
                  </div>
                  <div className="col-md-4">
                    <button type="button" className="btn btn-outline-primary rounded-pill float-end w-100 login_otp_header firebase-user-sentOtp-btn mb-3" disabled>
                      Login
                    </button>
                  </div>
                  <p>
                    <b>International users, please sign in using your registered Email ID only</b>
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <hr style={{ height: 1, borderBottom: '1px solid #666', margin: '20px 0' }} />
                    <div style={{ fontSize: 16, textAlign: 'center' }}>
                      New User?{' '}
                      <a href={quizRegisterHref()}>
                        <span id="register_now">Register Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade uniform-modal-height" id="loginWIthOtpVerifyModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <span className="go-back" id="backTologinWithOtpModal">
                <i className="bi bi-arrow-left" aria-hidden="true" /> Go back
              </span>
              <div className="text-start w-100">
                <img src={logo} className="logo-w-sm-md-sec" alt="MY Bharat" />
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-check">
                <div className="row">
                  <h5 className="modal-title mb-3" id="loginWIthOtpVerifyModalLabel">
                    Verify Your Account
                  </h5>
                  <div>
                    <label htmlFor="otp-field-3" className="form-label">
                      Enter OTP
                    </label>
                    <div className="input-group mb-3">
                      <input id="otp-field-3" type="text" className="form-control otp-field" maxLength={6} autoComplete="off" />
                    </div>
                    <div className="alert alert-success" id="alertVerifyHeader" role="alert" style={{ fontSize: 14, padding: '0.7rem 0.8rem' }}>
                      OTP has been sent to your <span id="mobEmailConfirm" /> . OTP is valid for 2 minutes
                    </div>
                    <div className="forgot float-end">
                      <div className="otp_timer_header mb-3">
                        <p id="timerHeaderOtp" style={{ color: '#0B6BBE', fontSize: '0.8rem' }} />
                      </div>
                      <div className="resend_otp_header mb-3" style={{ display: 'none' }}>
                        <p id="resendOTPVerifyHeader" style={{ color: '#0B6BBE', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Resend OTP
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <p id="otp-field-3_error" className="text-danger" style={{ color: '#dc3545', fontSize: '0.8rem' }} />
                    </div>
                    <input type="hidden" id="verify_otp_header" defaultValue="0" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button type="button" id="btn-otp-verify-header" className="btn btn-outline-primary rounded-pill float-end mb-3 firebase-user-otplogin-btn">
                      Verify OTP
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div style={{ fontSize: 16, textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: 10 }}>
                      New User?{' '}
                      <a href={quizRegisterHref()}>
                        <span id="register_now">Register Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="mb-common-header-loader" aria-hidden="true">
        <div className="spinner" />
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export default HeaderLoginModals;
