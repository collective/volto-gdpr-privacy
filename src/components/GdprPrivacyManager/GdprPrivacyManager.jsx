import React from 'react';
import { useSelector } from 'react-redux';

import Cookies from '../../helpers/Cookies';

import CookieBanner from '../CookieBanner/CookieBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const cookies = new Cookies(true);

  const displayBanner = useSelector(
    (state) => state.gdprPrivacyConsent.display,
  );

  return (
    <>
      <CookieBanner display={displayBanner} cookies={cookies} />
      <GdprPrivacyManagerIncludeComponents cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
