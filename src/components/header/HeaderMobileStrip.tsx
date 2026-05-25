import React from 'react';
import { HeaderBrandLogos } from './HeaderBrandLogos';

export type HeaderMobileStripVariant = 'split' | 'h2';

const stripClasses: Record<
  HeaderMobileStripVariant,
  {
    bar: string;
    row: string;
    logos: string;
    actions?: string;
    mid: string;
    tollLink: string;
    bhashini: string;
    end: string;
    menuBtn: string;
  }
> = {
  split: {
    bar: 'mb-common-header__mobile-bar mb-common-header__mobile-bar--split',
    row: 'mb-common-header__mobile-row mb-common-header__mobile-row--split d-flex align-items-center flex-nowrap w-100 py-2',
    logos: 'mb-common-header__mobile-logos mb-common-header__mobile-logos--split min-w-0 d-flex align-items-center',
    actions:
      'mb-common-header__mobile-actions--split f-hd-right d-sm-none1 d-flex flex-nowrap align-items-center justify-content-end flex-shrink-0 min-w-0',
    mid: 'mb-common-header__mobile-mid--split d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0',
    tollLink: 'skip01',
    bhashini: 'mb-common-header__bhashini-mid--split',
    end: 'mb-common-header__mobile-end--split d-flex align-items-center justify-content-end flex-shrink-0 min-w-0',
    menuBtn: 'btn btn-light',
  },
  h2: {
    bar: 'mb-common-header__mobile-bar--h2',
    row: 'mb-common-header__mobile-row mb-common-header__mobile-row--h2 d-flex align-items-center flex-nowrap w-100 py-2',
    logos: 'mb-common-header__mobile-logos mb-common-header__mobile-logos--h2 min-w-0 d-flex align-items-center',
    mid: 'mb-common-header__mobile-mid--h2 d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0',
    tollLink: 'skip01 mb-common-header__toll-link--h2',
    bhashini: 'mb-common-header__bhashini-mid--h2',
    end: 'mb-common-header__mobile-end--h2 d-flex align-items-center justify-content-end flex-shrink-0 min-w-0',
    menuBtn: 'btn mb-common-header__mobile-menu-btn--h2',
  },
};

export function HeaderMobileStrip({ cdn, variant }: { cdn: string; variant: HeaderMobileStripVariant }) {
  const s = stripClasses[variant];

  const tollAndBhashini = (
    <>
      <a href="tel:18002122729" title="Toll Free" id="toll_mb" className={s.tollLink}>
        <strong className="lang_toll_free">
          <i className="fa fa-phone mb-common-header__toll-phone-icon" aria-hidden="true" /> 14472 Or 18002122729
        </strong>
      </a>
      <div id="bhashini-mobile-header" className={s.bhashini} />
    </>
  );

  const menuButton = (
    <button
      type="button"
      className={s.menuBtn}
      data-bs-toggle="modal"
      id="mb_menus"
      data-bs-target="#mobileMenuNew"
      aria-label="Open menu"
    >
      <i className="fa fa-bars fa-fw " aria-hidden="true" />
    </button>
  );

  return (
    <div className={`col-12 d-lg-none ${s.bar}`}>
      <div className={s.row}>
        <div className={s.logos}>
          <HeaderBrandLogos cdn={cdn} layout="mobile" />
        </div>
        {variant === 'split' && s.actions ? (
          <div className={s.actions}>
            {tollAndBhashini}
            {menuButton}
          </div>
        ) : (
          <>
            <div className={s.mid}>{tollAndBhashini}</div>
            <div className={s.end}>{menuButton}</div>
          </>
        )}
      </div>
    </div>
  );
}
