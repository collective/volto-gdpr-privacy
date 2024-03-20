import { getCookiesKeys } from './config';

export const loadPreferences = (cookies, cookiesConfig) => {
  const technicalKeys = getCookiesKeys(cookiesConfig.technical) ?? [];
  const profilingKeys = getCookiesKeys(cookiesConfig.profiling) ?? [];

  let preferences = {};
  technicalKeys.forEach((k) => {
    const c = cookies.get('tech_' + k);
    const v = c ? true : false;
    preferences['tech_' + k] = v || true; //force profiling cookies to be true (default selected)
  });
  profilingKeys.forEach((k) => {
    const c = cookies.get('prof_' + k);
    const v = c ? true : false;
    preferences['prof_' + k] = v;
  });

  return preferences;
};

export const groupIsAccepted = (groupConfig, preferences, prefix) => {
  const keys = getCookiesKeys(groupConfig);
  let ret = true;
  keys.forEach((k) => {
    if (!preferences?.[prefix + k]) {
      ret = preferences?.[prefix + k] ?? false;
    }
  });

  return ret;
};
