import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadPreferences } from '../../helpers/banner';
import config from '@plone/volto/registry';

const GdprPrivacyManagerIncludeComponents = ({ cookies }) => {
  const panelConfig = config.settings.gdprPrivacyConfig.defaultPanelConfig;
  const defaultPreferences = loadPreferences(cookies, panelConfig);
  const gdprPreferences = useSelector(
    (state) => state.gdprPrivacyConsent.preferences ?? defaultPreferences,
  );
  const [includeComponents, setIncludeComponents] = useState({});

  useEffect(() => {
    if (gdprPreferences) {
      let activateComponents = {};
      Object.keys(gdprPreferences).forEach((k) => {
        const c = config.settings?.gdprPrivacyConfig?.settings?.[k]?.component;
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