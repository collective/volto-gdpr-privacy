export const GDPR_PRIVACY_CONFIG_GET = 'GDPR_PRIVACY_CONFIG_GET';
import defaultConfig from '../config/temp_defaultConfig'; //[ToDo]: remove this when data is received from @cmponents

export function getGdprPrivacyConfig() {
  return {
    type: GDPR_PRIVACY_CONFIG_GET,
    defaultConfig,
  };
}
