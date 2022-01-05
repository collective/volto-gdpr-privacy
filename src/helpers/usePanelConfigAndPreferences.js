import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGdprPrivacyConfig } from '../actions';
import { loadPreferences } from './banner';

const usePanelConfigAndPreferences = (cookies) => {
  const dispatch = useDispatch();
  const panelConfig = useSelector((state) => state.gdprPrivacyConfig);
  const [defaultPreferences, setDefaultPreferences] = useState(null);
  useEffect(() => {
    if (!panelConfig.loaded && !panelConfig.loading) {
      dispatch(getGdprPrivacyConfig());
    }
    if (panelConfig.loaded && !panelConfig.loading && !defaultPreferences) {
      setDefaultPreferences(loadPreferences(cookies, panelConfig.config));
    }
  }, [dispatch, panelConfig]);

  return { panelConfig, defaultPreferences };
};

export default usePanelConfigAndPreferences;
