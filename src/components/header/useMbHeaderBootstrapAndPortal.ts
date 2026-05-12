import { useEffect, useState } from 'react';

/** Injects Bootstrap / icons / datepicker assets once (by id) and enables menu portal on client. */
export function useMbHeaderBootstrapAndPortal(cdn: string): boolean {
  const [menuPortalReady, setMenuPortalReady] = useState(false);

  useEffect(() => {
    setMenuPortalReady(true);

    const appendStylesheet = (id: string, href: string) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    const appendScript = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    appendStylesheet('mb-bootstrap-css', `${cdn}/assets/css/bootstrap.min.css`);
    appendStylesheet('mb-bootstrap-icons-css', `${cdn}/assets/css/bootstrap-icons.css`);
    appendStylesheet('mb-fontawesome-css', 'https://img1.digitallocker.gov.in/nad/v-22/assets/css/fontawesome.min.css');
    // appendStylesheet('mb-bootstrap-datepicker-css', `${cdn}/css/default.css`);
    appendScript('mb-popper-js', `${cdn}/assets/js/popper.min.js`);
    appendScript('mb-bootstrap-js', `${cdn}/assets/js/bootstrap.min.js`);
    appendScript(
      'mb-bootstrap-datepicker-js',
      `${cdn}/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js`
    );
  }, [cdn]);

  return menuPortalReady;
}
