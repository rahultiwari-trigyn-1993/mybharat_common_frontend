/** Raw user object from MY Bharat profile / session API (`data` field). */
export type HeaderUserApiData = {
  id?: number;
  dl_id?: string;
  screen_name?: string | null;
  username?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  user_email?: string | null;
  profile_pic?: string | null;
  profile_pic_path?: string | null;
  public_profile?: string | null;
  my_bharat_id?: string | null;
  /** CakePHP session `User.UserType` when provided by host. */
  user_type?: number | null;
  userType?: number | null;
  org_type?: string | null;
  orgType?: string | null;
  yuva_type?: string | null;
  admin_id?: number | null;
  [key: string]: unknown;
};

/** Full API envelope the host may pass through. */
export type HeaderUserApiEnvelope = {
  message?: string;
  status_code?: string | number;
  data?: HeaderUserApiData | null;
};

export type HeaderUserSessionInput =
  | HeaderUserSession
  | HeaderUserApiEnvelope
  | HeaderUserApiData
  | null
  | undefined;

/** Host sends `{ data: { id, ... } }` when logged in, or `{ data: {} }` for guest. */
export function isGuestHeaderUserPayload(input: HeaderUserSessionInput): boolean {
  return parseHeaderUserSession(input) == null;
}

/** Normalized session consumed by header profile UI. */
export type HeaderUserSession = {
  id: number;
  dlId?: string;
  displayName: string;
  username?: string;
  email?: string;
  profilePic?: string | null;
  publicProfileUrl?: string;
  myBharatId?: string;
  userType?: number;
  orgType?: string;
};

function ucfirst(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export type HeaderProfileMenuItem = {
  href: string;
  label: string;
  iconClass: string;
  className?: string;
  external?: boolean;
};

const EXCLUDED_PROFILE_MENU_TYPES = new Set([11, 12, 13, 14, 50]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readUserType(data: HeaderUserApiData): number | undefined {
  const raw = data.user_type ?? data.userType;
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : undefined;
}

function buildDisplayName(data: HeaderUserApiData): string {
  const parts = [data.first_name, data.middle_name, data.last_name]
    .map((p) => (typeof p === 'string' ? p.trim() : ''))
    .filter(Boolean);
  if (parts.length) return ucfirst(parts.join(' '));

  const screen = typeof data.screen_name === 'string' ? data.screen_name.trim() : '';
  if (screen) return ucfirst(screen);

  const username = typeof data.username === 'string' ? data.username.trim() : '';
  if (username) return username;

  return 'User';
}

function resolveUserType(data: HeaderUserApiData): number | undefined {
  const explicit = readUserType(data);
  if (explicit != null) return explicit;
  if (typeof data.yuva_type === 'string' && data.yuva_type.trim()) return 6;
  return undefined;
}

function parseUserId(data: Record<string, unknown>): number | null {
  const raw = data.id;
  if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) return raw;
  if (typeof raw === 'string' && raw.trim() !== '') {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}

function isEmptyUserData(data: unknown): boolean {
  if (data == null) return true;
  if (!isRecord(data)) return true;
  if (Object.keys(data).length === 0) return true;
  return parseUserId(data) == null;
}

function unwrapUserData(input: HeaderUserSessionInput): HeaderUserApiData | null {
  if (input == null) return null;
  if (isRecord(input) && 'displayName' in input && typeof input.id === 'number') {
    return null;
  }
  if (isRecord(input) && 'data' in input) {
    if (isEmptyUserData(input.data)) return null;
    return input.data as HeaderUserApiData;
  }
  if (isRecord(input)) {
    if (isEmptyUserData(input)) return null;
    return input as HeaderUserApiData;
  }
  return null;
}

function normalizeSession(data: HeaderUserApiData): HeaderUserSession | null {
  if (isEmptyUserData(data)) return null;

  const id = parseUserId(data as Record<string, unknown>);
  if (id == null) return null;

  const displayName = buildDisplayName(data);
  if (!displayName.trim()) return null;

  const profilePic =
    (typeof data.profile_pic === 'string' && data.profile_pic.trim()) ||
    (typeof data.profile_pic_path === 'string' && data.profile_pic_path.trim()) ||
    null;

  return {
    id,
    dlId: typeof data.dl_id === 'string' ? data.dl_id : undefined,
    displayName,
    username: typeof data.username === 'string' ? data.username : undefined,
    email: typeof data.user_email === 'string' ? data.user_email : undefined,
    profilePic,
    publicProfileUrl: typeof data.public_profile === 'string' ? data.public_profile : undefined,
    myBharatId: typeof data.my_bharat_id === 'string' ? data.my_bharat_id : undefined,
    userType: resolveUserType(data),
    orgType:
      (typeof data.org_type === 'string' && data.org_type) ||
      (typeof data.orgType === 'string' && data.orgType) ||
      undefined,
  };
}

/** Returns normalized session or `null` when guest / invalid payload. */
export function parseHeaderUserSession(input: HeaderUserSessionInput): HeaderUserSession | null {
  if (input == null) return null;
  if (isRecord(input) && 'displayName' in input && typeof input.id === 'number') {
    return input as HeaderUserSession;
  }
  const data = unwrapUserData(input);
  if (!data) return null;
  return normalizeSession(data);
}

export function isHeaderUserLoggedIn(input: HeaderUserSessionInput): boolean {
  return parseHeaderUserSession(input) != null;
}

export function headerUserInitial(user: HeaderUserSession): string {
  const ch = user.displayName.trim().charAt(0);
  return ch ? ch.toUpperCase() : 'U';
}

export function headerUserDisplayName(user: HeaderUserSession, maxLength = 20): string {
  const name = user.displayName.trim();
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
}

/** Profile dropdown items — aligned to legacy `header.ctp` (youth + partner branches). */
export function buildHeaderProfileMenuItems(
  user: HeaderUserSession,
  options?: { webroot?: string }
): HeaderProfileMenuItem[] {
  const webroot = (options?.webroot ?? '/').replace(/\/?$/, '/');
  const items: HeaderProfileMenuItem[] = [];
  const userType = user.userType;

  if (userType == null || !EXCLUDED_PROFILE_MENU_TYPES.has(userType)) {
    if (userType === 6) {
      items.push({
        href: user.publicProfileUrl ?? '/youth-profile',
        label: 'MY Bharat Profile',
        iconClass: 'fa fa-th-large',
        external: Boolean(user.publicProfileUrl?.startsWith('http')),
      });
    } else {
      items.push({
        href: '/dashboard',
        label: 'Dashboard',
        iconClass: 'fa fa-th-large',
      });
    }

    if (userType != null && userType !== 6) {
      items.push(
        {
          href: `${webroot}users/editpartnerprofile`,
          label: 'My Account',
          iconClass: 'fa fa-user',
        },
        {
          href: `${webroot}reports/partner_profile`,
          label: 'View Profile',
          iconClass: 'fa fa-user',
        }
      );
    }
  }

  items.push({
    href: `${webroot}users/check_user_logout`,
    label: 'Log Out',
    iconClass: 'fa fa-power-off',
    className: 'firebase-profile-logout-btn',
  });

  return items;
}

export function encodeHeaderUserIdForLogout(userId: number): string {
  if (typeof window !== 'undefined' && typeof window.encodeIdentifier === 'function') {
    try {
      return window.encodeIdentifier(String(userId));
    } catch {
      /* fall through */
    }
  }
  return String(userId);
}
