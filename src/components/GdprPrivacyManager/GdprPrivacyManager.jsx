import React from 'react';
import { useSelector } from 'react-redux';

import { usePanelConfigAndPreferences, Cookies } from '../../helpers';

import CookieBanner from '../CookieBanner/CookieBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const cookies = new Cookies(true);

  const displayBanner = useSelector(
    (state) => state.gdprPrivacyConsent.display,
  );

  usePanelConfigAndPreferences(cookies); //to init data from panel

  return (
    <>
      <CookieBanner display={displayBanner} cookies={cookies} />
      <GdprPrivacyManagerIncludeComponents cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
