import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Header2 from '../components/Header2';
import { resolveFooterProps, resolveHeaderProps } from './parseShellConfig';
import type { HeaderUserSessionInput } from '../components/header/headerUserSession';

const HEADER_TAG = 'mybharat-header';
const FOOTER_TAG = 'mybharat-footer';

const HEADER_OBSERVED = [
  'cdn-base',
  'variant',
  'nav-items',
  'nav-json-id',
  'title',
  'user-session',
  'user-json-id',
  'webroot',
  'login-base-url',
  'api-base-url',
  'environment',
  'api-proxy-base-url',
  'login-payload-public-key',
  'ip-address',
  'bhashini',
] as const;
const FOOTER_OBSERVED = [
  'cdn-base',
  'is-logged-in',
  'recaptcha-site-key',
  'webroot',
  'feedback-api-base-url',
  'rewards-api-base-url',
  'feedback-submit-url',
] as const;

class MyBharatHeaderElement extends HTMLElement {
  private mountEl: HTMLDivElement | null = null;
  private root: Root | null = null;

  static get observedAttributes(): string[] {
    return [...HEADER_OBSERVED];
  }

  connectedCallback(): void {
    if (!this.mountEl) {
      this.mountEl = document.createElement('div');
      this.appendChild(this.mountEl);
      this.root = createRoot(this.mountEl);
    }
    this.render();
    this.dispatchEvent(
      new CustomEvent('mb:ready', {
        bubbles: true,
        detail: { component: 'header', version: __MYBHARAT_PKG_VERSION__ },
      })
    );
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
    this.mountEl = null;
    this.replaceChildren();
  }

  attributeChangedCallback(): void {
    if (this.root) this.render();
  }

  private render(): void {
    if (!this.root) return;

    const {
      cdnBase,
      title,
      variant,
      mainNavItems,
      userSession,
      webroot,
      baseUrl,
      apiBaseUrl,
      environment,
      apiProxyBaseUrl,
      loginPayloadPublicKey,
      ipAddress,
      bhashini,
    } = resolveHeaderProps(this);
    const Comp = variant === 'header2' ? Header2 : Header;

    this.root.render(
      <Comp
        cdnBase={cdnBase}
        title={title}
        mainNavItems={mainNavItems}
        userSession={userSession}
        webroot={webroot}
        baseUrl={baseUrl}
        apiBaseUrl={apiBaseUrl}
        environment={environment}
        apiProxyBaseUrl={apiProxyBaseUrl}
        loginPayloadPublicKey={loginPayloadPublicKey}
        ipAddress={ipAddress}
        bhashini={bhashini}
      />
    );
  }
}

class MyBharatFooterElement extends HTMLElement {
  private mountEl: HTMLDivElement | null = null;
  private root: Root | null = null;

  static get observedAttributes(): string[] {
    return [...FOOTER_OBSERVED];
  }

  connectedCallback(): void {
    if (!this.mountEl) {
      this.mountEl = document.createElement('div');
      this.appendChild(this.mountEl);
      this.root = createRoot(this.mountEl);
    }
    this.render();
    this.dispatchEvent(
      new CustomEvent('mb:ready', {
        bubbles: true,
        detail: { component: 'footer', version: __MYBHARAT_PKG_VERSION__ },
      })
    );
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
    this.mountEl = null;
    this.replaceChildren();
  }

  attributeChangedCallback(): void {
    if (this.root) this.render();
  }

  private render(): void {
    if (!this.root) return;

    const {
      cdnBase,
      isLoggedIn,
      recaptchaSiteKey,
      webroot,
      feedbackApiBaseUrl,
      rewardsApiBaseUrl,
      feedbackSubmitUrl,
      userSession,
    } = resolveFooterProps(this);

    this.root.render(
      <Footer
        cdnBase={cdnBase}
        isLoggedIn={isLoggedIn}
        recaptchaSiteKey={recaptchaSiteKey}
        webroot={webroot}
        feedbackApiBaseUrl={feedbackApiBaseUrl}
        rewardsApiBaseUrl={rewardsApiBaseUrl}
        feedbackSubmitUrl={feedbackSubmitUrl}
        userSession={userSession as HeaderUserSessionInput}
        onRegisteredUserClick={() => {
          this.dispatchEvent(
            new CustomEvent('mb:registered-user-click', { bubbles: true })
          );
        }}
      />
    );
  }
}

/** Register CDN shell custom elements (idempotent). */
export function registerMyBharatWebComponents(): void {
  if (!customElements.get(HEADER_TAG)) {
    customElements.define(HEADER_TAG, MyBharatHeaderElement);
  }
  if (!customElements.get(FOOTER_TAG)) {
    customElements.define(FOOTER_TAG, MyBharatFooterElement);
  }
}

export { FOOTER_TAG, HEADER_TAG };
