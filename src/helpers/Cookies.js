import cookie from "react-cookie";
import config from "@plone/volto/registry";

export const COOKIES_PREFIX = "vgdpr_";

export const getExpirationDate = (date = null, expiringDays) => {
  const days =
    expiringDays ??
    config.settings["volto-gdpr-privacy"]?.cookieExpires ??
    6 * 30; //default: 6 month
  const expireDate = date ? new Date(date) : new Date();
  expireDate.setTime(expireDate.getTime() + expiringDays * 24 * 60 * 60 * 1000);
  return expireDate;
};

export default class Cookies {
  get(name) {
    return cookie.load(COOKIES_PREFIX + name);
  }

  set(name, value, cookieExpiration) {
    cookie.save(COOKIES_PREFIX + name, value, {
      expires: cookieExpiration || getExpirationDate(),
      path: "/",
    });
  }

  remove(name) {
    cookie.remove(COOKIES_PREFIX + name, { path: "/" });
  }
}
