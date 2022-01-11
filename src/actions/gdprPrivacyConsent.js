export const GDPR_PRIVACY_CONSENT_UPDATE = 'GDPR_PRIVACY_CONSENT_UPDATE';
export const GDPR_PRIVACY_CONSENT_DISPLAY_BANNER =
  'GDPR_PRIVACY_CONSENT_DISPLAY_BANNER';

export function updateGdprPrivacyConsent(preferences) {
  return {
    type: GDPR_PRIVACY_CONSENT_UPDATE,
    preferences,
  };
}

export function displayBanner(display, displaySettings = false) {
  return {
    type: GDPR_PRIVACY_CONSENT_DISPLAY_BANNER,
    display,
    displaySettings,
  };
}
