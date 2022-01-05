import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPreferences } from '../../helpers/banner';
import { getGdprPrivacyConfig } from '../../actions';
import config from '@plone/volto/registry';

const GdprPrivacyManagerIncludeComponents = ({ cookies }) => {
  const dispatch = useDispatch();
  const panelConfigStatus = useSelector((state) => state.gdprPrivacyConfig);
  const panelConfig = useSelector((state) => state.gdprPrivacyConfig.config);
  const [defaultPreferences, setDefaultPreferences] = useState(null);

  const gdprPreferences = useSelector(
    (state) => state.gdprPrivacyConsent.preferences ?? defaultPreferences,
  );
  const [includeComponents, setIncludeComponents] = useState({});

  useEffect(() => {
    if (__SERVER__) {
      return;
    }
    if (!panelConfigStatus.loaded && !panelConfigStatus.loading) {
      dispatch(getGdprPrivacyConfig());
    }
  }, []);

  useEffect(() => {
    if (!panelConfig.loaded && !panelConfig.loading) {
      dispatch(getGdprPrivacyConfig());
    }
    if (panelConfig.loaded && !panelConfig.loading && !defaultPreferences) {
      setDefaultPreferences(loadPreferences(cookies, panelConfig.config));
    }
  }, [dispatch, panelConfig]);

  useEffect(() => {
    if (gdprPreferences) {
      let activateComponents = {};
      Object.keys(gdprPreferences).forEach((k) => {
        const c =
          config.settings['volto-gdpr-privacy']?.settings?.[k]?.component;
        if (gdprPreferences[k] && c !== null && c !== undefined) {
          activateComponents[k] = c;
        }
      });

      const activateKeys = Object.keys(activateComponents).sort();
      const includedKeys = Object.keys(includeComponents).sort();

      if (activateKeys.join(',') !== includedKeys.join(',')) {
        setIncludeComponents(activateComponents);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gdprPreferences]);

  return (
    <>
      {Object.keys(includeComponents).map((k) => {
        const IncludeComponent = includeComponents[k];
        return <IncludeComponent key={k} />;
      })}
    </>
  );
};
export default GdprPrivacyManagerIncludeComponents;
