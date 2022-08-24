import Cookies from 'universal-cookie';
import { getCookieOptions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

export const COOKIES_PREFIX = 'vgdpr_';

export const getExpirationDate = (date = null, expiringDays) => {
  const days =
    expiringDays ??
    config.settings['volto-gdpr-privacy']?.cookieExpires ??
    6 * 30; //default: 6 month
  const expireDate = date ? new Date(date) : new Date();
  expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
  return expireDate;
};

class GDPRCookies {
  constructor() {
    this.cookies = new Cookies();
  }
  get(name) {
    return this.cookies.get(COOKIES_PREFIX + name);
  }

  set(name, value, cookieExpiration) {
    this.cookies.set(
      COOKIES_PREFIX + name,
      value,
      getCookieOptions({
        expires: cookieExpiration || getExpirationDate(),
      }),
    );
    this.cookies.set(
      COOKIES_PREFIX + 'last_user_choice',
      new Date().toISOString(),
      getCookieOptions({
        expires: cookieExpiration || getExpirationDate(),
      }),
    );
  }

  remove(name) {
    this.cookies.remove(COOKIES_PREFIX + name, { path: '/' });
  }
}

export default GDPRCookies;
