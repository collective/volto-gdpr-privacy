import { getCookiesKeys } from './config';

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
  let ret = true;
  keys.forEach((k) => {
    if (!preferences[k]) {
      ret = preferences[k];
    }
  });

  return ret;
};
