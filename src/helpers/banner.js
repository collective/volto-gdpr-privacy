import { getCookiesKeys } from './config';

export const showBanner = (cookies, cookiesConfig) => {
  const version = cookies.get('cookies_version');

  if (!version) {
    return true;
  }
  if (version !== cookiesConfig.last_updated) {
    return true;
  }
  const technicalKeys = getCookiesKeys(cookiesConfig.technical);
  const profilingKeys = getCookiesKeys(cookiesConfig.profiling);

  const technicalPref = technicalKeys.map((k) => cookies.get(k));
  const profilingPref = profilingKeys.map((k) => cookies.get(k));

  return (
    technicalPref.indexOf(undefined) >= 0 ||
    technicalPref.indexOf(null) >= 0 ||
    profilingPref.indexOf(undefined) >= 0 ||
    profilingPref.indexOf(null) >= 0
  );
};
