import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cookies from '../../helpers/Cookies';

import { getGdprPrivacyConfig } from '../../actions';
import CookieBanner from '../CookieBanner/CookieBanner';
import GdprPrivacyManagerIncludeComponents from './GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const cookies = new Cookies(true);
  const dispatch = useDispatch();
  const displayBanner = useSelector(
    (state) => state.gdprPrivacyConsent.display,
  );

  const panelConfigStatus = useSelector((state) => state.gdprPrivacyConfig);

  useEffect(() => {
    if (!panelConfigStatus.loaded && !panelConfigStatus.loading) {
      dispatch(getGdprPrivacyConfig());
    }
  }, [panelConfigStatus, dispatch]);

  return (
    <>
      <CookieBanner display={displayBanner} cookies={cookies} />
      <GdprPrivacyManagerIncludeComponents cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
