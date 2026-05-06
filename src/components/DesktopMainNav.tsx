import React from 'react';
import type { NavGroupItem, NavLinkItem, NavTreeItem } from '../navigation/types';
import { getNavLinkAttrs } from '../navigation/navLinkAttrs';
import { isNavGroupItem, normalizeNavTree } from '../navigation/navTree';

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
  const [isOpen, setIsOpen] = React.useState(false);
  
  if (!isNavGroupItem(item)) {
    return <NavLinkInline item={item} id={id} />;
  }
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  
  return (
    <div key={id} className={`dropdown_evnt_prog ${isOpen ? 'active' : ''}`}>
      <button type="button" className="dropevent" onClick={handleClick}>
        {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div className="dropevent_content" role="menu" style={{ display: isOpen ? 'block' : 'none' }}>
        <i className="fa fa-caret-up" aria-hidden="true"></i>
        {item.children.map((child, i) => (
          <NavDropdownChild key={`${id}-n-${i}`} item={child} id={`${id}-n-${i}`} />
        ))}
      </div>
    </div>
  );
}

function DropdownLi({ item, id }: { item: NavGroupItem; id: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  
  return (
    <li key={id} role="presentation">
      <div className={`dropdown_evnt_prog ${isOpen ? 'active' : ''}`}>
        <button type="button" className="dropevent" onClick={handleClick}>
          {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </button>
        <div className="dropevent_content" role="menu" style={{ display: isOpen ? 'block' : 'none' }}>
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
  if (!isNavGroupItem(item)) {
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
export const DesktopMainNav: React.FC<DesktopMainNavProps> = ({ items }) => {
  const tree = React.useMemo(() => normalizeNavTree(items), [items]);
  return (
    <ul className="menu_nav1">
      {tree.map((item, index) => (
        <TopItem key={index} item={item} index={index} />
      ))}
    </ul>
  );
};
