import React from 'react';
import { useLocation } from 'react-router-dom';
import { isCmsUi } from '@plone/volto/helpers';
import {
  usePanelConfigAndPreferences,
  GDPRCookies,
  isPageSpeedBot,
} from '../../helpers';

import CookieBanner from '../CookieBanner/CookieBanner';
import ShowGdprBanner from '../ShowGdprBanner/ShowGdprBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const location = useLocation();
  const isCmsUI = isCmsUi(location.pathname);
  const cookies = new GDPRCookies();
  usePanelConfigAndPreferences(cookies); //to init data from panel

  if (isCmsUI || isPageSpeedBot()) {
    return <></>;
  }

  return (
    <>
      <ShowGdprBanner />
      <CookieBanner cookies={cookies} />
      <GdprPrivacyManagerIncludeComponents cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
