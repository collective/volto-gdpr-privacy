import Cookies from 'universal-cookie';
import { getCookieOptions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

export const DEFAULT_COOKIES_PREFIX = 'vgdpr';
export const DEFAULT_EXPIRES = 6 * 30; //default: 6 month

class GDPRCookies {
  constructor() {
    this.cookies = new Cookies();
  }

  setPanelConfig(conf) {
    this.panel_config = conf;
    this.prefix = this.panel_config?.cookie_version ?? DEFAULT_COOKIES_PREFIX;
    this.cookie_name = this.prefix + '_accepted_providers';
  }

  getExpirationDate(date = null, expiringDays) {
    const days =
      expiringDays ?? this.panel_config?.cookie_expires ?? DEFAULT_EXPIRES;
    const expireDate = date ? new Date(date) : new Date();
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    return expireDate;
  }

  get(name = null) {
    if (!this.cookie_name) {
      return null;
    }
    const cookie_value = this.cookies.get(this.cookie_name) ?? '';
    if (name) {
      const isAccepted = cookie_value.split(',').indexOf(name) >= 0;
      return isAccepted ? name : null;
    }
    return cookie_value;
  }

  set(name, value) {
    if (!this.cookie_name) {
      return;
    }
    let cookie_value = (this.cookies.get(this.cookie_name) ?? '')
      .split(',')
      .filter((i) => i != '');
    const index = cookie_value.indexOf(name);
    if (value) {
      if (index < 0) {
        cookie_value.push(name);
      }
    } else {
      if (index > -1) {
        cookie_value.splice(index, 1);
      }
    }

    this.cookies.set(
      this.cookie_name,
      cookie_value.join(','),
      getCookieOptions({
        expires: this.getExpirationDate(),
      }),
    );
  }

  remove() {
    this.cookies.remove(this.cookie_name, { path: '/' });
  }
}

export default GDPRCookies;
