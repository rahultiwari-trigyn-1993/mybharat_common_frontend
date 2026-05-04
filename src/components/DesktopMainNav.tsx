import React from 'react';
import type { NavGroupItem, NavLinkItem, NavTreeItem } from '../navigation/types';
import { getNavLinkAttrs } from '../navigation/navLinkAttrs';

function NavLinkLi({ item, id }: { item: NavLinkItem; id: string }) {
  const { href, external } = getNavLinkAttrs(item, 'DesktopMainNav');
  return (
    <li key={id}>
      {' '}
      <a
        className={item.linkClassName ?? 'fontchange14'}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.spanClassName ? (
          <span className={item.spanClassName}>{item.label}</span>
        ) : (
          <span className="">{item.label}</span>
        )}
      </a>
    </li>
  );
}

function NavLinkInline({ item, id }: { item: NavLinkItem; id: string }) {
  const { href, external } = getNavLinkAttrs(item, 'DesktopMainNav');
  return (
    <a
      key={id}
      className={item.linkClassName ?? 'fontchange14'}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {item.spanClassName ? <span className={item.spanClassName}>{item.label}</span> : <span>{item.label}</span>}
    </a>
  );
}

function NavDropdownChild({ item, id }: { item: NavTreeItem; id: string }) {
  if (item.type === 'link') {
    return <NavLinkInline item={item} id={id} />;
  }
  return (
    <div key={id} className="dropdown_evnt_prog">
      <button type="button" className="dropevent">
        {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div className="dropevent_content" role="menu">
        <i className="fa fa-caret-up" aria-hidden="true"></i>
        {item.children.map((child, i) => (
          <NavDropdownChild key={`${id}-n-${i}`} item={child} id={`${id}-n-${i}`} />
        ))}
      </div>
    </div>
  );
}

function DropdownLi({ item, id }: { item: NavGroupItem; id: string }) {
  return (
    <li key={id} role="presentation">
      <div className="dropdown_evnt_prog">
        <button type="button" className="dropevent">
          {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </button>
        <div className="dropevent_content" role="menu">
          <i className="fa fa-caret-up" aria-hidden="true"></i>
          {item.children.map((child, i) => (
            <NavDropdownChild key={`${id}-${i}`} item={child} id={`${id}-${i}`} />
          ))}
        </div>
      </div>
    </li>
  );
}

function TopItem({ item, index }: { item: NavTreeItem; index: number }) {
  const id = `nav-${index}`;
  if (item.type === 'link') {
    return <NavLinkLi item={item} id={id} />;
  }
  return <DropdownLi item={item} id={id} />;
}

export type DesktopMainNavProps = {
  items: readonly NavTreeItem[];
};

/**
 * Renders only `ul.menu_nav1` — place inside the existing desktop `nav.navbar` next to auth controls.
 * Tree from API/CMS/ELK; {@link isSafeNavHref} blocks `javascript:` / `data:` on the client.
 */
export const DesktopMainNav: React.FC<DesktopMainNavProps> = ({ items }) => (
  <ul className="menu_nav1">
    {items.map((item, index) => (
      <TopItem key={index} item={item} index={index} />
    ))}
  </ul>
);
