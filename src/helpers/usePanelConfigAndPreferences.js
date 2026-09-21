import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { loadPreferences } from './banner';
import config from '@plone/volto/registry';

const usePanelConfigAndPreferences = (cookies, forceLoad) => {
  // BBB for sites that had the old version with hardcoded panelConfig

  const hasOldStyleConfig =
    !!config.settings['volto-gdpr-privacy']?.defaultPanelConfig;
  const oldStylePanelConfig = useMemo(() => {
    if (hasOldStyleConfig) {
      if (__CLIENT__ && hasOldStyleConfig) {
        // eslint-disable-next-line no-console
        console.warn(
          'DEPRECATED: volto-gdpr-privacy: Using old-style hardcoded panelConfig. Please update your site to use the new style. This will be removed in version 3. See the README for more information. https://github.com/collective/volto-gdpr-privacy#readme',
        );
      }
      return {
        oldStyle: true,
        ...config.settings['volto-gdpr-privacy'].defaultPanelConfig,
      };
    } else return null;
  }, [hasOldStyleConfig]);

  const rawPanelConfig = useSelector(
    (state) =>
      state.content?.data?.['@components']?.['gdpr-cookie-settings'] ?? {},
  );
  // `state.content.data` is replaced on *any* successful content action
  // (CREATE_CONTENT, UPDATE_CONTENT, DELETE_CONTENT, ORDER_CONTENT...), not
  // only on GET_CONTENT, and those responses don't carry the
  // `gdpr-cookie-settings` expansion. Without this, e.g. creating a new
  // content item elsewhere in the app would momentarily blank `panelConfig`,
  // flipping `enabled` false then true again once the next GET_CONTENT
  // resolves - which re-arms the "has the user already consented" check in
  // CookieBanner even though the consent cookie was never actually cleared.
  // Keep the last non-empty config instead of flapping to `{}`.
  const [_panelConfig, setPanelConfig] = useState(rawPanelConfig);
  useEffect(() => {
    if (Object.keys(rawPanelConfig ?? {}).length > 0) {
      setPanelConfig(rawPanelConfig);
    }
  }, [rawPanelConfig]);
  const panelConfig = oldStylePanelConfig ?? _panelConfig;

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
  }, [panelConfigStatus, defaultPreferences, cookies]);

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
