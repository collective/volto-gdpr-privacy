import {
  GDPR_PRIVACY_CONSENT_UPDATE,
  GDPR_PRIVACY_CONSENT_DISPLAY_BANNER,
} from '../actions';

export function gdprPrivacyConsentReducer(state = [], action) {
  let newState = Object.assign([], state);

  switch (action.type) {
    case GDPR_PRIVACY_CONSENT_UPDATE:
      newState = { ...newState, preferences: action.preferences };
      break;
    case GDPR_PRIVACY_CONSENT_DISPLAY_BANNER:
      newState = {
        ...newState,
        display: action.display,
        displaySettings: action.displaySettings,
      };
      break;
    default:
      break;
  }

  // return the modified state
  return newState;
}
