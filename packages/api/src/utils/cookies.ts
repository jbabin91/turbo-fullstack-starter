import cookie, { type CookieSerializeOptions } from 'cookie';

export function getCookies(req: Request): Record<string, string> {
  const cookieHeader = req.headers.get('Cookie');
  if (!cookieHeader) return {};
  return cookie.parse(cookieHeader);
}

export function getCookie(req: Request, name: string): string | undefined {
  const cookieHeader = req.headers.get('Cookie');
  if (!cookieHeader) return undefined;
  const cookies = cookie.parse(cookieHeader);
  return cookies[name];
}

export function setCookie(
  resHeaders: Headers,
  name: string,
  value: string,
  options?: CookieSerializeOptions,
): void {
  resHeaders.append('Set-Cookie', cookie.serialize(name, value, options));
}
