import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type BootstrapModal = {
  getInstance: (el: Element | null) => { hide: () => void } | undefined;
  getOrCreateInstance: (el: Element | null) => { show: () => void; hide: () => void };
};

function getBootstrapModal(): BootstrapModal | undefined {
  return (typeof window !== 'undefined' && (window as unknown as { bootstrap?: { Modal: BootstrapModal } }).bootstrap?.Modal) as
    | BootstrapModal
    | undefined;
}

export type FooterModalsProps = {
  cdnBase: string;
  /** Matches PHP `isset($ufdl_id)` — logged-in user skips Guest/Registered chooser & captcha fields */
  isLoggedIn?: boolean;
  /** Google reCAPTCHA v2 site key; omit to hide captcha block */
  recaptchaSiteKey?: string;
  /** Called when user taps Registered User (opens host `#loginWithOtpModal`) */
  onRegisteredUserClick?: () => void;
};

export const FooterModals: React.FC<FooterModalsProps> = ({
  cdnBase,
  isLoggedIn,
  recaptchaSiteKey,
  onRegisteredUserClick,
}) => {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
    if (!isLoggedIn && recaptchaSiteKey && !document.getElementById('mb-google-recaptcha-script')) {
      const s = document.createElement('script');
      s.id = 'mb-google-recaptcha-script';
      s.src = 'https://www.google.com/recaptcha/api.js';
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    }
  }, [isLoggedIn, recaptchaSiteKey]);

  const hideChoiceShowForm = () => {
    const Modal = getBootstrapModal();
    const el1 = document.getElementById('feed_back1');
    const elForm = document.getElementById('feed_back');
    if (!Modal || !el1 || !elForm) return;
    Modal.getInstance(el1)?.hide();
    window.setTimeout(() => Modal.getOrCreateInstance(elForm).show(), 200);
  };

  const hideChoiceOpenRegistered = () => {
    const Modal = getBootstrapModal();
    Modal?.getInstance(document.getElementById('feed_back1'))?.hide();
    onRegisteredUserClick?.();
    const hostModal = document.getElementById('loginWithOtpModal');
    if (hostModal && getBootstrapModal()) {
      window.setTimeout(() => getBootstrapModal()!.getOrCreateInstance(hostModal).show(), 200);
    }
  };

  const content = (
    <>
      <div className="modal fade" id="feed_back1" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body" style={{ borderRadius: 8 }}>
              <div className="row" id="pls_select">
                <div className="col-sm-12">
                  <img
                    src={`${cdnBase}/assets/img/yuva_landing/XCircle_n.png`}
                    alt=""
                    className="btn-close"
                    data-bs-dismiss="modal"
                  />
                </div>
                <div className="col-sm-12">
                  <h3>Please Select</h3>
                  <button type="button" id="guest_usr" className="btn btn-success" name="Guest User" onClick={hideChoiceShowForm}>
                    Guest User
                  </button>
                  <button type="button" id="regi_usr" className="btn btn-info" name="Registered User" onClick={hideChoiceOpenRegistered}>
                    Registered User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="feed_back" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body" style={{ borderRadius: 8 }}>
              <div className="row">
                <div className="col-sm-10">
                  <form id="feedbackFrm">
                    <input type="hidden" name="type" value="web" />
                    <div className="row pb-10">
                      <div className="col-sm-12">
                        <div className="tt_yuvr">
                          {Array.from({ length: 10 }, (_, i) => {
                            const n = i + 1;
                            return (
                              <div className="radio-tile-group" key={n}>
                                <div className="input-container">
                                  <input type="radio" name="user_rating" id={`user_rating_${n}`} value={String(n)} defaultChecked={n === 10} />
                                  <div className="radio-tile">
                                    <label className="label-text-space" htmlFor={`user_rating_${n}`}>
                                      {n}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <p className="vErrormsg Ratingerr"></p>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group text-left">
                          <label htmlFor="user_feedback">Write a feedback*</label>
                          <small id="char_left_cnt"></small>
                          <textarea
                            id="user_feedback"
                            name="user_feedback"
                            rows={4}
                            cols={50}
                            className="form-control"
                            placeholder="Write here (250 characters)"
                            maxLength={250}
                          />
                          <p className="vErrormsg Feedbackerr"></p>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <>
                          <input type="hidden" id="feedback_captcha_name" name="feedback_captcha_name" value="" />
                          <div className="col-sm-4">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="user_name"
                                name="user_name"
                                placeholder="Name*"
                                maxLength={100}
                              />
                              <p className="vErrormsg Nameerr"></p>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="user_mobile"
                                name="user_mobile"
                                placeholder="Mobile*"
                                maxLength={10}
                              />
                              <p className="vErrormsg Mobileerr"></p>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <input type="email" className="form-control" id="user_email" name="user_email" placeholder="Email*" maxLength={100} />
                              <p className="vErrormsg Emailerr"></p>
                            </div>
                          </div>
                          {recaptchaSiteKey ? (
                            <div className="row">
                              <div className="g-recaptcha" data-sitekey={recaptchaSiteKey} />
                              <p className="vErrormsg captchaerr"></p>
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </form>
                </div>
                <div className="col-sm-2">
                  <div className="row pb-10" style={{ position: 'relative', height: '97%' }}>
                    <div className="col-sm-12">
                      <div className="cross_ico">
                        <img src={`${cdnBase}/assets/img/yuva_landing/mega_checkcircle1.png`} id="form_cl" data-bs-dismiss="modal" alt="" />
                        <a id="form_c2" href="#" className="d-inline-block" onClick={(e) => e.preventDefault()}>
                          <img src={`${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10">
                  <div id="feedback_alert" className="alert" role="alert" style={{ display: 'none' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="successToaster" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog" style={{ width: 'fit-content' }}>
          <div className="modal-content" style={{ border: '2px solid #0fbd5f' }}>
            <div className="modal-header" style={{ borderBottom: 'none' }}>
              <h4 className="modal-title" style={{ color: '#0fbd5f', fontSize: 16, fontWeight: 400 }}>
                <img src={`${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`} alt="" /> Feedback has been submitted Successfully
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!portalReady) return null;
  return createPortal(content, document.body);
};

export default FooterModals;
