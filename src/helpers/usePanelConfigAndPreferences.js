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
  // only on GET_CONTENT. When that action's request didn't ask for the
  // `gdpr-cookie-settings` expansion, Plone still includes the key in
  // `@components`, but as an unexpanded stub containing only `@id` (e.g.
  // `{"@id": ".../@gdpr-cookie-settings"}`) rather than an empty object.
  // Without this, e.g. creating a new content item elsewhere in the app
  // would replace `panelConfig` with that stub - still non-empty, but
  // missing `cookie_version`/`profiling`/`technical` - which makes
  // `cookies.setPanelConfig()` fall back to the default cookie name and the
  // "has the user already consented?" check in CookieBanner re-arm, even
  // though the real consent cookie was never actually cleared.
  const isRealPanelConfig = (cfg) =>
    !!cfg && Object.keys(cfg).some((k) => k !== '@id');
  const [_panelConfig, setPanelConfig] = useState(rawPanelConfig);
  useEffect(() => {
    if (isRealPanelConfig(rawPanelConfig)) {
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
