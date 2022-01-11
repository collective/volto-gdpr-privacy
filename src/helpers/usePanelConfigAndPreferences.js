import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGdprPrivacyConfig } from '../actions';
import { loadPreferences } from './banner';

const usePanelConfigAndPreferences = (cookies, forceLoad) => {
  const dispatch = useDispatch();
  const panelConfigStatus = useSelector((state) => state.gdprPrivacyConfig);
  const panelConfig = useSelector((state) => state.gdprPrivacyConfig.config);
  const [defaultPreferences, setDefaultPreferences] = useState(null);

  useEffect(() => {
    if (!panelConfigStatus.loaded && !panelConfigStatus.loading) {
      dispatch(getGdprPrivacyConfig());
    }

    if (
      panelConfigStatus.loaded &&
      !panelConfigStatus.loading &&
      !defaultPreferences
    ) {
      setDefaultPreferences(loadPreferences(cookies, panelConfigStatus.config));
    }
  }, [dispatch, panelConfigStatus, cookies, defaultPreferences]);

  useEffect(() => {
    if (
      forceLoad &&
      panelConfigStatus.loaded &&
      !panelConfigStatus.loading &&
      defaultPreferences
    ) {
      setDefaultPreferences(loadPreferences(cookies, panelConfigStatus.config));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLoad]);

  return {
    panelConfig,
    panelConfigStatus,
    defaultPreferences,
  };
};

export default usePanelConfigAndPreferences;
