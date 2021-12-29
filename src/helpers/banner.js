import { getCookiesKeys } from './config';

export const showBanner = (cookies, cookiesConfig) => {
  const version = cookies.get('cookies_version');

  if (!version) {
    return true;
  }
  if (version !== cookiesConfig.last_updated) {
    return true;
  }

  return false;
};

export const loadPreferences = (cookies, cookiesConfig) => {
  const technicalKeys = getCookiesKeys(cookiesConfig.technical);
  const profilingKeys = getCookiesKeys(cookiesConfig.profiling);

  let preferences = { cookies_version: cookies.get('cookies_version') };
  technicalKeys.forEach((k) => {
    const c = cookies.get(k);
    const v = c === 'true' ? true : c === 'false' ? false : c;
    preferences[k] = v ?? true;
  });
  profilingKeys.forEach((k) => {
    const c = cookies.get(k);
    const v = c === 'true' ? true : c === 'false' ? false : c;
    preferences[k] = v ?? false;
  });
  return preferences;
};

export const groupIsAccepted = (groupConfig, preferences) => {
  const keys = getCookiesKeys(groupConfig);
  return keys.reduce((acc, k) => (acc === false ? acc : preferences[k]));
};
