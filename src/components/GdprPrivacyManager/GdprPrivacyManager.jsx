import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { isCmsUi } from '@plone/volto/helpers/Url/Url';
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
  // GdprPrivacyManager is mounted app-wide via appExtras and re-renders on
  // every route/state change, so `cookies` must be a single stable instance
  // for the whole session rather than a new one on every render.
  const cookies = useMemo(() => new GDPRCookies(), []);
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
