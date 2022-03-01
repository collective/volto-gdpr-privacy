import usePanelConfigAndPreferences from './usePanelConfigAndPreferences';
import GDPRCookies from './GDPRCookies';
import { getLocaleConf, getCookiesKeys } from './config';
import { groupIsAccepted } from './banner';

const isPageSpeedBot = () => {
  return (
    navigator.userAgent.indexOf('Speed Insights') > -1 ||
    navigator.userAgent.indexOf('Chrome-Lighthouse') > -1
  );
};

export {
  usePanelConfigAndPreferences,
  GDPRCookies,
  getLocaleConf,
  getCookiesKeys,
  groupIsAccepted,
  isPageSpeedBot,
};
