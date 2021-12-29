import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadPreferences } from '../../helpers/banner';
import cookiesConfig from '../../config/defaultPanelConfig.js';
import config from '@plone/volto/registry';

const GdprPrivacyManagerIncludeComponents = ({ cookies }) => {
  const defaultPreferences = loadPreferences(cookies, cookiesConfig);
  const gdprPreferences = useSelector(
    (state) => state.gdprPrivacyConsent.preferences ?? defaultPreferences,
  );
  const [includeComponents, setIncludeComponents] = useState({});

  useEffect(() => {
    console.log('changed gdprPreferences', gdprPreferences);

    if (gdprPreferences) {
      let activateComponents = {};
      Object.keys(gdprPreferences).forEach((k) => {
        const c = config.settings?.gdprPrivacyConfig?.[k]?.component;
        if (gdprPreferences[k] && c !== null && c !== undefined) {
          activateComponents[k] = c;
        }
      });

      const activateKeys = Object.keys(activateComponents);
      const includedKeys = Object.keys(includeComponents);

      if (activateKeys.filter((k) => includedKeys.indexOf(k) < 0).length > 0) {
        setIncludeComponents(activateComponents);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gdprPreferences]);

  console.log('includeComponents', includeComponents);

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
