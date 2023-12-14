import React from 'react';
import { useSelector } from 'react-redux';
import { usePanelConfigAndPreferences, GDPRCookies } from '../../helpers';
import CookieBanner from '../CookieBanner/CookieBanner';
import ShowGdprBanner from '../ShowGdprBanner/ShowGdprBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';
import defaultConfig from '../../config/temp_defaultConfig'; //[ToDo]: remove this when data is received from @cmponents

const GdprPrivacyManager = () => {
  const panel_config = useSelector(
    (state) =>
      state.content?.data?.['@components']?.['gdpr-cookie-infos'] ??
      defaultConfig, ////[ToDo]: remove this when data is received from @cmponents and use this {} as default,
  );

  const cookies = new GDPRCookies(panel_config);
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
