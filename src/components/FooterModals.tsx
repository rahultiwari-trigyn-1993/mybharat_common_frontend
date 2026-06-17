import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { openLoginWithOtpModal } from './header/login/headerLoginFlow';
import {
  resetFeedbackRecaptchaSafely,
} from './footer/footerRecaptchaBridge';
import { resolveRecaptchaSiteKey } from './footer/resolveRecaptchaSiteKey';
import { preloadRecaptchaScript } from './footer/footerRecaptchaLoader';
import { scheduleFeedbackRecaptchaRender } from './footer/footerRecaptchaWidget';

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
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const captchaSiteKey = resolveRecaptchaSiteKey(recaptchaSiteKey);
  const showGuestFeedbackRow = !isLoggedIn;
  const canRenderCaptcha = showGuestFeedbackRow && Boolean(captchaSiteKey);

  const queueCaptchaRender = (): void => {
    if (!canRenderCaptcha) return;
    scheduleFeedbackRecaptchaRender(() => captchaContainerRef.current, captchaSiteKey, 150);
  };

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!canRenderCaptcha) return undefined;
    preloadRecaptchaScript();
    return undefined;
  }, [canRenderCaptcha]);

  useEffect(() => {
    const modalEl = document.getElementById('feed_back');
    if (!modalEl || !canRenderCaptcha) return undefined;

    const onShown = () => {
      queueCaptchaRender();
    };

    const onHidden = () => {
      resetFeedbackRecaptchaSafely();
    };

    modalEl.addEventListener('shown.bs.modal', onShown);
    modalEl.addEventListener('hidden.bs.modal', onHidden);

    // Modal may already be open when listeners attach (e.g. fast navigation).
    if (modalEl.classList.contains('show')) {
      queueCaptchaRender();
    }

    return () => {
      modalEl.removeEventListener('shown.bs.modal', onShown);
      modalEl.removeEventListener('hidden.bs.modal', onHidden);
    };
  }, [canRenderCaptcha, captchaSiteKey]);

  const hideChoiceShowForm = () => {
    const Modal = getBootstrapModal();
    const el1 = document.getElementById('feed_back1');
    const elForm = document.getElementById('feed_back');
    if (!Modal || !el1 || !elForm) return;
    Modal.getInstance(el1)?.hide();
    window.setTimeout(() => {
      Modal.getOrCreateInstance(elForm).show();
      queueCaptchaRender();
    }, 200);
  };

  const hideChoiceOpenRegistered = () => {
    const Modal = getBootstrapModal();
    Modal?.getInstance(document.getElementById('feed_back1'))?.hide();
    onRegisteredUserClick?.();
    window.setTimeout(() => {
      if (document.getElementById('loginWithOtpModal')) {
        openLoginWithOtpModal();
      }
    }, 200);
  };

  const feedbackActions = (
    <div className="cross_ico mb-common-footer__feedback-actions">
      <img src={`${cdnBase}/assets/img/yuva_landing/mega_checkcircle1.png`} id="form_cl" data-bs-dismiss="modal" alt="" />
      <a id="form_c2" href="#" className="d-inline-block">
        <img src={`${cdnBase}/assets/img/yuva_landing/mega_checkcircle.png`} alt="" />
      </a>
    </div>
  );

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
                    </>
                  ) : null}
                </div>

                {showGuestFeedbackRow ? (
                  <div className="row align-items-end mb-common-footer__feedback-footer-row">
                    <div className="col-sm-8 col-md-9">
                      <div
                        ref={(node) => {
                          captchaContainerRef.current = node;
                          if (node && canRenderCaptcha) {
                            const modalEl = document.getElementById('feed_back');
                            if (modalEl?.classList.contains('show')) {
                              scheduleFeedbackRecaptchaRender(() => node, captchaSiteKey, 0);
                            }
                          }
                        }}
                        className="mb-common-footer__recaptcha"
                        data-sitekey={captchaSiteKey || undefined}
                      />
                      <p className="vErrormsg captchaerr"></p>
                    </div>
                    <div className="col-sm-4 col-md-3">{feedbackActions}</div>
                  </div>
                ) : (
                  <div className="row mb-common-footer__feedback-footer-row">
                    <div className="col-sm-12 d-flex justify-content-end">{feedbackActions}</div>
                  </div>
                )}
              </form>

              <div
                id="mb-common-footer-feedback-loader"
                className="mb-common-footer__feedback-loader"
                aria-hidden="true"
                aria-live="polite"
              >
                <div className="mb-common-footer__feedback-loader-inner">
                  <div className="mb-common-footer__feedback-spinner" aria-hidden="true" />
                  <span className="mb-common-footer__feedback-loader-text">Submitting…</span>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
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
