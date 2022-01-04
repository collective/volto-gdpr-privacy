import { GDPR_PRIVACY_CONFIG_GET } from '../actions';

export function gdprPrivacyConfigReducer(state = [], action) {
  let newState = Object.assign([], state);

  switch (action.type) {
    case GDPR_PRIVACY_CONFIG_GET:
      newState = {
        ...newState,
        config: action.defaultConfig,
        loaded: true,
        loading: false,
      };
      break;

    default:
      break;
  }

  // return the modified state
  return newState;
}
