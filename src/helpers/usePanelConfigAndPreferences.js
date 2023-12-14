import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadPreferences } from './banner';

const usePanelConfigAndPreferences = (cookies, forceLoad) => {
  const panelConfig = useSelector(
    (state) =>
      state.content?.data?.['@components']?.['gdpr-cookie-settings'] ?? {},
  );
  const panelConfigStatus = useSelector((state) => state.content.get);
  const [defaultPreferences, setDefaultPreferences] = useState(null);

  useEffect(() => {
    if (cookies && panelConfig) {
      cookies.setPanelConfig(panelConfig);
    }
  }, [panelConfig, cookies]);

  useEffect(() => {
    if (
      panelConfigStatus.loaded &&
      !panelConfigStatus.loading &&
      !defaultPreferences &&
      cookies
    ) {
      setDefaultPreferences(loadPreferences(cookies, panelConfig));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelConfigStatus]);

  useEffect(() => {
    if (
      forceLoad &&
      panelConfigStatus.loaded &&
      !panelConfigStatus.loading &&
      defaultPreferences &&
      cookies
    ) {
      setDefaultPreferences(loadPreferences(cookies, panelConfig));
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
