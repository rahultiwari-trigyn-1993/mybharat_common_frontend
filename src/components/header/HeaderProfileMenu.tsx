import React from 'react';
import {
  buildHeaderProfileMenuItems,
  encodeHeaderUserIdForLogout,
  headerUserDisplayName,
  headerUserInitial,
  type HeaderUserSession,
} from './headerUserSession';

export type HeaderProfileMenuProps = {
  user: HeaderUserSession;
  /** Cake webroot prefix for partner / logout URLs (default `/`). */
  webroot?: string;
  /** `desktop` — navbar dropdown; `mobile` — drawer link list */
  variant?: 'desktop' | 'mobile';
};

function ProfileAvatar({ user }: { user: HeaderUserSession }) {
  const initial = headerUserInitial(user);
  const pic = user.profilePic?.trim();

  return (
    <div className="user-info-wrapper">
      <div className="profile-wrapper" id="profileMenuUserNameContatiner">
        {pic ? (
          <img src={pic} className="profileimage" width={40} height={40} alt="" />
        ) : (
          <span className="mb-common-header__profile-initial" aria-hidden="true">
            {initial}
          </span>
        )}
      </div>
    </div>
  );
}

function MenuLink({
  item,
  userId,
  dismissModal,
  className,
}: {
  item: ReturnType<typeof buildHeaderProfileMenuItems>[number];
  userId: number;
  dismissModal?: boolean;
  className?: string;
}) {
  const isLogout = item.className?.includes('firebase-profile-logout-btn');
  const linkClass = [className, item.className].filter(Boolean).join(' ');
  return (
    <a
      href={item.href}
      className={linkClass || undefined}
      data-bs-dismiss={dismissModal ? 'modal' : undefined}
      data-userid={isLogout ? encodeHeaderUserIdForLogout(userId) : undefined}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <i className={item.iconClass} aria-hidden="true" />
      &nbsp;&nbsp;
      {item.label}
    </a>
  );
}

/** Desktop profile chip + Bootstrap dropdown (legacy `header.ctp` `.chat-toggler`). */
export function HeaderProfileMenu({ user, webroot, variant = 'desktop' }: HeaderProfileMenuProps) {
  const items = buildHeaderProfileMenuItems(user, { webroot });
  const displayName = headerUserDisplayName(user);

  if (variant === 'mobile') {
    return (
      <div className="m-menu border-top mt-2 pt-2 mb-common-header__mobile-profile">
        <ul className="list-unstyled mb-0">
          {items.map((item) => (
            <li key={item.href + item.label} className="border-bottom">
              <MenuLink
                item={item}
                userId={user.id}
                dismissModal
                className="mbv_yuva_drop text-decoration-none text-reset d-block py-2"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown chat-toggler header_img mb-common-header__profile">
      <a
        href="#"
        className="mb-common-header__profile-toggle text-decoration-none"
        id="user-options"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={(e) => e.preventDefault()}
      >
        <ProfileAvatar user={user} />
        <div className="user-details">
          <p className="mb-common-header__welcome-label">Welcome</p>
          <div className="username">{displayName}</div>
        </div>
      </a>
      <ul className="dropdown-menu dropdown-menu-end pull-right" role="menu" aria-labelledby="user-options">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <MenuLink item={item} userId={user.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderProfileMenu;
