import React from 'react';
import { resolveCdnAssetUrl } from '../../config/resolve';

/** Dark “Government of India” strip + accessibility controls (identical for Header / Header2). */
export function HeaderGovernmentStrip({ cdn }: { cdn: string }) {
  return (
    <div className="header-top d-none d-sm-block ">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 d-flex col-sm-4 col-6 align-items-center">
            <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" className="goi">
              <img
                src={resolveCdnAssetUrl(cdn, 'assets/img/mybharat/Flag%20of%20India.png')}
                className="cursor"
                alt=""
              />
              <strong className="gov_india">Government of India</strong>
            </a>
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-8 col-6 text-end">
            <span className=" d-none d-md-inline">
              <button type="button" id="decreasetext" className="font01" aria-label="Decrease text size">
                -A
              </button>

              <button type="button" id="resettext" className="font01 active01" aria-label="Reset text size">
                A
              </button>

              <button type="button" id="increasetext" className="font01" aria-label="Increase text size">
                A+
              </button>
              <span className="partition">| &nbsp;</span>

              <a href="tel:18002122729" title="Toll Free" className="skip01">
                Toll Free : 14472 Or 18002122729
              </a>
              <span className="partition">| &nbsp;</span>
              <a href="/pages/support" className="skip01">
                support.mybharat.gov.in
              </a>

              <span className="partition">| &nbsp;</span>
              <span id="bhashini-desktop-header" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
