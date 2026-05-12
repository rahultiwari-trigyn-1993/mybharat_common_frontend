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

function NavDropdownChild({
  item,
  segments,
  nestedOpenKey,
  setNestedOpenKey,
}: {
  item: NavTreeItem;
  segments: readonly number[];
  nestedOpenKey: string | null;
  setNestedOpenKey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const myKey = navTreeItemKey(item, segments);

  if (!isNavGroupItem(item)) {
    return <NavLinkInline item={item} />;
  }

  const isOpen = nestedOpenKey === myKey;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setNestedOpenKey(isOpen ? null : myKey);
  };

  const handleMouseLeave = React.useCallback(() => {
    if (isOpen) {
      setNestedOpenKey(null);
    }
  }, [isOpen, setNestedOpenKey]);

  return (
    <div className={`dropdown_evnt_prog ${isOpen ? 'active' : ''}`} onMouseLeave={handleMouseLeave}>
      <button type="button" className="dropevent" onClick={handleClick}>
        {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div className="dropevent_content" role="menu" style={{ display: isOpen ? 'block' : 'none' }}>
        <i className="fa fa-caret-up" aria-hidden="true"></i>
        {item.children.map((child, i) => {
          const childSegments = [...segments, i] as const;
          return (
            <NavDropdownChild
              key={navTreeItemKey(child, childSegments)}
              item={child}
              segments={childSegments}
              nestedOpenKey={nestedOpenKey}
              setNestedOpenKey={setNestedOpenKey}
            />
          );
        })}
      </div>
    </div>
  );
}

function DropdownLi({
  item,
  segments,
  openTopKey,
  setOpenTopKey,
  topMenuKey,
}: {
  item: NavGroupItem;
  segments: readonly number[];
  openTopKey: string | null;
  setOpenTopKey: React.Dispatch<React.SetStateAction<string | null>>;
  topMenuKey: string;
}) {
  const [nestedOpenKey, setNestedOpenKey] = React.useState<string | null>(null);
  const isOpenTop = openTopKey === topMenuKey;

  React.useEffect(() => {
    if (!isOpenTop) {
      setNestedOpenKey(null);
    }
  }, [isOpenTop]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenTopKey(isOpenTop ? null : topMenuKey);
  };

  const handleMouseLeave = React.useCallback(() => {
    if (isOpenTop) {
      setOpenTopKey(null);
    }
  }, [isOpenTop, setOpenTopKey]);

  return (
    <li role="presentation">
      <div className={`dropdown_evnt_prog ${isOpenTop ? 'active' : ''}`} onMouseLeave={handleMouseLeave}>
        <button type="button" className="dropevent" onClick={handleClick}>
          {item.label} <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </button>
        <div className="dropevent_content" role="menu" style={{ display: isOpenTop ? 'block' : 'none' }}>
          <i className="fa fa-caret-up" aria-hidden="true"></i>
          {item.children.map((child, i) => {
            const childSegments = [...segments, i] as const;
            return (
              <NavDropdownChild
                key={navTreeItemKey(child, childSegments)}
                item={child}
                segments={childSegments}
                nestedOpenKey={nestedOpenKey}
                setNestedOpenKey={setNestedOpenKey}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}

function TopItem({
  item,
  segments,
  openTopKey,
  setOpenTopKey,
}: {
  item: NavTreeItem;
  segments: readonly number[];
  openTopKey: string | null;
  setOpenTopKey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  if (!isNavGroupItem(item)) {
    return <NavLinkLi item={item} />;
  }
  return (
    <DropdownLi
      item={item}
      segments={segments}
      openTopKey={openTopKey}
      setOpenTopKey={setOpenTopKey}
      topMenuKey={navTreeItemKey(item, segments)}
    />
  );
}

export type DesktopMainNavProps = {
  items: readonly NavTreeItem[];
};

/**
 * Renders only `ul.menu_nav1` — place inside the existing desktop `nav.navbar` next to auth controls.
 * Tree from API/CMS/ELK; {@link isSafeNavHref} blocks `javascript:` / `data:` on the client.
 * Only one top-level dropdown is open at a time; within an open panel, only one nested group is open at a time.
 * Menus close when the pointer leaves the trigger + panel wrapper (desktop).
 */
export const DesktopMainNav: React.FC<DesktopMainNavProps> = ({ items }) => {
  const tree = React.useMemo(() => normalizeNavTree(items), [items]);
  const [openTopKey, setOpenTopKey] = React.useState<string | null>(null);

  return (
    <ul className="menu_nav1">
      {tree.map((item, index) => {
        const segments = [index] as const;
        return (
          <TopItem
            key={navTreeItemKey(item, segments)}
            item={item}
            segments={segments}
            openTopKey={openTopKey}
            setOpenTopKey={setOpenTopKey}
          />
        );
      })}
    </ul>
  );
};
