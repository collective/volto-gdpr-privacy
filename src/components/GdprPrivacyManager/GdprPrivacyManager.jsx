import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cookiesConfig from '../../config/defaultPanelConfig.js';

import Cookies from '../../helpers/Cookies';
import { loadPreferences } from '../../helpers/banner';

import CookieBanner from '../CookieBanner/CookieBanner';

const GdprPrivacyManager = () => {
  const cookies = new Cookies(true);
  const defaultPreferences = loadPreferences(cookies, cookiesConfig);

  const displayBanner = useSelector(
    (state) => state.gdprPrivacyConsent.display,
  );

  const gdprPrivacyConsent = useSelector((state) =>
    Object.keys(state.gdprPrivacyConsent)?.length > 0
      ? state.gdprPrivacyConsent.preferences
      : defaultPreferences,
  );

  useEffect(() => {
    if (__SERVER__) {
      return;
    }
  }, []);

  useEffect(() => {
    console.log('changed gdprPrivacyConsent', gdprPrivacyConsent);
  }, [gdprPrivacyConsent]);

  return (
    <>
      <CookieBanner display={displayBanner} cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
