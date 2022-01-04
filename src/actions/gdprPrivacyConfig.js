import config from '@plone/volto/registry';
export const GDPR_PRIVACY_CONFIG_GET = 'GDPR_PRIVACY_CONFIG_GET';

export function getGdprPrivacyConfig() {
  const defaultConfig =
    config.settings['volto-gdpr-privacy'].defaultPanelConfig;
  return {
    type: GDPR_PRIVACY_CONFIG_GET,
    defaultConfig,
  };
}
