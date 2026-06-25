export type EstablishSessionFlow = 'login_password' | 'login_otp' | 'registration';

export type SubmitEstablishSessionParams = {
  /** Portal origin (`VITE_BASE_URL` / Header `baseUrl`). */
  baseUrl: string;
  flow: EstablishSessionFlow;
  username: string;
  authResponse: unknown;
  /** Registration only — POST field `qualification`. */
  qualification?: string;
  /** Registration only — POST field `sports_area`. */
  sportsArea?: string;
  /** Registration only — POST field `is_outside_india` (`"1"` when international). */
  isOutsideIndia?: boolean;
  /** Registration only — POST field `country_id`. */
  countryId?: string;
};

/** `{baseUrl}/establish_session` — PHP hydrates session from gateway auth response. */
export function resolveEstablishSessionAction(baseUrl: string): string {
  const base = baseUrl.trim().replace(/\/$/, '');
  if (!base) return '/establish_session';
  return `${base}/establish_session`;
}

/** Full-page form POST — leaves the React SPA (not fetch/AJAX). */
export function submitEstablishSessionForm(params: SubmitEstablishSessionParams): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = resolveEstablishSessionAction(params.baseUrl);
  form.style.display = 'none';
  form.acceptCharset = 'UTF-8';

  const fields: Record<string, string> = {
    flow: params.flow,
    username: params.username.trim(),
    auth_response: JSON.stringify(params.authResponse ?? {}),
  };

  if (params.flow === 'registration') {
    fields.qualification = String(params.qualification ?? '');
    fields.sports_area = String(params.sportsArea ?? '');
    fields.is_outside_india = params.isOutsideIndia ? '1' : '';
    fields.country_id = String(params.countryId ?? '');
  }

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
