import React from 'react';

type HeaderProps = {
    title?: string;
    /** Override CDN base (no trailing slash), e.g. `https://cdn-prod.mybharats.in/mybharat` */
    cdnBase?: string;
};
declare const Header: React.FC<HeaderProps>;

/**
 * Alternate header (nav + auth styling). Exported as `Header2` from the package entry.
 * Avoid mounting `Header` and `Header2` on one page — shared DOM ids / modal hooks.
 */

type Header2Props = {
    title?: string;
    /** Override CDN base (no trailing slash), e.g. `https://cdn-beta.mybharats.in/mybharat` */
    cdnBase?: string;
};
declare const Header2: React.FC<Header2Props>;

type FooterProps = {
    /** CDN origin + `/mybharat` path segment (no trailing slash) */
    cdnBase?: string;
    /** Matches logged-in `User` / `$ufdl_id` — feedback opens full form; skips Guest modal branch for captcha UI when false */
    isLoggedIn?: boolean;
    /** When set and user is not logged in, renders reCAPTCHA widget inside `#feed_back` */
    recaptchaSiteKey?: string;
    /** Consumer hook when Registered User is chosen in `#feed_back1` */
    onRegisteredUserClick?: () => void;
};
declare const Footer: React.FC<FooterProps>;

/** MY Bharat production CDN origin (CSS, JS, images under /mybharat/...). */
declare const MYBHARAT_CDN_ORIGIN = "https://cdn-prod.mybharats.in";
/** Base path for MY Bharat static assets on the CDN. */
declare const MYBHARAT_CDN_BASE = "https://cdn-prod.mybharats.in/mybharat";
/** Beta CDN base for `Header2` default (no trailing slash). */
declare const MYBHARAT_CDN_BASE_BETA = "https://cdn-beta.mybharats.in/mybharat";

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
export declare const MYBHARAT_COMMON_FRONTEND_VERSION: "1.0.63";

var index = { Header, Header2, Footer };

export { Footer, Header, Header2, MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN, index as default };
