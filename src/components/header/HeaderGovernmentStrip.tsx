import React from 'react';

/** Dark “Government of India” strip + accessibility controls (identical for Header / Header2). */
export function HeaderGovernmentStrip({ cdn }: { cdn: string }) {
  return (
    <div className="header-top d-none d-sm-block ">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 d-flex col-sm-4 col-6 align-items-center">
            <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" className="goi">
              <img src={`${cdn}/assets/img/mybharat/Flag%20of%20India.png`} className="cursor" alt="" />
              <strong className="gov_india">Government of India</strong>
            </a>
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-8 col-6 text-end">
            <span className=" d-none d-md-inline">
              <button role="button" id="decreasetext" className="font01">
                -A
              </button>

              <button role="button" id="resettext" className="font01 active01">
                A
              </button>

              <button role="button" id="increasetext" className="font01">
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
              <div id="bhashini-desktop-header" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
