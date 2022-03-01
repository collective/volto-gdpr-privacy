import Cookies from 'universal-cookie';
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
    this.cookies.set(COOKIES_PREFIX + name, value, {
      expires: cookieExpiration || getExpirationDate(),
      path: '/',
    });
  }

  remove(name) {
    this.cookies.remove(COOKIES_PREFIX + name, { path: '/' });
  }
}

export default GDPRCookies;
