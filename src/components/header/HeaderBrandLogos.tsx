import React from 'react';

type HeaderBrandLogosProps = {
  cdn: string;
  /** Mobile drawer row uses aligned flex + span wrapper; desktop matches legacy markup. */
  layout: 'mobile' | 'desktop';
};

export function HeaderBrandLogos({ cdn, layout }: HeaderBrandLogosProps) {
  const yas = `${cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`;
  const mb = `${cdn}/assets/img/yuva_landing/mybharatlogo_opt_2x.png`;

  if (layout === 'mobile') {
    return (
      <div className="d-flex new_head align-items-center">
        <a href="/">
          <img src={yas} className="new_head1 logo-w-sm-md1" alt="" />
        </a>
        <span className="d-inline-flex align-items-center">
          <a href="/">
            <img src={mb} className="logo-w-sm-md-sec" alt="MY Bharat" />
          </a>
        </span>
      </div>
    );
  }

  return (
    <div className="d-flex new_head">
      <a href="/">
        <img src={yas} className="new_head1 logo-w-sm-md1" alt="" />
      </a>
      <span style={{ display: 'inline-flex' }}>
        <a href="/">
          <img src={mb} className="logo-w-sm-md-sec" alt="MY Bharat" />
        </a>
      </span>
    </div>
  );
}
