import Cookies from 'universal-cookie';
import { getCookieOptions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

export const DEFAULT_COOKIES_PREFIX = 'vgdpr';

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
  constructor(panel_config) {
    this.cookies = new Cookies();
    //this.panel_config = panel_config;
    this.prefix = panel_config?.cookie_version ?? DEFAULT_COOKIES_PREFIX;
    this.cookie_name = this.prefix + '_accepted_providers';
  }
  //OLD getter and setter
  get(name) {
    return this.cookies.get(this.prefix + name);
  }

  set(name, value, cookieExpiration) {
    this.cookies.set(
      this.prefix + name,
      value,
      getCookieOptions({
        expires: cookieExpiration || getExpirationDate(),
      }),
    );
    this.cookies.set(
      this.prefix + 'last_user_choice',
      new Date().toISOString(),
      getCookieOptions({
        expires: cookieExpiration || getExpirationDate(),
      }),
    );
  }
  // NEW getter, fix setter
  // get(name = null) {
  //   const cookie_value = this.cookies.get(this.cookie_name) ?? '';
  //   if (name) {
  //     const isAccepted = cookie_value.split(',').indexOf(name) >= 0;
  //     return isAccepted ? name : null;
  //   }
  //   return cookie_value;
  // }

  // set(name, value, cookieExpiration) {
  //   this.cookies.set(
  //     this.cookie_name,
  //     value,
  //     getCookieOptions({
  //       expires: cookieExpiration || getExpirationDate(),
  //     }),
  //   );
  //   this.cookies.set(
  //     DEFAULT_COOKIES_PREFIX + 'last_user_choice',
  //     new Date().toISOString(),
  //     getCookieOptions({
  //       expires: cookieExpiration || getExpirationDate(),
  //     }),
  //   );
  // }

  remove(name) {
    this.cookies.remove(this.prefix + name, { path: '/' });
  }
}

export default GDPRCookies;
