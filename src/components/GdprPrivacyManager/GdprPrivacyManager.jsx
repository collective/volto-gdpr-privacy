import React from 'react';
import { useSelector } from 'react-redux';

import { usePanelConfigAndPreferences, Cookies } from '../../helpers';

import CookieBanner from '../CookieBanner/CookieBanner';
import ShowGdprBanner from '../ShowGdprBanner/ShowGdprBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const cookies = new Cookies(true);

  usePanelConfigAndPreferences(cookies); //to init data from panel

  return (
    <>
      <ShowGdprBanner />
      <CookieBanner cookies={cookies} />
      <GdprPrivacyManagerIncludeComponents cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
