import React from 'react';
import { useSelector } from 'react-redux';
import { usePanelConfigAndPreferences, GDPRCookies } from '../../helpers';
import CookieBanner from '../CookieBanner/CookieBanner';
import ShowGdprBanner from '../ShowGdprBanner/ShowGdprBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const cookies = new GDPRCookies();
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
