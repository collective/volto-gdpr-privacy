import usePanelConfigAndPreferences from './usePanelConfigAndPreferences';
import Cookies from './Cookies';
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
  Cookies,
  getLocaleConf,
  getCookiesKeys,
  groupIsAccepted,
  isPageSpeedBot,
};
