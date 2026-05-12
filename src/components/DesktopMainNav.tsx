import React from 'react';
import type { NavGroupItem, NavLinkItem, NavTreeItem } from '../navigation/types';
import { getNavLinkAttrs } from '../navigation/navLinkAttrs';
import { isNavGroupItem, normalizeNavTree } from '../navigation/navTree';
import { navTreeItemKey } from '../navigation/navTreeKeys';

function NavLinkLi({ item }: { item: NavLinkItem }) {
  const { href, external } = getNavLinkAttrs(item, 'DesktopMainNav');
  return (
    <li>
      <a
        className={item.linkClassName ?? 'fontchange14'}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.spanClassName ? (
          <span className={item.spanClassName}>{item.label}</span>
        ) : (
          <span>{item.label}</span>
        )}
      </a>
    </li>
  );
}

function NavLinkInline({ item }: { item: NavLinkItem }) {
  const { href, external } = getNavLinkAttrs(item, 'DesktopMainNav');
  return (
    <a
      className={item.linkClassName ?? 'fontchange14'}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {item.spanClassName ? <span className={item.spanClassName}>{item.label}</span> : <span>{item.label}</span>}
    </a>
  );
}

function NavDropdownChild({ item, segments }: { item: NavTreeItem; segments: readonly number[] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isNavGroupItem(item)) {
    return <NavLinkInline item={item} />;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown_evnt_prog ${isOpen ? 'active' : ''}`}>
      <button type="button" className="dropevent" onClick={handleClick}>
        {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div className="dropevent_content" role="menu" style={{ display: isOpen ? 'block' : 'none' }}>
        <i className="fa fa-caret-up" aria-hidden="true"></i>
        {item.children.map((child, i) => {
          const childSegments = [...segments, i] as const;
          return (
            <NavDropdownChild key={navTreeItemKey(child, childSegments)} item={child} segments={childSegments} />
          );
        })}
      </div>
    </div>
  );
}

function DropdownLi({ item, segments }: { item: NavGroupItem; segments: readonly number[] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <li role="presentation">
      <div className={`dropdown_evnt_prog ${isOpen ? 'active' : ''}`}>
        <button type="button" className="dropevent" onClick={handleClick}>
          {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </button>
        <div className="dropevent_content" role="menu" style={{ display: isOpen ? 'block' : 'none' }}>
          <i className="fa fa-caret-up" aria-hidden="true"></i>
          {item.children.map((child, i) => {
            const childSegments = [...segments, i] as const;
            return (
              <NavDropdownChild key={navTreeItemKey(child, childSegments)} item={child} segments={childSegments} />
            );
          })}
        </div>
      </div>
    </li>
  );
}

function TopItem({ item, segments }: { item: NavTreeItem; segments: readonly number[] }) {
  if (!isNavGroupItem(item)) {
    return <NavLinkLi item={item} />;
  }
  return <DropdownLi item={item} segments={segments} />;
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
      {tree.map((item, index) => {
        const segments = [index] as const;
        return <TopItem key={navTreeItemKey(item, segments)} item={item} segments={segments} />;
      })}
    </ul>
  );
};
